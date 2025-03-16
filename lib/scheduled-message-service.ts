// This service handles scheduled messages

export interface ScheduledMessage {
  id: number
  webhookId: number
  content?: string
  embeds?: any[]
  components?: any[]
  scheduledTime: string
  recurring: boolean
  recurringPattern?: string
  status: "pending" | "sent" | "failed"
}

export function getScheduledMessageStorage(): ScheduledMessage[] {
  // In a real app, this would get scheduled messages from localStorage or a database
  const stored = localStorage.getItem("discord-scheduled-messages")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error("Failed to parse stored scheduled messages", e)
    }
  }

  // Return empty array if none are stored
  return []
}

export function saveScheduledMessageStorage(messages: ScheduledMessage[]): void {
  // In a real app, this would save scheduled messages to localStorage or a database
  localStorage.setItem("discord-scheduled-messages", JSON.stringify(messages))
}

export function scheduleMessage(message: Partial<ScheduledMessage>): ScheduledMessage {
  const messages = getScheduledMessageStorage()

  const newMessage: ScheduledMessage = {
    id: messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
    webhookId: message.webhookId || 0,
    content: message.content || "",
    embeds: message.embeds || [],
    components: message.components || [],
    scheduledTime: message.scheduledTime || new Date().toISOString(),
    recurring: message.recurring || false,
    recurringPattern: message.recurringPattern,
    status: "pending",
  }

  const newMessages = [...messages, newMessage]
  saveScheduledMessageStorage(newMessages)

  // Set up a timeout to send the message at the scheduled time
  const scheduledDate = new Date(newMessage.scheduledTime)
  const now = new Date()
  const timeUntilSend = scheduledDate.getTime() - now.getTime()

  if (timeUntilSend > 0) {
    setTimeout(() => {
      sendScheduledMessage(newMessage.id)
    }, timeUntilSend)
  }

  return newMessage
}

export function updateScheduledMessage(id: number, message: Partial<ScheduledMessage>): void {
  const messages = getScheduledMessageStorage()
  const newMessages = messages.map((m) => (m.id === id ? { ...m, ...message } : m))

  saveScheduledMessageStorage(newMessages)
}

export function deleteScheduledMessage(id: number): void {
  const messages = getScheduledMessageStorage()
  const newMessages = messages.filter((m) => m.id !== id)

  saveScheduledMessageStorage(newMessages)
}

// Function to send a scheduled message
export async function sendScheduledMessage(id: number): Promise<boolean> {
  const messages = getScheduledMessageStorage()
  const message = messages.find((m) => m.id === id)

  if (!message) {
    console.error(`Scheduled message with ID ${id} not found`)
    return false
  }

  try {
    // Get the webhook
    const { getWebhookStorage, sendWebhookMessage } = await import("./webhook-service")
    const webhooks = getWebhookStorage()
    const webhook = webhooks.find((w) => w.id === message.webhookId)

    if (!webhook) {
      console.error(`Webhook with ID ${message.webhookId} not found`)
      updateScheduledMessage(id, { status: "failed" })
      return false
    }

    // Prepare the message data
    const messageData = {
      content: message.content,
      embeds: message.embeds,
      components: message.components,
    }

    // Send the message
    const success = await sendWebhookMessage(webhook, messageData)

    if (success) {
      // Update the message status
      updateScheduledMessage(id, { status: "sent" })

      // If it's recurring, schedule the next occurrence
      if (message.recurring && message.recurringPattern) {
        const nextDate = calculateNextOccurrence(new Date(message.scheduledTime), message.recurringPattern)

        if (nextDate) {
          scheduleMessage({
            ...message,
            scheduledTime: nextDate.toISOString(),
            status: "pending",
          })
        }
      }

      return true
    } else {
      updateScheduledMessage(id, { status: "failed" })
      return false
    }
  } catch (error) {
    console.error("Error sending scheduled message:", error)
    updateScheduledMessage(id, { status: "failed" })
    return false
  }
}

// Helper function to calculate the next occurrence based on the recurring pattern
function calculateNextOccurrence(date: Date, pattern: string): Date | null {
  const nextDate = new Date(date)

  switch (pattern) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + 1)
      break
    case "weekly":
      nextDate.setDate(nextDate.getDate() + 7)
      break
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + 1)
      break
    default:
      return null
  }

  return nextDate
}

// Initialize scheduled messages on page load
export function initializeScheduledMessages(): void {
  const messages = getScheduledMessageStorage()
  const now = new Date()

  messages.forEach((message) => {
    if (message.status === "pending") {
      const scheduledDate = new Date(message.scheduledTime)
      const timeUntilSend = scheduledDate.getTime() - now.getTime()

      if (timeUntilSend <= 0) {
        // If the scheduled time has passed, send it immediately
        sendScheduledMessage(message.id)
      } else {
        // Otherwise, set a timeout
        setTimeout(() => {
          sendScheduledMessage(message.id)
        }, timeUntilSend)
      }
    }
  })
}

// Call this function when the app starts
if (typeof window !== "undefined") {
  window.addEventListener("load", initializeScheduledMessages)
}


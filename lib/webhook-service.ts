// This service handles the actual API calls to Discord webhooks

export interface Webhook {
  id: number
  name: string
  avatar: string
  url: string
  active: boolean
  messagesSent: number
  successRate: number
  lastUsed: string
  favorite: boolean
}

export interface EmbedField {
  name: string
  value: string
  inline: boolean
}

export interface MessageEmbed {
  title: string
  description: string
  color: number | string
  fields?: EmbedField[]
  image?: { url: string }
  thumbnail?: { url: string }
  author?: {
    name: string
    icon_url?: string
    url?: string
  }
  footer?: {
    text: string
    icon_url?: string
  }
  timestamp?: string
}

export interface WebhookMessage {
  content?: string
  username?: string
  avatar_url?: string
  embeds?: MessageEmbed[]
  tts?: boolean
  components?: any[] // For buttons and other interactive components
}

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Improved sendWebhookMessage function that actually sends to Discord
export async function sendWebhookMessage(webhook: Webhook, message: WebhookMessage): Promise<boolean> {
  console.log(`Sending message to webhook: ${webhook.url}`)
  console.log("Message data:", message)

  try {
    // Make the actual API call to Discord
    const response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })

    // Discord returns 204 No Content on success
    const success = response.status === 204

    if (success) {
      // Update the webhook stats
      const updatedWebhook = {
        ...webhook,
        messagesSent: webhook.messagesSent + 1,
        lastUsed: "Just now",
      }

      // Update the webhook in storage
      const webhooks = getWebhookStorage()
      const updatedWebhooks = webhooks.map((w) => (w.id === webhook.id ? updatedWebhook : w))
      saveWebhookStorage(updatedWebhooks)

      // Save message to history
      saveMessageToHistory(message)

      console.log(`Message sent successfully to ${webhook.name}`)
      return true
    } else {
      console.error(`Failed to send message to ${webhook.name}: ${response.status} ${response.statusText}`)
      return false
    }
  } catch (error) {
    console.error("Error sending webhook message:", error)
    return false
  }
}

export function getWebhookStorage(): Webhook[] {
  // In a real app, this would get webhooks from localStorage or a database
  if (!isBrowser) return []

  const stored = localStorage.getItem("discord-webhooks")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error("Failed to parse stored webhooks", e)
    }
  }

  // Return empty array instead of default webhooks
  return []
}

export function saveWebhookStorage(webhooks: Webhook[]): void {
  // In a real app, this would save webhooks to localStorage or a database
  if (!isBrowser) return

  localStorage.setItem("discord-webhooks", JSON.stringify(webhooks))
}

// Message history functionality
export interface MessageHistoryItem {
  id: number
  title: string
  content: string
  embeds?: MessageEmbed[]
  components?: any[]
  timestamp: string
  color: string
}

export function getMessageHistory(): MessageHistoryItem[] {
  if (!isBrowser) return []

  const stored = localStorage.getItem("discord-message-history")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error("Failed to parse message history", e)
    }
  }

  return []
}

export function saveMessageToHistory(message: WebhookMessage): void {
  if (!isBrowser) return

  const history = getMessageHistory()
  const colors = ["blue", "green", "purple", "red", "orange"]

  const newMessage: MessageHistoryItem = {
    id: Date.now(),
    title: message.embeds && message.embeds.length > 0 ? message.embeds[0].title : "Message",
    content:
      message.content || (message.embeds && message.embeds.length > 0 ? message.embeds[0].description : "No content"),
    embeds: message.embeds,
    components: message.components,
    timestamp: new Date().toISOString(),
    color: colors[Math.floor(Math.random() * colors.length)],
  }

  // Keep only the last 10 messages
  const updatedHistory = [newMessage, ...history].slice(0, 10)
  localStorage.setItem("discord-message-history", JSON.stringify(updatedHistory))
}

export function deleteMessageFromHistory(id: number): void {
  if (!isBrowser) return

  const history = getMessageHistory()
  const updatedHistory = history.filter((msg) => msg.id !== id)
  localStorage.setItem("discord-message-history", JSON.stringify(updatedHistory))
}


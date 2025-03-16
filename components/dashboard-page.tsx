"use client"

import { useState, useEffect, createContext } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { MessageCreator } from "@/components/message-creator"
import { WebhookSettings } from "@/components/webhook-settings"
import { AdvancedFeatures } from "@/components/advanced-features"
import { ThemeProvider } from "@/components/theme-provider"
import { getWebhookStorage, saveWebhookStorage, type Webhook } from "@/lib/webhook-service"
import { getCurrentLanguage, saveLanguage, type Language } from "@/lib/language-service"

// Create a context for language
export const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
}>({
  language: "en",
  setLanguage: () => {},
})

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [language, setLanguage] = useState<Language>("en")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    saveLanguage(lang)
  }

  useEffect(() => {
    // Load webhooks from storage
    const storedWebhooks = getWebhookStorage()
    setWebhooks(storedWebhooks)

    // Load language
    setLanguage(getCurrentLanguage())
  }, [])

  const addWebhook = (webhook: Partial<Webhook>) => {
    const newWebhooks = [
      ...webhooks,
      {
        id: webhooks.length > 0 ? Math.max(...webhooks.map((w) => w.id)) + 1 : 1,
        name: webhook.name || "New Webhook",
        avatar: webhook.avatar || "/placeholder.svg?height=40&width=40",
        url: webhook.url || "",
        active: webhook.active !== undefined ? webhook.active : true,
        messagesSent: 0,
        successRate: 100,
        lastUsed: "Just now",
        favorite: false,
      },
    ]

    setWebhooks(newWebhooks)
    saveWebhookStorage(newWebhooks)
  }

  const updateWebhook = (id: number, updatedData: Partial<Webhook>) => {
    const newWebhooks = webhooks.map((webhook) => (webhook.id === id ? { ...webhook, ...updatedData } : webhook))

    setWebhooks(newWebhooks)
    saveWebhookStorage(newWebhooks)
  }

  const deleteWebhook = (id: number) => {
    const newWebhooks = webhooks.filter((webhook) => webhook.id !== id)

    setWebhooks(newWebhooks)
    saveWebhookStorage(newWebhooks)
  }

  const toggleFavorite = (id: number) => {
    const newWebhooks = webhooks.map((webhook) =>
      webhook.id === id ? { ...webhook, favorite: !webhook.favorite } : webhook,
    )

    setWebhooks(newWebhooks)
    saveWebhookStorage(newWebhooks)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      <ThemeProvider defaultTheme="dark" storageKey="discord-webhook-theme">
        <SidebarProvider>
          <div className="flex h-screen bg-background">
            <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 overflow-auto">
              {activeTab === "dashboard" && (
                <Dashboard
                  webhooks={webhooks}
                  deleteWebhook={deleteWebhook}
                  setActiveTab={setActiveTab}
                  toggleFavorite={toggleFavorite}
                />
              )}
              {activeTab === "message-creator" && <MessageCreator webhooks={webhooks} />}
              {activeTab === "webhook-settings" && (
                <WebhookSettings
                  webhooks={webhooks}
                  addWebhook={addWebhook}
                  updateWebhook={updateWebhook}
                  deleteWebhook={deleteWebhook}
                  toggleFavorite={toggleFavorite}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === "advanced-features" && <AdvancedFeatures />}
            </main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </LanguageContext.Provider>
  )
}


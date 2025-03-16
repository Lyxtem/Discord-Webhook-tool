"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { BarChart3, Layers, MessageSquarePlus, Settings, Webhook, Menu } from "lucide-react"
import { translate } from "@/lib/language-service"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface AppSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const menuItems = [
    {
      id: "dashboard",
      title: translate("nav.dashboard"),
      icon: BarChart3,
    },
    {
      id: "message-creator",
      title: translate("nav.messageCreator"),
      icon: MessageSquarePlus,
    },
    {
      id: "webhook-settings",
      title: translate("nav.webhookSettings"),
      icon: Webhook,
    },
    {
      id: "advanced-features",
      title: translate("nav.advancedFeatures"),
      icon: Layers,
    },
  ]

  // Add a floating menu button when sidebar is collapsed
  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebarElement = document.querySelector('[data-sidebar="sidebar"]')
      if (sidebarElement) {
        const state = sidebarElement.getAttribute("data-state")
        setSidebarCollapsed(state === "collapsed")
      }
    }

    // Initial check
    handleSidebarChange()

    // Set up a MutationObserver to watch for attribute changes
    const observer = new MutationObserver(handleSidebarChange)
    const sidebarElement = document.querySelector('[data-sidebar="sidebar"]')

    if (sidebarElement) {
      observer.observe(sidebarElement, { attributes: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Webhook className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold">{translate("app.title")}</h1>
          </div>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                  tooltip={item.title}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>{translate("app.theme.system")}</span>
            </div>
            <ModeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Floating menu button when sidebar is collapsed */}
      {sidebarCollapsed && (
        <Button
          className="fixed top-4 left-4 z-50 rounded-full w-10 h-10 p-0 flex items-center justify-center"
          variant="outline"
          onClick={() => {
            const trigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
            if (trigger) trigger.click()
          }}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}


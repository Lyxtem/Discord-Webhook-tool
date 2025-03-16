"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, MessageSquare, Plus, Webhook, XCircle, FileEdit, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { translate } from "@/lib/language-service"

export function Dashboard({ webhooks, deleteWebhook, setActiveTab, toggleFavorite }) {
  const [connected, setConnected] = useState(true)

  const totalMessagesSent = webhooks.reduce((total, webhook) => total + webhook.messagesSent, 0)

  const averageSuccessRate =
    webhooks.length > 0
      ? Math.round(webhooks.reduce((total, webhook) => total + webhook.successRate, 0) / webhooks.length)
      : 0

  const favoriteWebhooks = webhooks.filter((webhook) => webhook.favorite)
  const recentWebhooks = [...webhooks]
    .sort((a, b) => {
      if (a.lastUsed === "Just now") return -1
      if (b.lastUsed === "Just now") return 1
      return 0
    })
    .slice(0, 3)

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translate("dashboard.title")}</h1>
          <p className="text-muted-foreground">{translate("dashboard.subtitle")}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="text-sm">
              {connected ? translate("dashboard.connected") : translate("dashboard.disconnected")}
            </span>
          </div>
          <Button onClick={() => setActiveTab("webhook-settings")}>
            <Plus className="mr-2 h-4 w-4" /> {translate("dashboard.newWebhook")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{translate("dashboard.totalWebhooks")}</CardTitle>
            <Webhook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhooks.length}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{translate("dashboard.messagesSent")}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessagesSent}</div>
            <p className="text-xs text-muted-foreground">+86 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{translate("dashboard.successRate")}</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSuccessRate}%</div>
            <Progress value={averageSuccessRate} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{translate("dashboard.failedMessages")}</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((totalMessagesSent * (100 - averageSuccessRate)) / 100)}
            </div>
            <p className="text-xs text-muted-foreground">-3 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">{translate("dashboard.allWebhooks")}</TabsTrigger>
            <TabsTrigger value="recent">{translate("dashboard.recentlyUsed")}</TabsTrigger>
            <TabsTrigger value="favorites">{translate("dashboard.favorites")}</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={webhook.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={webhook.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{webhook.name}</h3>
                        <Badge variant={webhook.active ? "default" : "outline"}>
                          {webhook.active ? translate("dashboard.active") : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{webhook.messagesSent}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{webhook.successRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(webhook.id)}
                        className={webhook.favorite ? "text-yellow-500" : ""}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setActiveTab("message-creator")}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setActiveTab("webhook-settings")
                        }}
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteWebhook(webhook.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="grid gap-4">
            {recentWebhooks.length > 0 ? (
              recentWebhooks.map((webhook) => (
                <Card key={webhook.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={webhook.avatar || "/placeholder.svg?height=40&width=40"}
                        alt={webhook.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{webhook.name}</h3>
                          <Badge variant={webhook.active ? "default" : "outline"}>
                            {webhook.active ? translate("dashboard.active") : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{webhook.messagesSent}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{webhook.successRate}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(webhook.id)}
                          className={webhook.favorite ? "text-yellow-500" : ""}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setActiveTab("message-creator")}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setActiveTab("webhook-settings")
                          }}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteWebhook(webhook.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardDescription>No recently used webhooks.</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="favorites">
          {favoriteWebhooks.length > 0 ? (
            <div className="grid gap-4">
              {favoriteWebhooks.map((webhook) => (
                <Card key={webhook.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={webhook.avatar || "/placeholder.svg?height=40&width=40"}
                        alt={webhook.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{webhook.name}</h3>
                          <Badge variant={webhook.active ? "default" : "outline"}>
                            {webhook.active ? translate("dashboard.active") : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{webhook.messagesSent}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{webhook.successRate}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(webhook.id)}
                          className="text-yellow-500"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setActiveTab("message-creator")}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setActiveTab("webhook-settings")
                          }}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteWebhook(webhook.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardDescription>{translate("dashboard.noFavorites")}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}


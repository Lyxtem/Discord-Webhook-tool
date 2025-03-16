"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Eye, EyeOff, Plus, Save, Trash2, Webhook, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { getTemplateStorage, createTemplate, deleteTemplate } from "@/lib/template-service"
import { translate } from "@/lib/language-service"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function WebhookSettings({ webhooks, addWebhook, updateWebhook, deleteWebhook, toggleFavorite, setActiveTab }) {
  const [showUrl, setShowUrl] = useState(false)
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    avatar: "",
    active: true,
  })
  const [templates, setTemplates] = useState([])
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
  })
  const [editingWebhook, setEditingWebhook] = useState(null)
  const [showEditDialog, setShowEditDialog] = useState(false)

  useEffect(() => {
    // Load templates from storage
    const storedTemplates = getTemplateStorage()
    setTemplates(storedTemplates)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newWebhook.name || !newWebhook.url) return

    addWebhook(newWebhook)
    setNewWebhook({
      name: "",
      url: "",
      avatar: "",
      active: true,
    })
  }

  const handleInputChange = (e) => {
    const { id, value, checked } = e.target
    setNewWebhook({
      ...newWebhook,
      [id.replace("webhook-", "")]: id === "webhook-active" ? checked : value,
    })
  }

  const handleEditInputChange = (e) => {
    const { id, value, checked } = e.target
    setEditingWebhook({
      ...editingWebhook,
      [id.replace("edit-webhook-", "")]: id === "edit-webhook-active" ? checked : value,
    })
  }

  const handleCreateTemplate = () => {
    if (!newTemplate.name) {
      alert("Please enter a template name")
      return
    }

    const template = createTemplate(newTemplate)
    setTemplates([...templates, template])
    setNewTemplate({ name: "", description: "" })

    // Show a success message
    alert("Template saved successfully!")
  }

  const handleDeleteTemplate = (id) => {
    deleteTemplate(id)
    setTemplates(templates.filter((template) => template.id !== id))
  }

  const handleEditWebhook = (webhook) => {
    setEditingWebhook({ ...webhook })
    setShowEditDialog(true)
  }

  const saveEditedWebhook = () => {
    if (!editingWebhook.name || !editingWebhook.url) return

    updateWebhook(editingWebhook.id, editingWebhook)
    setShowEditDialog(false)
    setEditingWebhook(null)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translate("webhookSettings.title")}</h1>
          <p className="text-muted-foreground">{translate("webhookSettings.subtitle")}</p>
        </div>
        <Button
          onClick={() => {
            // Scroll to the add webhook form
            document.getElementById("add-webhook-form")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> {translate("webhookSettings.addWebhook")}
        </Button>
      </div>

      <Tabs defaultValue="webhooks">
        <TabsList className="mb-4">
          <TabsTrigger value="webhooks">{translate("webhookSettings.webhooks")}</TabsTrigger>
          <TabsTrigger value="templates">{translate("webhookSettings.templates")}</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{translate("webhookSettings.yourWebhooks")}</CardTitle>
                  <CardDescription>{translate("webhookSettings.manageWebhooks")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {webhooks.map((webhook) => (
                        <TableRow key={webhook.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={webhook.avatar || "/placeholder.svg?height=40&width=40"}
                                alt={webhook.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <div className="font-medium">{webhook.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={webhook.active ? "default" : "outline"}>
                              {webhook.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleFavorite(webhook.id)}
                                className={webhook.favorite ? "text-yellow-500" : ""}
                              >
                                <Star className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleEditWebhook(webhook)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteWebhook(webhook.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card id="add-webhook-form">
                <CardHeader>
                  <CardTitle>{translate("webhookSettings.addWebhook")}</CardTitle>
                  <CardDescription>{translate("webhookSettings.connectWebhook")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">{translate("webhookSettings.webhookUrl")}</Label>
                    <div className="flex">
                      <Input
                        id="webhook-url"
                        type={showUrl ? "text" : "password"}
                        placeholder="https://discord.com/api/webhooks/..."
                        className="rounded-r-none"
                        value={newWebhook.url}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none"
                        onClick={() => setShowUrl(!showUrl)}
                      >
                        {showUrl ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{translate("webhookSettings.webhookUrlHelp")}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhook-name">{translate("webhookSettings.displayName")}</Label>
                    <Input
                      id="webhook-name"
                      placeholder="Webhook name"
                      value={newWebhook.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhook-avatar">{translate("webhookSettings.avatarUrl")}</Label>
                    <Input
                      id="webhook-avatar"
                      placeholder="https://example.com/avatar.png"
                      value={newWebhook.avatar}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="webhook-active">{translate("webhookSettings.active")}</Label>
                    <Switch
                      id="webhook-active"
                      checked={newWebhook.active}
                      onCheckedChange={(checked) => setNewWebhook({ ...newWebhook, active: checked })}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleSubmit}>
                    <Save className="mr-2 h-4 w-4" /> {translate("webhookSettings.saveWebhook")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{translate("webhookSettings.messageTemplates")}</CardTitle>
                  <CardDescription>{translate("webhookSettings.reuseFormats")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>{template.description}</TableCell>
                          <TableCell>{template.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteTemplate(template.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{translate("webhookSettings.createTemplate")}</CardTitle>
                  <CardDescription>{translate("webhookSettings.saveMessageFormat")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">{translate("webhookSettings.templateName")}</Label>
                    <Input
                      id="template-name"
                      placeholder="Enter template name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-description">{translate("webhookSettings.templateDescription")}</Label>
                    <Input
                      id="template-description"
                      placeholder="What is this template for?"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    />
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium mb-2">{translate("webhookSettings.templateContent")}</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {translate("webhookSettings.templateContentHelp")}
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("message-creator")}>
                      <Webhook className="mr-2 h-4 w-4" /> {translate("webhookSettings.goToMessageCreator")}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!newTemplate.name} onClick={handleCreateTemplate}>
                    <Save className="mr-2 h-4 w-4" /> {translate("webhookSettings.saveTemplate")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Webhook Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Webhook</DialogTitle>
            <DialogDescription>Make changes to your webhook</DialogDescription>
          </DialogHeader>
          {editingWebhook && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-webhook-url">Webhook URL</Label>
                <div className="flex">
                  <Input
                    id="edit-webhook-url"
                    type={showUrl ? "text" : "password"}
                    placeholder="https://discord.com/api/webhooks/..."
                    className="rounded-r-none"
                    value={editingWebhook.url}
                    onChange={handleEditInputChange}
                    required
                  />
                  <Button variant="outline" size="icon" className="rounded-l-none" onClick={() => setShowUrl(!showUrl)}>
                    {showUrl ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-webhook-name">Display Name</Label>
                <Input
                  id="edit-webhook-name"
                  placeholder="Webhook name"
                  value={editingWebhook.name}
                  onChange={handleEditInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-webhook-avatar">Avatar URL</Label>
                <Input
                  id="edit-webhook-avatar"
                  placeholder="https://example.com/avatar.png"
                  value={editingWebhook.avatar}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="edit-webhook-active">Active</Label>
                <Switch
                  id="edit-webhook-active"
                  checked={editingWebhook.active}
                  onCheckedChange={(checked) => setEditingWebhook({ ...editingWebhook, active: checked })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedWebhook}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


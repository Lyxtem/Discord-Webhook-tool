"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AtSign,
  Bold,
  Calendar,
  Code,
  Heading,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Plus,
  Save,
  Send,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { sendWebhookMessage } from "@/lib/webhook-service"
import { scheduleMessage } from "@/lib/scheduled-message-service"
import { createTemplate, getTemplateStorage, updateTemplate } from "@/lib/template-service"
import { translate } from "@/lib/language-service"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function MessageCreator({ webhooks }) {
  const [embedColor, setEmbedColor] = useState("#5865F2") // Discord blue
  const [embedTitle, setEmbedTitle] = useState("New Announcement")
  const [embedDescription, setEmbedDescription] = useState(
    "This is a preview of how your message will appear in Discord.",
  )
  const [embedImage, setEmbedImage] = useState("")
  const [embedFields, setEmbedFields] = useState([
    { name: "Field 1", value: "This is a field value", inline: true },
    { name: "Field 2", value: "Another field value", inline: true },
  ])
  const [messageContent, setMessageContent] = useState("")
  const [selectedWebhook, setSelectedWebhook] = useState("")
  const [sendTime, setSendTime] = useState("now")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringPattern, setRecurringPattern] = useState("daily")
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState(null)
  const [components, setComponents] = useState([])
  const [showComponentDialog, setShowComponentDialog] = useState(false)
  const [newButton, setNewButton] = useState({
    label: "Click me!",
    style: "primary",
    url: "https://discord.com",
    emoji: "👍",
    disabled: false,
  })

  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState("")

  useEffect(() => {
    // Load templates from storage
    const storedTemplates = getTemplateStorage()
    setTemplates(storedTemplates)
  }, [])

  const addField = () => {
    setEmbedFields([
      ...embedFields,
      { name: `Field ${embedFields.length + 1}`, value: "New field value", inline: true },
    ])
  }

  const removeField = (index) => {
    setEmbedFields(embedFields.filter((_, i) => i !== index))
  }

  const updateField = (index, field) => {
    const newFields = [...embedFields]
    newFields[index] = field
    setEmbedFields(newFields)
  }

  const getButtonStyleNumber = (style) => {
    switch (style) {
      case "primary":
        return 1
      case "secondary":
        return 2
      case "success":
        return 3
      case "danger":
        return 4
      case "link":
        return 5
      default:
        return 1
    }
  }

  const addButton = () => {
    const button = {
      type: 2, // Button type
      style: getButtonStyleNumber(newButton.style),
      label: newButton.label,
      emoji: newButton.emoji ? { name: newButton.emoji } : undefined,
      url: newButton.style === "link" ? newButton.url : undefined,
      disabled: newButton.disabled,
    }

    const actionRow = {
      type: 1, // Action Row type
      components: [button],
    }

    setComponents([...components, actionRow])
    setShowComponentDialog(false)

    // Reset the new button form
    setNewButton({
      label: "Click me!",
      style: "primary",
      url: "https://discord.com",
      emoji: "👍",
      disabled: false,
    })
  }

  const removeComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index))
  }

  const sendMessage = async () => {
    if (!selectedWebhook) {
      alert(translate("messageCreator.selectWebhook"))
      return
    }

    const webhook = webhooks.find((w) => w.name === selectedWebhook)

    if (!webhook) {
      alert(translate("messageCreator.webhookNotFound"))
      return
    }

    const messageData = {
      content: messageContent,
      embeds: [
        {
          title: embedTitle,
          description: embedDescription,
          color: Number.parseInt(embedColor.replace("#", ""), 16),
          fields: embedFields,
          image: embedImage ? { url: embedImage } : undefined,
        },
      ],
      components: components.length > 0 ? components : undefined,
    }

    if (sendTime === "now") {
      // Send immediately
      setIsSending(true)
      setSendResult(null)

      try {
        const success = await sendWebhookMessage(webhook, messageData)

        if (success) {
          setSendResult({
            success: true,
            message: translate("messageCreator.messageSentSuccess"),
          })
        } else {
          throw new Error(translate("messageCreator.failedToSend"))
        }
      } catch (error) {
        console.error("Error sending message:", error)
        setSendResult({
          success: false,
          message: `${translate("messageCreator.error")}: ${error.message}`,
        })
      } finally {
        setIsSending(false)
      }
    } else {
      // Schedule for later
      if (!scheduledDate || !scheduledTime) {
        alert(translate("messageCreator.selectDateTime"))
        return
      }

      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`)

      if (scheduledDateTime <= new Date()) {
        alert(translate("messageCreator.futureDateRequired"))
        return
      }

      try {
        scheduleMessage({
          webhookId: webhook.id,
          content: messageContent,
          embeds: messageData.embeds,
          components: messageData.components,
          scheduledTime: scheduledDateTime.toISOString(),
          recurring: isRecurring,
          recurringPattern: isRecurring ? recurringPattern : undefined,
        })

        setSendResult({
          success: true,
          message: `${translate("messageCreator.scheduledFor")} ${format(scheduledDateTime, "PPpp")}`,
        })
      } catch (error) {
        console.error("Error scheduling message:", error)
        setSendResult({
          success: false,
          message: `${translate("messageCreator.error")}: ${error.message}`,
        })
      }
    }
  }

  const saveAsTemplate = () => {
    if (!embedTitle) {
      alert(translate("messageCreator.titleRequired"))
      return
    }

    const templateData = {
      name: embedTitle,
      description: embedDescription.substring(0, 50) + (embedDescription.length > 50 ? "..." : ""),
      content: messageContent,
      embeds: [
        {
          title: embedTitle,
          description: embedDescription,
          color: embedColor,
          fields: embedFields,
          image: embedImage ? { url: embedImage } : undefined,
        },
      ],
      components: components,
    }

    try {
      const template = createTemplate(templateData)
      setSendResult({
        success: true,
        message: translate("messageCreator.templateSaved"),
      })

      // Clear the result message after 3 seconds
      setTimeout(() => setSendResult(null), 3000)
    } catch (error) {
      console.error("Error saving template:", error)
      setSendResult({
        success: false,
        message: `${translate("messageCreator.error")}: ${error.message}`,
      })
    }
  }

  const applyTemplate = () => {
    if (!selectedTemplate) return

    const template = templates.find((t) => t.name === selectedTemplate)
    if (!template) return

    // Apply template to the current message
    setMessageContent(template.content || "")

    if (template.embeds && template.embeds.length > 0) {
      const embed = template.embeds[0]
      setEmbedTitle(embed.title || "")
      setEmbedDescription(embed.description || "")
      setEmbedColor(typeof embed.color === "string" ? embed.color : `#${embed.color.toString(16).padStart(6, "0")}`)

      if (embed.fields) {
        setEmbedFields(embed.fields)
      }

      if (embed.image) {
        setEmbedImage(embed.image.url || "")
      }
    }

    if (template.components) {
      setComponents(template.components)
    }

    // Update the template's lastUsed property
    updateTemplate(template.id, { lastUsed: "Just now" })

    // Show success message
    setSendResult({
      success: true,
      message: translate("messageCreator.templateApplied"),
    })

    // Clear the result message after 3 seconds
    setTimeout(() => setSendResult(null), 3000)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translate("messageCreator.title")}</h1>
          <p className="text-muted-foreground">{translate("messageCreator.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => saveAsTemplate()}>
            <Save className="mr-2 h-4 w-4" /> {translate("messageCreator.saveTemplate")}
          </Button>
          <Button onClick={sendMessage}>
            <Send className="mr-2 h-4 w-4" /> {translate("messageCreator.sendMessage")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{translate("messageCreator.messageContent")}</CardTitle>
              <CardDescription>{translate("messageCreator.createContent")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content">{translate("messageCreator.textContent")}</Label>
                  <div className="flex flex-wrap gap-2 mb-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageContent(messageContent + "**Bold Text**")}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageContent(messageContent + "*Italic Text*")}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageContent(messageContent + "```Code Block```")}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageContent(messageContent + "[Link Text](https://example.com)")}
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageContent(messageContent + "\n- List item\n- Another item")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageContent(messageContent + "\n1. First item\n2. Second item")}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageContent(messageContent + "\n## Heading")}
                    >
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <AtSign className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMessageContent(messageContent + "@everyone")}
                          >
                            @everyone
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMessageContent(messageContent + "@here")}
                          >
                            @here
                          </Button>
                          <Separator />
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMessageContent(messageContent + "@Moderators")}
                          >
                            @Moderators
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMessageContent(messageContent + "@Subscribers")}
                          >
                            @Subscribers
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Textarea
                    id="content"
                    placeholder={translate("messageCreator.enterContent")}
                    className="min-h-[100px]"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{translate("messageCreator.embedEditor")}</CardTitle>
                <CardDescription>{translate("messageCreator.embedEditorSubtitle")}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmbedTitle("")
                    setEmbedDescription("")
                    setEmbedFields([])
                    setEmbedImage("")
                    setEmbedColor("#5865F2")
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> {translate("messageCreator.clear")}
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> {translate("messageCreator.addEmbed")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">{translate("messageCreator.general")}</TabsTrigger>
                  <TabsTrigger value="fields">{translate("messageCreator.fields")}</TabsTrigger>
                  <TabsTrigger value="images">{translate("messageCreator.images")}</TabsTrigger>
                  <TabsTrigger value="author">{translate("messageCreator.author")}</TabsTrigger>
                  <TabsTrigger value="footer">{translate("messageCreator.footer")}</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="embed-color">{translate("messageCreator.embedColor")}</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="color"
                          id="embed-color"
                          value={embedColor}
                          onChange={(e) => setEmbedColor(e.target.value)}
                          className="h-10 w-10 rounded cursor-pointer"
                        />
                        <Input value={embedColor} onChange={(e) => setEmbedColor(e.target.value)} className="w-32" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="embed-title">{translate("messageCreator.title")}</Label>
                      <Input
                        id="embed-title"
                        value={embedTitle}
                        onChange={(e) => setEmbedTitle(e.target.value)}
                        placeholder={translate("messageCreator.enterTitle")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="embed-description">{translate("messageCreator.description")}</Label>
                      <Textarea
                        id="embed-description"
                        value={embedDescription}
                        onChange={(e) => setEmbedDescription(e.target.value)}
                        placeholder={translate("messageCreator.enterDescription")}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="fields" className="space-y-4">
                  {embedFields.map((field, index) => (
                    <div key={index} className="grid gap-4 p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          {translate("messageCreator.field")} {index + 1}
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => removeField(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`field-name-${index}`}>{translate("messageCreator.name")}</Label>
                        <Input
                          id={`field-name-${index}`}
                          value={field.name}
                          onChange={(e) => {
                            const newFields = [...embedFields]
                            newFields[index].name = e.target.value
                            setEmbedFields(newFields)
                          }}
                          placeholder={translate("messageCreator.fieldName")}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`field-value-${index}`}>{translate("messageCreator.value")}</Label>
                        <Input
                          id={`field-value-${index}`}
                          value={field.value}
                          onChange={(e) => {
                            const newFields = [...embedFields]
                            newFields[index].value = e.target.value
                            setEmbedFields(newFields)
                          }}
                          placeholder={translate("messageCreator.fieldValue")}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`field-inline-${index}`}
                          checked={field.inline}
                          onChange={(e) => {
                            const newFields = [...embedFields]
                            newFields[index].inline = e.target.checked
                            setEmbedFields(newFields)
                          }}
                        />
                        <Label htmlFor={`field-inline-${index}`}>{translate("messageCreator.inline")}</Label>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" onClick={addField}>
                    <Plus className="h-4 w-4 mr-2" /> {translate("messageCreator.addField")}
                  </Button>
                </TabsContent>
                <TabsContent value="images" className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="embed-image">{translate("messageCreator.imageUrl")}</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="embed-image"
                          value={embedImage}
                          onChange={(e) => setEmbedImage(e.target.value)}
                          placeholder="https://example.com/image.png"
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {embedImage && (
                      <div className="border rounded-md p-2">
                        <img
                          src={embedImage || "/placeholder.svg"}
                          alt="Embed preview"
                          className="max-h-[200px] rounded mx-auto"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="embed-thumbnail">{translate("messageCreator.thumbnailUrl")}</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="embed-thumbnail"
                          placeholder="https://example.com/thumbnail.png"
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="author" className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="author-name">{translate("messageCreator.authorName")}</Label>
                      <Input id="author-name" placeholder={translate("messageCreator.authorName")} />
                    </div>
                    <div>
                      <Label htmlFor="author-icon">{translate("messageCreator.authorIcon")}</Label>
                      <Input id="author-icon" placeholder="https://example.com/icon.png" />
                    </div>
                    <div>
                      <Label htmlFor="author-url">{translate("messageCreator.authorUrl")}</Label>
                      <Input id="author-url" placeholder="https://example.com" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="footer" className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="footer-text">{translate("messageCreator.footerText")}</Label>
                      <Input id="footer-text" placeholder={translate("messageCreator.footerText")} />
                    </div>
                    <div>
                      <Label htmlFor="footer-icon">{translate("messageCreator.footerIcon")}</Label>
                      <Input id="footer-icon" placeholder="https://example.com/icon.png" />
                    </div>
                    <div>
                      <Label htmlFor="timestamp">{translate("messageCreator.timestamp")}</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="current">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={translate("messageCreator.selectTimestamp")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">{translate("messageCreator.currentTime")}</SelectItem>
                            <SelectItem value="custom">{translate("messageCreator.customTime")}</SelectItem>
                            <SelectItem value="none">{translate("messageCreator.noTimestamp")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog open={showComponentDialog} onOpenChange={setShowComponentDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" /> {translate("messageCreator.addComponent")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{translate("messageCreator.addButton")}</DialogTitle>
                    <DialogDescription>{translate("messageCreator.buttonDescription")}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="button-label">{translate("advancedFeatures.buttonLabel")}</Label>
                      <Input
                        id="button-label"
                        value={newButton.label}
                        onChange={(e) => setNewButton({ ...newButton, label: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="button-emoji">{translate("advancedFeatures.buttonEmoji")}</Label>
                      <Input
                        id="button-emoji"
                        value={newButton.emoji}
                        onChange={(e) => setNewButton({ ...newButton, emoji: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="button-style">{translate("advancedFeatures.buttonStyle")}</Label>
                      <Select
                        value={newButton.style}
                        onValueChange={(value) => setNewButton({ ...newButton, style: value })}
                      >
                        <SelectTrigger id="button-style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="danger">Danger</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="button-url">{translate("advancedFeatures.buttonUrl")}</Label>
                      <Input
                        id="button-url"
                        value={newButton.url}
                        onChange={(e) => setNewButton({ ...newButton, url: e.target.value })}
                        disabled={newButton.style !== "link"}
                      />
                      <p className="text-xs text-muted-foreground">{translate("advancedFeatures.buttonUrlNote")}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="button-disabled"
                        checked={newButton.disabled}
                        onCheckedChange={(checked) => setNewButton({ ...newButton, disabled: !!checked })}
                      />
                      <Label htmlFor="button-disabled">{translate("advancedFeatures.buttonDisabled")}</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addButton}>{translate("messageCreator.addButton")}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => {
                  setSendResult({
                    success: true,
                    message: translate("messageCreator.previewUpdated"),
                  })
                  setTimeout(() => setSendResult(null), 1500)
                }}
              >
                <Save className="mr-2 h-4 w-4" /> {translate("messageCreator.updatePreview")}
              </Button>
            </CardFooter>
          </Card>

          {components.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{translate("messageCreator.components")}</CardTitle>
                <CardDescription>{translate("messageCreator.componentsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {components.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={
                            component.components[0].style === 1
                              ? "default"
                              : component.components[0].style === 2
                                ? "secondary"
                                : component.components[0].style === 3
                                  ? "outline"
                                  : component.components[0].style === 4
                                    ? "destructive"
                                    : "link"
                          }
                          disabled={component.components[0].disabled}
                        >
                          {component.components[0].emoji && (
                            <span className="mr-1">{component.components[0].emoji.name}</span>
                          )}
                          {component.components[0].label}
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {component.components[0].url ? `URL: ${component.components[0].url}` : ""}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeComponent(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{translate("messageCreator.messagePreview")}</CardTitle>
                <CardDescription>{translate("messageCreator.previewDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-[#36393f] text-white rounded-md p-4 max-w-md mx-auto">
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Webhook Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">Webhook Bot</div>
                      <div className="text-xs text-gray-400">Today at {new Date().toLocaleTimeString()}</div>
                    </div>
                  </div>

                  {messageContent && <div className="mb-2 whitespace-pre-wrap">{messageContent}</div>}

                  <div className="border-l-4 rounded-sm pl-3 mt-2 mb-4" style={{ borderColor: embedColor }}>
                    <div className="font-semibold">{embedTitle}</div>
                    <div className="text-sm mt-1">{embedDescription}</div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {embedFields.map((field, index) => (
                        <div key={index} className={field.inline ? "" : "col-span-2"}>
                          <div className="font-semibold text-xs">{field.name}</div>
                          <div className="text-xs">{field.value}</div>
                        </div>
                      ))}
                    </div>

                    {embedImage && (
                      <div className="mt-3">
                        <img
                          src={embedImage || "/placeholder.svg"}
                          alt="Embed"
                          className="max-w-full rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {components.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {components.map((component, index) => (
                        <div key={index} className="flex gap-2">
                          {component.components.map((button, buttonIndex) => (
                            <button
                              key={buttonIndex}
                              className={`px-4 py-2 rounded text-sm font-medium ${
                                button.style === 1
                                  ? "bg-blue-500 text-white"
                                  : button.style === 2
                                    ? "bg-gray-500 text-white"
                                    : button.style === 3
                                      ? "bg-green-500 text-white"
                                      : button.style === 4
                                        ? "bg-red-500 text-white"
                                        : "bg-transparent text-blue-500 underline"
                              } ${button.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                              disabled={button.disabled}
                            >
                              {button.emoji && <span className="mr-1">{button.emoji.name}</span>}
                              {button.label}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{translate("messageCreator.sendOptions")}</CardTitle>
                <CardDescription>{translate("messageCreator.sendOptionsDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template-select">{translate("messageCreator.selectTemplate")}</Label>
                  <div className="flex gap-2 mt-1">
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate} className="flex-1">
                      <SelectTrigger>
                        <SelectValue placeholder={translate("messageCreator.selectTemplate")} />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.name}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={applyTemplate} disabled={!selectedTemplate}>
                      {translate("messageCreator.applyTemplate")}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="webhook-select">{translate("messageCreator.selectWebhook")}</Label>
                  <Select value={selectedWebhook} onValueChange={setSelectedWebhook}>
                    <SelectTrigger>
                      <SelectValue placeholder={translate("messageCreator.selectWebhook")} />
                    </SelectTrigger>
                    <SelectContent>
                      {webhooks
                        .filter((w) => w.active)
                        .map((webhook) => (
                          <SelectItem key={webhook.id} value={webhook.name}>
                            {webhook.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="send-time">{translate("messageCreator.sendTime")}</Label>
                  <Select value={sendTime} onValueChange={setSendTime}>
                    <SelectTrigger>
                      <SelectValue placeholder={translate("messageCreator.selectTime")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">{translate("messageCreator.sendImmediately")}</SelectItem>
                      <SelectItem value="schedule">{translate("messageCreator.scheduleForLater")}</SelectItem>
                      <SelectItem value="recurring">{translate("messageCreator.setupRecurring")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {sendTime === "schedule" && (
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="scheduled-date">{translate("messageCreator.date")}</Label>
                        <Input
                          id="scheduled-date"
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scheduled-time">{translate("messageCreator.time")}</Label>
                        <Input
                          id="scheduled-time"
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is-recurring"
                        checked={isRecurring}
                        onCheckedChange={(checked) => setIsRecurring(checked === true)}
                      />
                      <Label htmlFor="is-recurring">{translate("messageCreator.recurringMessage")}</Label>
                    </div>

                    {isRecurring && (
                      <div className="space-y-2">
                        <Label htmlFor="recurring-pattern">{translate("messageCreator.repeat")}</Label>
                        <Select value={recurringPattern} onValueChange={setRecurringPattern}>
                          <SelectTrigger>
                            <SelectValue placeholder={translate("messageCreator.selectPattern")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">{translate("messageCreator.daily")}</SelectItem>
                            <SelectItem value="weekly">{translate("messageCreator.weekly")}</SelectItem>
                            <SelectItem value="monthly">{translate("messageCreator.monthly")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}

                <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <AlertDescription>{translate("messageCreator.webhookHelp")}</AlertDescription>
                </Alert>

                <div className="flex justify-end">
                  <Button onClick={sendMessage} disabled={isSending}>
                    {isSending ? (
                      <>{translate("messageCreator.sending")}</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> {translate("messageCreator.sendMessage")}
                      </>
                    )}
                  </Button>
                  {sendResult && (
                    <div
                      className={`mt-2 p-2 rounded text-sm ${sendResult.success ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                    >
                      {sendResult.message}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowRight, Copy, MessageSquare, Repeat, Trash2, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { translate } from "@/lib/language-service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMessageHistory, deleteMessageFromHistory } from "@/lib/webhook-service"
import { format } from "date-fns"

export function AdvancedFeatures() {
  const [roleId, setRoleId] = useState("")
  const [userId, setUserId] = useState("")
  const [buttonLabel, setButtonLabel] = useState("Click me!")
  const [buttonUrl, setButtonUrl] = useState("https://discord.com")
  const [buttonStyle, setButtonStyle] = useState("primary")
  const [buttonEmoji, setButtonEmoji] = useState("👍")
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [messageHistory, setMessageHistory] = useState([])

  useEffect(() => {
    // Load message history
    const history = getMessageHistory()
    setMessageHistory(history)
  }, [])

  const copyMention = (type, id) => {
    if (!id && type !== "everyone" && type !== "here") return

    let mention = ""
    if (type === "role") {
      mention = `<@&${id}>`
    } else if (type === "user") {
      mention = `<@${id}>`
    } else {
      mention = `@${type}`
    }

    navigator.clipboard.writeText(mention)
    alert(`Copied: ${mention}`)
  }

  const generateButtonJson = () => {
    const button = {
      type: 2, // Button type
      style: getButtonStyleNumber(buttonStyle),
      label: buttonLabel,
      emoji: buttonEmoji ? { name: buttonEmoji } : undefined,
      url: buttonStyle === "link" ? buttonUrl : undefined,
      disabled: buttonDisabled,
    }

    return button
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

  const copyButtonJson = () => {
    const button = generateButtonJson()
    const actionRow = {
      type: 1, // Action Row type
      components: [button],
    }

    navigator.clipboard.writeText(JSON.stringify(actionRow, null, 2))
    alert("Button JSON copied to clipboard! You can use this in your webhook message.")
  }

  const deleteHistoryItem = (id) => {
    deleteMessageFromHistory(id)
    setMessageHistory(messageHistory.filter((item) => item.id !== id))
  }

  const reuseMessage = (message) => {
    // In a real app, this would populate the message creator with the message content
    alert("This would open the message creator with this message content pre-filled.")
  }

  const editMessage = (message) => {
    // In a real app, this would open the message in the editor
    alert("This would open the message in the editor.")
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translate("advancedFeatures.title")}</h1>
          <p className="text-muted-foreground">{translate("advancedFeatures.subtitle")}</p>
        </div>
      </div>

      <Tabs defaultValue="components">
        <TabsList className="mb-4">
          <TabsTrigger value="components">{translate("advancedFeatures.components")}</TabsTrigger>
          <TabsTrigger value="mentions">{translate("advancedFeatures.mentions")}</TabsTrigger>
          <TabsTrigger value="history">{translate("advancedFeatures.messageHistory")}</TabsTrigger>
        </TabsList>

        <TabsContent value="components">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{translate("advancedFeatures.interactiveComponents")}</CardTitle>
                <CardDescription>{translate("advancedFeatures.componentsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="buttons">
                    <AccordionTrigger>{translate("advancedFeatures.buttons")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 p-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{translate("advancedFeatures.note")}</AlertTitle>
                          <AlertDescription>{translate("advancedFeatures.buttonNote")}</AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-4 gap-2">
                          <div className="border rounded-md p-2 flex flex-col items-center">
                            <Button size="sm" className="mb-2 w-full">
                              {buttonEmoji && <span className="mr-1">{buttonEmoji}</span>}
                              {buttonLabel}
                            </Button>
                            <span className="text-xs text-muted-foreground">Primary</span>
                          </div>
                          <div className="border rounded-md p-2 flex flex-col items-center">
                            <Button size="sm" variant="secondary" className="mb-2 w-full">
                              {buttonEmoji && <span className="mr-1">{buttonEmoji}</span>}
                              {buttonLabel}
                            </Button>
                            <span className="text-xs text-muted-foreground">Secondary</span>
                          </div>
                          <div className="border rounded-md p-2 flex flex-col items-center">
                            <Button size="sm" variant="destructive" className="mb-2 w-full">
                              {buttonEmoji && <span className="mr-1">{buttonEmoji}</span>}
                              {buttonLabel}
                            </Button>
                            <span className="text-xs text-muted-foreground">Danger</span>
                          </div>
                          <div className="border rounded-md p-2 flex flex-col items-center">
                            <Button size="sm" variant="link" className="mb-2 w-full">
                              {buttonEmoji && <span className="mr-1">{buttonEmoji}</span>}
                              {buttonLabel}
                            </Button>
                            <span className="text-xs text-muted-foreground">Link</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="button-label">{translate("advancedFeatures.buttonLabel")}</Label>
                          <Input
                            id="button-label"
                            placeholder="Click me!"
                            value={buttonLabel}
                            onChange={(e) => setButtonLabel(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="button-emoji">{translate("advancedFeatures.buttonEmoji")}</Label>
                          <Input
                            id="button-emoji"
                            placeholder="👍"
                            value={buttonEmoji}
                            onChange={(e) => setButtonEmoji(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="button-url">{translate("advancedFeatures.buttonUrl")}</Label>
                          <Input
                            id="button-url"
                            placeholder="https://example.com"
                            value={buttonUrl}
                            onChange={(e) => setButtonUrl(e.target.value)}
                            disabled={buttonStyle !== "link"}
                          />
                          <p className="text-xs text-muted-foreground">{translate("advancedFeatures.buttonUrlNote")}</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="button-style">{translate("advancedFeatures.buttonStyle")}</Label>
                          <Select value={buttonStyle} onValueChange={setButtonStyle}>
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

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="button-disabled"
                            checked={buttonDisabled}
                            onChange={(e) => setButtonDisabled(e.target.checked)}
                          />
                          <Label htmlFor="button-disabled">{translate("advancedFeatures.buttonDisabled")}</Label>
                        </div>

                        <Button onClick={copyButtonJson}>
                          <Copy className="mr-2 h-4 w-4" /> {translate("advancedFeatures.copyButtonJson")}
                        </Button>

                        <Separator />

                        <div className="space-y-2">
                          <Label>{translate("advancedFeatures.howToUse")}</Label>
                          <ol className="list-decimal list-inside space-y-1 text-sm">
                            <li>{translate("advancedFeatures.step1")}</li>
                            <li>{translate("advancedFeatures.step2")}</li>
                            <li>{translate("advancedFeatures.step3")}</li>
                          </ol>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="select-menus">
                    <AccordionTrigger>{translate("advancedFeatures.selectMenus")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="p-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{translate("advancedFeatures.note")}</AlertTitle>
                          <AlertDescription>{translate("advancedFeatures.selectMenuNote")}</AlertDescription>
                        </Alert>

                        <div className="mt-4 text-center">
                          <p className="text-muted-foreground mb-4">{translate("advancedFeatures.selectMenuHelp")}</p>
                          <Button variant="outline" asChild>
                            <a
                              href="https://discord.com/developers/docs/interactions/message-components#select-menus"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ArrowRight className="mr-2 h-4 w-4" /> {translate("advancedFeatures.learnMore")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="modals">
                    <AccordionTrigger>{translate("advancedFeatures.modalForms")}</AccordionTrigger>
                    <AccordionContent>
                      <div className="p-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{translate("advancedFeatures.note")}</AlertTitle>
                          <AlertDescription>{translate("advancedFeatures.modalNote")}</AlertDescription>
                        </Alert>

                        <div className="mt-4 text-center">
                          <p className="text-muted-foreground mb-4">{translate("advancedFeatures.modalHelp")}</p>
                          <Button variant="outline" asChild>
                            <a
                              href="https://discord.com/developers/docs/interactions/message-components#text-inputs"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ArrowRight className="mr-2 h-4 w-4" /> {translate("advancedFeatures.learnMore")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mentions">
          <Card>
            <CardHeader>
              <CardTitle>{translate("advancedFeatures.mentionSupport")}</CardTitle>
              <CardDescription>{translate("advancedFeatures.mentionDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">{translate("advancedFeatures.globalMentions")}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <AtMention>@everyone</AtMention>
                        <span>{translate("advancedFeatures.mentionEveryone")}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyMention("everyone", "")}>
                        <Copy className="h-4 w-4 mr-2" /> {translate("advancedFeatures.copy")}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <AtMention>@here</AtMention>
                        <span>{translate("advancedFeatures.mentionHere")}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyMention("here", "")}>
                        <Copy className="h-4 w-4 mr-2" /> {translate("advancedFeatures.copy")}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">{translate("advancedFeatures.roleUserMentions")}</h3>
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{translate("advancedFeatures.note")}</AlertTitle>
                    <AlertDescription>{translate("advancedFeatures.mentionNote")}</AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-id">{translate("advancedFeatures.roleId")}</Label>
                      <div className="flex gap-2">
                        <Input
                          id="role-id"
                          placeholder="123456789012345678"
                          value={roleId}
                          onChange={(e) => setRoleId(e.target.value)}
                        />
                        <Button onClick={() => copyMention("role", roleId)}>
                          <Copy className="h-4 w-4 mr-2" /> {translate("advancedFeatures.copyMention")}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-id">{translate("advancedFeatures.userId")}</Label>
                      <div className="flex gap-2">
                        <Input
                          id="user-id"
                          placeholder="123456789012345678"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                        />
                        <Button onClick={() => copyMention("user", userId)}>
                          <Copy className="h-4 w-4 mr-2" /> {translate("advancedFeatures.copyMention")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>{translate("advancedFeatures.messageHistory")}</CardTitle>
              <CardDescription>{translate("advancedFeatures.historyDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messageHistory.length > 0 ? (
                  messageHistory.map((message) => (
                    <div key={message.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-medium">{message.title}</h3>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(message.timestamp), "PPpp")}
                        </div>
                      </div>
                      <div className={`border-l-4 border-${message.color}-500 pl-3 py-2 mb-3`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => reuseMessage(message)}>
                          <Repeat className="h-4 w-4 mr-2" /> {translate("advancedFeatures.reuse")}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => editMessage(message)}>
                          <FileEdit className="h-4 w-4 mr-2" /> {translate("advancedFeatures.edit")}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteHistoryItem(message.id)}>
                          <Trash2 className="h-4 w-4 mr-2" /> {translate("advancedFeatures.delete")}
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">{translate("advancedFeatures.noHistory")}</h3>
                    <p className="text-muted-foreground mb-4">{translate("advancedFeatures.noHistoryDescription")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AtMention({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-1 py-0.5 rounded font-medium">
      {children}
    </span>
  )
}


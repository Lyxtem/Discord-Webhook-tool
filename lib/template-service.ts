// This service handles message templates

export interface MessageTemplate {
  id: number
  name: string
  description: string
  lastUsed: string
  content?: string
  embeds?: any[]
}

export function getTemplateStorage(): MessageTemplate[] {
  // In a real app, this would get templates from localStorage or a database
  const stored = localStorage.getItem("discord-templates")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error("Failed to parse stored templates", e)
    }
  }

  // Return empty array instead of default templates
  return []
}

export function saveTemplateStorage(templates: MessageTemplate[]): void {
  // In a real app, this would save templates to localStorage or a database
  localStorage.setItem("discord-templates", JSON.stringify(templates))
}

export function createTemplate(template: Partial<MessageTemplate>): MessageTemplate {
  const templates = getTemplateStorage()

  const newTemplate: MessageTemplate = {
    id: templates.length > 0 ? Math.max(...templates.map((t) => t.id)) + 1 : 1,
    name: template.name || "New Template",
    description: template.description || "",
    lastUsed: "Never",
    content: template.content || "",
    embeds: template.embeds || [],
  }

  const newTemplates = [...templates, newTemplate]
  saveTemplateStorage(newTemplates)

  return newTemplate
}

export function updateTemplate(id: number, template: Partial<MessageTemplate>): void {
  const templates = getTemplateStorage()
  const newTemplates = templates.map((t) => (t.id === id ? { ...t, ...template } : t))

  saveTemplateStorage(newTemplates)
}

export function deleteTemplate(id: number): void {
  const templates = getTemplateStorage()
  const newTemplates = templates.filter((t) => t.id !== id)

  saveTemplateStorage(newTemplates)
}


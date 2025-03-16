// Language service for internationalization

export type Language = "en" | "es"

export interface Translations {
  [key: string]: {
    en: string
    es: string
  }
}

// All translations used in the application
export const translations: Translations = {
  // Common
  "app.title": {
    en: "Discord Webhooks",
    es: "Webhooks de Discord",
  },
  "app.theme.light": {
    en: "Light",
    es: "Claro",
  },
  "app.theme.dark": {
    en: "Dark",
    es: "Oscuro",
  },
  "app.theme.system": {
    en: "System",
    es: "Sistema",
  },
  "app.language": {
    en: "Language",
    es: "Idioma",
  },
  "app.support": {
    en: "Support",
    es: "Soporte",
  },

  // Navigation
  "nav.dashboard": {
    en: "Dashboard",
    es: "Panel",
  },
  "nav.messageCreator": {
    en: "Message Creator",
    es: "Creador de Mensajes",
  },
  "nav.webhookSettings": {
    en: "Webhook Settings",
    es: "Configuración de Webhooks",
  },
  "nav.advancedFeatures": {
    en: "Advanced Features",
    es: "Funciones Avanzadas",
  },

  // Dashboard
  "dashboard.title": {
    en: "Dashboard",
    es: "Panel de Control",
  },
  "dashboard.subtitle": {
    en: "Manage your Discord webhooks",
    es: "Administra tus webhooks de Discord",
  },
  "dashboard.connected": {
    en: "Connected to Discord API",
    es: "Conectado a la API de Discord",
  },
  "dashboard.disconnected": {
    en: "Disconnected",
    es: "Desconectado",
  },
  "dashboard.newWebhook": {
    en: "New Webhook",
    es: "Nuevo Webhook",
  },
  "dashboard.totalWebhooks": {
    en: "Total Webhooks",
    es: "Total de Webhooks",
  },
  "dashboard.messagesSent": {
    en: "Messages Sent",
    es: "Mensajes Enviados",
  },
  "dashboard.successRate": {
    en: "Success Rate",
    es: "Tasa de Éxito",
  },
  "dashboard.failedMessages": {
    en: "Failed Messages",
    es: "Mensajes Fallidos",
  },
  "dashboard.allWebhooks": {
    en: "All Webhooks",
    es: "Todos los Webhooks",
  },
  "dashboard.recentlyUsed": {
    en: "Recently Used",
    es: "Usados Recientemente",
  },
  "dashboard.favorites": {
    en: "Favorites",
    es: "Favoritos",
  },
  "dashboard.scheduled": {
    en: "Scheduled",
    es: "Programados",
  },
  "dashboard.active": {
    en: "Active",
    es: "Activo",
  },
  "dashboard.noFavorites": {
    en: "You haven't added any webhooks to favorites yet.",
    es: "Aún no has añadido ningún webhook a favoritos.",
  },

  // Message Creator
  "messageCreator.title": {
    en: "Message Creator",
    es: "Creador de Mensajes",
  },
  "messageCreator.subtitle": {
    en: "Create and customize Discord webhook messages",
    es: "Crea y personaliza mensajes para webhooks de Discord",
  },
  "messageCreator.saveTemplate": {
    en: "Save Template",
    es: "Guardar Plantilla",
  },
  "messageCreator.sendMessage": {
    en: "Send Message",
    es: "Enviar Mensaje",
  },
  "messageCreator.messageContent": {
    en: "Message Content",
    es: "Contenido del Mensaje",
  },
  "messageCreator.textContent": {
    en: "Text Content",
    es: "Contenido de Texto",
  },
  "messageCreator.embedEditor": {
    en: "Embed Editor",
    es: "Editor de Embeds",
  },
  "messageCreator.embedEditorSubtitle": {
    en: "Create rich embeds for your message",
    es: "Crea embeds enriquecidos para tu mensaje",
  },
  "messageCreator.clear": {
    en: "Clear",
    es: "Limpiar",
  },
  "messageCreator.addEmbed": {
    en: "Add Embed",
    es: "Añadir Embed",
  },
  "messageCreator.general": {
    en: "General",
    es: "General",
  },
  "messageCreator.fields": {
    en: "Fields",
    es: "Campos",
  },
  "messageCreator.images": {
    en: "Images",
    es: "Imágenes",
  },
  "messageCreator.author": {
    en: "Author",
    es: "Autor",
  },
  "messageCreator.footer": {
    en: "Footer",
    es: "Pie",
  },
  "messageCreator.embedColor": {
    en: "Embed Color",
    es: "Color del Embed",
  },
  "messageCreator.title": {
    en: "Title",
    es: "Título",
  },
  "messageCreator.description": {
    en: "Description",
    es: "Descripción",
  },
  "messageCreator.addField": {
    en: "Add Field",
    es: "Añadir Campo",
  },
  "messageCreator.field": {
    en: "Field",
    es: "Campo",
  },
  "messageCreator.name": {
    en: "Name",
    es: "Nombre",
  },
  "messageCreator.value": {
    en: "Value",
    es: "Valor",
  },
  "messageCreator.inline": {
    en: "Inline",
    es: "En línea",
  },
  "messageCreator.imageUrl": {
    en: "Image URL",
    es: "URL de Imagen",
  },
  "messageCreator.thumbnailUrl": {
    en: "Thumbnail URL",
    es: "URL de Miniatura",
  },
  "messageCreator.authorName": {
    en: "Author Name",
    es: "Nombre del Autor",
  },
  "messageCreator.authorIcon": {
    en: "Author Icon URL",
    es: "URL del Icono del Autor",
  },
  "messageCreator.authorUrl": {
    en: "Author URL",
    es: "URL del Autor",
  },
  "messageCreator.footerText": {
    en: "Footer Text",
    es: "Texto del Pie",
  },
  "messageCreator.footerIcon": {
    en: "Footer Icon URL",
    es: "URL del Icono del Pie",
  },
  "messageCreator.timestamp": {
    en: "Timestamp",
    es: "Marca de Tiempo",
  },
  "messageCreator.currentTime": {
    en: "Current time",
    es: "Hora actual",
  },
  "messageCreator.customTime": {
    en: "Custom time",
    es: "Hora personalizada",
  },
  "messageCreator.noTimestamp": {
    en: "No timestamp",
    es: "Sin marca de tiempo",
  },
  "messageCreator.addComponent": {
    en: "Add Component",
    es: "Añadir Componente",
  },
  "messageCreator.updatePreview": {
    en: "Update Preview",
    es: "Actualizar Vista Previa",
  },
  "messageCreator.messagePreview": {
    en: "Message Preview",
    es: "Vista Previa del Mensaje",
  },
  "messageCreator.previewDescription": {
    en: "Preview how your message will appear in Discord",
    es: "Vista previa de cómo aparecerá tu mensaje en Discord",
  },
  "messageCreator.sendOptions": {
    en: "Send Options",
    es: "Opciones de Envío",
  },
  "messageCreator.sendOptionsDescription": {
    en: "Configure when and how to send your message",
    es: "Configura cuándo y cómo enviar tu mensaje",
  },
  "messageCreator.selectWebhook": {
    en: "Select Webhook",
    es: "Seleccionar Webhook",
  },
  "messageCreator.sendTime": {
    en: "Send Time",
    es: "Hora de Envío",
  },
  "messageCreator.sendImmediately": {
    en: "Send immediately",
    es: "Enviar inmediatamente",
  },
  "messageCreator.scheduleForLater": {
    en: "Schedule for later",
    es: "Programar para más tarde",
  },
  "messageCreator.setupRecurring": {
    en: "Set up recurring",
    es: "Configurar recurrente",
  },
  "messageCreator.date": {
    en: "Date",
    es: "Fecha",
  },
  "messageCreator.time": {
    en: "Time",
    es: "Hora",
  },
  "messageCreator.recurringMessage": {
    en: "Recurring message",
    es: "Mensaje recurrente",
  },
  "messageCreator.repeat": {
    en: "Repeat",
    es: "Repetir",
  },
  "messageCreator.daily": {
    en: "Daily",
    es: "Diariamente",
  },
  "messageCreator.weekly": {
    en: "Weekly",
    es: "Semanalmente",
  },
  "messageCreator.monthly": {
    en: "Monthly",
    es: "Mensualmente",
  },
  "messageCreator.sending": {
    en: "Sending...",
    es: "Enviando...",
  },
  "messageCreator.webhookHelp": {
    en: "Make sure your webhook URL is correct and the webhook is active in your Discord server.",
    es: "Asegúrate de que la URL del webhook sea correcta y que el webhook esté activo en tu servidor de Discord.",
  },
  "messageCreator.webhookNotFound": {
    en: "Webhook not found",
    es: "Webhook no encontrado",
  },
  "messageCreator.messageSentSuccess": {
    en: "Message sent successfully!",
    es: "¡Mensaje enviado con éxito!",
  },
  "messageCreator.failedToSend": {
    en: "Failed to send message",
    es: "Error al enviar el mensaje",
  },
  "messageCreator.error": {
    en: "Error",
    es: "Error",
  },
  "messageCreator.selectDateTime": {
    en: "Please select a date and time for scheduling",
    es: "Por favor, selecciona una fecha y hora para programar",
  },
  "messageCreator.futureDateRequired": {
    en: "Scheduled time must be in the future",
    es: "La hora programada debe estar en el futuro",
  },
  "messageCreator.scheduledFor": {
    en: "Message scheduled for",
    es: "Mensaje programado para",
  },
  "messageCreator.titleRequired": {
    en: "Please add a title for your template",
    es: "Por favor, añade un título para tu plantilla",
  },
  "messageCreator.templateSaved": {
    en: "Template saved successfully!",
    es: "¡Plantilla guardada con éxito!",
  },
  "messageCreator.createContent": {
    en: "Create the content of your message",
    es: "Crea el contenido de tu mensaje",
  },
  "messageCreator.enterContent": {
    en: "Enter your message content here...",
    es: "Introduce el contenido de tu mensaje aquí...",
  },
  "messageCreator.enterTitle": {
    en: "Enter embed title...",
    es: "Introduce el título del embed...",
  },
  "messageCreator.enterDescription": {
    en: "Enter embed description...",
    es: "Introduce la descripción del embed...",
  },
  "messageCreator.fieldName": {
    en: "Field name",
    es: "Nombre del campo",
  },
  "messageCreator.fieldValue": {
    en: "Field value",
    es: "Valor del campo",
  },
  "messageCreator.selectTimestamp": {
    en: "Select timestamp",
    es: "Seleccionar marca de tiempo",
  },
  "messageCreator.componentAlert": {
    en: "Adding a component to your message. This would add buttons or other interactive elements in a real Discord webhook.",
    es: "Añadiendo un componente a tu mensaje. Esto añadiría botones u otros elementos interactivos en un webhook real de Discord.",
  },
  "messageCreator.previewUpdated": {
    en: "Preview updated!",
    es: "¡Vista previa actualizada!",
  },
  "messageCreator.selectPattern": {
    en: "Select pattern",
    es: "Seleccionar patrón",
  },
  "messageCreator.addButton": {
    en: "Add Button",
    es: "Añadir Botón",
  },
  "messageCreator.buttonDescription": {
    en: "Configure a button to add to your message",
    es: "Configura un botón para añadir a tu mensaje",
  },
  "messageCreator.components": {
    en: "Components",
    es: "Componentes",
  },
  "messageCreator.componentsDescription": {
    en: "Interactive components added to your message",
    es: "Componentes interactivos añadidos a tu mensaje",
  },
  "messageCreator.selectTemplate": {
    en: "Select Template",
    es: "Seleccionar Plantilla",
  },
  "messageCreator.applyTemplate": {
    en: "Apply",
    es: "Aplicar",
  },
  "messageCreator.templateApplied": {
    en: "Template applied successfully!",
    es: "¡Plantilla aplicada con éxito!",
  },

  // Webhook Settings
  "webhookSettings.title": {
    en: "Webhook Settings",
    es: "Configuración de Webhooks",
  },
  "webhookSettings.subtitle": {
    en: "Manage your Discord webhooks and message templates",
    es: "Administra tus webhooks de Discord y plantillas de mensajes",
  },
  "webhookSettings.webhooks": {
    en: "Webhooks",
    es: "Webhooks",
  },
  "webhookSettings.templates": {
    en: "Templates",
    es: "Plantillas",
  },
  "webhookSettings.scheduled": {
    en: "Scheduled Messages",
    es: "Mensajes Programados",
  },
  "webhookSettings.yourWebhooks": {
    en: "Your Webhooks",
    es: "Tus Webhooks",
  },
  "webhookSettings.manageWebhooks": {
    en: "Manage your Discord webhook connections",
    es: "Administra tus conexiones de webhook de Discord",
  },
  "webhookSettings.addWebhook": {
    en: "Add Webhook",
    es: "Añadir Webhook",
  },
  "webhookSettings.connectWebhook": {
    en: "Connect a new Discord webhook",
    es: "Conecta un nuevo webhook de Discord",
  },
  "webhookSettings.webhookUrl": {
    en: "Webhook URL",
    es: "URL del Webhook",
  },
  "webhookSettings.webhookUrlHelp": {
    en: "Find this in Discord: Channel Settings > Integrations > Webhooks",
    es: "Encuéntralo en Discord: Configuración del Canal > Integraciones > Webhooks",
  },
  "webhookSettings.displayName": {
    en: "Display Name",
    es: "Nombre para Mostrar",
  },
  "webhookSettings.avatarUrl": {
    en: "Avatar URL (optional)",
    es: "URL del Avatar (opcional)",
  },
  "webhookSettings.active": {
    en: "Active",
    es: "Activo",
  },
  "webhookSettings.saveWebhook": {
    en: "Save Webhook",
    es: "Guardar Webhook",
  },
  "webhookSettings.messageTemplates": {
    en: "Message Templates",
    es: "Plantillas de Mensajes",
  },
  "webhookSettings.reuseFormats": {
    en: "Reuse message formats for quick sending",
    es: "Reutiliza formatos de mensajes para envío rápido",
  },
  "webhookSettings.createTemplate": {
    en: "Create Template",
    es: "Crear Plantilla",
  },
  "webhookSettings.saveMessageFormat": {
    en: "Save a message format for reuse",
    es: "Guarda un formato de mensaje para reutilizar",
  },
  "webhookSettings.templateName": {
    en: "Template Name",
    es: "Nombre de la Plantilla",
  },
  "webhookSettings.templateDescription": {
    en: "Description",
    es: "Descripción",
  },
  "webhookSettings.templateContent": {
    en: "Template Content",
    es: "Contenido de la Plantilla",
  },
  "webhookSettings.templateContentHelp": {
    en: "Create a template in the Message Creator, then save it here.",
    es: "Crea una plantilla en el Creador de Mensajes, luego guárdala aquí.",
  },
  "webhookSettings.goToMessageCreator": {
    en: "Go to Message Creator",
    es: "Ir al Creador de Mensajes",
  },
  "webhookSettings.saveTemplate": {
    en: "Save Template",
    es: "Guardar Plantilla",
  },
  "webhookSettings.scheduledMessages": {
    en: "Scheduled Messages",
    es: "Mensajes Programados",
  },
  "webhookSettings.manageScheduled": {
    en: "View and manage your scheduled webhook messages",
    es: "Ver y administrar tus mensajes de webhook programados",
  },
  "webhookSettings.scheduledStatus": {
    en: "Scheduled",
    es: "Programado",
  },
  "webhookSettings.sentStatus": {
    en: "Sent",
    es: "Enviado",
  },
  "webhookSettings.failedStatus": {
    en: "Failed",
    es: "Fallido",
  },
  "webhookSettings.scheduledFor": {
    en: "Scheduled for",
    es: "Programado para",
  },
  "webhookSettings.recurring": {
    en: "Recurring",
    es: "Recurrente",
  },
  "webhookSettings.edit": {
    en: "Edit",
    es: "Editar",
  },
  "webhookSettings.cancel": {
    en: "Cancel",
    es: "Cancelar",
  },
  "webhookSettings.noScheduledMessages": {
    en: "No scheduled messages",
    es: "No hay mensajes programados",
  },
  "webhookSettings.noScheduledMessagesHelp": {
    en: "You don't have any scheduled messages. Create one in the Message Creator.",
    es: "No tienes ningún mensaje programado. Crea uno en el Creador de Mensajes.",
  },
  "webhookSettings.scheduleMessage": {
    en: "Schedule a Message",
    es: "Programar un Mensaje",
  },

  // Advanced Features
  "advancedFeatures.title": {
    en: "Advanced Features",
    es: "Funciones Avanzadas",
  },
  "advancedFeatures.subtitle": {
    en: "Advanced tools for Discord webhook messages",
    es: "Herramientas avanzadas para mensajes de webhook de Discord",
  },
  "advancedFeatures.variables": {
    en: "Variables",
    es: "Variables",
  },
  "advancedFeatures.components": {
    en: "Components",
    es: "Componentes",
  },
  "advancedFeatures.mentions": {
    en: "Mentions",
    es: "Menciones",
  },
  "advancedFeatures.messageHistory": {
    en: "Message History",
    es: "Historial de Mensajes",
  },
  "advancedFeatures.interactiveComponents": {
    en: "Interactive Components",
    es: "Componentes Interactivos",
  },
  "advancedFeatures.componentsDescription": {
    en: "Add buttons and other interactive elements to your messages",
    es: "Añade botones y otros elementos interactivos a tus mensajes",
  },
  "advancedFeatures.buttons": {
    en: "Buttons",
    es: "Botones",
  },
  "advancedFeatures.note": {
    en: "Note",
    es: "Nota",
  },
  "advancedFeatures.buttonNote": {
    en: "Discord buttons require a JSON format. Use this tool to generate the JSON for your buttons.",
    es: "Los botones de Discord requieren un formato JSON. Usa esta herramienta para generar el JSON para tus botones.",
  },
  "advancedFeatures.buttonLabel": {
    en: "Button Label",
    es: "Etiqueta del Botón",
  },
  "advancedFeatures.buttonEmoji": {
    en: "Button Emoji",
    es: "Emoji del Botón",
  },
  "advancedFeatures.buttonUrl": {
    en: "URL (for link buttons)",
    es: "URL (para botones de enlace)",
  },
  "advancedFeatures.buttonUrlNote": {
    en: "Only used for link-style buttons",
    es: "Solo se usa para botones de estilo enlace",
  },
  "advancedFeatures.buttonStyle": {
    en: "Style",
    es: "Estilo",
  },
  "advancedFeatures.buttonDisabled": {
    en: "Disabled",
    es: "Deshabilitado",
  },
  "advancedFeatures.copyButtonJson": {
    en: "Copy Button JSON",
    es: "Copiar JSON del Botón",
  },
  "advancedFeatures.howToUse": {
    en: "How to use",
    es: "Cómo usar",
  },
  "advancedFeatures.step1": {
    en: "Copy the button JSON",
    es: "Copia el JSON del botón",
  },
  "advancedFeatures.step2": {
    en: 'In the Message Creator, add this JSON to the "components" field of your webhook message',
    es: 'En el Creador de Mensajes, añade este JSON al campo "components" de tu mensaje webhook',
  },
  "advancedFeatures.step3": {
    en: "Send your message with the button included",
    es: "Envía tu mensaje con el botón incluido",
  },
  "advancedFeatures.selectMenus": {
    en: "Select Menus",
    es: "Menús de Selección",
  },
  "advancedFeatures.selectMenuNote": {
    en: "Select menus require a bot to handle interactions",
    es: "Los menús de selección requieren un bot para manejar interacciones",
  },
  "advancedFeatures.selectMenuHelp": {
    en: "Select menus allow users to choose from a list of options",
    es: "Los menús de selección permiten a los usuarios elegir de una lista de opciones",
  },
  "advancedFeatures.learnMore": {
    en: "Learn More",
    es: "Más Información",
  },
  "advancedFeatures.modalForms": {
    en: "Modal Forms",
    es: "Formularios Modales",
  },
  "advancedFeatures.modalNote": {
    en: "Modal forms require a bot to handle interactions",
    es: "Los formularios modales requieren un bot para manejar interacciones",
  },
  "advancedFeatures.modalHelp": {
    en: "Modal forms allow users to input data in a popup dialog",
    es: "Los formularios modales permiten a los usuarios ingresar datos en un diálogo emergente",
  },
  "advancedFeatures.mentionSupport": {
    en: "Mention Support",
    es: "Soporte de Menciones",
  },
  "advancedFeatures.mentionDescription": {
    en: "Add mentions to your messages",
    es: "Añade menciones a tus mensajes",
  },
  "advancedFeatures.globalMentions": {
    en: "Global Mentions",
    es: "Menciones Globales",
  },
  "advancedFeatures.mentionEveryone": {
    en: "Mention everyone in the server",
    es: "Mencionar a todos en el servidor",
  },
  "advancedFeatures.mentionHere": {
    en: "Mention online users in the channel",
    es: "Mencionar a usuarios en línea en el canal",
  },
  "advancedFeatures.copy": {
    en: "Copy",
    es: "Copiar",
  },
  "advancedFeatures.roleUserMentions": {
    en: "Role & User Mentions",
    es: "Menciones de Rol y Usuario",
  },
  "advancedFeatures.mentionNote": {
    en: 'Role and user mentions require their IDs. Right-click a role or user in Discord and select "Copy ID".',
    es: 'Las menciones de rol y usuario requieren sus IDs. Haz clic derecho en un rol o usuario en Discord y selecciona "Copiar ID".',
  },
  "advancedFeatures.roleId": {
    en: "Role ID",
    es: "ID del Rol",
  },
  "advancedFeatures.userId": {
    en: "User ID",
    es: "ID del Usuario",
  },
  "advancedFeatures.copyMention": {
    en: "Copy Mention",
    es: "Copiar Mención",
  },
  "advancedFeatures.historyDescription": {
    en: "View and reuse previously sent messages",
    es: "Ver y reutilizar mensajes enviados anteriormente",
  },
  "advancedFeatures.reuse": {
    en: "Reuse",
    es: "Reutilizar",
  },
  "advancedFeatures.edit": {
    en: "Edit",
    es: "Editar",
  },
  "advancedFeatures.delete": {
    en: "Delete",
    es: "Eliminar",
  },
  "advancedFeatures.noHistory": {
    en: "No message history",
    es: "No hay historial de mensajes",
  },
  "advancedFeatures.noHistoryDescription": {
    en: "Your sent messages will appear here",
    es: "Tus mensajes enviados aparecerán aquí",
  },
}

// Check if we're in a browser environment before accessing localStorage
const isBrowser = typeof window !== "undefined"

// Get the current language from localStorage or default to English
export function getCurrentLanguage(): Language {
  if (!isBrowser) return "en"

  const stored = localStorage.getItem("discord-webhook-language")
  return (stored as Language) || "en"
}

// Save the current language to localStorage
export function saveLanguage(language: Language): void {
  if (!isBrowser) return

  localStorage.setItem("discord-webhook-language", language)
}

// Translate a key to the current language
export function translate(key: string, language: Language = getCurrentLanguage()): string {
  const translation = translations[key]
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`)
    return key
  }
  return translation[language] || translation["en"] || key
}


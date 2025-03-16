"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Code, Copy, FileCode, Globe, Languages, Webhook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Integration() {
  const webhook = {
    id: "YOUR_WEBHOOK_ID",
    token: "YOUR_WEBHOOK_TOKEN",
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const copyUrl = () => {
    copyToClipboard(`https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`)
  }

  const copyJson = () => {
    copyToClipboard(`{
  "content": "Hello, World!",
  "username": "Custom Webhook Name",
  "avatar_url": "https://example.com/avatar.png",
  "embeds": [
    {
      "title": "Embed Title",
      "description": "Embed Description",
      "color": 5814783,
      "fields": [
        {
          "name": "Field Name",
          "value": "Field Value",
          "inline": true
        }
      ]
    }
  ]
}`)
  }

  const copyJavaScript = () => {
    copyToClipboard(`// Using fetch API
const webhookUrl = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

const data = {
  content: "Hello from JavaScript!",
  username: "JS Bot",
  embeds: [{
    title: "Embed Title",
    description: "This is an embed sent from JavaScript",
    color: 5814783,
    fields: [
      {
        name: "Field 1",
        value: "Value 1",
        inline: true
      },
      {
        name: "Field 2",
        value: "Value 2",
        inline: true
      }
    ]
  }]
};

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => {
  if (response.ok) {
    console.log('Message sent successfully');
  } else {
    console.error('Error sending message:', response.statusText);
  }
})
.catch(error => {
  console.error('Error:', error);
});`)
  }

  const copyPython = () => {
    copyToClipboard(`# Using requests library
import requests
import json

webhook_url = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN'

data = {
    "content": "Hello from Python!",
    "username": "Python Bot",
    "embeds": [{
        "title": "Embed Title",
        "description": "This is an embed sent from Python",
        "color": 5814783,
        "fields": [
            {
                "name": "Field 1",
                "value": "Value 1",
                "inline": True
            },
            {
                "name": "Field 2",
                "value": "Value 2",
                "inline": True
            }
        ]
    }]
}

response = requests.post(
    webhook_url,
    data=json.dumps(data),
    headers={'Content-Type': 'application/json'}
)

if response.status_code == 204:
    print('Message sent successfully')
else:
    print(f'Error sending message: {response.status_code}, {response.text}')`)
  }

  const copyCurl = () => {
    copyToClipboard(`curl -X POST \\
-H "Content-Type: application/json" \\
-d '{
  "content": "Hello from cURL!",
  "username": "cURL Bot",
  "embeds": [{
    "title": "Embed Title",
    "description": "This is an embed sent from cURL",
    "color": 5814783
  }]
}' \\
https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN`)
  }

  const copyPhp = () => {
    copyToClipboard(`<?php
// Using cURL in PHP
$webhookUrl = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

$data = [
    'content' => 'Hello from PHP!',
    'username' => 'PHP Bot',
    'embeds' => [
        [
            'title' => 'Embed Title',
            'description' => 'This is an embed sent from PHP',
            'color' => 5814783,
            'fields' => [
                [
                    'name' => 'Field 1',
                    'value' => 'Value 1',
                    'inline' => true
                ],
                [
                    'name' => 'Field 2',
                    'value' => 'Value 2',
                    'inline' => true
                ]
            ]
        ]
    ]
];

$options = [
    CURLOPT_URL => $webhookUrl,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true
];

$curl = curl_init();
curl_setopt_array($curl, $options);
$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($httpCode === 204) {
    echo 'Message sent successfully';
} else {
    echo 'Error sending message: ' . $httpCode . ', ' . $response;
}
?>`)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integration</h1>
          <p className="text-muted-foreground">Integrate Discord webhooks with your applications</p>
        </div>
      </div>

      <Tabs defaultValue="api">
        <TabsList className="mb-4">
          <TabsTrigger value="api">API Documentation</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
          <TabsTrigger value="incoming">Incoming Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Documentation for the Discord webhook API</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    This is a simplified reference. For complete documentation, see the{" "}
                    <a
                      href="https://discord.com/developers/docs/resources/webhook"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord Developer Portal
                    </a>
                    .
                  </AlertDescription>
                </Alert>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="endpoint">
                    <AccordionTrigger>Webhook Endpoint</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-muted rounded-md font-mono text-sm">
                          POST https://discord.com/api/webhooks/{webhook.id}/{webhook.token}
                        </div>
                        <p className="text-sm">
                          This is the base URL for sending messages to a Discord webhook. Replace {"{webhook.id}"} and{" "}
                          {"{webhook.token}"} with your webhook's ID and token.
                        </p>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={copyUrl}>
                            <Copy className="h-4 w-4 mr-2" /> Copy URL
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="request">
                    <AccordionTrigger>Request Format</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          The request body should be a JSON object with the following structure:
                        </p>
                        <div className="p-3 bg-muted rounded-md font-mono text-sm overflow-auto">
                          {`{
  "content": "Hello, World!",
  "username": "Custom Webhook Name",
  "avatar_url": "https://example.com/avatar.png",
  "embeds": [
    {
      "title": "Embed Title",
      "description": "Embed Description",
      "color": 5814783,
      "fields": [
        {
          "name": "Field Name",
          "value": "Field Value",
          "inline": true
        }
      ]
    }
  ]
}`}
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={copyJson}>
                            <Copy className="h-4 w-4 mr-2" /> Copy JSON
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="parameters">
                    <AccordionTrigger>Parameters</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="font-medium">Parameter</div>
                          <div className="font-medium">Type</div>
                          <div className="font-medium">Description</div>

                          <div className="font-mono">content</div>
                          <div>string</div>
                          <div>The message content</div>

                          <div className="font-mono">username</div>
                          <div>string</div>
                          <div>Override the webhook's default name</div>

                          <div className="font-mono">avatar_url</div>
                          <div>string</div>
                          <div>Override the webhook's default avatar</div>

                          <div className="font-mono">embeds</div>
                          <div>array</div>
                          <div>Array of embed objects</div>

                          <div className="font-mono">tts</div>
                          <div>boolean</div>
                          <div>Whether this is a TTS message</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="embeds">
                    <AccordionTrigger>Embed Structure</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Embeds are rich content blocks that can contain formatted text, images, and more.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="font-medium">Field</div>
                          <div className="font-medium">Type</div>
                          <div className="font-medium">Description</div>

                          <div className="font-mono">title</div>
                          <div>string</div>
                          <div>Embed title</div>

                          <div className="font-mono">description</div>
                          <div>string</div>
                          <div>Embed description</div>

                          <div className="font-mono">url</div>
                          <div>string</div>
                          <div>URL for the title</div>

                          <div className="font-mono">color</div>
                          <div>integer</div>
                          <div>Color code (decimal)</div>

                          <div className="font-mono">fields</div>
                          <div>array</div>
                          <div>Array of field objects</div>

                          <div className="font-mono">author</div>
                          <div>object</div>
                          <div>Author information</div>

                          <div className="font-mono">footer</div>
                          <div>object</div>
                          <div>Footer information</div>

                          <div className="font-mono">image</div>
                          <div>object</div>
                          <div>Image information</div>

                          <div className="font-mono">thumbnail</div>
                          <div>object</div>
                          <div>Thumbnail information</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rate-limits">
                    <AccordionTrigger>Rate Limits</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">Discord enforces rate limits on webhook requests to prevent abuse.</p>
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Important</AlertTitle>
                          <AlertDescription>
                            Webhooks are limited to 5 requests per second per webhook. Exceeding this limit will result
                            in a 429 Too Many Requests response.
                          </AlertDescription>
                        </Alert>
                        <p className="text-sm">
                          When you receive a 429 response, the response will include a Retry-After header indicating how
                          long to wait before retrying.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Examples for sending webhook messages in different languages</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript">
                  <TabsList className="mb-4">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="php">PHP</TabsTrigger>
                  </TabsList>

                  <TabsContent value="javascript" className="space-y-4">
                    <div className="p-4 bg-muted rounded-md font-mono text-sm overflow-auto">
                      {`// Using fetch API
const webhookUrl = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

const data = {
  content: "Hello from JavaScript!",
  username: "JS Bot",
  embeds: [{
    title: "Embed Title",
    description: "This is an embed sent from JavaScript",
    color: 5814783,
    fields: [
      {
        name: "Field 1",
        value: "Value 1",
        inline: true
      },
      {
        name: "Field 2",
        value: "Value 2",
        inline: true
      }
    ]
  }]
};

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => {
  if (response.ok) {
    console.log('Message sent successfully');
  } else {
    console.error('Error sending message:', response.statusText);
  }
})
.catch(error => {
  console.error('Error:', error);
});`}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={copyJavaScript}>
                        <Copy className="h-4 w-4 mr-2" /> Copy Code
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="python" className="space-y-4">
                    <div className="p-4 bg-muted rounded-md font-mono text-sm overflow-auto">
                      {`# Using requests library
import requests
import json

webhook_url = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN'

data = {
    "content": "Hello from Python!",
    "username": "Python Bot",
    "embeds": [{
        "title": "Embed Title",
        "description": "This is an embed sent from Python",
        "color": 5814783,
        "fields": [
            {
                "name": "Field 1",
                "value": "Value 1",
                "inline": True
            },
            {
                "name": "Field 2",
                "value": "Value 2",
                "inline": True
            }
        ]
    }]
}

response = requests.post(
    webhook_url,
    data=json.dumps(data),
    headers={'Content-Type': 'application/json'}
)

if response.status_code == 204:
    print('Message sent successfully')
else:
    print(f'Error sending message: {response.status_code}, {response.text}')`}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={copyPython}>
                        <Copy className="h-4 w-4 mr-2" /> Copy Code
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="curl" className="space-y-4">
                    <div className="p-4 bg-muted rounded-md font-mono text-sm overflow-auto">
                      {`curl -X POST \\
-H "Content-Type: application/json" \\
-d '{
  "content": "Hello from cURL!",
  "username": "cURL Bot",
  "embeds": [{
    "title": "Embed Title",
    "description": "This is an embed sent from cURL",
    "color": 5814783
  }]
}' \\
https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN`}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={copyCurl}>
                        <Copy className="h-4 w-4 mr-2" /> Copy Code
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="php" className="space-y-4">
                    <div className="p-4 bg-muted rounded-md font-mono text-sm overflow-auto">
                      {`<?php
// Using cURL in PHP
$webhookUrl = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

$data = [
    'content' => 'Hello from PHP!',
    'username' => 'PHP Bot',
    'embeds' => [
        [
            'title' => 'Embed Title',
            'description' => 'This is an embed sent from PHP',
            'color' => 5814783,
            'fields' => [
                [
                    'name' => 'Field 1',
                    'value' => 'Value 1',
                    'inline' => true
                ],
                [
                    'name' => 'Field 2',
                    'value' => 'Value 2',
                    'inline' => true
                ]
            ]
        ]
    ]
];

$options = [
    CURLOPT_URL => $webhookUrl,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true
];

$curl = curl_init();
curl_setopt_array($curl, $options);
$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($httpCode === 204) {
    echo 'Message sent successfully';
} else {
    echo 'Error sending message: ' . $httpCode . ', ' . $response;
}
?>`}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={copyPhp}>
                        <Copy className="h-4 w-4 mr-2" /> Copy Code
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incoming">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Incoming Webhooks</CardTitle>
                  <CardDescription>Receive data from external services and send it to Discord</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p>
                      Incoming webhooks allow you to receive data from external services and automatically send it to
                      Discord. This is useful for integrating with:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <Globe className="h-8 w-8 text-blue-500" />
                          <div>
                            <h3 className="font-medium">Website Events</h3>
                            <p className="text-sm text-muted-foreground">Form submissions, user signups</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <Code className="h-8 w-8 text-green-500" />
                          <div>
                            <h3 className="font-medium">CI/CD Pipelines</h3>
                            <p className="text-sm text-muted-foreground">Build status, deployment notifications</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <FileCode className="h-8 w-8 text-purple-500" />
                          <div>
                            <h3 className="font-medium">GitHub Events</h3>
                            <p className="text-sm text-muted-foreground">Commits, pull requests, issues</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <Languages className="h-8 w-8 text-orange-500" />
                          <div>
                            <h3 className="font-medium">Custom Applications</h3>
                            <p className="text-sm text-muted-foreground">Your own services and applications</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>How It Works</AlertTitle>
                      <AlertDescription>
                        <ol className="list-decimal list-inside space-y-2 mt-2">
                          <li>Create a webhook endpoint in our system</li>
                          <li>Configure your external service to send data to this endpoint</li>
                          <li>Our system processes the data and formats it for Discord</li>
                          <li>The formatted message is sent to your Discord channel</li>
                        </ol>
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create Endpoint</CardTitle>
                  <CardDescription>Set up a new incoming webhook endpoint</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="endpoint-name">Endpoint Name</Label>
                    <Input id="endpoint-name" placeholder="e.g., GitHub Notifications" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discord-webhook">Discord Webhook</Label>
                    <select
                      id="discord-webhook"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a webhook</option>
                      <option value="announcements">Announcements</option>
                      <option value="support">Support Tickets</option>
                      <option value="status">Server Status</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data-format">Data Format</Label>
                    <select
                      id="data-format"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="json">JSON</option>
                      <option value="form">Form Data</option>
                      <option value="xml">XML</option>
                    </select>
                  </div>

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Coming Soon</AlertTitle>
                    <AlertDescription>
                      Incoming webhooks are currently in development and will be available soon.
                    </AlertDescription>
                  </Alert>

                  <Button className="w-full" disabled>
                    <Webhook className="mr-2 h-4 w-4" /> Create Endpoint
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


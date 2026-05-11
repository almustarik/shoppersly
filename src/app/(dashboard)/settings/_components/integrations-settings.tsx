"use client"

import {
  MessageCircle,
  Camera,
  Smartphone,
  Truck,
  Activity,
  Settings,
  ExternalLink,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Integration {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  connected: boolean
  category: string
}

const integrations: Integration[] = [
  {
    name: "Facebook Page",
    description: "Receive orders and messages from your Facebook Page.",
    icon: MessageCircle,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600",
    connected: true,
    category: "Social",
  },
  {
    name: "Instagram Business",
    description: "Sync products and manage DM orders from Instagram.",
    icon: Camera,
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600",
    connected: true,
    category: "Social",
  },
  {
    name: "bKash Payment",
    description: "Accept payments via bKash mobile banking.",
    icon: Smartphone,
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600",
    connected: true,
    category: "Payment",
  },
  {
    name: "Nagad",
    description: "Accept payments via Nagad mobile financial service.",
    icon: Smartphone,
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600",
    connected: false,
    category: "Payment",
  },
  {
    name: "Pathao Courier",
    description: "Automate delivery with Pathao logistics.",
    icon: Truck,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600",
    connected: true,
    category: "Logistics",
  },
  {
    name: "Steadfast",
    description: "Ship orders via Steadfast courier service.",
    icon: Truck,
    iconBg: "bg-sky-100 dark:bg-sky-900/30",
    iconColor: "text-sky-600",
    connected: true,
    category: "Logistics",
  },
  {
    name: "RedX",
    description: "Deliver across Bangladesh with RedX logistics.",
    icon: Truck,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600",
    connected: false,
    category: "Logistics",
  },
  {
    name: "Meta Pixel",
    description: "Track conversions and optimize ad campaigns.",
    icon: Activity,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600",
    connected: true,
    category: "Analytics",
  },
]

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Card>
      <CardContent className="pt-0">
        <div className="flex items-start gap-4">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${integration.iconBg}`}
          >
            <integration.icon className={`size-5 ${integration.iconColor}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">{integration.name}</h4>
              <Badge
                variant={integration.connected ? "default" : "outline"}
                className={
                  integration.connected
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : ""
                }
              >
                {integration.connected ? "Connected" : "Not connected"}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {integration.description}
            </p>
            <div className="mt-3 flex items-center gap-2">
              {integration.connected ? (
                <>
                  <Button variant="outline" size="xs">
                    <Settings className="size-3" data-icon="inline-start" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive">
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button size="xs">
                  <ExternalLink className="size-3" data-icon="inline-start" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function IntegrationsSettings() {
  const categories = Array.from(new Set(integrations.map((i) => i.category)))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect third-party services to extend your store.
        </p>
      </div>

      <Separator />

      {categories.map((category) => (
        <div key={category}>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {category}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {integrations
              .filter((i) => i.category === category)
              .map((integration) => (
                <IntegrationCard key={integration.name} integration={integration} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

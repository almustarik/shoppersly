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
import { cn } from "@/lib/utils"

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
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600",
    connected: true,
    category: "Social",
  },
  {
    name: "Instagram Business",
    description: "Sync products and manage DM orders from Instagram.",
    icon: Camera,
    iconBg: "bg-pink-50 dark:bg-pink-500/10",
    iconColor: "text-pink-600",
    connected: true,
    category: "Social",
  },
  {
    name: "bKash Payment",
    description: "Accept payments via bKash mobile banking.",
    icon: Smartphone,
    iconBg: "bg-pink-50 dark:bg-pink-500/10",
    iconColor: "text-pink-600",
    connected: true,
    category: "Payment",
  },
  {
    name: "Nagad",
    description: "Accept payments via Nagad mobile financial service.",
    icon: Smartphone,
    iconBg: "bg-orange-50 dark:bg-orange-500/10",
    iconColor: "text-orange-600",
    connected: false,
    category: "Payment",
  },
  {
    name: "Pathao Courier",
    description: "Automate delivery with Pathao logistics.",
    icon: Truck,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600",
    connected: true,
    category: "Logistics",
  },
  {
    name: "Steadfast",
    description: "Ship orders via Steadfast courier service.",
    icon: Truck,
    iconBg: "bg-sky-50 dark:bg-sky-500/10",
    iconColor: "text-sky-600",
    connected: true,
    category: "Logistics",
  },
  {
    name: "RedX",
    description: "Deliver across Bangladesh with RedX logistics.",
    icon: Truck,
    iconBg: "bg-red-50 dark:bg-red-500/10",
    iconColor: "text-red-600",
    connected: false,
    category: "Logistics",
  },
  {
    name: "Meta Pixel",
    description: "Track conversions and optimize ad campaigns.",
    icon: Activity,
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconColor: "text-indigo-600",
    connected: true,
    category: "Analytics",
  },
]

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-border/80 hover:shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", integration.iconBg)}
        >
          <integration.icon className={cn("size-5", integration.iconColor)} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium">{integration.name}</h4>
            {integration.connected ? (
              <Badge
                variant="secondary"
                className="border-0 bg-emerald-50 text-emerald-700 text-[10px] dark:bg-emerald-500/10"
              >
                <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                Connected
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground">Not connected</span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {integration.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            {integration.connected ? (
              <>
                <Button
                  variant="outline"
                  size="xs"
                  className="rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
                  aria-label={`Settings for ${integration.name}`}
                >
                  <Settings className="size-3" data-icon="inline-start" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  className="rounded-lg text-destructive transition-colors duration-150 hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary/20"
                  aria-label={`Disconnect ${integration.name}`}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="xs"
                className="rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
                aria-label={`Connect ${integration.name}`}
              >
                <ExternalLink className="size-3" data-icon="inline-start" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function IntegrationsSettings() {
  const categories = Array.from(new Set(integrations.map((i) => i.category)))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect third-party services to extend your store.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
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

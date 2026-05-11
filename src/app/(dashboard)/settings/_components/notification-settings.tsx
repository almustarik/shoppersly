"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

interface NotificationChannel {
  email: boolean
  push: boolean
  sms: boolean
}

interface NotificationPreference {
  event: string
  description: string
  channels: NotificationChannel
}

const defaultPreferences: NotificationPreference[] = [
  {
    event: "New Order",
    description: "When a new order is placed from any channel.",
    channels: { email: true, push: true, sms: true },
  },
  {
    event: "Payment Received",
    description: "When a payment is confirmed via bKash, Nagad, or bank.",
    channels: { email: true, push: true, sms: false },
  },
  {
    event: "Delivery Update",
    description: "Shipment picked up, in transit, or delivered.",
    channels: { email: false, push: true, sms: true },
  },
  {
    event: "Low Stock Alert",
    description: "When a product drops below its stock threshold.",
    channels: { email: true, push: false, sms: false },
  },
  {
    event: "New Message",
    description: "Incoming messages from Facebook or Instagram DMs.",
    channels: { email: false, push: true, sms: false },
  },
]

const channelLabels: (keyof NotificationChannel)[] = ["email", "push", "sms"]

export function NotificationSettings() {
  const [preferences, setPreferences] = useState(defaultPreferences)

  function toggleChannel(
    eventIndex: number,
    channel: keyof NotificationChannel
  ) {
    setPreferences((prev) =>
      prev.map((pref, i) =>
        i === eventIndex
          ? {
              ...pref,
              channels: {
                ...pref.channels,
                [channel]: !pref.channels[channel],
              },
            }
          : pref
      )
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Choose how and when you want to be notified.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Toggle channels for each event type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Header row */}
          <div className="mb-2 grid grid-cols-[1fr_repeat(3,_64px)] items-center gap-2 px-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Event
            </span>
            {channelLabels.map((ch) => (
              <span
                key={ch}
                className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {ch}
              </span>
            ))}
          </div>

          <Separator className="mb-3" />

          <div className="space-y-1">
            {preferences.map((pref, eventIndex) => (
              <div
                key={pref.event}
                className="grid grid-cols-[1fr_repeat(3,_64px)] items-center gap-2 rounded-lg px-1 py-3 transition-colors hover:bg-muted/50"
              >
                <div>
                  <p className="text-sm font-medium">{pref.event}</p>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
                {channelLabels.map((ch) => (
                  <div key={ch} className="flex justify-center">
                    <Switch
                      size="sm"
                      checked={pref.channels[ch]}
                      onCheckedChange={() => toggleChannel(eventIndex, ch)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="size-3.5" data-icon="inline-start" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Save, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface NotificationChannel {
  email: boolean
  push: boolean
  sms: boolean
}

interface NotificationPreference {
  event: string
  description: string
  group: string
  channels: NotificationChannel
}

const defaultPreferences: NotificationPreference[] = [
  {
    event: "New Order",
    description: "When a new order is placed from any channel.",
    group: "ORDERS",
    channels: { email: true, push: true, sms: true },
  },
  {
    event: "Payment Received",
    description: "When a payment is confirmed via bKash, Nagad, or bank.",
    group: "ORDERS",
    channels: { email: true, push: true, sms: false },
  },
  {
    event: "Delivery Update",
    description: "Shipment picked up, in transit, or delivered.",
    group: "SHIPPING",
    channels: { email: false, push: true, sms: true },
  },
  {
    event: "Low Stock Alert",
    description: "When a product drops below its stock threshold.",
    group: "INVENTORY",
    channels: { email: true, push: false, sms: false },
  },
  {
    event: "New Message",
    description: "Incoming messages from Facebook or Instagram DMs.",
    group: "COMMUNICATION",
    channels: { email: false, push: true, sms: false },
  },
]

const channelLabels: (keyof NotificationChannel)[] = ["email", "push", "sms"]
const channelDisplayNames: Record<keyof NotificationChannel, string> = {
  email: "Email",
  push: "Push",
  sms: "SMS",
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [isSaving, setIsSaving] = useState(false)

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

  async function handleSave() {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saved preferences:", preferences)
    setIsSaving(false)
  }

  const groups = Array.from(new Set(preferences.map((p) => p.group)))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Choose how and when you want to be notified.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 pb-4">
          <h3 className="text-sm font-semibold">Notification Preferences</h3>
          <p className="text-xs text-muted-foreground">Toggle channels for each event type.</p>
        </div>

        <div className="mx-6 mb-2 grid grid-cols-[1fr_repeat(3,64px)] items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Event
          </span>
          {channelLabels.map((ch) => (
            <span
              key={ch}
              className="text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {channelDisplayNames[ch]}
            </span>
          ))}
        </div>

        <div className="border-t">
          {groups.map((group) => (
            <div key={group} role="group" aria-label={`${group} notifications`}>
              <div className="bg-muted/30 px-6 py-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {group}
                </span>
              </div>
              {preferences
                .map((pref, idx) => ({ pref, idx }))
                .filter(({ pref }) => pref.group === group)
                .map(({ pref, idx }) => (
                  <div
                    key={pref.event}
                    className="grid grid-cols-[1fr_repeat(3,64px)] items-center gap-2 border-b px-6 py-3 transition-colors duration-150 last:border-0"
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
                          onCheckedChange={() => toggleChannel(idx, ch)}
                          aria-label={`${channelDisplayNames[ch]} notifications for ${pref.event}`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="h-10 rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          {isSaving ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Save className="size-3.5" data-icon="inline-start" />
          )}
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}

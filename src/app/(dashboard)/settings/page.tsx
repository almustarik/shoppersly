"use client"

import { useState } from "react"
import {
  Store,
  Users,
  CreditCard,
  Puzzle,
  Bell,
  KeyRound,
} from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StoreSettings } from "./_components/store-settings"
import { BillingSettings } from "./_components/billing-settings"
import { IntegrationsSettings } from "./_components/integrations-settings"
import { NotificationSettings } from "./_components/notification-settings"
import { ApiKeysSettings } from "./_components/api-keys-settings"

const sections = [
  { id: "store", label: "Store", icon: Store },
  { id: "team", label: "Team", icon: Users, href: "/settings/team" },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Puzzle },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api-keys", label: "API Keys", icon: KeyRound },
] as const

type SectionId = (typeof sections)[number]["id"]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("store")

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your store configuration, integrations, and preferences.
        </p>
      </div>

      <div className="flex flex-1 gap-6">
        {/* Sidebar Nav */}
        <nav className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-6 space-y-1">
            {sections.map((section) => {
              if ("href" in section && section.href) {
                return (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                    render={<Link href={section.href} />}
                  >
                    <section.icon className="size-4" />
                    {section.label}
                  </Button>
                )
              }
              const isActive = activeSection === section.id
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive
                      ? "bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon
                    className={cn("size-4", isActive && "text-primary")}
                  />
                  {section.label}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Mobile selector */}
        <div className="flex flex-wrap gap-2 lg:hidden">
          {sections.map((section) => {
            if ("href" in section && section.href) {
              return (
                <Button
                  key={section.id}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  render={<Link href={section.href} />}
                >
                  <section.icon className="size-3.5" />
                  {section.label}
                </Button>
              )
            }
            const isActive = activeSection === section.id
            return (
              <Button
                key={section.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className="gap-1.5"
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon className="size-3.5" />
                {section.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {activeSection === "store" && <StoreSettings />}
          {activeSection === "billing" && <BillingSettings />}
          {activeSection === "integrations" && <IntegrationsSettings />}
          {activeSection === "notifications" && <NotificationSettings />}
          {activeSection === "api-keys" && <ApiKeysSettings />}
        </div>
      </div>
    </div>
  )
}

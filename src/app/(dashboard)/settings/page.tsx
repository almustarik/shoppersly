"use client"

import { useState, useRef } from "react"
import {
  Store,
  Users,
  CreditCard,
  Puzzle,
  Bell,
  KeyRound,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
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
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your store configuration, integrations, and preferences.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col gap-6 lg:flex-row">
        {/* Desktop sidebar nav */}
        <nav className="hidden w-[200px] shrink-0 lg:block" aria-label="Settings navigation">
          <div className="sticky top-6 space-y-0.5">
            {sections.map((section) => {
              if ("href" in section && section.href) {
                return (
                  <Link
                    key={section.id}
                    href={section.href}
                    className="flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  >
                    <section.icon className="size-4" />
                    {section.label}
                  </Link>
                )
              }
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  className={cn(
                    "flex h-9 w-full items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                    isActive
                      ? "bg-muted font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  onClick={() => setActiveSection(section.id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <section.icon className="size-4" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Mobile horizontal scroll tabs */}
        <div
          ref={scrollRef}
          className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none lg:hidden"
          role="tablist"
          aria-label="Settings sections"
        >
          {sections.map((section) => {
            if ("href" in section && section.href) {
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  role="tab"
                  className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                >
                  <section.icon className="size-3.5" />
                  {section.label}
                </Link>
              )
            }
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon className="size-3.5" />
                {section.label}
              </button>
            )
          })}
        </div>

        {/* Content area */}
        <div className="min-w-0 flex-1" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {activeSection === "store" && <StoreSettings />}
              {activeSection === "billing" && <BillingSettings />}
              {activeSection === "integrations" && <IntegrationsSettings />}
              {activeSection === "notifications" && <NotificationSettings />}
              {activeSection === "api-keys" && <ApiKeysSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

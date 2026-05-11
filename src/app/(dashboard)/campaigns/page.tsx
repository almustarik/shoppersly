"use client"

import { motion } from "framer-motion"
import {
  Megaphone,
  DollarSign,
  TrendingUp,
  Target,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CampaignsList } from "./_components/campaigns-list"
import { CampaignMetrics } from "./_components/campaign-metrics"
import { UTMBuilder } from "./_components/utm-builder"
import {
  campaigns,
  dailyMetrics,
  campaignsSummary,
} from "@/mock/campaigns-data"

const summaryCards = [
  {
    label: "Active Campaigns",
    value: campaignsSummary.activeCampaigns.toString(),
    icon: Megaphone,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    label: "Total Spend",
    value: `৳${campaignsSummary.totalSpend.toLocaleString()}`,
    icon: DollarSign,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    label: "ROAS",
    value: `${campaignsSummary.roas}x`,
    icon: TrendingUp,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    label: "Conversions",
    value: campaignsSummary.conversions.toString(),
    icon: Target,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
]

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground">
            Manage your social commerce campaigns and track performance
          </p>
        </div>
        <Button size="lg">
          <Plus className="size-4" />
          Create Campaign
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4">
                <div className={`flex size-11 items-center justify-center rounded-lg ${card.bg}`}>
                  <card.icon className={`size-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Campaigns list */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">All Campaigns</h2>
        <CampaignsList campaigns={campaigns} />
      </div>

      {/* Performance charts */}
      <CampaignMetrics data={dailyMetrics} />

      {/* UTM Builder */}
      <UTMBuilder />
    </div>
  )
}

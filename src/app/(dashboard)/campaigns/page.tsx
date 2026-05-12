"use client"

import { motion } from "framer-motion"
import {
  Megaphone,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
    trend: "+2",
    trendUp: true,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
  },
  {
    label: "Total Spend",
    value: `৳${campaignsSummary.totalSpend.toLocaleString()}`,
    icon: DollarSign,
    trend: "+18%",
    trendUp: true,
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#10B981]",
  },
  {
    label: "ROAS",
    value: `${campaignsSummary.roas}x`,
    icon: TrendingUp,
    trend: "+0.4x",
    trendUp: true,
    iconBg: "bg-[#F5F3FF]",
    iconColor: "text-[#8B5CF6]",
  },
  {
    label: "Conversions",
    value: campaignsSummary.conversions.toString(),
    icon: Target,
    trend: "+12",
    trendUp: true,
    iconBg: "bg-[#FFFBEB]",
    iconColor: "text-[#F59E0B]",
  },
]

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground">
            Manage your social commerce campaigns and track performance
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-center gap-4">
                <div className={`flex size-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                  <card.icon className={`size-5 ${card.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[28px] font-bold tabular-nums">{card.value}</p>
                    <span className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
                      card.trendUp
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-rose-200 bg-rose-50 text-rose-700"
                    }`}>
                      {card.trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {card.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">All Campaigns</h2>
        <CampaignsList campaigns={campaigns} />
      </div>

      <CampaignMetrics data={dailyMetrics} />

      <UTMBuilder />
    </div>
  )
}

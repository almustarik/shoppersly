"use client"

import * as React from "react"
import {
  Download,
  BanknoteIcon,
  Clock,
  RotateCcw,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TransactionsTable } from "./_components/transactions-table"
import { PaymentAnalytics } from "./_components/payment-analytics"

const stats = [
  {
    label: "Total Revenue",
    value: "৳12,45,890",
    icon: BanknoteIcon,
    trend: "+12.5%",
    trendUp: true,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Pending",
    value: "৳89,500",
    icon: Clock,
    trend: "-3.2%",
    trendUp: false,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Refunds",
    value: "৳12,300",
    icon: RotateCcw,
    trend: "+1.8%",
    trendUp: true,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    label: "Failed",
    value: "৳5,200",
    icon: AlertTriangle,
    trend: "-8.1%",
    trendUp: false,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
            Payments
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage transactions, invoices, and refunds
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
          aria-label="Export payments data"
        >
          <Download className="size-4" aria-hidden="true" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
          >
            <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <stat.icon
                    className={`size-5 ${stat.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="text-2xl font-bold tabular-nums tracking-tight">
                      {stat.value}
                    </p>
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
                        stat.trendUp
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-rose-200 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {stat.trendUp ? (
                        <TrendingUp className="size-3" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="size-3" aria-hidden="true" />
                      )}
                      {stat.trend}
                      <span className="sr-only">
                        {stat.trendUp ? "increase" : "decrease"} from previous
                        period
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger
            value="transactions"
            className="transition-all duration-150"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="transition-all duration-150"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="transition-all duration-150"
          >
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="refunds"
            className="transition-all duration-150"
          >
            Refunds
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="transactions"
          className="mt-4 transition-all duration-150"
        >
          <TransactionsTable />
        </TabsContent>

        <TabsContent
          value="analytics"
          className="mt-4 transition-all duration-150"
        >
          <PaymentAnalytics />
        </TabsContent>

        <TabsContent
          value="invoices"
          className="mt-4 transition-all duration-150"
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                Invoice management coming soon
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="refunds"
          className="mt-4 transition-all duration-150"
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                Refund management coming soon
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

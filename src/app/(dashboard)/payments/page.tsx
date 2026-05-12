"use client"

import * as React from "react"
import { Download, BanknoteIcon, Clock, RotateCcw, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TransactionsTable } from "./_components/transactions-table"
import { PaymentAnalytics } from "./_components/payment-analytics"

const stats = [
  { label: "Total Revenue", value: "৳12,45,890", icon: BanknoteIcon, trend: "+12.5%", trendUp: true, iconBg: "bg-[#ECFDF5]", iconColor: "text-[#10B981]" },
  { label: "Pending", value: "৳89,500", icon: Clock, trend: "-3.2%", trendUp: false, iconBg: "bg-[#FFFBEB]", iconColor: "text-[#F59E0B]" },
  { label: "Refunds", value: "৳12,300", icon: RotateCcw, trend: "+1.8%", trendUp: true, iconBg: "bg-[#EEF2FF]", iconColor: "text-[#4F46E5]" },
  { label: "Failed", value: "৳5,200", icon: AlertTriangle, trend: "-8.1%", trendUp: false, iconBg: "bg-[#FFF1F2]", iconColor: "text-[#F43F5E]" },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground">Manage transactions, invoices, and refunds</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
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
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-center gap-4">
                <div className={`flex size-10 items-center justify-center rounded-xl ${stat.iconBg}`}>
                  <stat.icon className={`size-5 ${stat.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[28px] font-bold tabular-nums">{stat.value}</p>
                    <span className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
                      stat.trendUp
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-rose-200 bg-rose-50 text-rose-700"
                    }`}>
                      {stat.trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-4">
          <TransactionsTable />
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <PaymentAnalytics />
        </TabsContent>

        <TabsContent value="invoices" className="mt-4">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Invoice management coming soon</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="refunds" className="mt-4">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Refund management coming soon</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

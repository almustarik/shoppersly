"use client"

import {
  CreditCard,
  Check,
  Minus,
  ArrowUpRight,
  ShoppingCart,
  Users,
  HardDrive,
  Smartphone,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const usageStats = [
  { label: "Orders this month", value: 847, limit: 2000, icon: ShoppingCart, color: "bg-primary" },
  { label: "Team members", value: 5, limit: 10, icon: Users, color: "bg-violet-500" },
  { label: "Storage used", value: 2.4, limit: 10, unit: "GB", icon: HardDrive, color: "bg-emerald-500" },
]

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    features: ["50 orders/month", "1 team member", "1 GB storage", "Basic analytics"],
    missing: ["Facebook + Instagram", "bKash integration", "Priority support", "API access"],
    current: false,
  },
  {
    name: "Starter",
    price: "৳999",
    period: "/month",
    features: ["500 orders/month", "3 team members", "5 GB storage", "Facebook + Instagram", "bKash integration", "Email support"],
    missing: ["Priority support", "API access"],
    current: false,
  },
  {
    name: "Pro",
    price: "৳2,999",
    period: "/month",
    features: ["2,000 orders/month", "10 team members", "10 GB storage", "All integrations", "Advanced analytics", "Priority support", "API access", "Custom domain"],
    missing: [],
    current: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Unlimited orders", "Unlimited team", "50 GB storage", "All integrations", "White-label", "Dedicated account manager", "SLA guarantee", "Custom integrations"],
    missing: [],
    current: false,
  },
]

const billingHistory = [
  { id: "INV-2024-012", date: "May 1, 2025", amount: "৳2,999", status: "Paid", method: "bKash" },
  { id: "INV-2024-011", date: "Apr 1, 2025", amount: "৳2,999", status: "Paid", method: "bKash" },
  { id: "INV-2024-010", date: "Mar 1, 2025", amount: "৳2,999", status: "Paid", method: "bKash" },
  { id: "INV-2024-009", date: "Feb 1, 2025", amount: "৳2,999", status: "Paid", method: "bKash" },
  { id: "INV-2024-008", date: "Jan 1, 2025", amount: "৳2,999", status: "Paid", method: "bKash" },
]

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Billing & Plans</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription, usage, and payment methods.
        </p>
      </div>

      {/* Current Plan */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Current Plan</h3>
              <p className="text-xs text-muted-foreground">You are on the Pro plan.</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-0">Pro Plan</Badge>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-bold">৳2,999</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Next billing date: <span className="font-medium text-foreground">June 1, 2025</span>
          </p>
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Usage This Month</h3>
          <p className="text-xs text-muted-foreground">Your current resource consumption.</p>
        </div>
        <div className="space-y-5">
          {usageStats.map((stat) => {
            const percentage = (stat.value / stat.limit) * 100
            return (
              <div key={stat.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <stat.icon className="size-4 text-muted-foreground" />
                    <span>{stat.label}</span>
                  </div>
                  <span className="font-medium">
                    {stat.value}{stat.unit ? ` ${stat.unit}` : ""}{" "}
                    <span className="text-muted-foreground font-normal">
                      / {stat.limit}{stat.unit ? ` ${stat.unit}` : ""}
                    </span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${stat.color}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Plans Comparison */}
      <div>
        <h3 className="mb-4 text-sm font-semibold">Compare Plans</h3>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left text-xs font-medium text-muted-foreground">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="p-4 text-center">
                    <div className="text-sm font-semibold">{plan.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {plan.price}{plan.period}
                    </div>
                    {plan.current && (
                      <Badge className="mt-1.5 bg-primary/10 text-primary border-0 text-[10px]">Current</Badge>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Orders/month", "Team members", "Storage", "Social integrations", "Payment gateways", "Analytics", "Priority support", "API access"].map((feature, fi) => (
                <tr key={feature} className="border-b last:border-0">
                  <td className="p-4 text-sm">{feature}</td>
                  {plans.map((plan) => {
                    const has = fi < plan.features.length
                    return (
                      <td key={plan.name} className="p-4 text-center">
                        {has ? (
                          <Check className="mx-auto size-4 text-emerald-500" />
                        ) : (
                          <Minus className="mx-auto size-4 text-muted-foreground/30" />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-muted/30">
                <td className="p-4" />
                {plans.map((plan) => (
                  <td key={plan.name} className="p-4 text-center">
                    <Button
                      variant={plan.current ? "outline" : "default"}
                      size="sm"
                      disabled={plan.current}
                      className="h-8 rounded-lg text-xs"
                    >
                      {plan.current ? "Current" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Payment Method</h3>
          <p className="text-xs text-muted-foreground">Your default payment method for subscriptions.</p>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-border p-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-pink-50">
            <Smartphone className="size-5 text-pink-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">bKash</p>
            <p className="text-sm text-muted-foreground">+880 1712-****78</p>
          </div>
          <Button variant="outline" size="sm" className="h-8 rounded-lg">
            Change
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="text-sm font-semibold">Billing History</h3>
            <p className="text-xs text-muted-foreground">Download invoices for your records.</p>
          </div>
          <Button variant="outline" size="sm" className="h-8 rounded-lg">
            <ArrowUpRight className="size-3.5" data-icon="inline-start" />
            Export All
          </Button>
        </div>
        <div className="px-6 pb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium font-mono text-xs">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-0 text-[10px]">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="size-3.5 text-muted-foreground" />
                      {invoice.method}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="xs">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

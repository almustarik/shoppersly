"use client"

import {
  CreditCard,
  Check,
  ArrowUpRight,
  ShoppingCart,
  Users,
  HardDrive,
  Smartphone,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const usageStats = [
  { label: "Orders this month", value: 847, limit: 2000, icon: ShoppingCart },
  { label: "Team members", value: 5, limit: 10, icon: Users },
  { label: "Storage used", value: 2.4, limit: 10, unit: "GB", icon: HardDrive },
]

const plans = [
  {
    name: "Free",
    price: "০",
    period: "forever",
    features: ["50 orders/month", "1 team member", "1 GB storage", "Basic analytics"],
    current: false,
    popular: false,
  },
  {
    name: "Starter",
    price: "৳999",
    period: "/month",
    features: [
      "500 orders/month",
      "3 team members",
      "5 GB storage",
      "Facebook + Instagram",
      "bKash integration",
      "Email support",
    ],
    current: false,
    popular: false,
  },
  {
    name: "Pro",
    price: "৳2,999",
    period: "/month",
    features: [
      "2,000 orders/month",
      "10 team members",
      "10 GB storage",
      "All integrations",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom domain",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited orders",
      "Unlimited team",
      "50 GB storage",
      "All integrations",
      "White-label",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
    ],
    current: false,
    popular: false,
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

      <Separator />

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are on the Pro plan.</CardDescription>
            </div>
            <Badge>Pro Plan</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">৳2,999</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Next billing date: <span className="font-medium text-foreground">June 1, 2025</span>
          </p>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>Your current resource consumption.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
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
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Plans Comparison */}
      <div>
        <h3 className="mb-4 text-base font-semibold">Compare Plans</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.current
                  ? "ring-2 ring-primary"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge variant="secondary" className="text-[10px]">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.current ? "outline" : "default"}
                  className="w-full"
                  disabled={plan.current}
                  size="sm"
                >
                  {plan.current ? "Current Plan" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Your default payment method for subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
              <Smartphone className="size-5 text-pink-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">bKash</p>
              <p className="text-sm text-muted-foreground">+880 1712-••••78</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Download invoices for your records.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="size-3.5" data-icon="inline-start" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{invoice.status}</Badge>
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
        </CardContent>
      </Card>
    </div>
  )
}

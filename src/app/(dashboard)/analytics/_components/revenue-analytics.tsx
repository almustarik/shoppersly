"use client"

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { revenueVsOrders, revenueByChannel } from "@/mock/analytics-data"

export function RevenueAnalytics() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueVsOrders} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v) => new Date(v).toLocaleDateString("en-BD", { day: "numeric", month: "short" })}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  yAxisId="revenue"
                  tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  yAxisId="orders"
                  orientation="right"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px" }}
                  labelFormatter={(v) => new Date(v).toLocaleDateString("en-BD", { day: "numeric", month: "long" })}
                  formatter={((value: number, name: string) => [
                    name === "revenue" ? `৳${value.toLocaleString("en-BD")}` : value,
                    name === "revenue" ? "Revenue" : "Orders",
                  ]) as never}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs capitalize text-foreground">{value}</span>}
                />
                <Bar yAxisId="revenue" dataKey="revenue" fill="url(#revGrad)" stroke="#6366f1" radius={[3, 3, 0, 0]} />
                <Line yAxisId="orders" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByChannel} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px" }}
                  formatter={((value: number) => [`৳${value.toLocaleString("en-BD")}`, ""]) as never}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs capitalize text-foreground">{value}</span>}
                />
                <Bar dataKey="facebook" fill="#6366f1" radius={[3, 3, 0, 0]} stackId="a" />
                <Bar dataKey="instagram" fill="#8b5cf6" radius={[0, 0, 0, 0]} stackId="a" />
                <Bar dataKey="direct" fill="#a78bfa" radius={[3, 3, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

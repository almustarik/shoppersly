"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { topProducts, categoryPerformance } from "@/mock/analytics-data"

export function ProductAnalytics() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Products by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 5, right: 30, bottom: 5, left: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  width={95}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px" }}
                  formatter={((value: number) => [`৳${value.toLocaleString("en-BD")}`, "Revenue"]) as never}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="category"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis
                    tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px" }}
                    formatter={((value: number, name: string) => [
                      name === "revenue" ? `৳${value.toLocaleString("en-BD")}` : value,
                      name === "revenue" ? "Revenue" : "Orders",
                    ]) as never}
                  />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="orders" fill="#10b981" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock vs Sales (by Category)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    type="number"
                    dataKey="orders"
                    name="Orders"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    label={{ value: "Orders", position: "bottom", fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="revenue"
                    name="Revenue"
                    tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  />
                  <ZAxis type="number" dataKey="growth" range={[60, 400]} name="Growth" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px" }}
                    formatter={((value: number, name: string) => [
                      name === "Revenue" ? `৳${value.toLocaleString("en-BD")}` : value,
                      name,
                    ]) as never}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.category ?? ""}
                  />
                  <Scatter data={categoryPerformance} fill="#8b5cf6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

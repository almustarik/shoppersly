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
import { revenueVsOrders, revenueByChannel } from "@/mock/analytics-data"

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-2.5 shadow-xl">
      {label && <p className="mb-1.5 text-xs text-slate-400">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-slate-400">{p.name}:</span>
          <span className="font-semibold tabular-nums text-white">
            {p.name === "Revenue" || p.name === "revenue"
              ? `৳${p.value.toLocaleString("en-BD")}`
              : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function RevenueAnalytics() {
  return (
    <div className="grid gap-6">
      <div
        className="rounded-xl border border-border bg-card p-6"
        role="img"
        aria-label="Revenue vs orders dual axis chart"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Revenue vs Orders</h3>
        </div>
        <div className="min-h-[280px]">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={revenueVsOrders}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <defs>
                <linearGradient
                  id="rev-bar-grad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "short",
                  })
                }
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="revenue"
                tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="orders"
                orientation="right"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<ChartTooltip />}
                labelFormatter={(v) =>
                  new Date(v).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "long",
                  })
                }
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
              <Bar
                yAxisId="revenue"
                dataKey="revenue"
                fill="url(#rev-bar-grad)"
                stroke="#4F46E5"
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
              <Line
                yAxisId="orders"
                type="monotone"
                dataKey="orders"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                name="Orders"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className="rounded-xl border border-border bg-card p-6"
        role="img"
        aria-label="Revenue by channel stacked bar chart"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Revenue by Channel</h3>
        </div>
        <div className="min-h-[280px]">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={revenueByChannel}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <defs>
                <linearGradient
                  id="rev-fb-grad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient
                  id="rev-ig-grad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient
                  id="rev-direct-grad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs capitalize text-muted-foreground">
                    {value}
                  </span>
                )}
              />
              <Bar
                dataKey="facebook"
                fill="url(#rev-fb-grad)"
                radius={[4, 4, 0, 0]}
                stackId="a"
                name="Facebook"
              />
              <Bar
                dataKey="instagram"
                fill="url(#rev-ig-grad)"
                radius={[0, 0, 0, 0]}
                stackId="a"
                name="Instagram"
              />
              <Bar
                dataKey="direct"
                fill="url(#rev-direct-grad)"
                radius={[4, 4, 0, 0]}
                stackId="a"
                name="Direct"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

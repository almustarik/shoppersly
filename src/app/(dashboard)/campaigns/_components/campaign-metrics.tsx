"use client"

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { CampaignDailyMetric } from "@/mock/campaigns-data"

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
      <p className="mb-1.5 text-xs text-slate-400">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-slate-400">{p.name}:</span>
          <span className="font-semibold tabular-nums text-white">
            {p.name.toLowerCase().includes("roas")
              ? `${p.value}x`
              : `৳${p.value.toLocaleString()}`}
          </span>
        </div>
      ))}
    </div>
  )
}

export function CampaignMetrics({
  data,
}: {
  data: CampaignDailyMetric[]
}) {
  return (
    <section
      className="rounded-xl border border-border bg-card p-6"
      aria-label="Campaign performance analytics"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold">Performance Analytics</h3>
      </div>

      <Tabs defaultValue="spend-revenue">
        <TabsList>
          <TabsTrigger
            value="spend-revenue"
            className="transition-all duration-150"
          >
            Spend vs Revenue
          </TabsTrigger>
          <TabsTrigger value="roas" className="transition-all duration-150">
            ROAS
          </TabsTrigger>
          <TabsTrigger
            value="channels"
            className="transition-all duration-150"
          >
            Channels
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="spend-revenue"
          className="mt-4 transition-all duration-150"
        >
          <div
            className="min-h-[280px] w-full"
            role="img"
            aria-label="Spend vs revenue line chart"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <defs>
                  <linearGradient
                    id="cmp-spend-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.15} />
                    <stop
                      offset="100%"
                      stopColor="#4F46E5"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="cmp-revenue-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop
                      offset="100%"
                      stopColor="#10B981"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  tickFormatter={(v: number) =>
                    `৳${(v / 1000).toFixed(0)}k`
                  }
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="spend"
                  name="Spend"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: "#4F46E5" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: "#10B981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent
          value="roas"
          className="mt-4 transition-all duration-150"
        >
          <div
            className="min-h-[280px] w-full"
            role="img"
            aria-label="Return on ad spend line chart"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <defs>
                  <linearGradient
                    id="cmp-roas-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop
                      offset="100%"
                      stopColor="#8B5CF6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  tickFormatter={(v: number) => `${v}x`}
                  domain={[0, 5]}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="roas"
                  name="ROAS"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: "#8B5CF6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent
          value="channels"
          className="mt-4 transition-all duration-150"
        >
          <div
            className="min-h-[280px] w-full"
            role="img"
            aria-label="Revenue by channel bar chart"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <defs>
                  <linearGradient
                    id="cmp-fb-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                    <stop
                      offset="100%"
                      stopColor="#4F46E5"
                      stopOpacity={0.7}
                    />
                  </linearGradient>
                  <linearGradient
                    id="cmp-ig-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.9} />
                    <stop
                      offset="100%"
                      stopColor="#F43F5E"
                      stopOpacity={0.7}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  tickFormatter={(v: number) =>
                    `৳${(v / 1000).toFixed(0)}k`
                  }
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
                <Bar
                  dataKey="fbRevenue"
                  name="Facebook Revenue"
                  fill="url(#cmp-fb-grad)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="igRevenue"
                  name="Instagram Revenue"
                  fill="url(#cmp-ig-grad)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

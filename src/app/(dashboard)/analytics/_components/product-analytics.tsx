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
import { topProducts, categoryPerformance } from "@/mock/analytics-data"

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

export function ProductAnalytics() {
  return (
    <div className="grid gap-6">
      <div
        className="rounded-xl border border-border bg-card p-6"
        role="img"
        aria-label="Top 10 products by revenue horizontal bar chart"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">
            Top 10 Products by Revenue
          </h3>
        </div>
        <div className="min-h-[280px]">
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 5, right: 30, bottom: 5, left: 100 }}
            >
              <defs>
                <linearGradient
                  id="prod-bar-grad"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#F1F5F9"
                strokeDasharray="3 3"
                horizontal={false}
              />
              <XAxis
                type="number"
                tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#64748B", fontSize: 11 }}
                width={95}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(79, 70, 229, 0.04)" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-2.5 shadow-xl">
                      <p className="mb-1 text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-semibold tabular-nums text-white">
                        ৳{payload[0].value?.toLocaleString("en-BD")}
                      </p>
                    </div>
                  )
                }}
              />
              <Bar
                dataKey="revenue"
                fill="url(#prod-bar-grad)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Category performance bar chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Category Performance</h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={categoryPerformance}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
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
                <Tooltip
                  cursor={{ fill: "rgba(79, 70, 229, 0.04)" }}
                  content={<ChartTooltip />}
                />
                <Bar
                  dataKey="revenue"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
                <Bar
                  dataKey="orders"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  name="Orders"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Stock vs sales scatter chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">
              Stock vs Sales (by Category)
            </h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="orders"
                  name="Orders"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Orders",
                    position: "bottom",
                    fill: "#64748B",
                    fontSize: 11,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="revenue"
                  name="Revenue"
                  tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <ZAxis
                  type="number"
                  dataKey="growth"
                  range={[60, 400]}
                  name="Growth"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const data = payload[0]?.payload
                    return (
                      <div className="rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-2.5 shadow-xl">
                        <p className="mb-1 text-xs font-semibold text-white">
                          {data?.category}
                        </p>
                        <p className="text-xs tabular-nums text-slate-400">
                          Revenue: ৳{data?.revenue?.toLocaleString("en-BD")}
                        </p>
                        <p className="text-xs tabular-nums text-slate-400">
                          Orders: {data?.orders}
                        </p>
                        <p className="text-xs tabular-nums text-slate-400">
                          Growth: {data?.growth}%
                        </p>
                      </div>
                    )
                  }}
                />
                <Scatter data={categoryPerformance} fill="#8B5CF6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

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

function ChartTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
      {label && <p className="mb-1.5 text-xs text-slate-300">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-300">{p.name}:</span>
          <span className="font-semibold">
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
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Top 10 Products by Revenue</h3>
        </div>
        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 5, right: 30, bottom: 5, left: 100 }}
            >
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" horizontal={false} />
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
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
                      <p className="mb-1 text-xs text-slate-300">{label}</p>
                      <p className="text-sm font-semibold">৳{payload[0].value?.toLocaleString("en-BD")}</p>
                    </div>
                  )
                }}
              />
              <Bar dataKey="revenue" fill="#4F46E5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Category Performance</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Stock vs Sales (by Category)</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="orders"
                  name="Orders"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "Orders", position: "bottom", fill: "#64748B", fontSize: 11 }}
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
                <ZAxis type="number" dataKey="growth" range={[60, 400]} name="Growth" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const data = payload[0]?.payload
                    return (
                      <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
                        <p className="mb-1 text-xs font-semibold">{data?.category}</p>
                        <p className="text-xs text-slate-300">Revenue: ৳{data?.revenue?.toLocaleString("en-BD")}</p>
                        <p className="text-xs text-slate-300">Orders: {data?.orders}</p>
                        <p className="text-xs text-slate-300">Growth: {data?.growth}%</p>
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

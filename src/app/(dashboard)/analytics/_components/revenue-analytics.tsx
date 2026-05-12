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

export function RevenueAnalytics() {
  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Revenue vs Orders</h3>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueVsOrders} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => new Date(v).toLocaleDateString("en-BD", { day: "numeric", month: "short" })}
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
                labelFormatter={(v) => new Date(v).toLocaleDateString("en-BD", { day: "numeric", month: "long" })}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
              />
              <Bar yAxisId="revenue" dataKey="revenue" fill="url(#revGrad)" stroke="#4F46E5" radius={[4, 4, 0, 0]} name="Revenue" />
              <Line yAxisId="orders" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} dot={false} name="Orders" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Revenue by Channel</h3>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByChannel} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
              <Tooltip
                content={<ChartTooltip />}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs capitalize text-slate-600">{value}</span>}
              />
              <Bar dataKey="facebook" fill="#4F46E5" radius={[4, 4, 0, 0]} stackId="a" name="Facebook" />
              <Bar dataKey="instagram" fill="#8B5CF6" radius={[0, 0, 0, 0]} stackId="a" name="Instagram" />
              <Bar dataKey="direct" fill="#0EA5E9" radius={[4, 4, 0, 0]} stackId="a" name="Direct" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

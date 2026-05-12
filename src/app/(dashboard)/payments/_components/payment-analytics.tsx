"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { revenueTrend, paymentMethodDistribution, dailyTransactionVolume } from "@/mock/payments-data"

function ChartTooltip({ active, payload, label, formatter }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
  formatter?: (value: number, name: string) => string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
      {label && <p className="mb-1.5 text-xs text-slate-300">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-300">{p.name}:</span>
          <span className="font-semibold">{formatter ? formatter(p.value, p.name) : p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function PaymentAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 xl:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Revenue Trend (Last 30 Days)</h3>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<ChartTooltip formatter={(v) => `৳${v.toLocaleString("en-BD")}`} />}
                labelFormatter={(v) => new Date(v).toLocaleDateString("en-BD", { day: "numeric", month: "long", year: "numeric" })}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4F46E5"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Payment Methods</h3>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentMethodDistribution}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {paymentMethodDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const d = payload[0]
                  return (
                    <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
                      <p className="text-sm font-semibold">{d.name}: {d.value}%</p>
                    </div>
                  )
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 md:col-span-2 xl:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Daily Transaction Volume</h3>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyTransactionVolume} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => new Date(v).toLocaleDateString("en-BD", { day: "numeric", month: "short" })}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<ChartTooltip formatter={(v, name) => name === "count" ? `${v} transactions` : `৳${v.toLocaleString("en-BD")}`} />}
                labelFormatter={(v) => new Date(v).toLocaleDateString("en-BD", { day: "numeric", month: "long" })}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

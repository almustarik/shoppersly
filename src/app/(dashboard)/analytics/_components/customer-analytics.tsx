"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  customerAcquisition,
  customerSegments,
  customerLifetimeValue,
  repeatPurchaseRate,
} from "@/mock/analytics-data"

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
          <span className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function CustomerAnalytics() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Customer Acquisition</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerAcquisition} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-slate-600">
                      {value === "newCustomers" ? "New" : "Returning"}
                    </span>
                  )}
                />
                <Bar dataKey="newCustomers" fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" name="New" />
                <Bar dataKey="returning" fill="#4F46E5" radius={[4, 4, 0, 0]} stackId="a" name="Returning" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Customer Segments</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload[0]
                    return (
                      <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
                        <p className="text-sm font-semibold">{d.name}: {d.value}</p>
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
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Repeat Purchase Rate</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={repeatPurchaseRate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  domain={[20, 50]}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    return (
                      <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
                        <p className="mb-1 text-xs text-slate-300">{label}</p>
                        <p className="text-sm font-semibold">{payload[0].value}%</p>
                      </div>
                    )
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: "#4F46E5", r: 4 }}
                  activeDot={{ r: 6, stroke: "#4F46E5", strokeWidth: 2, fill: "white" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Customer Lifetime Value</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerLifetimeValue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="range"
                  tick={{ fill: "#64748B", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    return (
                      <div className="rounded-lg bg-[#0F172A] p-3 text-white shadow-lg">
                        <p className="mb-1 text-xs text-slate-300">{label}</p>
                        <p className="text-sm font-semibold">{payload[0].value} customers</p>
                      </div>
                    )
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {customerLifetimeValue.map((_, index) => (
                    <Cell
                      key={index}
                      fill={[
                        "#A5B4FC",
                        "#818CF8",
                        "#6366F1",
                        "#4F46E5",
                        "#4338CA",
                        "#3730A3",
                      ][index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

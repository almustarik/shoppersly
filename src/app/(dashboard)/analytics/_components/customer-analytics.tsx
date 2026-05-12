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
            {p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const CLV_COLORS = [
  "#A5B4FC",
  "#818CF8",
  "#6366F1",
  "#4F46E5",
  "#4338CA",
  "#3730A3",
]

export function CustomerAnalytics() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Customer acquisition stacked bar chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Customer Acquisition</h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={customerAcquisition}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <defs>
                  <linearGradient
                    id="cust-new-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient
                    id="cust-ret-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
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
                    <span className="text-xs text-muted-foreground">
                      {value === "newCustomers" ? "New" : "Returning"}
                    </span>
                  )}
                />
                <Bar
                  dataKey="newCustomers"
                  fill="url(#cust-new-grad)"
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                  name="New"
                />
                <Bar
                  dataKey="returning"
                  fill="url(#cust-ret-grad)"
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                  name="Returning"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Customer segments pie chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Customer Segments</h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
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
                      <div className="rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-2.5 shadow-xl">
                        <p className="text-sm font-semibold tabular-nums text-white">
                          {d.name}: {d.value}
                        </p>
                      </div>
                    )
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Repeat purchase rate line chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Repeat Purchase Rate</h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={repeatPurchaseRate}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
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
                      <div className="rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-2.5 shadow-xl">
                        <p className="mb-1 text-xs text-slate-400">{label}</p>
                        <p className="text-sm font-semibold tabular-nums text-white">
                          {payload[0].value}%
                        </p>
                      </div>
                    )
                  }}
                />
                <Line
                  type="natural"
                  dataKey="rate"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: "#4F46E5", r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: "#4F46E5",
                    strokeWidth: 2,
                    fill: "white",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Customer lifetime value bar chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">
              Customer Lifetime Value
            </h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={customerLifetimeValue}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
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
                      <div className="rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-2.5 shadow-xl">
                        <p className="mb-1 text-xs text-slate-400">{label}</p>
                        <p className="text-sm font-semibold tabular-nums text-white">
                          {payload[0].value} customers
                        </p>
                      </div>
                    )
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {customerLifetimeValue.map((_, index) => (
                    <Cell key={index} fill={CLV_COLORS[index]} />
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

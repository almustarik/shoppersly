"use client"

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ordersByStatus, ordersTrend } from "@/mock/analytics-data"

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

const RADIAN = Math.PI / 180
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCustomLabel(props: any) {
  const cx = Number(props.cx) || 0
  const cy = Number(props.cy) || 0
  const midAngle = Number(props.midAngle) || 0
  const outerRadius = Number(props.outerRadius) || 0
  const radius = outerRadius + 20
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#64748B"
      fontSize={11}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {props.name} ({props.value})
    </text>
  )
}

export function OrderAnalytics() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Orders by status pie chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Orders by Status</h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={ordersByStatus}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={renderCustomLabel}
                  labelLine={false}
                >
                  {ordersByStatus.map((entry, index) => (
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

        <div
          className="rounded-xl border border-border bg-card p-6"
          role="img"
          aria-label="Average order value trend line chart"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Average Order Value</h3>
          </div>
          <div className="min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={ordersTrend}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-BD", {
                      day: "numeric",
                    })
                  }
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `৳${v}`}
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    return (
                      <div className="rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-2.5 shadow-xl">
                        <p className="mb-1 text-xs text-slate-400">
                          {label
                            ? new Date(label as string).toLocaleDateString(
                                "en-BD",
                                { day: "numeric", month: "long" }
                              )
                            : ""}
                        </p>
                        <p className="text-sm font-semibold tabular-nums text-white">
                          ৳
                          {(payload[0].value as number)?.toLocaleString(
                            "en-BD"
                          )}
                        </p>
                      </div>
                    )
                  }}
                />
                <Line
                  type="natural"
                  dataKey="avgValue"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={false}
                  name="Avg Value"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl border border-border bg-card p-6"
        role="img"
        aria-label="Orders trend line chart"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Orders Trend</h3>
        </div>
        <div className="min-h-[280px]">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={ordersTrend}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <defs>
                <linearGradient
                  id="orders-area-grad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
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
              <Line
                type="natural"
                dataKey="orders"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={false}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

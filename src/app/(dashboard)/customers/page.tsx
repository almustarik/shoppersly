"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Users,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { customers, customerSegments } from "@/mock/customers-data"
import type { CustomerSegment } from "@/types"

const segmentConfig: Record<
  CustomerSegment,
  { label: string; className: string }
> = {
  vip: {
    label: "VIP",
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },
  regular: {
    label: "Regular",
    className: "bg-sky-50 text-sky-700 border-sky-200",
  },
  new: {
    label: "New",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "at-risk": {
    label: "At-risk",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
}

type SortField = "totalSpent" | "totalOrders" | "lastOrderDate"
type SortDir = "asc" | "desc"

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [sortField, setSortField] = useState<SortField>("totalSpent")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "desc" ? "asc" : "desc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const filteredCustomers = useMemo(() => {
    let result = customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSegment =
        selectedSegment === "all" || c.segment === selectedSegment
      return matchesSearch && matchesSegment
    })

    result.sort((a, b) => {
      let cmp = 0
      if (sortField === "totalSpent") cmp = a.totalSpent - b.totalSpent
      else if (sortField === "totalOrders") cmp = a.totalOrders - b.totalOrders
      else cmp = new Date(a.lastOrderDate).getTime() - new Date(b.lastOrderDate).getTime()
      return sortDir === "desc" ? -cmp : cmp
    })

    return result
  }, [searchQuery, selectedSegment, sortField, sortDir])

  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: customers.length }
    customers.forEach((c) => {
      counts[c.segment] = (counts[c.segment] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">Customers</h1>
          <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-0.5 text-[12px] font-medium text-[#64748B] tabular-nums">
            {customers.length}
          </span>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
          <Plus className="size-4 mr-1.5" />
          Add Customer
        </Button>
      </motion.div>

      {/* Segment Tabs - Underline Style */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.03 }}
        className="flex items-center gap-6 border-b border-[#E2E8F0] overflow-x-auto"
      >
        {customerSegments.map((seg) => {
          const isActive = selectedSegment === seg.value
          const count = segmentCounts[seg.value] || 0
          return (
            <button
              key={seg.value}
              onClick={() => setSelectedSegment(seg.value)}
              className={`relative inline-flex items-center gap-2 pb-3 text-[14px] font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "text-[#4F46E5]"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {seg.label}
              <span className={`text-[12px] tabular-nums ${isActive ? "text-[#4F46E5]" : "text-[#64748B]"}`}>
                {count}
              </span>
              {isActive && (
                <motion.div
                  layoutId="segment-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F46E5] rounded-full"
                />
              )}
            </button>
          )
        })}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.06 }}
        className="relative max-w-sm"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
        <Input
          placeholder="Search by name, phone, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-10 rounded-lg bg-[#F8FAFC]/50 border-[#E2E8F0]"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.09 }}
      >
        <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8FAFC] border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Customer</TableHead>
                <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Email</TableHead>
                <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                  <button
                    className="inline-flex items-center gap-1 hover:text-[#0F172A] transition-colors"
                    onClick={() => toggleSort("totalOrders")}
                  >
                    Orders
                    <ArrowUpDown className="size-3" />
                  </button>
                </TableHead>
                <TableHead className="text-right text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                  <button
                    className="inline-flex items-center gap-1 hover:text-[#0F172A] transition-colors ml-auto"
                    onClick={() => toggleSort("totalSpent")}
                  >
                    Total Spent
                    <ArrowUpDown className="size-3" />
                  </button>
                </TableHead>
                <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Segment</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, i) => {
                const seg = segmentConfig[customer.segment]

                return (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="border-b border-[#F1F5F9] transition-colors hover:bg-[#F8FAFC]/50"
                  >
                    <TableCell>
                      <Link
                        href={`/customers/${customer.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="flex items-center justify-center size-8 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[11px] font-semibold shrink-0">
                          {getInitials(customer.name)}
                        </div>
                        <div>
                          <p className="font-medium text-[14px] text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                            {customer.name}
                          </p>
                          <p className="text-[13px] text-[#64748B]">
                            {customer.phone}
                          </p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-[13px] text-[#64748B]">
                      {customer.email}
                    </TableCell>
                    <TableCell className="font-medium text-[14px] text-[#0F172A] tabular-nums">
                      {customer.totalOrders}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-[14px] text-[#0F172A] tabular-nums">
                      {formatPrice(customer.totalSpent)}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${seg.className}`}>
                        {seg.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon-xs">
                              <MoreHorizontal className="size-4 text-[#64748B]" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem render={<Link href={`/customers/${customer.id}`} />}>
                            <Eye className="size-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="size-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                )
              })}
            </TableBody>
          </Table>
          {filteredCustomers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="size-10 text-[#64748B]/30 mb-3" />
              <p className="text-[14px] font-medium text-[#64748B]">
                No customers found
              </p>
              <p className="text-[13px] text-[#64748B] mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

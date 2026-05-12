"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
import { EmptyState } from "@/components/ui/empty-state"
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

function CustomerMobileCard({ customer }: { customer: typeof customers[0] }) {
  const seg = segmentConfig[customer.segment]

  return (
    <Link
      href={`/customers/${customer.id}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
    >
      <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3 transition-colors duration-150 hover:bg-[#F8FAFC]/50">
        <div className="flex items-center justify-center size-8 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[11px] font-semibold shrink-0">
          {getInitials(customer.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-sm text-[#0F172A] truncate group-hover:text-[#4F46E5] transition-colors duration-150">
              {customer.name}
            </h3>
            <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${seg.className}`} title={`Segment: ${seg.label}`}>
              {seg.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{customer.email}</p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-muted-foreground tabular-nums">
              {customer.totalOrders} orders
            </span>
            <span className="font-semibold text-sm text-[#0F172A] tabular-nums">
              {formatPrice(customer.totalSpent)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">Customers</h1>
          <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-0.5 text-xs font-medium text-muted-foreground tabular-nums">
            {customers.length}
          </span>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors duration-150">
          <Plus className="size-4 mr-1.5" />
          Add Customer
        </Button>
      </motion.div>

      {/* Segment Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.03 }}
        className="flex items-center gap-6 border-b border-[#E2E8F0] overflow-x-auto"
        role="tablist"
        aria-label="Customer segments"
      >
        {customerSegments.map((seg) => {
          const isActive = selectedSegment === seg.value
          const count = segmentCounts[seg.value] || 0
          return (
            <button
              key={seg.value}
              onClick={() => setSelectedSegment(seg.value)}
              role="tab"
              aria-selected={isActive}
              aria-controls="customers-table"
              className={`relative inline-flex items-center gap-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-t-sm ${
                isActive
                  ? "text-[#4F46E5]"
                  : "text-muted-foreground hover:text-[#0F172A]"
              }`}
            >
              {seg.label}
              <span className={`text-xs tabular-nums ${isActive ? "text-[#4F46E5]" : "text-muted-foreground"}`}>
                {count}
              </span>
              {isActive && (
                <motion.div
                  layoutId="segment-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F46E5] rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder="Search by name, phone, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          role="searchbox"
          aria-label="Search customers"
          className="pl-9 h-10 rounded-lg bg-[#F8FAFC]/50 border-[#E2E8F0] transition-colors duration-150"
        />
      </motion.div>

      {/* Table / Cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.09 }}
        id="customers-table"
        role="tabpanel"
      >
        {filteredCustomers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No customers found"
            description="Try adjusting your search or filter to find what you're looking for."
          />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F8FAFC] border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Customer</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Email</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      <button
                        className="inline-flex items-center gap-1 hover:text-[#0F172A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
                        onClick={() => toggleSort("totalOrders")}
                        aria-label="Sort by orders"
                      >
                        Orders
                        <ArrowUpDown className="size-3" />
                      </button>
                    </TableHead>
                    <TableHead className="text-right text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      <button
                        className="inline-flex items-center gap-1 hover:text-[#0F172A] transition-colors duration-150 ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
                        onClick={() => toggleSort("totalSpent")}
                        aria-label="Sort by total spent"
                      >
                        Total Spent
                        <ArrowUpDown className="size-3" />
                      </button>
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Segment</TableHead>
                    <TableHead className="w-10" />
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
                        className="border-b border-[#F1F5F9] transition-colors duration-150 hover:bg-[#F8FAFC]/50"
                      >
                        <TableCell>
                          <Link
                            href={`/customers/${customer.id}`}
                            className="flex items-center gap-3 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                          >
                            <div className="flex items-center justify-center size-8 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[11px] font-semibold shrink-0">
                              {getInitials(customer.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm text-[#0F172A] group-hover:text-[#4F46E5] transition-colors duration-150 truncate max-w-[180px]">
                                {customer.name}
                              </p>
                              <p className="text-[13px] text-muted-foreground truncate max-w-[180px]">
                                {customer.phone}
                              </p>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="text-[13px] text-muted-foreground truncate max-w-[200px]">
                          {customer.email}
                        </TableCell>
                        <TableCell className="font-medium text-sm text-[#0F172A] tabular-nums">
                          {customer.totalOrders}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-sm text-[#0F172A] tabular-nums">
                          {formatPrice(customer.totalSpent)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${seg.className}`}
                            title={`Segment: ${seg.label}`}
                          >
                            {seg.label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button variant="ghost" size="icon-xs" aria-label={`Actions for ${customer.name}`}>
                                  <MoreHorizontal className="size-4 text-muted-foreground" />
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
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-2">
              {filteredCustomers.map((customer, i) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  <CustomerMobileCard customer={customer} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

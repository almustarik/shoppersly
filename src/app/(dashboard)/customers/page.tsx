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
  Crown,
  UserCheck,
  UserPlus,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
  { label: string; icon: typeof Crown; className: string }
> = {
  vip: {
    label: "VIP",
    icon: Crown,
    className: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400",
  },
  regular: {
    label: "Regular",
    icon: UserCheck,
    className: "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400",
  },
  new: {
    label: "New",
    icon: UserPlus,
    className: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400",
  },
  "at-risk": {
    label: "At-risk",
    icon: AlertCircle,
    className: "bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-400",
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {customers.length} customers across all segments
          </p>
        </div>
        <Button>
          <Plus className="size-4 mr-1.5" />
          Add Customer
        </Button>
      </div>

      {/* Segment Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {customerSegments.map((seg) => {
          const isActive = selectedSegment === seg.value
          const count = segmentCounts[seg.value] || 0
          return (
            <button
              key={seg.value}
              onClick={() => setSelectedSegment(seg.value)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {seg.label}
              <span
                className={`inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>
                <button
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  onClick={() => toggleSort("totalOrders")}
                >
                  Orders
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  onClick={() => toggleSort("totalSpent")}
                >
                  Total Spent
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <button
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  onClick={() => toggleSort("lastOrderDate")}
                >
                  Last Order
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>Segment</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer, i) => {
              const seg = segmentConfig[customer.segment]
              const SegIcon = seg.icon

              return (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.02 }}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <Link
                      href={`/customers/${customer.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <Avatar size="default">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                          {customer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {customer.city}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {customer.phone}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {customer.email}
                  </TableCell>
                  <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(customer.totalSpent)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDate(customer.lastOrderDate)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${seg.className}`}
                    >
                      <SegIcon className="size-3" />
                      {seg.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal className="size-4" />
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
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="size-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              No customers found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

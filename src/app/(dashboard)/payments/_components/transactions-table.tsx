"use client"

import * as React from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { transactions, type Transaction, type TransactionStatus, type PaymentMethod } from "@/mock/payments-data"

const statusStyles: Record<TransactionStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  Pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  Failed: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  Refunded: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

const methodStyles: Record<PaymentMethod, { bg: string; text: string }> = {
  bKash: { bg: "bg-pink-50 dark:bg-pink-950/40", text: "text-pink-700 dark:text-pink-400" },
  Nagad: { bg: "bg-orange-50 dark:bg-orange-950/40", text: "text-orange-700 dark:text-orange-400" },
  COD: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-400" },
  Bank: { bg: "bg-indigo-50 dark:bg-indigo-950/40", text: "text-indigo-700 dark:text-indigo-400" },
  Stripe: { bg: "bg-violet-50 dark:bg-violet-950/40", text: "text-violet-700 dark:text-violet-400" },
}

const ITEMS_PER_PAGE = 8

export function TransactionsTable() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [page, setPage] = React.useState(1)

  const filtered = React.useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.customer.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.orderId.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "all" || t.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { if (v) { setStatusFilter(v); setPage(1) } }}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
            <SelectItem value="Refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount (৳)</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-mono text-xs">{t.id}</TableCell>
                <TableCell className="font-medium">{t.customer}</TableCell>
                <TableCell className="text-right font-mono">
                  ৳{t.amount.toLocaleString("en-BD")}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${methodStyles[t.method].bg} ${methodStyles[t.method].text}`}>
                    {t.method}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[t.status]}`}>
                    {t.status}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-xs">{t.orderId}</TableCell>
                <TableCell className="text-muted-foreground">{t.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft />
          </Button>
          <span className="px-2 text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { transactions, type TransactionStatus, type PaymentMethod } from "@/mock/payments-data"

const statusStyles: Record<TransactionStatus, string> = {
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Failed: "border-rose-200 bg-rose-50 text-rose-700",
  Refunded: "border-slate-200 bg-slate-50 text-slate-600",
}

const methodStyles: Record<PaymentMethod, string> = {
  bKash: "border-pink-200 bg-pink-50 text-pink-700",
  Nagad: "border-orange-200 bg-orange-50 text-orange-700",
  COD: "border-slate-200 bg-slate-100 text-slate-600",
  Bank: "border-indigo-200 bg-indigo-50 text-indigo-700",
  Stripe: "border-violet-200 bg-violet-50 text-violet-700",
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
    <div className="rounded-xl border border-[#E2E8F0] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#E2E8F0] p-4 sm:flex-row sm:items-center sm:justify-between">
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
          <SelectTrigger className="w-[160px]">
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

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Transaction ID</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Customer</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider text-right">Amount (৳)</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Method</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Status</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Order ID</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((t) => (
            <TableRow key={t.id} className="border-[#E2E8F0]">
              <TableCell className="font-mono text-xs font-medium">{t.id}</TableCell>
              <TableCell className="font-medium">{t.customer}</TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                ৳{t.amount.toLocaleString("en-BD")}
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${methodStyles[t.method]}`}>
                  {t.method}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[t.status]}`}>
                  {t.status}
                </span>
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{t.orderId}</TableCell>
              <TableCell className="text-muted-foreground">{t.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-[#E2E8F0] px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="px-3 text-sm tabular-nums text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { Search, ChevronLeft, ChevronRight, Eye, CreditCard } from "lucide-react"
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
import { EmptyState } from "@/components/ui/empty-state"
import {
  transactions,
  type TransactionStatus,
  type PaymentMethod,
} from "@/mock/payments-data"

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="h-10 rounded-lg pl-9 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
            aria-label="Search transactions"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            if (v) {
              setStatusFilter(v)
              setPage(1)
            }
          }}
        >
          <SelectTrigger className="w-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20 sm:w-[160px]">
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

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Transaction ID
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Customer
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-right text-[12px] uppercase tracking-wider">
                Amount (৳)
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Method
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Order ID
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="w-10 bg-muted/50">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((t) => (
              <TableRow
                key={t.id}
                className="group border-border transition-colors duration-100 hover:bg-muted/50"
              >
                <TableCell className="max-w-[120px] truncate font-mono text-xs font-medium">
                  {t.id}
                </TableCell>
                <TableCell className="max-w-[160px] truncate font-medium">
                  {t.customer}
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  ৳{t.amount.toLocaleString("en-BD")}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-150 ${methodStyles[t.method]}`}
                    title={`Payment via ${t.method}`}
                  >
                    {t.method}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[t.status]}`}
                  >
                    {t.status}
                  </span>
                </TableCell>
                <TableCell className="max-w-[100px] truncate font-mono text-xs text-muted-foreground">
                  {t.orderId}
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {t.date}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 opacity-0 transition-all duration-150 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary/20 group-hover:opacity-100"
                    aria-label={`View transaction ${t.id}`}
                  >
                    <Eye className="size-4" aria-hidden="true" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filtered.length === 0 && (
        <EmptyState
          icon={CreditCard}
          title="No transactions found"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      )}

      {filtered.length > 0 && (
        <nav
          className="flex items-center justify-between border-t border-border px-4 py-3"
          aria-label="Pagination"
        >
          <p className="text-sm tabular-nums text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>
            –
            <span className="font-medium text-foreground">
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <span className="min-w-[4rem] px-2 text-center text-sm tabular-nums text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="size-8 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      )}
    </section>
  )
}

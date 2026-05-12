"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Printer,
  Truck,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EmptyState } from "@/components/ui/empty-state"

import type { Order } from "@/mock/orders-data"
import { COURIER_LABELS } from "@/mock/orders-data"
import { OrderStatusBadge, PaymentStatusBadge } from "./order-status-badge"

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 44,
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order ID
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original.id}`}
        className="font-mono text-[13px] font-medium text-primary hover:underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
      >
        #{row.getValue("orderId")}
      </Link>
    ),
    size: 100,
  },
  {
    id: "customer",
    accessorFn: (row) => row.customer.name,
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Customer
      </span>
    ),
    cell: ({ row }) => (
      <div className="max-w-[180px]">
        <p className="truncate text-sm font-medium text-foreground">{row.original.customer.name}</p>
        <p className="truncate text-[13px] text-muted-foreground mt-0.5">{row.original.customer.phone}</p>
      </div>
    ),
  },
  {
    id: "products",
    accessorFn: (row) => row.items.length,
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Items
      </span>
    ),
    cell: ({ row }) => (
      <span className="truncate text-sm text-muted-foreground">
        {row.original.items.length} item{row.original.items.length > 1 ? "s" : ""}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-150 ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="block text-right font-medium tabular-nums text-sm">
        ৳{(row.getValue("total") as number).toLocaleString("en-BD")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Status
      </span>
    ),
    cell: ({ row }) => <OrderStatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "paymentStatus",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Payment
      </span>
    ),
    cell: ({ row }) => <PaymentStatusBadge status={row.getValue("paymentStatus")} />,
  },
  {
    accessorKey: "courier",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Courier
      </span>
    ),
    cell: ({ row }) => {
      const courier = row.original.courier
      return courier ? (
        <span className="truncate text-sm">{COURIER_LABELS[courier]}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="truncate text-sm text-muted-foreground whitespace-nowrap">
        {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    size: 60,
    cell: ({ row }) => (
      <div className="flex justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-150">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex size-8 items-center justify-center rounded-md hover:bg-muted transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            aria-label="Row actions"
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem render={<Link href={`/orders/${row.original.id}`} />}>
              <Eye className="size-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer className="size-4" />
              Print Invoice
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Truck className="size-4" />
              Track Shipment
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <XCircle className="size-4" />
              Cancel Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

interface OrdersTableProps {
  data: Order[]
  rowSelection: RowSelectionState
  onRowSelectionChange: React.Dispatch<React.SetStateAction<RowSelectionState>>
}

export function OrdersTable({ data, rowSelection, onRowSelectionChange }: OrdersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true },
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pageSize, setPageSize] = React.useState(10)
  const [pageIndex, setPageIndex] = React.useState(0)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === "function"
        ? updater({ pageIndex, pageSize })
        : updater
      setPageIndex(newPagination.pageIndex)
      setPageSize(newPagination.pageSize)
    },
  })

  const totalRows = table.getFilteredRowModel().rows.length
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto -mx-px">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-[#F8FAFC] dark:bg-muted/30 hover:bg-[#F8FAFC] dark:hover:bg-muted/30 border-b"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      scope="col"
                      className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group/row border-b border-border/50 hover:bg-[#F8FAFC]/50 dark:hover:bg-muted/10 transition-colors duration-100 data-[state=selected]:bg-primary/3"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center p-0">
                    <EmptyState
                      title="No orders match your filters"
                      description="Try adjusting your search or filter criteria"
                      className="min-h-[200px] py-12"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between h-10">
        <p className="text-sm text-muted-foreground tabular-nums">
          Showing {startRow}–{endRow} of {totalRows}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v))
                setPageIndex(0)
              }}
            >
              <SelectTrigger
                className="h-8 w-[70px] rounded-lg transition-colors duration-150"
                size="sm"
                aria-label="Rows per page"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-lg transition-colors duration-150 active:scale-[0.98]"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-lg transition-colors duration-150 active:scale-[0.98]"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

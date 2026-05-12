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

import type { Order } from "@/mock/orders-data"
import { COURIER_LABELS } from "@/mock/orders-data"
import { OrderStatusBadge, PaymentStatusBadge } from "./order-status-badge"

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order ID
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original.id}`}
        className="font-mono text-[13px] font-medium text-[#4F46E5] hover:underline"
      >
        #{row.getValue("orderId")}
      </Link>
    ),
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
      <div className="min-w-[140px]">
        <p className="text-sm font-medium text-foreground">{row.original.customer.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{row.original.customer.phone}</p>
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
      <span className="text-sm text-muted-foreground">
        {row.original.items.length} item{row.original.items.length > 1 ? "s" : ""}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors ml-auto"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="block text-right font-semibold tabular-nums text-sm">
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
        <span className="text-sm">{COURIER_LABELS[courier]}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex size-8 items-center justify-center rounded-md hover:bg-muted"
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
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
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
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
                  className="group border-b border-[#F1F5F9] hover:bg-[#F8FAFC]/50 transition-colors data-[state=selected]:bg-[#4F46E5]/5 data-[state=selected]:border-l-2 data-[state=selected]:border-l-[#4F46E5]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5 px-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <p className="text-sm font-medium">No orders found</p>
                    <p className="text-xs">Try adjusting your filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startRow}-{endRow} of {totalRows}
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
              <SelectTrigger className="h-8 w-[70px] rounded-lg border-[#E2E8F0]" size="sm">
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
              className="size-8 rounded-lg"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-lg"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

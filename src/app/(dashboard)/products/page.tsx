"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Package,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { products, productCategories } from "@/mock/products-data"

type ViewMode = "grid" | "table"

const statusConfig = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  draft: { label: "Draft", className: "bg-amber-50 text-amber-700 border-amber-200" },
  archived: { label: "Archived", className: "bg-zinc-50 text-zinc-600 border-zinc-200" },
}

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`
}

function StockIndicator({ stock, threshold }: { stock: number; threshold: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] text-rose-600">
        <span className="size-1.5 rounded-full bg-rose-500" />
        Out of stock
      </span>
    )
  }
  if (stock <= threshold) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] text-amber-600">
        <span className="size-1.5 rounded-full bg-amber-500" />
        Low: {stock} left
      </span>
    )
  }
  return (
    <span className="text-[13px] text-[#64748B]">{stock} in stock</span>
  )
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const status = statusConfig[product.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group cursor-pointer rounded-xl border border-[#E2E8F0] bg-white p-0 transition-all duration-200 hover:border-[#4F46E5]/20">
          <div className="relative">
            <div className="flex items-center justify-center rounded-t-xl bg-[#F8FAFC] aspect-4/3">
              <Package className="size-12 text-[#64748B]/30" />
            </div>
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${status.className}`}>
                {status.label}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-medium text-[14px] leading-snug line-clamp-2 text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
              {product.name}
            </h3>
            <p className="text-[13px] text-[#64748B]">{product.category}</p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-[15px] tabular-nums text-[#0F172A]">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-[12px] text-[#64748B] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <StockIndicator stock={product.stock} threshold={product.lowStockThreshold} />
              <span className="text-[12px] text-[#64748B]">{product.totalSold} sold</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const activeCount = products.filter((p) => p.status === "active").length

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
          <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">Products</h1>
          <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-0.5 text-[12px] font-medium text-[#64748B] tabular-nums">
            {products.length} total &middot; {activeCount} active
          </span>
        </div>
        <Link href="/products/create">
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
            <Plus className="size-4 mr-1.5" />
            Add Product
          </Button>
        </Link>
      </motion.div>

      {/* Filters & View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.03 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-lg bg-[#F8FAFC]/50 border-[#E2E8F0]"
            />
          </div>
          <Select value={selectedCategory} onValueChange={(v) => v && setSelectedCategory(v)}>
            <SelectTrigger className="w-[160px] h-10 border-[#E2E8F0]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {productCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center justify-center size-8 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-[#F8FAFC] text-[#0F172A]"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center justify-center size-8 rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-[#F8FAFC] text-[#0F172A]"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <List className="size-4" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F8FAFC] border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                    <TableHead className="w-12 text-[12px] uppercase tracking-wider font-semibold text-[#64748B]"></TableHead>
                    <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Name</TableHead>
                    <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">SKU</TableHead>
                    <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Category</TableHead>
                    <TableHead className="text-right text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Price</TableHead>
                    <TableHead className="text-right text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Stock</TableHead>
                    <TableHead className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Status</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product, i) => {
                    const status = statusConfig[product.status]

                    return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                        className="border-b border-[#F1F5F9] transition-colors hover:bg-[#F8FAFC]/50"
                      >
                        <TableCell>
                          <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC]">
                            <Package className="size-4 text-[#64748B]/50" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/products/${product.id}`}
                            className="font-medium text-[14px] text-[#0F172A] hover:text-[#4F46E5] transition-colors"
                          >
                            {product.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-[#64748B] font-mono text-[12px]">
                          {product.sku}
                        </TableCell>
                        <TableCell>
                          <span className="text-[13px] text-[#64748B]">{product.category}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-[14px] tabular-nums text-[#0F172A]">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="block text-[12px] text-[#64748B] line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <StockIndicator stock={product.stock} threshold={product.lowStockThreshold} />
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${status.className}`}>
                            {status.label}
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
                              <DropdownMenuItem render={<Link href={`/products/${product.id}`} />}>
                                <Eye className="size-4" />
                                View
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
              {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Package className="size-10 text-[#64748B]/30 mb-3" />
                  <p className="text-[14px] font-medium text-[#64748B]">No products found</p>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    Try adjusting your search or filter
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProducts.length === 0 && viewMode === "grid" && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="size-12 text-[#64748B]/30 mb-3" />
          <p className="text-[14px] font-medium text-[#64748B]">No products found</p>
          <p className="text-[13px] text-[#64748B] mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      )}
    </div>
  )
}

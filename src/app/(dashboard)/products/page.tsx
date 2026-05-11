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
  AlertTriangle,
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
  active: { label: "Active", variant: "default" as const, className: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" },
  draft: { label: "Draft", variant: "secondary" as const, className: "bg-amber-500/10 text-amber-700 ring-amber-500/20" },
  archived: { label: "Archived", variant: "outline" as const, className: "bg-zinc-500/10 text-zinc-600 ring-zinc-500/20" },
}

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`
}

function ProductImagePlaceholder() {
  return (
    <div className="flex items-center justify-center bg-muted rounded-lg aspect-square">
      <Package className="size-8 text-muted-foreground/40" />
    </div>
  )
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const status = statusConfig[product.status]
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold
  const isOutOfStock = product.stock === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.id}`}>
        <Card className="group cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-primary/20 hover:shadow-md">
          <CardContent className="p-0">
            <div className="relative">
              <ProductImagePlaceholder />
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${status.className}`}>
                  {status.label}
                </span>
              </div>
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-t-lg">
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">{product.category}</p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-semibold text-base">{formatPrice(product.price)}</span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  {isLowStock ? (
                    <span className="flex items-center gap-1 text-xs text-amber-600">
                      <AlertTriangle className="size-3" />
                      Low: {product.stock} left
                    </span>
                  ) : isOutOfStock ? (
                    <span className="text-xs text-red-600 font-medium">Out of stock</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{product.totalSold} sold</span>
              </div>
            </div>
          </CardContent>
        </Card>
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {products.length} products &middot; {activeCount} active
          </p>
        </div>
        <Link href="/products/create">
          <Button>
            <Plus className="size-4 mr-1.5" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={(v) => v && setSelectedCategory(v)}>
            <SelectTrigger className="w-[160px]">
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
        <div className="flex items-center gap-1 rounded-lg border p-0.5">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("table")}
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

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
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product, i) => {
                    const status = statusConfig[product.status]
                    const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold
                    const isOutOfStock = product.stock === 0

                    return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                            <Package className="size-4 text-muted-foreground/60" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/products/${product.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {product.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">
                          {product.sku}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatPrice(product.price)}
                          {product.compareAtPrice && (
                            <span className="block text-xs text-muted-foreground line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {isOutOfStock ? (
                            <span className="text-red-600 font-medium">0</span>
                          ) : isLowStock ? (
                            <span className="flex items-center justify-end gap-1 text-amber-600">
                              <AlertTriangle className="size-3" />
                              {product.stock}
                            </span>
                          ) : (
                            product.stock
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${status.className}`}>
                            {status.label}
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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="size-10 text-muted-foreground/40 mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">No products found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try adjusting your search or filter
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProducts.length === 0 && viewMode === "grid" && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="size-12 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No products found</p>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      )}
    </div>
  )
}

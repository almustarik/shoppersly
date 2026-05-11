"use client"

import { use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Package,
  Pencil,
  Tag,
  BarChart3,
  Eye,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Layers,
  Palette,
  Ruler,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { products } from "@/mock/products-data"

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`
}

function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

const statusConfig = {
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" },
  draft: { label: "Draft", className: "bg-amber-500/10 text-amber-700 ring-amber-500/20" },
  archived: { label: "Archived", className: "bg-zinc-500/10 text-zinc-600 ring-zinc-500/20" },
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Package className="size-12 text-muted-foreground/40 mb-4" />
        <h2 className="text-lg font-semibold">Product not found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="size-4 mr-1.5" />
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  const status = statusConfig[product.status]
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold
  const isOutOfStock = product.stock === 0
  const profitMargin = product.costPrice
    ? (((product.price - product.costPrice) / product.price) * 100).toFixed(0)
    : null

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb & Actions */}
      <motion.div {...fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/products">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${status.className}`}>
                {status.label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              SKU: {product.sku} &middot; {product.category}
            </p>
          </div>
        </div>
        <Button>
          <Pencil className="size-4 mr-1.5" />
          Edit Product
        </Button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Image + Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Image Gallery */}
          <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-4 sm:col-span-3">
                    <div className="flex items-center justify-center rounded-xl bg-muted aspect-[4/3]">
                      <Package className="size-16 text-muted-foreground/30" />
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-1 flex sm:flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex flex-1 items-center justify-center rounded-lg bg-muted aspect-square border-2 border-transparent hover:border-primary/30 transition-colors cursor-pointer"
                      >
                        <Package className="size-6 text-muted-foreground/20" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Layers className="size-4" />
                    Variants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.variants.map((variant) => (
                      <div key={variant.id}>
                        <div className="flex items-center gap-2 mb-2">
                          {variant.type === "color" ? (
                            <Palette className="size-4 text-muted-foreground" />
                          ) : (
                            <Ruler className="size-4 text-muted-foreground" />
                          )}
                          <span className="text-sm font-medium">{variant.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {variant.values.length} options
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {variant.values.map((value) => (
                            <span
                              key={value}
                              className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium"
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Performance */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="size-4" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-muted/60 p-4 text-center">
                    <ShoppingCart className="size-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{formatNumber(product.totalSold)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Total Sold</p>
                  </div>
                  <div className="rounded-xl bg-muted/60 p-4 text-center">
                    <TrendingUp className="size-5 text-emerald-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{formatPrice(product.revenue)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Revenue</p>
                  </div>
                  <div className="rounded-xl bg-muted/60 p-4 text-center">
                    <Eye className="size-5 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{formatNumber(product.views)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: Pricing + Inventory */}
        <div className="flex flex-col gap-6">
          {/* Pricing */}
          <motion.div {...fadeUp} transition={{ delay: 0.08 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tag className="size-4" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Selling Price</span>
                  <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                </div>
                {product.compareAtPrice && (
                  <>
                    <Separator />
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">Compare at Price</span>
                      <span className="text-sm line-through text-muted-foreground">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Discount</span>
                      <Badge className="bg-emerald-500/10 text-emerald-700">
                        {Math.round(
                          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
                        )}
                        % off
                      </Badge>
                    </div>
                  </>
                )}
                {product.costPrice && (
                  <>
                    <Separator />
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">Cost Price</span>
                      <span className="text-sm font-medium">{formatPrice(product.costPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Profit Margin</span>
                      <span className="text-sm font-semibold text-emerald-700">{profitMargin}%</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Inventory */}
          <motion.div {...fadeUp} transition={{ delay: 0.12 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="size-4" />
                  Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Stock</span>
                  <span className={`text-lg font-bold ${isOutOfStock ? "text-red-600" : isLowStock ? "text-amber-600" : ""}`}>
                    {product.stock} units
                  </span>
                </div>
                {(isLowStock || isOutOfStock) && (
                  <div
                    className={`flex items-center gap-2 rounded-lg p-3 ${
                      isOutOfStock
                        ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                    }`}
                  >
                    <AlertTriangle className="size-4 shrink-0" />
                    <span className="text-xs font-medium">
                      {isOutOfStock
                        ? "This product is out of stock"
                        : `Low stock alert — only ${product.stock} units remaining`}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Low Stock Threshold</span>
                  <span className="text-sm font-medium">{product.lowStockThreshold} units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dates */}
          <motion.div {...fadeUp} transition={{ delay: 0.16 }}>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Created</span>
                  <span className="text-xs font-medium">
                    {new Date(product.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Last Updated</span>
                  <span className="text-xs font-medium">
                    {new Date(product.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

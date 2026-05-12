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
import { products } from "@/mock/products-data"
import { EmptyState } from "@/components/ui/empty-state"

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`
}

function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

const statusConfig = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  draft: { label: "Draft", className: "bg-amber-50 text-amber-700 border-amber-200" },
  archived: { label: "Archived", className: "bg-zinc-50 text-zinc-600 border-zinc-200" },
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
        <EmptyState
          icon={Package}
          title="Product not found"
          description="The product you're looking for doesn't exist or has been removed."
          actionLabel="Back to Products"
          onAction={() => {}}
        />
        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors duration-150 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 px-2 py-1"
        >
          <ArrowLeft className="size-4" />
          Back to Products
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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="flex items-center justify-center size-9 rounded-lg border border-[#E2E8F0] text-muted-foreground hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            aria-label="Back to products"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">{product.name}</h1>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${status.className}`}>
                {status.label}
              </span>
            </div>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              SKU: {product.sku} &middot; {product.category}
            </p>
          </div>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors duration-150">
          <Pencil className="size-4 mr-1.5" />
          Edit Product
        </Button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.03 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-4 sm:col-span-3">
                  <div className="flex items-center justify-center rounded-xl bg-muted aspect-4/3">
                    <Package className="size-16 text-muted-foreground/20" />
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-1 flex sm:flex-col gap-3">
                  {[1, 2, 3].map((i) => (
                    <button
                      key={i}
                      className="flex flex-1 items-center justify-center rounded-xl bg-muted aspect-square border border-[#E2E8F0] hover:border-[#4F46E5]/30 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                      aria-label={`View image ${i}`}
                    >
                      <Package className="size-6 text-muted-foreground/20" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                Description
              </h3>
              <p className="text-sm font-medium leading-relaxed text-[#0F172A]/80">
                {product.description}
              </p>
            </div>
          </motion.div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.09 }}
            >
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="size-4 text-muted-foreground" />
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    Variants
                  </h3>
                </div>
                <div className="space-y-4">
                  {product.variants.map((variant) => (
                    <div key={variant.id}>
                      <div className="flex items-center gap-2 mb-2">
                        {variant.type === "color" ? (
                          <Palette className="size-4 text-muted-foreground" />
                        ) : (
                          <Ruler className="size-4 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium text-[#0F172A]">{variant.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({variant.values.length} options)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {variant.values.map((value) => (
                          <span
                            key={value}
                            className="inline-flex items-center rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 text-[13px] font-medium text-[#0F172A] transition-colors duration-150 hover:bg-[#E2E8F0]/60 hover:border-[#4F46E5]/20 cursor-default"
                            tabIndex={0}
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.12 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="size-4 text-muted-foreground" />
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Performance
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-[#E2E8F0] p-4 text-center">
                  <ShoppingCart className="size-5 text-[#4F46E5] mx-auto mb-2" />
                  <p className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatNumber(product.totalSold)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Total Sold</p>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] p-4 text-center">
                  <TrendingUp className="size-5 text-[#10B981] mx-auto mb-2" />
                  <p className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatPrice(product.revenue)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Revenue</p>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] p-4 text-center">
                  <Eye className="size-5 text-[#4F46E5] mx-auto mb-2" />
                  <p className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatNumber(product.views)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Views</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="size-4 text-muted-foreground" />
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Pricing
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Selling Price</span>
                  <span className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatPrice(product.price)}</span>
                </div>
                {product.compareAtPrice && (
                  <>
                    <div className="h-px bg-[#F1F5F9]" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Compare at</span>
                      <span className="text-sm font-medium line-through text-muted-foreground tabular-nums">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Discount</span>
                      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        {Math.round(
                          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
                        )}% off
                      </span>
                    </div>
                  </>
                )}
                {product.costPrice && (
                  <>
                    <div className="h-px bg-[#F1F5F9]" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Cost Price</span>
                      <span className="text-sm font-medium text-[#0F172A] tabular-nums">{formatPrice(product.costPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Margin</span>
                      <span className="text-sm font-semibold text-[#10B981] tabular-nums">{profitMargin}%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Inventory */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.09 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="size-4 text-muted-foreground" />
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Inventory
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Stock</span>
                  <span className={`text-[18px] font-bold tabular-nums ${isOutOfStock ? "text-rose-600" : isLowStock ? "text-amber-600" : "text-[#0F172A]"}`}>
                    {product.stock} units
                  </span>
                </div>
                {(isLowStock || isOutOfStock) && (
                  <div
                    role="alert"
                    className={`flex items-center gap-2 rounded-xl p-3 ${
                      isOutOfStock
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
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
                <div className="h-px bg-[#F1F5F9]" />
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Threshold</span>
                  <span className="text-sm font-medium text-[#0F172A] tabular-nums">{product.lowStockThreshold} units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Category</span>
                  <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dates */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.12 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Created</span>
                <span className="text-sm font-medium text-[#0F172A]">
                  {new Date(product.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Updated</span>
                <span className="text-sm font-medium text-[#0F172A]">
                  {new Date(product.updatedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

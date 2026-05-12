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
import { products } from "@/mock/products-data"

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
        <Package className="size-12 text-[#64748B]/30 mb-4" />
        <h2 className="text-lg font-semibold text-[#0F172A]">Product not found</h2>
        <p className="text-[14px] text-[#64748B] mt-1">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products" className="mt-4">
          <Button variant="outline" className="border-[#E2E8F0]">
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <Link href="/products">
            <button className="flex items-center justify-center size-9 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors">
              <ArrowLeft className="size-4" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">{product.name}</h1>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${status.className}`}>
                {status.label}
              </span>
            </div>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              SKU: {product.sku} &middot; {product.category}
            </p>
          </div>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
          <Pencil className="size-4 mr-1.5" />
          Edit Product
        </Button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
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
                  <div className="flex items-center justify-center rounded-xl bg-[#F8FAFC] aspect-4/3">
                    <Package className="size-16 text-[#64748B]/20" />
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-1 flex sm:flex-col gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-1 items-center justify-center rounded-xl bg-[#F8FAFC] aspect-square border border-[#E2E8F0] hover:border-[#4F46E5]/30 transition-colors cursor-pointer"
                    >
                      <Package className="size-6 text-[#64748B]/20" />
                    </div>
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
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-3">
                Description
              </h3>
              <p className="text-[14px] text-[#0F172A]/80 leading-relaxed">
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
                  <Layers className="size-4 text-[#64748B]" />
                  <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                    Variants
                  </h3>
                </div>
                <div className="space-y-4">
                  {product.variants.map((variant) => (
                    <div key={variant.id}>
                      <div className="flex items-center gap-2 mb-2">
                        {variant.type === "color" ? (
                          <Palette className="size-4 text-[#64748B]" />
                        ) : (
                          <Ruler className="size-4 text-[#64748B]" />
                        )}
                        <span className="text-[14px] font-medium text-[#0F172A]">{variant.name}</span>
                        <span className="text-[12px] text-[#64748B]">
                          ({variant.values.length} options)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {variant.values.map((value) => (
                          <span
                            key={value}
                            className="inline-flex items-center rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 text-[13px] font-medium text-[#0F172A]"
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
                <BarChart3 className="size-4 text-[#64748B]" />
                <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                  Performance
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-[#E2E8F0] p-4 text-center">
                  <ShoppingCart className="size-5 text-[#4F46E5] mx-auto mb-2" />
                  <p className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatNumber(product.totalSold)}</p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">Total Sold</p>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] p-4 text-center">
                  <TrendingUp className="size-5 text-[#10B981] mx-auto mb-2" />
                  <p className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatPrice(product.revenue)}</p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">Revenue</p>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] p-4 text-center">
                  <Eye className="size-5 text-[#4F46E5] mx-auto mb-2" />
                  <p className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatNumber(product.views)}</p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">Views</p>
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
                <Tag className="size-4 text-[#64748B]" />
                <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                  Pricing
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Selling Price</span>
                  <span className="text-[22px] font-bold text-[#0F172A] tabular-nums">{formatPrice(product.price)}</span>
                </div>
                {product.compareAtPrice && (
                  <>
                    <div className="h-px bg-[#F1F5F9]" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Compare at</span>
                      <span className="text-[14px] line-through text-[#64748B]">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Discount</span>
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
                      <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Cost Price</span>
                      <span className="text-[14px] font-medium text-[#0F172A]">{formatPrice(product.costPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Margin</span>
                      <span className="text-[14px] font-semibold text-[#10B981]">{profitMargin}%</span>
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
                <Package className="size-4 text-[#64748B]" />
                <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                  Inventory
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Stock</span>
                  <span className={`text-[18px] font-bold tabular-nums ${isOutOfStock ? "text-rose-600" : isLowStock ? "text-amber-600" : "text-[#0F172A]"}`}>
                    {product.stock} units
                  </span>
                </div>
                {(isLowStock || isOutOfStock) && (
                  <div
                    className={`flex items-center gap-2 rounded-xl p-3 ${
                      isOutOfStock
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    <AlertTriangle className="size-4 shrink-0" />
                    <span className="text-[12px] font-medium">
                      {isOutOfStock
                        ? "This product is out of stock"
                        : `Low stock alert — only ${product.stock} units remaining`}
                    </span>
                  </div>
                )}
                <div className="h-px bg-[#F1F5F9]" />
                <div className="flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Threshold</span>
                  <span className="text-[14px] font-medium text-[#0F172A]">{product.lowStockThreshold} units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Category</span>
                  <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-0.5 text-[12px] font-medium text-[#64748B]">
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
                <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Created</span>
                <span className="text-[13px] font-medium text-[#0F172A]">
                  {new Date(product.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">Updated</span>
                <span className="text-[13px] font-medium text-[#0F172A]">
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

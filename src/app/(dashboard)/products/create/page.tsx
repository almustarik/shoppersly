"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Upload,
  ImageIcon,
  Plus,
  X,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { productCategories } from "@/mock/products-data"

interface Variant {
  id: string
  type: "size" | "color"
  values: string[]
}

export default function CreateProductPage() {
  const [status, setStatus] = useState(true)
  const [trackInventory, setTrackInventory] = useState(true)
  const [variants, setVariants] = useState<Variant[]>([])
  const [newVariantValue, setNewVariantValue] = useState<Record<string, string>>({})

  function addVariant() {
    setVariants([
      ...variants,
      { id: crypto.randomUUID(), type: "size", values: [] },
    ])
  }

  function removeVariant(id: string) {
    setVariants(variants.filter((v) => v.id !== id))
  }

  function addVariantValue(variantId: string) {
    const value = newVariantValue[variantId]?.trim()
    if (!value) return
    setVariants(
      variants.map((v) =>
        v.id === variantId ? { ...v, values: [...v.values, value] } : v
      )
    )
    setNewVariantValue({ ...newVariantValue, [variantId]: "" })
  }

  function removeVariantValue(variantId: string, value: string) {
    setVariants(
      variants.map((v) =>
        v.id === variantId
          ? { ...v, values: v.values.filter((val) => val !== value) }
          : v
      )
    )
  }

  function updateVariantType(variantId: string, type: "size" | "color") {
    setVariants(
      variants.map((v) => (v.id === variantId ? { ...v, type } : v))
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-between"
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
            <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">Add Product</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Create a new product for your store
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/products">
            <Button variant="outline" className="border-[#E2E8F0] transition-colors duration-150">Cancel</Button>
          </Link>
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors duration-150">
            <Package className="size-4 mr-1.5" />
            Save Product
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.03 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
                Basic Information
              </h3>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[13px] font-medium text-[#0F172A]">Product Name</Label>
                  <Input id="name" placeholder="e.g. Jamdani Saree - Royal Blue" className="h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-[13px] font-medium text-[#0F172A]">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product in detail..."
                    className="min-h-[120px] rounded-lg border-[#E2E8F0] transition-colors duration-150"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
                Media
              </h3>
              <button
                type="button"
                className="w-full border-2 border-dashed border-[#E2E8F0] rounded-xl min-h-[160px] p-8 transition-colors duration-150 hover:border-[#4F46E5]/50 hover:bg-[#F8FAFC]/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                aria-label="Upload product images"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-muted border border-[#E2E8F0] mb-3">
                    <Upload className="size-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-[#0F172A]">
                    Drag & drop images here
                  </p>
                  <p className="text-[13px] text-muted-foreground mt-1">
                    or click to browse files
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    PNG, JPG, WEBP up to 5MB each. Max 8 images.
                  </p>
                </div>
              </button>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex items-center justify-center rounded-xl border-2 border-dashed border-[#E2E8F0] aspect-square hover:border-[#4F46E5]/50 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    aria-label={`Upload image ${i}`}
                  >
                    <ImageIcon className="size-5 text-muted-foreground/30" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.09 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
                Pricing
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="price" className="text-[13px] font-medium text-[#0F172A]">Price (৳)</Label>
                  <Input id="price" type="number" placeholder="0.00" className="h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="comparePrice" className="text-[13px] font-medium text-[#0F172A]">Compare-at Price (৳)</Label>
                  <Input id="comparePrice" type="number" placeholder="0.00" className="h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cost" className="text-[13px] font-medium text-[#0F172A]">Cost per Item (৳)</Label>
                  <Input id="cost" type="number" placeholder="0.00" className="h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Customers will see the compare-at price crossed out beside the selling price.
              </p>
            </div>
          </motion.div>

          {/* Variants */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.12 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Variants
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addVariant}
                  className="border-[#E2E8F0] text-[13px] transition-colors duration-150"
                >
                  <Plus className="size-3.5 mr-1" />
                  Add Variant
                </Button>
              </div>

              <AnimatePresence mode="popLayout">
                {variants.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted border border-[#E2E8F0] mb-2">
                      <Package className="size-5 text-muted-foreground/40" />
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      No variants added yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Add variants like size or color for your product
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {variants.map((variant, idx) => (
                      <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        {idx > 0 && <div className="h-px bg-[#F1F5F9] mb-4" />}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Select
                              value={variant.type}
                              onValueChange={(v) =>
                                updateVariantType(variant.id, v as "size" | "color")
                              }
                            >
                              <SelectTrigger className="w-[130px] h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="size">Size</SelectItem>
                                <SelectItem value="color">Color</SelectItem>
                              </SelectContent>
                            </Select>
                            <button
                              onClick={() => removeVariant(variant.id)}
                              className="flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                              aria-label="Remove variant"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder={`Add ${variant.type} value...`}
                              value={newVariantValue[variant.id] || ""}
                              onChange={(e) =>
                                setNewVariantValue({
                                  ...newVariantValue,
                                  [variant.id]: e.target.value,
                                })
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  addVariantValue(variant.id)
                                }
                              }}
                              className="flex-1 h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addVariantValue(variant.id)}
                              className="border-[#E2E8F0] transition-colors duration-150"
                            >
                              Add
                            </Button>
                          </div>
                          <AnimatePresence mode="popLayout">
                            {variant.values.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-wrap gap-2"
                              >
                                {variant.values.map((value) => (
                                  <motion.span
                                    key={value}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                    layout
                                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] pl-3 pr-1.5 py-1 text-[13px] font-medium text-[#0F172A]"
                                  >
                                    {value}
                                    <button
                                      type="button"
                                      onClick={() => removeVariantValue(variant.id, value)}
                                      className="flex items-center justify-center size-5 rounded-full hover:bg-[#E2E8F0] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                      aria-label={`Remove ${value}`}
                                    >
                                      <X className="size-3" />
                                    </button>
                                  </motion.span>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
                Status
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {status ? "Active" : "Draft"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {status
                      ? "Product is visible to customers"
                      : "Product is hidden from customers"}
                  </p>
                </div>
                <Switch
                  checked={status}
                  onCheckedChange={setStatus}
                  aria-label="Toggle product status"
                />
              </div>
            </div>
          </motion.div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.09 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
                Category
              </h3>
              <Select>
                <SelectTrigger className="w-full h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" aria-label="Select product category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Inventory */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.12 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
                Inventory
              </h3>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="sku" className="text-[13px] font-medium text-[#0F172A]">SKU</Label>
                  <Input id="sku" placeholder="e.g. FSH-SAR-001" className="h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Track Inventory</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Monitor stock levels
                    </p>
                  </div>
                  <Switch
                    checked={trackInventory}
                    onCheckedChange={setTrackInventory}
                    aria-label="Toggle inventory tracking"
                  />
                </div>
                <AnimatePresence>
                  {trackInventory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-5"
                    >
                      <div className="h-px bg-[#F1F5F9]" />
                      <div className="space-y-1.5">
                        <Label htmlFor="stock" className="text-[13px] font-medium text-[#0F172A]">Stock Quantity</Label>
                        <Input id="stock" type="number" placeholder="0" min={0} className="h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lowStock" className="text-[13px] font-medium text-[#0F172A]">Low Stock Alert at</Label>
                        <Input id="lowStock" type="number" placeholder="5" min={0} className="h-10 rounded-lg border-[#E2E8F0] transition-colors duration-150" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="flex items-center justify-end gap-2 border-t border-[#E2E8F0] pt-6 mt-8"
      >
        <Link href="/products">
          <Button variant="outline" className="border-[#E2E8F0] transition-colors duration-150">Cancel</Button>
        </Link>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors duration-150">
          <Package className="size-4 mr-1.5" />
          Save Product
        </Button>
      </motion.div>
    </div>
  )
}

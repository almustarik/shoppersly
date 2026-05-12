"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Link href="/products">
            <button className="flex items-center justify-center size-9 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors">
              <ArrowLeft className="size-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">Add Product</h1>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              Create a new product for your store
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/products">
            <Button variant="outline" className="border-[#E2E8F0]">Cancel</Button>
          </Link>
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
            <Package className="size-4 mr-1.5" />
            Save Product
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.03 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-4">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[13px] font-medium text-[#0F172A]">Product Name</Label>
                  <Input id="name" placeholder="e.g. Jamdani Saree - Royal Blue" className="h-10 border-[#E2E8F0]" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-[13px] font-medium text-[#0F172A]">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product in detail..."
                    className="min-h-[120px] border-[#E2E8F0]"
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
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-4">
                Media
              </h3>
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl min-h-[160px] p-8 transition-colors hover:border-[#4F46E5]/30 hover:bg-[#F8FAFC]/50 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-3">
                    <Upload className="size-5 text-[#64748B]" />
                  </div>
                  <p className="text-[14px] font-medium text-[#0F172A]">
                    Drag & drop images here
                  </p>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    or click to browse files
                  </p>
                  <p className="text-[12px] text-[#64748B] mt-3">
                    PNG, JPG, WEBP up to 5MB each. Max 8 images.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-xl border-2 border-dashed border-[#E2E8F0] aspect-square hover:border-[#4F46E5]/30 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="size-5 text-[#64748B]/30" />
                  </div>
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
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-4">
                Pricing
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="price" className="text-[13px] font-medium text-[#0F172A]">Price (৳)</Label>
                  <Input id="price" type="number" placeholder="0.00" className="h-10 border-[#E2E8F0]" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="comparePrice" className="text-[13px] font-medium text-[#0F172A]">Compare-at Price (৳)</Label>
                  <Input id="comparePrice" type="number" placeholder="0.00" className="h-10 border-[#E2E8F0]" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cost" className="text-[13px] font-medium text-[#0F172A]">Cost per Item (৳)</Label>
                  <Input id="cost" type="number" placeholder="0.00" className="h-10 border-[#E2E8F0]" />
                </div>
              </div>
              <p className="text-[12px] text-[#64748B] mt-3">
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                  Variants
                </h3>
                <Button variant="outline" size="sm" onClick={addVariant} className="border-[#E2E8F0] text-[13px]">
                  <Plus className="size-3.5 mr-1" />
                  Add Variant
                </Button>
              </div>
              {variants.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-2">
                    <Package className="size-5 text-[#64748B]/40" />
                  </div>
                  <p className="text-[13px] text-[#64748B]">
                    No variants added yet
                  </p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">
                    Add variants like size or color for your product
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {variants.map((variant, idx) => (
                    <div key={variant.id}>
                      {idx > 0 && <div className="h-px bg-[#F1F5F9] mb-4" />}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Select
                            value={variant.type}
                            onValueChange={(v) =>
                              updateVariantType(variant.id, v as "size" | "color")
                            }
                          >
                            <SelectTrigger className="w-[130px] h-10 border-[#E2E8F0]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="size">Size</SelectItem>
                              <SelectItem value="color">Color</SelectItem>
                            </SelectContent>
                          </Select>
                          <button
                            onClick={() => removeVariant(variant.id)}
                            className="flex items-center justify-center size-8 rounded-lg text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
                            className="flex-1 h-10 border-[#E2E8F0]"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addVariantValue(variant.id)}
                            className="border-[#E2E8F0]"
                          >
                            Add
                          </Button>
                        </div>
                        {variant.values.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {variant.values.map((value) => (
                              <span
                                key={value}
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] pl-3 pr-1.5 py-1 text-[13px] font-medium text-[#0F172A]"
                              >
                                {value}
                                <button
                                  type="button"
                                  onClick={() => removeVariantValue(variant.id, value)}
                                  className="flex items-center justify-center size-5 rounded-full hover:bg-[#E2E8F0] transition-colors"
                                >
                                  <X className="size-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06 }}
          >
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-4">
                Status
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium text-[#0F172A]">
                    {status ? "Active" : "Draft"}
                  </p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">
                    {status
                      ? "Product is visible to customers"
                      : "Product is hidden from customers"}
                  </p>
                </div>
                <Switch checked={status} onCheckedChange={setStatus} />
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
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-4">
                Category
              </h3>
              <Select>
                <SelectTrigger className="w-full h-10 border-[#E2E8F0]">
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
              <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-4">
                Inventory
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="sku" className="text-[13px] font-medium text-[#0F172A]">SKU</Label>
                  <Input id="sku" placeholder="e.g. FSH-SAR-001" className="h-10 border-[#E2E8F0]" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-[#0F172A]">Track Inventory</p>
                    <p className="text-[12px] text-[#64748B] mt-0.5">
                      Monitor stock levels
                    </p>
                  </div>
                  <Switch checked={trackInventory} onCheckedChange={setTrackInventory} />
                </div>
                {trackInventory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="h-px bg-[#F1F5F9]" />
                    <div className="space-y-1.5">
                      <Label htmlFor="stock" className="text-[13px] font-medium text-[#0F172A]">Stock Quantity</Label>
                      <Input id="stock" type="number" placeholder="0" min={0} className="h-10 border-[#E2E8F0]" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lowStock" className="text-[13px] font-medium text-[#0F172A]">Low Stock Alert at</Label>
                      <Input id="lowStock" type="number" placeholder="5" min={0} className="h-10 border-[#E2E8F0]" />
                    </div>
                  </motion.div>
                )}
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
        className="flex items-center justify-end gap-2 border-t border-[#E2E8F0] pt-6"
      >
        <Link href="/products">
          <Button variant="outline" className="border-[#E2E8F0]">Cancel</Button>
        </Link>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
          <Package className="size-4 mr-1.5" />
          Save Product
        </Button>
      </motion.div>
    </div>
  )
}

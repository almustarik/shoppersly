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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { productCategories } from "@/mock/products-data"

interface Variant {
  id: string
  type: "size" | "color"
  values: string[]
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
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
      <motion.div {...fadeUp} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/products">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add Product</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Create a new product for your store
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/products">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button>
            <Package className="size-4 mr-1.5" />
            Save Product
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Basic Info */}
          <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="e.g. Jamdani Saree - Royal Blue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product in detail..."
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Media */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 transition-colors hover:border-primary/40 hover:bg-muted/30 cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-muted mb-3">
                      <Upload className="size-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">
                      Drag & drop images here
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or click to browse files
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      PNG, JPG, WEBP up to 5MB each. Max 8 images.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 aspect-square hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="size-5 text-muted-foreground/30" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pricing */}
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (৳)</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare-at Price (৳)</Label>
                    <Input
                      id="comparePrice"
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost per Item (৳)</Label>
                    <Input id="cost" type="number" placeholder="0.00" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Customers will see the compare-at price crossed out beside the
                  selling price.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Variants */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">Variants</CardTitle>
                <Button variant="outline" size="sm" onClick={addVariant}>
                  <Plus className="size-3.5 mr-1" />
                  Add Variant
                </Button>
              </CardHeader>
              <CardContent>
                {variants.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted mb-2">
                      <Package className="size-5 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No variants added yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Add variants like size or color for your product
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {variants.map((variant, idx) => (
                      <div key={variant.id}>
                        {idx > 0 && <Separator className="mb-4" />}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Select
                              value={variant.type}
                              onValueChange={(v) =>
                                updateVariantType(variant.id, v as "size" | "color")
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="size">Size</SelectItem>
                                <SelectItem value="color">Color</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => removeVariant(variant.id)}
                            >
                              <X className="size-3.5" />
                            </Button>
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
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addVariantValue(variant.id)}
                            >
                              Add
                            </Button>
                          </div>
                          {variant.values.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {variant.values.map((value) => (
                                <Badge
                                  key={value}
                                  variant="secondary"
                                  className="gap-1 pr-1"
                                >
                                  {value}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeVariantValue(variant.id, value)
                                    }
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                                  >
                                    <X className="size-2.5" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Status */}
          <motion.div {...fadeUp} transition={{ delay: 0.08 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
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
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category */}
          <motion.div {...fadeUp} transition={{ delay: 0.12 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger className="w-full">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Inventory */}
          <motion.div {...fadeUp} transition={{ delay: 0.16 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="e.g. FSH-SAR-001" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Track Inventory</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Monitor stock levels
                    </p>
                  </div>
                  <Switch
                    checked={trackInventory}
                    onCheckedChange={setTrackInventory}
                  />
                </div>
                {trackInventory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        min={0}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lowStock">Low Stock Alert at</Label>
                      <Input
                        id="lowStock"
                        type="number"
                        placeholder="5"
                        min={0}
                      />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        {...fadeUp}
        transition={{ delay: 0.25 }}
        className="flex items-center justify-end gap-2 border-t pt-6"
      >
        <Link href="/products">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>
          <Package className="size-4 mr-1.5" />
          Save Product
        </Button>
      </motion.div>
    </div>
  )
}

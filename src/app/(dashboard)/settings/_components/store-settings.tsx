"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Store, Upload, Save, Loader2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const storeSettingsSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  description: z.string().max(500, "Description must be under 500 characters").optional(),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(6, "Phone number is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  currency: z.string(),
  timezone: z.string(),
})

type StoreSettingsValues = z.infer<typeof storeSettingsSchema>

const defaultValues: StoreSettingsValues = {
  storeName: "Trendy Fashion BD",
  description: "Premium fashion and lifestyle products for the modern Bangladeshi shopper. We sell curated clothing, accessories, and home goods through Facebook and Instagram.",
  contactEmail: "hello@trendyfashionbd.com",
  contactPhone: "+880 1712-345678",
  addressLine1: "House 42, Road 11",
  addressLine2: "Block D, Bashundhara R/A",
  city: "Dhaka",
  district: "Dhaka",
  postalCode: "1229",
  currency: "BDT",
  timezone: "Asia/Dhaka",
}

const inputStyles = "h-10 rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"

export function StoreSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<StoreSettingsValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues,
  })

  async function onSubmit(data: StoreSettingsValues) {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Store settings saved:", data)
    setIsSaving(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Store Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your store information and preferences.
        </p>
      </div>

      {/* Logo */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Store Logo</h3>
          <p className="text-xs text-muted-foreground">
            Upload your store logo. Recommended size: 512x512px.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex size-20 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors duration-150 hover:border-primary/50">
            <Store className="size-8 text-muted-foreground/50" />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <Upload className="size-3.5" data-icon="inline-start" />
              Upload Image
            </Button>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or SVG. Max 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Basic Information</h3>
          <p className="text-xs text-muted-foreground">
            Your store name and description as shown to customers.
          </p>
        </div>
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="storeName" className="text-[13px] font-medium">Store Name</Label>
            <Input
              id="storeName"
              placeholder="Your store name"
              className={cn(inputStyles, errors.storeName && "border-destructive ring-2 ring-destructive/20")}
              {...register("storeName")}
              aria-invalid={!!errors.storeName}
            />
            <AnimatePresence>
              {errors.storeName && (
                <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {errors.storeName.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-[13px] font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell customers about your store..."
              className="min-h-24 rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register("description")}
            />
            <AnimatePresence>
              {errors.description && (
                <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {errors.description.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Contact Information</h3>
          <p className="text-xs text-muted-foreground">
            How customers and delivery partners can reach you.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="contactEmail" className="text-[13px] font-medium">Email</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="store@example.com"
              className={cn(inputStyles, errors.contactEmail && "border-destructive ring-2 ring-destructive/20")}
              {...register("contactEmail")}
              aria-invalid={!!errors.contactEmail}
            />
            <AnimatePresence>
              {errors.contactEmail && (
                <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {errors.contactEmail.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contactPhone" className="text-[13px] font-medium">Phone</Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              className={cn(inputStyles, errors.contactPhone && "border-destructive ring-2 ring-destructive/20")}
              {...register("contactPhone")}
              aria-invalid={!!errors.contactPhone}
            />
            <AnimatePresence>
              {errors.contactPhone && (
                <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {errors.contactPhone.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Store Address</h3>
          <p className="text-xs text-muted-foreground">
            Used for delivery calculations and invoices.
          </p>
        </div>
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="addressLine1" className="text-[13px] font-medium">Address Line 1</Label>
            <Input
              id="addressLine1"
              placeholder="House, Road, Area"
              className={cn(inputStyles, errors.addressLine1 && "border-destructive ring-2 ring-destructive/20")}
              {...register("addressLine1")}
              aria-invalid={!!errors.addressLine1}
            />
            <AnimatePresence>
              {errors.addressLine1 && (
                <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {errors.addressLine1.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="addressLine2" className="text-[13px] font-medium">Address Line 2</Label>
            <Input
              id="addressLine2"
              placeholder="Block, Sector (optional)"
              className={inputStyles}
              {...register("addressLine2")}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-[13px] font-medium">City</Label>
              <Input
                id="city"
                placeholder="City"
                className={cn(inputStyles, errors.city && "border-destructive ring-2 ring-destructive/20")}
                {...register("city")}
                aria-invalid={!!errors.city}
              />
              <AnimatePresence>
                {errors.city && (
                  <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {errors.city.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="district" className="text-[13px] font-medium">District</Label>
              <Input
                id="district"
                placeholder="District"
                className={cn(inputStyles, errors.district && "border-destructive ring-2 ring-destructive/20")}
                {...register("district")}
                aria-invalid={!!errors.district}
              />
              <AnimatePresence>
                {errors.district && (
                  <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {errors.district.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="postalCode" className="text-[13px] font-medium">Postal Code</Label>
              <Input
                id="postalCode"
                placeholder="1000"
                className={cn(inputStyles, errors.postalCode && "border-destructive ring-2 ring-destructive/20")}
                {...register("postalCode")}
                aria-invalid={!!errors.postalCode}
              />
              <AnimatePresence>
                {errors.postalCode && (
                  <motion.p className="text-sm text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {errors.postalCode.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Regional */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Regional Settings</h3>
          <p className="text-xs text-muted-foreground">
            Currency and timezone for your store.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-[13px] font-medium">Currency</Label>
            <Select defaultValue="BDT">
              <SelectTrigger className="h-10 w-full rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BDT">BDT — Bangladeshi Taka</SelectItem>
                <SelectItem value="USD">USD — US Dollar</SelectItem>
                <SelectItem value="INR">INR — Indian Rupee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[13px] font-medium">Timezone</Label>
            <Select defaultValue="Asia/Dhaka">
              <SelectTrigger className="h-10 w-full rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={!isDirty || isSaving}
          className="h-10 rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          {isSaving ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Save className="size-3.5" data-icon="inline-start" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}

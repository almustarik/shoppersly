"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store, Upload, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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

export function StoreSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<StoreSettingsValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues,
  })

  function onSubmit(data: StoreSettingsValues) {
    console.log("Store settings saved:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Store Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your store information and preferences.
        </p>
      </div>

      <Separator />

      {/* Logo */}
      <Card>
        <CardHeader>
          <CardTitle>Store Logo</CardTitle>
          <CardDescription>
            Upload your store logo. Recommended size: 512×512px.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex size-20 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50">
              <Store className="size-8 text-muted-foreground/50" />
            </div>
            <div className="flex flex-col gap-2">
              <Button type="button" variant="outline" size="sm">
                <Upload className="size-3.5" data-icon="inline-start" />
                Upload Image
              </Button>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or SVG. Max 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Your store name and description as shown to customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              placeholder="Your store name"
              {...register("storeName")}
            />
            {errors.storeName && (
              <p className="text-xs text-destructive">{errors.storeName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell customers about your store..."
              className="min-h-24"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How customers and delivery partners can reach you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="store@example.com"
                {...register("contactEmail")}
              />
              {errors.contactEmail && (
                <p className="text-xs text-destructive">{errors.contactEmail.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                {...register("contactPhone")}
              />
              {errors.contactPhone && (
                <p className="text-xs text-destructive">{errors.contactPhone.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Store Address</CardTitle>
          <CardDescription>
            Used for delivery calculations and invoices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              id="addressLine1"
              placeholder="House, Road, Area"
              {...register("addressLine1")}
            />
            {errors.addressLine1 && (
              <p className="text-xs text-destructive">{errors.addressLine1.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              placeholder="Block, Sector (optional)"
              {...register("addressLine2")}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-xs text-destructive">{errors.city.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                placeholder="District"
                {...register("district")}
              />
              {errors.district && (
                <p className="text-xs text-destructive">{errors.district.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                placeholder="1000"
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <p className="text-xs text-destructive">{errors.postalCode.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>
            Currency and timezone for your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select defaultValue="BDT">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BDT">৳ BDT — Bangladeshi Taka</SelectItem>
                  <SelectItem value="USD">$ USD — US Dollar</SelectItem>
                  <SelectItem value="INR">₹ INR — Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue="Asia/Dhaka">
                <SelectTrigger className="w-full">
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
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isDirty}>
          <Save className="size-3.5" data-icon="inline-start" />
          Save Changes
        </Button>
      </div>
    </form>
  )
}

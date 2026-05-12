"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Search,
  ShoppingBag,
  User,
  Truck,
  CreditCard,
  MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { mockCustomers, mockProducts } from "@/mock/orders-data"

const orderSchema = z.object({
  customerId: z.string().optional(),
  customerName: z.string().min(1, "Customer name is required"),
  customerPhone: z.string().min(1, "Phone number is required"),
  customerAddress: z.string().min(1, "Address is required"),
  customerCity: z.string().min(1, "City is required"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string().min(1),
        variant: z.string().optional(),
        qty: z.number().min(1),
        price: z.number().min(0),
      })
    )
    .min(1, "At least one item is required"),
  courier: z.string().min(1, "Courier is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  deliveryCharge: z.number().min(0),
  discount: z.number().min(0),
  notes: z.string().optional(),
})

type OrderFormValues = z.infer<typeof orderSchema>

export default function CreateOrderPage() {
  const router = useRouter()
  const [customerSearch, setCustomerSearch] = React.useState("")
  const [showCustomerResults, setShowCustomerResults] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      customerCity: "",
      items: [{ productId: "", name: "", variant: "", qty: 1, price: 0 }],
      courier: "",
      paymentMethod: "",
      deliveryCharge: 60,
      discount: 0,
      notes: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  })

  const items = watch("items") ?? [{ productId: "", name: "", variant: "", qty: 1, price: 0 }]
  const deliveryCharge = watch("deliveryCharge") ?? 60
  const discount = watch("discount") ?? 0

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0)
  const total = subtotal + deliveryCharge - discount

  const filteredCustomers = customerSearch
    ? mockCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
          c.phone.includes(customerSearch)
      )
    : []

  const selectCustomer = (customer: (typeof mockCustomers)[0]) => {
    setValue("customerId", customer.id)
    setValue("customerName", customer.name)
    setValue("customerPhone", customer.phone)
    setValue("customerAddress", customer.address)
    setValue("customerCity", customer.city)
    setCustomerSearch(customer.name)
    setShowCustomerResults(false)
  }

  const selectProduct = (index: number, productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (product) {
      setValue(`items.${index}.productId`, product.id)
      setValue(`items.${index}.name`, product.name)
      setValue(`items.${index}.price`, product.price)
      setValue(`items.${index}.variant`, product.variants[0] ?? "")
    }
  }

  const onSubmit = (data: OrderFormValues) => {
    console.log("Order created:", data)
    router.push("/orders")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-[1000px] mx-auto w-full"
    >
      <div className="flex flex-col gap-4">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-4" />
          Back to Orders
        </Link>
        <h1 className="text-[28px] font-bold tracking-tight">Create Order</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Customer Selection */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.03 }}
        >
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <User className="size-4" />
                Customer Information
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4 space-y-4">
              <div className="relative">
                <Label htmlFor="customer-search" className="text-[13px] font-medium">
                  Search Customer
                </Label>
                <div className="relative mt-1.5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="customer-search"
                    placeholder="Search by name or phone..."
                    value={customerSearch}
                    onChange={(e) => {
                      setCustomerSearch(e.target.value)
                      setShowCustomerResults(true)
                    }}
                    onFocus={() => setShowCustomerResults(true)}
                    className="h-10 rounded-lg border-[#E2E8F0] pl-9"
                  />
                </div>
                {showCustomerResults && filteredCustomers.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full rounded-lg border border-[#E2E8F0] bg-popover p-1 shadow-lg">
                    {filteredCustomers.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => selectCustomer(c)}
                        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors"
                      >
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#4F46E5]/10 text-xs font-semibold text-[#4F46E5]">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.phone}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[13px] font-medium">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Customer name"
                    {...register("customerName", { required: true })}
                    aria-invalid={!!errors.customerName}
                    className="h-10 rounded-lg border-[#E2E8F0]"
                  />
                  {errors.customerName && (
                    <p className="text-xs text-destructive">{errors.customerName.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-[13px] font-medium">Phone *</Label>
                  <Input
                    id="phone"
                    placeholder="+880 1XXX-XXXXXX"
                    {...register("customerPhone", { required: true })}
                    aria-invalid={!!errors.customerPhone}
                    className="h-10 rounded-lg border-[#E2E8F0]"
                  />
                  {errors.customerPhone && (
                    <p className="text-xs text-destructive">{errors.customerPhone.message}</p>
                  )}
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="address" className="text-[13px] font-medium">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Full delivery address"
                    {...register("customerAddress", { required: true })}
                    aria-invalid={!!errors.customerAddress}
                    className="h-10 rounded-lg border-[#E2E8F0]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-[13px] font-medium">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g. Dhaka"
                    {...register("customerCity", { required: true })}
                    aria-invalid={!!errors.customerCity}
                    className="h-10 rounded-lg border-[#E2E8F0]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Product Selection */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.06 }}
        >
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <ShoppingBag className="size-4" />
                Products
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4 space-y-3">
              {(fields.length > 0 ? fields : items).map((field, index) => (
                <div
                  key={"id" in field ? (field as { id: string }).id : index}
                  className="flex flex-wrap items-end gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]/30 p-4"
                >
                  <div className="flex-1 min-w-[180px] space-y-1.5">
                    <Label className="text-[13px] font-medium">Product</Label>
                    <Select
                      value={items[index]?.productId ?? ""}
                      onValueChange={(v) => v && selectProduct(index, v)}
                    >
                      <SelectTrigger className="h-10 w-full rounded-lg border-[#E2E8F0]">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProducts.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} — ৳{p.price.toLocaleString("en-BD")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-20 space-y-1.5">
                    <Label className="text-[13px] font-medium">Qty</Label>
                    <Input
                      type="number"
                      min={1}
                      {...register(`items.${index}.qty`, { valueAsNumber: true })}
                      className="h-10 rounded-lg border-[#E2E8F0]"
                    />
                  </div>
                  <div className="w-28 space-y-1.5">
                    <Label className="text-[13px] font-medium">Price (৳)</Label>
                    <Input
                      type="number"
                      min={0}
                      {...register(`items.${index}.price`, { valueAsNumber: true })}
                      className="h-10 rounded-lg border-[#E2E8F0]"
                    />
                  </div>
                  <div className="w-24 text-right space-y-1.5">
                    <Label className="text-[13px] font-medium">Total</Label>
                    <p className="h-10 flex items-center justify-end font-semibold tabular-nums text-sm">
                      ৳{((items[index]?.price || 0) * (items[index]?.qty || 0)).toLocaleString("en-BD")}
                    </p>
                  </div>
                  {(fields.length > 0 ? fields : items).length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => remove(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() =>
                  append({ productId: "", name: "", variant: "", qty: 1, price: 0 })
                }
              >
                <Plus className="size-3.5" />
                Add Product
              </Button>

              <Separator />

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Delivery Charge (৳)</Label>
                  <Input
                    type="number"
                    min={0}
                    {...register("deliveryCharge", { valueAsNumber: true })}
                    className="h-10 rounded-lg border-[#E2E8F0]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Discount (৳)</Label>
                  <Input
                    type="number"
                    min={0}
                    {...register("discount", { valueAsNumber: true })}
                    className="h-10 rounded-lg border-[#E2E8F0]"
                  />
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 pt-2">
                <div className="flex gap-8 text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="tabular-nums font-medium text-right w-24">৳{subtotal.toLocaleString("en-BD")}</span>
                </div>
                <div className="flex gap-8 text-sm">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span className="tabular-nums text-right w-24">৳{deliveryCharge.toLocaleString("en-BD")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex gap-8 text-sm">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="tabular-nums text-emerald-600 text-right w-24">-৳{discount.toLocaleString("en-BD")}</span>
                  </div>
                )}
                <Separator className="w-48 my-1" />
                <div className="flex gap-8 text-base font-bold">
                  <span>Total:</span>
                  <span className="tabular-nums text-right w-24">৳{total.toLocaleString("en-BD")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courier & Payment */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.09 }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card className="border rounded-xl shadow-none">
              <CardHeader className="p-6 pb-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Truck className="size-4" />
                  Courier
                </h3>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <Select
                  value={watch("courier")}
                  onValueChange={(v) => v && setValue("courier", v)}
                >
                  <SelectTrigger className="h-10 w-full rounded-lg border-[#E2E8F0]">
                    <SelectValue placeholder="Select courier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pathao">
                      <div className="flex flex-col">
                        <span>Pathao Courier</span>
                        <span className="text-xs text-muted-foreground">Dhaka: ৳60 | Outside: ৳120</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="steadfast">
                      <div className="flex flex-col">
                        <span>Steadfast</span>
                        <span className="text-xs text-muted-foreground">Dhaka: ৳60 | Outside: ৳120</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="redx">
                      <div className="flex flex-col">
                        <span>RedX</span>
                        <span className="text-xs text-muted-foreground">Dhaka: ৳70 | Outside: ৳130</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="paperfly">
                      <div className="flex flex-col">
                        <span>Paperfly</span>
                        <span className="text-xs text-muted-foreground">Dhaka: ৳65 | Outside: ৳120</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border rounded-xl shadow-none">
              <CardHeader className="p-6 pb-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <CreditCard className="size-4" />
                  Payment Method
                </h3>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <Select
                  value={watch("paymentMethod")}
                  onValueChange={(v) => v && setValue("paymentMethod", v)}
                >
                  <SelectTrigger className="h-10 w-full rounded-lg border-[#E2E8F0]">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="bkash">bKash</SelectItem>
                    <SelectItem value="nagad">Nagad</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
        >
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MessageSquare className="size-4" />
                Order Notes
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <Textarea
                placeholder="Add any notes about this order (delivery instructions, special requests, etc.)"
                {...register("notes")}
                className="min-h-[80px] rounded-lg border-[#E2E8F0]"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="flex items-center justify-end gap-3 pb-6"
        >
          <Button type="button" variant="outline" render={<Link href="/orders" />}>
            Cancel
          </Button>
          <Button type="submit" className="gap-1.5 min-w-[140px]">
            <Plus className="size-4" />
            Create Order
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

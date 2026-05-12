"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { motion, type Variants } from "framer-motion"
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Check, X, KeyRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type ResetValues = z.infer<typeof resetSchema>

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.2, ease: "easeOut" },
  }),
}

const requirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function getStrength(password: string): number {
  if (!password) return 0
  return requirements.filter((r) => r.test(password)).length
}

const strengthColors = ["bg-muted", "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500", "bg-emerald-500"]

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  const password = watch("password")
  const strength = useMemo(() => getStrength(password || ""), [password])

  async function onSubmit(data: ResetValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Reset password:", data)
    setIsLoading(false)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      <motion.div custom={0} variants={fadeIn}>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </motion.div>

      <motion.div className="flex flex-col gap-2" custom={1} variants={fadeIn}>
        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <KeyRound className="size-6 text-primary" />
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-foreground">
          Set new password
        </h1>
        <p className="text-sm text-muted-foreground">
          Your new password must be different from your previous password.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <motion.div className="flex flex-col gap-1.5" custom={2} variants={fadeIn}>
          <Label htmlFor="password" className="text-[13px]">New password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className={cn("h-10 pr-10 pl-10", errors.password && "border-destructive ring-destructive/20 ring-2")}
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {/* Strength bar */}
          {password && (
            <div className="flex h-1.5 gap-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all duration-300", strengthColors[strength])}
                style={{ width: `${(strength / 5) * 100}%` }}
              />
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </motion.div>

        <motion.div className="flex flex-col gap-1.5" custom={3} variants={fadeIn}>
          <span className="text-xs font-medium text-muted-foreground">Password requirements</span>
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/30 p-3">
            {requirements.map((req) => {
              const passed = password ? req.test(password) : false
              return (
                <div key={req.label} className="flex items-center gap-2">
                  {passed ? (
                    <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="size-2.5 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="flex size-4 items-center justify-center rounded-full bg-muted">
                      <X className="size-2.5 text-muted-foreground/50" />
                    </div>
                  )}
                  <span
                    className={cn(
                      "text-xs transition-colors",
                      passed ? "text-emerald-600" : "text-muted-foreground"
                    )}
                  >
                    {req.label}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div className="flex flex-col gap-1.5" custom={4} variants={fadeIn}>
          <Label htmlFor="confirmPassword" className="text-[13px]">Confirm new password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              className={cn("h-10 pr-10 pl-10", errors.confirmPassword && "border-destructive ring-destructive/20 ring-2")}
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </motion.div>

        <motion.div custom={5} variants={fadeIn}>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-[44px] w-full rounded-lg text-sm font-medium"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Reset password"
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

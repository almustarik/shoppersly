"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { motion, type Variants } from "framer-motion"
import { Eye, EyeOff, Loader2, Mail, Lock, User, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
    confirmPassword: z.string(),
    terms: z.literal(true, { error: "You must accept the terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SignupValues = z.infer<typeof signupSchema>

const ease = [0.22, 1, 0.36, 1] as const

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease },
  }),
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.09A6.9 6.9 0 0 1 5.48 12c0-.72.13-1.43.36-2.09V7.07H2.18A11.96 11.96 0 0 0 .96 12c0 1.94.46 3.77 1.22 5.33l2.66-2.07V14.1Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12Z" fill="#1877F2" />
    </svg>
  )
}

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function getStrength(password: string): number {
  if (!password) return 0
  return passwordRules.filter((r) => r.test(password)).length
}

function PasswordStrengthBar({ strength }: { strength: number }) {
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"]
  const colors = [
    "bg-muted",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-emerald-500",
    "bg-emerald-500",
  ]

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < strength ? colors[strength] : "bg-muted"
            )}
          />
        ))}
      </div>
      {strength > 0 && (
        <span
          className={cn(
            "text-xs font-medium transition-colors",
            strength <= 2 ? "text-red-500" : strength <= 3 ? "text-yellow-600" : "text-emerald-600"
          )}
        >
          {labels[strength]}
        </span>
      )}
    </div>
  )
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", terms: false as unknown as true },
  })

  const password = watch("password")
  const strength = useMemo(() => getStrength(password || ""), [password])

  async function onSubmit(data: SignupValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Signup:", data)
    setIsLoading(false)
  }

  return (
    <motion.div initial="hidden" animate="visible" className="flex flex-col gap-6">
      {/* Header */}
      <motion.div className="flex flex-col gap-2" custom={0} variants={fadeIn}>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start your free trial. No credit card required.
        </p>
      </motion.div>

      {/* Social buttons */}
      <motion.div className="flex gap-3" custom={1} variants={fadeIn}>
        <Button variant="outline" size="lg" className="h-11 flex-1 gap-2 text-sm font-medium">
          <GoogleIcon className="size-4" />
          Google
        </Button>
        <Button variant="outline" size="lg" className="h-11 flex-1 gap-2 text-sm font-medium">
          <FacebookIcon className="size-4" />
          Facebook
        </Button>
      </motion.div>

      {/* Divider */}
      <motion.div className="flex items-center gap-3" custom={2} variants={fadeIn}>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground uppercase">or</span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Full Name */}
        <motion.div className="flex flex-col gap-1.5" custom={3} variants={fadeIn}>
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              placeholder="John Doe"
              className={cn("h-11 pl-10", errors.name && "border-destructive ring-destructive/20 ring-3")}
              {...register("name")}
              aria-invalid={!!errors.name}
            />
          </div>
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </motion.div>

        {/* Email */}
        <motion.div className="flex flex-col gap-1.5" custom={4} variants={fadeIn}>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={cn("h-11 pl-10", errors.email && "border-destructive ring-destructive/20 ring-3")}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </motion.div>

        {/* Password */}
        <motion.div className="flex flex-col gap-1.5" custom={5} variants={fadeIn}>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className={cn("h-11 pr-10 pl-10", errors.password && "border-destructive ring-destructive/20 ring-3")}
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
          {password && <PasswordStrengthBar strength={strength} />}
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </motion.div>

        {/* Password requirements */}
        {password && (
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
          >
            {passwordRules.map((rule) => {
              const passed = rule.test(password)
              return (
                <div key={rule.label} className="flex items-center gap-2">
                  {passed ? (
                    <Check className="size-3 text-emerald-500" />
                  ) : (
                    <X className="size-3 text-muted-foreground/50" />
                  )}
                  <span
                    className={cn(
                      "text-xs transition-colors",
                      passed ? "text-emerald-600" : "text-muted-foreground/70"
                    )}
                  >
                    {rule.label}
                  </span>
                </div>
              )
            })}
          </motion.div>
        )}

        {/* Confirm Password */}
        <motion.div className="flex flex-col gap-1.5" custom={6} variants={fadeIn}>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              className={cn("h-11 pr-10 pl-10", errors.confirmPassword && "border-destructive ring-destructive/20 ring-3")}
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

        {/* Terms */}
        <motion.div className="flex flex-col gap-1" custom={7} variants={fadeIn}>
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              className="mt-0.5"
              onCheckedChange={(checked) => setValue("terms", checked === true ? true : false as unknown as true, { shouldValidate: true })}
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-snug text-muted-foreground cursor-pointer">
              I agree to the{" "}
              <Link href="/terms" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}
        </motion.div>

        <motion.div custom={8} variants={fadeIn}>
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-11 w-full text-sm font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </motion.div>
      </form>

      {/* Footer */}
      <motion.p
        className="text-center text-sm text-muted-foreground"
        custom={9}
        variants={fadeIn}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      </motion.p>
    </motion.div>
  )
}

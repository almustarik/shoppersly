"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { motion, type Variants } from "framer-motion"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginValues = z.infer<typeof loginSchema>

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.2, ease: "easeOut" },
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(data: LoginValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Login:", data)
    setIsLoading(false)
  }

  return (
    <motion.div initial="hidden" animate="visible" className="flex flex-col gap-8">
      {/* Header */}
      <motion.div className="flex flex-col gap-2" custom={0} variants={fadeIn}>
        <h1 className="text-[28px] font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your Shoppersly account
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <motion.div className="flex flex-col gap-1.5" custom={1} variants={fadeIn}>
          <Label htmlFor="email" className="text-[13px]">Email</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={cn("h-10 pl-10", errors.email && "border-destructive ring-destructive/20 ring-2")}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div className="flex flex-col gap-1.5" custom={2} variants={fadeIn}>
          <Label htmlFor="password" className="text-[13px]">Password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </motion.div>

        <motion.div className="flex items-center justify-between" custom={3} variants={fadeIn}>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </motion.div>

        <motion.div custom={4} variants={fadeIn}>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-[44px] w-full rounded-lg text-sm font-medium"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </motion.div>
      </form>

      {/* Social divider */}
      <motion.div className="flex items-center gap-3" custom={5} variants={fadeIn}>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground uppercase">OR</span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {/* Social buttons */}
      <motion.div className="flex flex-col gap-3" custom={6} variants={fadeIn}>
        <Button variant="outline" className="h-10 w-full gap-2.5 rounded-lg text-sm font-medium">
          <GoogleIcon className="size-4" />
          Continue with Google
        </Button>
        <Button variant="outline" className="h-10 w-full gap-2.5 rounded-lg text-sm font-medium">
          <FacebookIcon className="size-4" />
          Continue with Facebook
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-center text-sm text-muted-foreground"
        custom={7}
        variants={fadeIn}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Sign up
        </Link>
      </motion.p>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const forgotSchema = z.object({
  email: z.email("Please enter a valid email address"),
})

type ForgotValues = z.infer<typeof forgotSchema>

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.2, ease: "easeOut" },
  }),
}

function AnimatedCheckmark() {
  return (
    <motion.div
      className="flex size-16 items-center justify-center rounded-2xl bg-emerald-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
      >
        <CheckCircle2 className="size-8 text-emerald-600" />
      </motion.div>
    </motion.div>
  )
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: ForgotValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmittedEmail(data.email)
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <AnimatedCheckmark />

          <div className="flex flex-col gap-2">
            <h1 className="text-[28px] font-bold tracking-tight text-foreground">
              Check your email
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-medium text-foreground">{submittedEmail}</span>.
              Please check your inbox and follow the instructions.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button
              variant="outline"
              className="h-10 w-full rounded-lg text-sm font-medium"
              onClick={() => setIsSubmitted(false)}
            >
              Try a different email
            </Button>
            <Link href="/login" className="w-full">
              <Button
                variant="ghost"
                className="h-10 w-full gap-2 rounded-lg text-sm font-medium"
              >
                <ArrowLeft className="size-4" />
                Back to sign in
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              try again
            </button>
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -8 }}
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
            <h1 className="text-[28px] font-bold tracking-tight text-foreground">
              Forgot your password?
            </h1>
            <p className="text-sm text-muted-foreground">
              No worries, we&apos;ll send you reset instructions.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <motion.div className="flex flex-col gap-1.5" custom={2} variants={fadeIn}>
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

            <motion.div custom={3} variants={fadeIn}>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-[44px] w-full rounded-lg text-sm font-medium"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Send reset link"
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

const ease = [0.22, 1, 0.36, 1] as const

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease },
  }),
}

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(RESEND_SECONDS)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("")
        const updated = [...otp]
        digits.forEach((d, i) => {
          if (index + i < OTP_LENGTH) updated[index + i] = d
        })
        setOtp(updated)
        const nextIdx = Math.min(index + digits.length, OTP_LENGTH - 1)
        inputRefs.current[nextIdx]?.focus()
        return
      }

      if (!/^\d?$/.test(value)) return

      const updated = [...otp]
      updated[index] = value
      setOtp(updated)

      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [otp]
  )

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!pasted) return
    const digits = pasted.split("")
    const updated = [...otp]
    digits.forEach((d, i) => {
      updated[i] = d
    })
    setOtp(updated)
    const nextIdx = Math.min(digits.length, OTP_LENGTH - 1)
    inputRefs.current[nextIdx]?.focus()
  }

  async function handleVerify() {
    const code = otp.join("")
    if (code.length !== OTP_LENGTH) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Verify OTP:", code)
    setIsLoading(false)
  }

  function handleResend() {
    setCountdown(RESEND_SECONDS)
    setCanResend(false)
    setOtp(Array(OTP_LENGTH).fill(""))
    inputRefs.current[0]?.focus()
  }

  const isComplete = otp.every((d) => d !== "")

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* Back link */}
      <motion.div custom={0} variants={fadeIn}>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div className="flex flex-col gap-2" custom={1} variants={fadeIn}>
        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <ShieldCheck className="size-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Verify your identity
        </h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a 6-digit verification code to your email. Enter the code below to continue.
        </p>
      </motion.div>

      {/* OTP Input */}
      <motion.div className="flex flex-col gap-6" custom={2} variants={fadeIn}>
        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              className={cn(
                "size-12 rounded-xl border bg-background text-center text-lg font-semibold text-foreground shadow-sm transition-all outline-none sm:size-14 sm:text-xl",
                "focus:border-primary focus:ring-3 focus:ring-primary/20",
                otp[i]
                  ? "border-primary/40 bg-primary/[0.03]"
                  : "border-input"
              )}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <Button
          size="lg"
          disabled={!isComplete || isLoading}
          onClick={handleVerify}
          className="h-11 w-full text-sm font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify code"
          )}
        </Button>
      </motion.div>

      {/* Resend */}
      <motion.div
        className="flex flex-col items-center gap-1 text-center"
        custom={3}
        variants={fadeIn}
      >
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?
        </p>
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Resend code
          </button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Resend in{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {String(Math.floor(countdown / 60)).padStart(2, "0")}:
              {String(countdown % 60).padStart(2, "0")}
            </span>
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

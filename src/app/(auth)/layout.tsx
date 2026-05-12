"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ShoppingBag, Star, TrendingUp, Users } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
}

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.15 } },
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Luxe Collective",
    quote: "Shoppersly doubled our conversion rate in just 3 months.",
    avatar: "SC",
    rating: 5,
  },
  {
    name: "Marcus Wright",
    role: "CEO, StreetStyle Co",
    quote: "The best commerce OS we've ever used. Period.",
    avatar: "MW",
    rating: 5,
  },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — hidden below md, visible at md+ */}
      <div className="relative hidden w-1/2 overflow-hidden md:flex md:flex-col md:justify-between">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #4F46E5 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px)",
          }}
        />

        <motion.div
          className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInLeft}>
            <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:rounded-lg">
              <div className="flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                <ShoppingBag className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Shoppersly</span>
            </Link>
          </motion.div>

          <motion.div className="flex flex-col gap-8" variants={stagger}>
            <motion.div variants={fadeInLeft}>
              <h1 className="text-4xl leading-tight font-bold tracking-tight text-white xl:text-5xl xl:leading-tight">
                The Operating System
                <br />
                <span className="bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  for Social Commerce
                </span>
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-indigo-100/80">
                Unify your social selling channels, automate operations, and scale your business with the most powerful commerce platform built for the social era.
              </p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-3" variants={fadeInUp}>
              {[
                { icon: Users, label: "Active Sellers", value: "50K+" },
                { icon: TrendingUp, label: "GMV Processed", value: "$2B+" },
                { icon: Star, label: "Avg. Rating", value: "4.9" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md"
                >
                  <stat.icon className="size-3.5 text-white/70" />
                  <span className="text-sm font-semibold tabular-nums text-white">{stat.value}</span>
                  <span className="text-xs text-indigo-200/70">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-col gap-3" variants={stagger}>
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="flex max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-400 to-indigo-400 text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{t.name}</span>
                    <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="size-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-indigo-200/60">{t.role}</span>
                  <p className="mt-1 text-sm leading-snug text-indigo-100/80">&ldquo;{t.quote}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right panel — form area */}
      <div className="relative flex w-full flex-col bg-background md:w-1/2">
        <div className="flex flex-1 flex-col">
          {/* Mobile logo — shown below md */}
          <div className="flex items-center justify-center p-6 md:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:rounded-lg">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
                <ShoppingBag className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Shoppersly</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-8">
            <motion.div
              className="w-full max-w-[420px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

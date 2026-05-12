"use client"

import { useState } from "react"
import { Send, Shield, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const rolePermissions: Record<string, string[]> = {
  staff: ["View Orders", "View Products", "View Customers"],
  agent: [
    "View Orders",
    "Create Orders",
    "Edit Orders",
    "View Products",
    "View Customers",
  ],
  admin: [
    "View Orders",
    "Create Orders",
    "Edit Orders",
    "Delete Orders",
    "View Products",
    "Manage Products",
    "View Customers",
    "Manage Payments",
    "View Analytics",
  ],
}

export function InviteMemberDialog({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("staff")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")

  const currentPermissions = rolePermissions[role] ?? []

  function validateEmail(value: string) {
    if (!value) {
      setEmailError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  async function handleInvite() {
    if (!validateEmail(email)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Inviting:", { email, role })
    setEmail("")
    setRole("staff")
    setEmailError("")
    setIsLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEmailError(""); setEmail(""); setRole("staff") } }}>
      <DialogTrigger render={<>{children}</>} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your store team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="invite-email" className="text-[13px] font-medium">Email Address</Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="member@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value) }}
              onBlur={() => email && validateEmail(email)}
              className={`h-10 rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary ${emailError ? "border-destructive ring-2 ring-destructive/20" : ""}`}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "invite-email-error" : undefined}
            />
            <AnimatePresence>
              {emailError && (
                <motion.p
                  id="invite-email-error"
                  className="text-sm text-destructive"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {emailError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[13px] font-medium">Role</Label>
            <Select value={role} onValueChange={(v) => v && setRole(v)}>
              <SelectTrigger className="h-10 w-full rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="agent">Support Agent</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-[13px] font-medium">
              <Shield className="size-3.5 text-muted-foreground" />
              Permissions Preview
            </Label>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex flex-wrap gap-1.5">
                {currentPermissions.map((perm) => (
                  <span
                    key={perm}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary transition-colors duration-150"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleInvite}
            disabled={!email || isLoading}
            className="h-10 w-full rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20 sm:w-auto"
          >
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Send className="size-3.5" data-icon="inline-start" />
            )}
            {isLoading ? "Sending..." : "Send Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

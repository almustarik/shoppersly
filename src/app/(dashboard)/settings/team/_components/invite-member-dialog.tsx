"use client"

import { useState } from "react"
import { Send, Shield } from "lucide-react"

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

  const currentPermissions = rolePermissions[role] ?? []

  function handleInvite() {
    console.log("Inviting:", { email, role })
    setEmail("")
    setRole("staff")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<>{children}</>} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your store team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="invite-email">Email Address</Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="member@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => v && setRole(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="agent">Support Agent</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Permissions Preview */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Shield className="size-3.5 text-muted-foreground" />
              Permissions Preview
            </Label>
            <div className="rounded-lg border bg-muted/30 p-3">
              <div className="flex flex-wrap gap-1.5">
                {currentPermissions.map((perm) => (
                  <span
                    key={perm}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleInvite} disabled={!email} className="w-full sm:w-auto">
            <Send className="size-3.5" data-icon="inline-start" />
            Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

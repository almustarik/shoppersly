"use client"

import { useState } from "react"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { TeamTable, teamMembers, type TeamMember } from "./_components/team-table"
import { RolesPermissions } from "./_components/roles-permissions"
import { InviteMemberDialog } from "./_components/invite-member-dialog"

export default function TeamPage() {
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const filteredMembers: TeamMember[] =
    roleFilter === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.role === roleFilter)

  return (
    <div className="flex flex-col gap-6 p-6">
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
            <p className="text-sm text-muted-foreground">
              Manage who has access to your store.
            </p>
          </div>
        </div>
        <InviteMemberDialog>
          <Button className="h-10 rounded-lg">
            <UserPlus className="size-4" data-icon="inline-start" />
            Invite Member
          </Button>
        </InviteMemberDialog>
      </motion.div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-3 p-6 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold">Team ({filteredMembers.length})</h3>
                <p className="text-xs text-muted-foreground">
                  {teamMembers.length} total members across your store.
                </p>
              </div>
              <Select value={roleFilter} onValueChange={(v) => v && setRoleFilter(v)}>
                <SelectTrigger className="h-9 w-44">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="owner">Merchant / Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Support Agent</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-6 pb-6">
              <TeamTable members={filteredMembers} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <RolesPermissions />
        </TabsContent>
      </Tabs>
    </div>
  )
}

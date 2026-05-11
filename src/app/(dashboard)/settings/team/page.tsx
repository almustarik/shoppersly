"use client"

import { useState } from "react"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
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
      {/* Back link and header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" render={<Link href="/settings" />}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
            <p className="text-sm text-muted-foreground">
              Manage who has access to your store.
            </p>
          </div>
        </div>
        <InviteMemberDialog>
          <Button>
            <UserPlus className="size-4" data-icon="inline-start" />
            Invite Member
          </Button>
        </InviteMemberDialog>
      </div>

      <Separator />

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Team ({filteredMembers.length})</CardTitle>
                  <CardDescription>
                    {teamMembers.length} total members across your store.
                  </CardDescription>
                </div>
                <Select value={roleFilter} onValueChange={(v) => v && setRoleFilter(v)}>
                  <SelectTrigger className="w-44">
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
            </CardHeader>
            <CardContent>
              <TeamTable members={filteredMembers} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles">
          <RolesPermissions />
        </TabsContent>
      </Tabs>
    </div>
  )
}

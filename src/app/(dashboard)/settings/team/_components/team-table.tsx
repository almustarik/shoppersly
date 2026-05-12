"use client"

import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "agent" | "staff"
  status: "active" | "invited"
  lastActive: string
  avatar?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Rahim Uddin",
    email: "rahim@trendyfashionbd.com",
    role: "owner",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Kamal Hossain",
    email: "kamal@trendyfashionbd.com",
    role: "admin",
    status: "active",
    lastActive: "5 minutes ago",
  },
  {
    id: "3",
    name: "Fatima Akter",
    email: "fatima@trendyfashionbd.com",
    role: "agent",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Nusrat Jahan",
    email: "nusrat@trendyfashionbd.com",
    role: "staff",
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    id: "5",
    name: "Tanvir Ahmed",
    email: "tanvir@trendyfashionbd.com",
    role: "staff",
    status: "invited",
    lastActive: "—",
  },
]

const roleConfig: Record<
  TeamMember["role"],
  { label: string; className: string }
> = {
  owner: {
    label: "Merchant / Owner",
    className: "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
  },
  admin: {
    label: "Admin",
    className: "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
  },
  agent: {
    label: "Support Agent",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  },
  staff: {
    label: "Staff",
    className: "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20",
  },
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function TeamTable({
  members,
}: {
  members: TeamMember[]
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => {
          const role = roleConfig[member.role]
          return (
            <TableRow key={member.id} className="transition-colors duration-150">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn("border-0", role.className)}
                  title={role.label}
                >
                  {role.label}
                </Badge>
              </TableCell>
              <TableCell>
                {member.status === "active" ? (
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="text-sm">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    <span className="text-sm text-muted-foreground">Invited</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {member.lastActive}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
                  aria-label={`More options for ${member.name}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

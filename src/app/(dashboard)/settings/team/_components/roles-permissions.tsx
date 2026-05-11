"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Role = "staff" | "agent" | "admin" | "merchant"

interface Permission {
  id: string
  label: string
  allowed: Record<Role, boolean>
}

const permissions: Permission[] = [
  {
    id: "view_orders",
    label: "View Orders",
    allowed: { staff: true, agent: true, admin: true, merchant: true },
  },
  {
    id: "create_orders",
    label: "Create Orders",
    allowed: { staff: false, agent: true, admin: true, merchant: true },
  },
  {
    id: "edit_orders",
    label: "Edit Orders",
    allowed: { staff: false, agent: true, admin: true, merchant: true },
  },
  {
    id: "delete_orders",
    label: "Delete Orders",
    allowed: { staff: false, agent: false, admin: true, merchant: true },
  },
  {
    id: "view_products",
    label: "View Products",
    allowed: { staff: true, agent: true, admin: true, merchant: true },
  },
  {
    id: "manage_products",
    label: "Manage Products",
    allowed: { staff: false, agent: false, admin: true, merchant: true },
  },
  {
    id: "view_customers",
    label: "View Customers",
    allowed: { staff: true, agent: true, admin: true, merchant: true },
  },
  {
    id: "manage_payments",
    label: "Manage Payments",
    allowed: { staff: false, agent: false, admin: true, merchant: true },
  },
  {
    id: "view_analytics",
    label: "View Analytics",
    allowed: { staff: false, agent: false, admin: true, merchant: true },
  },
  {
    id: "manage_settings",
    label: "Manage Settings",
    allowed: { staff: false, agent: false, admin: false, merchant: true },
  },
  {
    id: "manage_team",
    label: "Manage Team",
    allowed: { staff: false, agent: false, admin: false, merchant: true },
  },
]

const roles: { key: Role; label: string }[] = [
  { key: "staff", label: "Staff" },
  { key: "agent", label: "Support Agent" },
  { key: "admin", label: "Admin" },
  { key: "merchant", label: "Merchant" },
]

export function RolesPermissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles & Permissions</CardTitle>
        <CardDescription>
          Configure what each role can access across your store.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-[180px] sticky left-0 z-10 bg-card">
                  Permission
                </TableHead>
                {roles.map((role) => (
                  <TableHead key={role.key} className="text-center min-w-[120px]">
                    {role.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((perm) => (
                <TableRow key={perm.id}>
                  <TableCell className="font-medium sticky left-0 z-10 bg-card">
                    {perm.label}
                  </TableCell>
                  {roles.map((role) => (
                    <TableCell key={role.key} className="text-center">
                      <div className="flex justify-center">
                        <Checkbox
                          checked={perm.allowed[role.key]}
                          disabled
                        />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

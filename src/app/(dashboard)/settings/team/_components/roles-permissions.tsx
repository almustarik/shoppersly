"use client"

import { Check, Minus } from "lucide-react"

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
    <div className="rounded-xl border border-border bg-card">
      <div className="p-6 pb-4">
        <h3 className="text-sm font-semibold">Roles & Permissions</h3>
        <p className="text-xs text-muted-foreground">
          Configure what each role can access across your store.
        </p>
      </div>
      <div className="overflow-x-auto px-6 pb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="sticky left-0 z-10 bg-card py-3 pr-4 text-left text-xs font-medium text-muted-foreground min-w-[180px]">
                Permission
              </th>
              {roles.map((role) => (
                <th key={role.key} className="min-w-[120px] py-3 text-center text-xs font-medium text-muted-foreground">
                  {role.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.id} className="border-b last:border-0">
                <td className="sticky left-0 z-10 bg-card py-3 pr-4 font-medium">
                  {perm.label}
                </td>
                {roles.map((role) => (
                  <td key={role.key} className="py-3 text-center">
                    {perm.allowed[role.key] ? (
                      <Check className="mx-auto size-4 text-emerald-500" />
                    ) : (
                      <Minus className="mx-auto size-4 text-muted-foreground/30" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

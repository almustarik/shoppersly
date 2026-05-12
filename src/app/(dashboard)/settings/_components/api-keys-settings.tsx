"use client"

import { useState } from "react"
import { Copy, Eye, EyeOff, Key, Plus, Trash2, Save } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
}

const initialKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production Key",
    key: "shply_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    createdAt: "Jan 15, 2025",
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    name: "Staging Key",
    key: "shply_test_q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
    createdAt: "Mar 3, 2025",
    lastUsed: "5 days ago",
  },
  {
    id: "3",
    name: "Webhook Signing Key",
    key: "whsec_g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8",
    createdAt: "Apr 20, 2025",
    lastUsed: null,
  },
]

function maskKey(key: string) {
  return key.slice(0, 7) + "••••••••••••••••" + key.slice(-4)
}

export function ApiKeysSettings() {
  const [keys] = useState(initialKeys)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [webhookUrl, setWebhookUrl] = useState(
    "https://api.trendyfashionbd.com/webhooks/shoppersly"
  )

  function toggleKeyVisibility(id: string) {
    setVisibleKeys((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">API Keys</h2>
        <p className="text-sm text-muted-foreground">
          Manage API keys for programmatic access to your store.
        </p>
      </div>

      {/* Rate Limit Info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">API Rate Limits</h3>
          <p className="text-xs text-muted-foreground">Current limits for your Pro plan.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { value: "1,000", label: "Requests / minute" },
            { value: "100,000", label: "Requests / day" },
            { value: "10 MB", label: "Max payload size" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border p-3 text-center">
              <p className="text-2xl font-bold text-primary">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="text-sm font-semibold">Your API Keys</h3>
            <p className="text-xs text-muted-foreground">
              Keep your keys safe — never share them publicly.
            </p>
          </div>
          <Button size="sm" className="h-8 rounded-lg">
            <Plus className="size-3.5" data-icon="inline-start" />
            Generate New Key
          </Button>
        </div>
        <div className="px-6 pb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Key className="size-3.5 text-muted-foreground" />
                      <span className="font-medium">{apiKey.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                      {visibleKeys.has(apiKey.id)
                        ? apiKey.key
                        : maskKey(apiKey.key)}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {apiKey.createdAt}
                  </TableCell>
                  <TableCell>
                    {apiKey.lastUsed ? (
                      <span className="text-muted-foreground">{apiKey.lastUsed}</span>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">Never</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <Copy className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Webhook */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Webhook URL</h3>
          <p className="text-xs text-muted-foreground">
            We&apos;ll send event payloads to this URL in real time.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="webhookUrl" className="text-[13px]">Endpoint URL</Label>
            <Input
              id="webhookUrl"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-domain.com/webhooks"
              className="h-10 font-mono text-xs"
            />
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="h-8 rounded-lg">
              <Save className="size-3.5" data-icon="inline-start" />
              Save Webhook
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

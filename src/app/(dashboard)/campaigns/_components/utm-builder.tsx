"use client"

import { useState, useMemo } from "react"
import { Copy, Check, Link2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface UTMParams {
  url: string
  source: string
  medium: string
  campaign: string
  content: string
  term: string
}

const defaultParams: UTMParams = {
  url: "https://shop.shoppersly.com/products",
  source: "facebook",
  medium: "cpc",
  campaign: "eid-collection-2026",
  content: "carousel-ad",
  term: "fashion-bd",
}

export function UTMBuilder() {
  const [params, setParams] = useState<UTMParams>(defaultParams)
  const [copied, setCopied] = useState(false)

  const generatedUrl = useMemo(() => {
    const base = params.url.trim()
    if (!base) return ""

    const searchParams = new URLSearchParams()
    if (params.source) searchParams.set("utm_source", params.source)
    if (params.medium) searchParams.set("utm_medium", params.medium)
    if (params.campaign) searchParams.set("utm_campaign", params.campaign)
    if (params.content) searchParams.set("utm_content", params.content)
    if (params.term) searchParams.set("utm_term", params.term)

    const qs = searchParams.toString()
    return qs ? `${base}?${qs}` : base
  }, [params])

  function handleCopy() {
    navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function update(key: keyof UTMParams, value: string) {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const fields: { key: keyof UTMParams; label: string; placeholder: string }[] = [
    { key: "url", label: "Website URL", placeholder: "https://your-shop.com/page" },
    { key: "source", label: "Campaign Source", placeholder: "facebook, instagram, google..." },
    { key: "medium", label: "Campaign Medium", placeholder: "cpc, social, email..." },
    { key: "campaign", label: "Campaign Name", placeholder: "eid-sale-2026..." },
    { key: "content", label: "Campaign Content", placeholder: "banner-ad, text-link..." },
    { key: "term", label: "Campaign Term", placeholder: "fashion, electronics..." },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Link2 className="size-4" />
          UTM Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.key}
              className={field.key === "url" ? "sm:col-span-2" : ""}
            >
              <Label htmlFor={field.key} className="mb-1.5 text-xs">
                {field.label}
              </Label>
              <Input
                id={field.key}
                value={params[field.key]}
                onChange={(e) => update(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>

        {/* Generated URL */}
        <div>
          <Label className="mb-1.5 text-xs">Generated URL</Label>
          <div className="flex items-stretch gap-2">
            <div className="flex-1 overflow-hidden rounded-lg border bg-muted/50 px-3 py-2">
              <p className="truncate font-mono text-xs text-muted-foreground">
                {generatedUrl || "Enter a URL above to generate"}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              disabled={!generatedUrl}
            >
              {copied ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

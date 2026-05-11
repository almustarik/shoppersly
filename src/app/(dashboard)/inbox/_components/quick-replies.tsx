"use client"

import * as React from "react"
import { X, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { quickReplyTemplates } from "@/mock/inbox-data"

interface QuickRepliesProps {
  onSelect: (content: string) => void
  onClose: () => void
}

export function QuickReplies({ onSelect, onClose }: QuickRepliesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute inset-x-0 bottom-full border-t border-border bg-card p-3 shadow-lg"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Zap className="size-3.5 text-primary" />
          Quick Replies
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onClose}
          aria-label="Close quick replies"
        >
          <X className="size-3.5" />
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        {quickReplyTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.content)}
            className="rounded-lg px-3 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          >
            <span className="font-medium text-foreground">
              {template.title}
            </span>
            <span className="ml-2 text-muted-foreground">
              {template.content}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

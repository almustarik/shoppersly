"use client"

import * as React from "react"
import { Send, Paperclip, Smile, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { QuickReplies } from "./quick-replies"

interface MessageInputProps {
  onSend: (message: string) => void
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = React.useState("")
  const [showQuickReplies, setShowQuickReplies] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const trimmed = message.trim()
    if (!trimmed) return
    onSend(trimmed)
    setMessage("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    const el = e.target
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }

  const handleQuickReply = (content: string) => {
    setMessage(content)
    setShowQuickReplies(false)
    textareaRef.current?.focus()
  }

  return (
    <div className="relative flex-none border-t border-border bg-card">
      {showQuickReplies && (
        <QuickReplies
          onSelect={handleQuickReply}
          onClose={() => setShowQuickReplies(false)}
        />
      )}

      <div className="flex items-end gap-2 p-3">
        <div className="flex flex-none items-center gap-0.5">
          <Button variant="ghost" size="icon-sm" aria-label="Attach file">
            <Paperclip className="size-4 text-muted-foreground" />
          </Button>

          <Button variant="ghost" size="icon-sm" aria-label="Emoji">
            <Smile className="size-4 text-muted-foreground" />
          </Button>

          <Button
            variant={showQuickReplies ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            aria-label="Quick replies"
          >
            <Zap className="size-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="relative min-h-[36px] flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className={cn(
              "w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2 text-sm leading-relaxed outline-none transition-colors",
              "placeholder:text-muted-foreground",
              "focus:border-ring focus:ring-2 focus:ring-ring/30",
              "dark:bg-input/30"
            )}
          />
        </div>

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
          className={cn(
            "flex-none rounded-xl transition-all",
            message.trim()
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground"
          )}
          aria-label="Send message"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  )
}

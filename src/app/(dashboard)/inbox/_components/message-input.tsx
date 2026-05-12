"use client"

import * as React from "react"
import { Send, Paperclip, Smile, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
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
    <div className="relative flex-none border-t border-[#E2E8F0] bg-white">
      {showQuickReplies && (
        <QuickReplies
          onSelect={handleQuickReply}
          onClose={() => setShowQuickReplies(false)}
        />
      )}

      <div className="flex items-end gap-2 p-3">
        <div className="flex flex-none items-center gap-0.5">
          <button
            className="flex items-center justify-center size-9 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
            aria-label="Attach file"
          >
            <Paperclip className="size-4" />
          </button>

          <button
            className="flex items-center justify-center size-9 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
            aria-label="Emoji"
          >
            <Smile className="size-4" />
          </button>

          <button
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            className={cn(
              "flex items-center justify-center size-9 rounded-xl transition-colors",
              showQuickReplies
                ? "bg-[#F8FAFC] text-[#4F46E5]"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            )}
            aria-label="Quick replies"
          >
            <Zap className="size-4" />
          </button>
        </div>

        <div className="relative min-h-[40px] flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className={cn(
              "w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] px-3.5 py-2.5 text-[14px] leading-relaxed text-[#0F172A] outline-none transition-colors min-h-[40px]",
              "placeholder:text-[#64748B]",
              "focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 focus:bg-white"
            )}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={cn(
            "flex-none flex items-center justify-center size-9 rounded-xl transition-all",
            message.trim()
              ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
              : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
          )}
          aria-label="Send message"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  )
}

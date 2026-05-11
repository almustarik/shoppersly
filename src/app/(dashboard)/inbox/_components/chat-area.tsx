"use client"

import * as React from "react"
import {
  Phone,
  Video,
  MoreHorizontal,
  ChevronDown,
  Check,
  CheckCheck,
  ArrowDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Conversation, Message } from "@/mock/inbox-data"
import { MessageInput } from "./message-input"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatMessageTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function formatDateSeparator(timestamp: string) {
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return "Today"
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })
}

function shouldShowDateSeparator(
  messages: Message[],
  index: number
): boolean {
  if (index === 0) return true
  const curr = new Date(messages[index].timestamp).toDateString()
  const prev = new Date(messages[index - 1].timestamp).toDateString()
  return curr !== prev
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-4">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-muted-foreground/60"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface ChatAreaProps {
  conversation: Conversation | null
  onToggleSidebar: () => void
  sidebarOpen: boolean
  onSendMessage: (conversationId: string, message: string) => void
}

export function ChatArea({
  conversation,
  onToggleSidebar,
  sidebarOpen,
  onSendMessage,
}: ChatAreaProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = React.useState(false)

  const scrollToBottom = React.useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" })
  }, [conversation?.id, conversation?.messages.length])

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100
    setShowScrollButton(!isNearBottom)
  }, [])

  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-background">
        <div className="rounded-2xl bg-muted p-6">
          <svg
            className="size-12 text-muted-foreground/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground/70">
          Select a conversation
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose a conversation from the sidebar to start messaging
        </p>
      </div>
    )
  }

  const { customer, messages, isTyping } = conversation

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Header */}
      <div className="flex flex-none items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>
            {customer.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-emerald-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                {customer.name}
              </h3>
              <Badge
                variant="secondary"
                className={cn(
                  "h-4 rounded-full px-1.5 text-[10px] font-medium text-white",
                  customer.channel === "facebook"
                    ? "bg-blue-500"
                    : "bg-linear-to-r from-purple-500 via-pink-500 to-orange-400"
                )}
              >
                {customer.channel === "facebook" ? "Facebook" : "Instagram"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {customer.isOnline ? (
                <span className="text-emerald-600">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Phone call">
            <Phone className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Video call">
            <Video className="size-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-5" />
          <Button
            variant={sidebarOpen ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={onToggleSidebar}
            aria-label="Customer info"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="relative flex-1 overflow-y-auto"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              {shouldShowDateSeparator(messages, index) && (
                <div className="flex items-center gap-3 py-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {formatDateSeparator(message.timestamp)}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={cn(
                  "flex max-w-[75%] flex-col",
                  message.sender === "agent" ? "ml-auto items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "relative rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    message.sender === "agent"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground"
                  )}
                >
                  {message.content}
                </div>
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1 px-1",
                    message.sender === "agent" ? "flex-row-reverse" : ""
                  )}
                >
                  <span className="text-[10px] text-muted-foreground/70">
                    {formatMessageTime(message.timestamp)}
                  </span>
                  {message.sender === "agent" && (
                    <span className="text-muted-foreground/60">
                      {message.seen ? (
                        <CheckCheck className="size-3 text-primary" />
                      ) : (
                        <Check className="size-3" />
                      )}
                    </span>
                  )}
                </div>
              </motion.div>
            </React.Fragment>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TypingIndicator />
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
            >
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={scrollToBottom}
                className="rounded-full shadow-md"
              >
                <ArrowDown className="size-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <MessageInput
        onSend={(msg) => onSendMessage(conversation.id, msg)}
      />
    </div>
  )
}

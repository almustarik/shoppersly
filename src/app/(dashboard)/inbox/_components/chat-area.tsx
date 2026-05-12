"use client"

import * as React from "react"
import {
  Phone,
  Video,
  MoreHorizontal,
  Check,
  CheckCheck,
  ArrowDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-[#64748B]/60"
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
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-[#FAFBFC]">
        <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-6">
          <svg
            className="size-12 text-[#64748B]/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <h3 className="text-[16px] font-medium text-[#0F172A]/70">
          Select a conversation
        </h3>
        <p className="text-[13px] text-[#64748B]">
          Choose a conversation from the sidebar to start messaging
        </p>
      </div>
    )
  }

  const { customer, messages, isTyping } = conversation

  return (
    <div className="flex flex-1 flex-col bg-[#FAFBFC]">
      {/* Header - 56px */}
      <div className="flex flex-none items-center justify-between border-b border-[#E2E8F0] bg-white px-4 h-14">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center justify-center size-9 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[11px] font-semibold">
              {getInitials(customer.name)}
            </div>
            {customer.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-[#10B981]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-[#0F172A]">
                {customer.name}
              </h3>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold text-white",
                  customer.channel === "facebook"
                    ? "bg-blue-500"
                    : "bg-linear-to-r from-purple-500 via-pink-500 to-orange-400"
                )}
              >
                {customer.channel === "facebook" ? "FB" : "IG"}
              </span>
            </div>
            <p className="text-[12px] text-[#64748B]">
              {customer.isOnline ? (
                <span className="text-[#10B981]">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex items-center justify-center size-9 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors">
            <Phone className="size-4" />
          </button>
          <button className="flex items-center justify-center size-9 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors">
            <Video className="size-4" />
          </button>
          <div className="w-px h-5 bg-[#E2E8F0] mx-1" />
          <button
            onClick={onToggleSidebar}
            className={cn(
              "flex items-center justify-center size-9 rounded-lg transition-colors",
              sidebarOpen
                ? "bg-[#F8FAFC] text-[#0F172A]"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            )}
          >
            <MoreHorizontal className="size-4" />
          </button>
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
                  <div className="h-px flex-1 bg-[#E2E8F0]" />
                  <span className="text-[11px] font-medium text-[#64748B]">
                    {formatDateSeparator(message.timestamp)}
                  </span>
                  <div className="h-px flex-1 bg-[#E2E8F0]" />
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className={cn(
                  "flex flex-col",
                  message.sender === "agent" ? "ml-auto items-end max-w-[70%]" : "items-start max-w-[70%]"
                )}
              >
                <div
                  className={cn(
                    "relative rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed",
                    message.sender === "agent"
                      ? "rounded-br-md bg-[#4F46E5] text-white"
                      : "rounded-bl-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]"
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
                  <span className="text-[10px] text-[#64748B]/70">
                    {formatMessageTime(message.timestamp)}
                  </span>
                  {message.sender === "agent" && (
                    <span className="text-[#64748B]/60">
                      {message.seen ? (
                        <CheckCheck className="size-3 text-[#4F46E5]" />
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
              <button
                onClick={scrollToBottom}
                className="flex items-center justify-center size-9 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                <ArrowDown className="size-4" />
              </button>
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

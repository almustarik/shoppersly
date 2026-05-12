"use client"

import * as React from "react"
import { Search, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Conversation, Channel } from "@/mock/inbox-data"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = diff / (1000 * 60 * 60)

  if (hours < 1) {
    const mins = Math.floor(diff / (1000 * 60))
    return mins < 1 ? "now" : `${mins}m`
  }
  if (hours < 24) return `${Math.floor(hours)}h`
  if (hours < 48) return "Yesterday"
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

const channelLabels: Record<Channel, { short: string; className: string }> = {
  facebook: { short: "FB", className: "bg-blue-500 text-white" },
  instagram: { short: "IG", className: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white" },
}

interface ConversationsListProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
}

export function ConversationsList({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ConversationsListProps) {
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState("all")
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const listRef = React.useRef<HTMLDivElement>(null)

  const filtered = React.useMemo(() => {
    let result = conversations

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.customer.name.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
      )
    }

    if (filter === "unread") result = result.filter((c) => c.unreadCount > 0)
    if (filter === "facebook")
      result = result.filter((c) => c.customer.channel === "facebook")
    if (filter === "instagram")
      result = result.filter((c) => c.customer.channel === "instagram")

    return result.sort(
      (a, b) =>
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
    )
  }, [conversations, search, filter])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (filtered.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        const next = Math.min(focusedIndex + 1, filtered.length - 1)
        setFocusedIndex(next)
        onSelectConversation(filtered[next].id)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const prev = Math.max(focusedIndex - 1, 0)
        setFocusedIndex(prev)
        onSelectConversation(filtered[prev].id)
      }
    },
    [filtered, focusedIndex, onSelectConversation]
  )

  React.useEffect(() => {
    if (activeConversationId) {
      const idx = filtered.findIndex((c) => c.id === activeConversationId)
      if (idx >= 0) setFocusedIndex(idx)
    }
  }, [activeConversationId, filtered])

  const filterTabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
  ]

  return (
    <div className="flex h-full flex-col border-r border-[#E2E8F0] bg-white">
      <div className="flex-none space-y-3 border-b border-[#E2E8F0] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#0F172A]">Inbox</h2>
          <span className="inline-flex items-center rounded-full bg-[#4F46E5] px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums min-w-[20px] justify-center">
            {conversations.filter((c) => c.unreadCount > 0).length}
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            role="searchbox"
            aria-label="Search conversations"
            className="h-9 pl-8 text-[13px] rounded-lg bg-[#F8FAFC]/50 border-[#E2E8F0] transition-colors duration-150"
          />
        </div>
      </div>

      <div className="flex-none flex items-center gap-4 px-4 border-b border-[#E2E8F0]" role="tablist" aria-label="Conversation filters">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            role="tab"
            aria-selected={filter === tab.value}
            className={cn(
              "relative py-2.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-t-sm",
              filter === tab.value
                ? "text-[#4F46E5]"
                : "text-muted-foreground hover:text-[#0F172A]"
            )}
          >
            {tab.label}
            {filter === tab.value && (
              <motion.div
                layoutId="inbox-filter-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F46E5] rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div
          ref={listRef}
          role="listbox"
          aria-label="Conversations"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 px-4 py-12 text-center"
              >
                <Filter className="size-8 text-muted-foreground/30" />
                <p className="text-[13px] text-muted-foreground">
                  No conversations found
                </p>
              </motion.div>
            ) : (
              filtered.map((conversation, index) => (
                <motion.button
                  key={conversation.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role="option"
                  aria-selected={activeConversationId === conversation.id}
                  aria-label={`${conversation.customer.name}${conversation.unreadCount > 0 ? `, ${conversation.unreadCount} unread` : ""} — ${conversation.lastMessage}`}
                  onClick={() => {
                    setFocusedIndex(index)
                    onSelectConversation(conversation.id)
                  }}
                  className={cn(
                    "relative flex w-full items-start gap-3 px-4 py-3 text-left transition-colors duration-150 h-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/20",
                    activeConversationId === conversation.id
                      ? "bg-primary/4 border-l-2 border-l-[#4F46E5]"
                      : "hover:bg-[#F8FAFC]/50 border-l-2 border-l-transparent"
                  )}
                >
                  <div className="relative flex-none">
                    <div className="flex items-center justify-center size-10 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[11px] font-semibold">
                      {getInitials(conversation.customer.name)}
                    </div>
                    {conversation.customer.isOnline && (
                      <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white bg-[#10B981]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-sm",
                          conversation.unreadCount > 0
                            ? "font-semibold text-[#0F172A]"
                            : "font-medium text-[#0F172A]/80"
                        )}
                      >
                        {conversation.customer.name}
                      </span>
                      <span className="flex-none text-[11px] text-muted-foreground tabular-nums">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>

                    <p
                      className={cn(
                        "truncate text-[13px] mt-0.5",
                        conversation.unreadCount > 0
                          ? "font-medium text-[#0F172A]/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {conversation.isTyping ? (
                        <span className="italic text-[#4F46E5]">typing...</span>
                      ) : (
                        conversation.lastMessage
                      )}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                          channelLabels[conversation.customer.channel].className
                        )}
                      >
                        {channelLabels[conversation.customer.channel].short}
                      </span>

                      <AnimatePresence>
                        {conversation.unreadCount > 0 && (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            className="ml-auto inline-flex items-center justify-center rounded-full bg-[#4F46E5] min-w-[20px] h-5 px-1.5 text-[10px] font-bold text-white tabular-nums"
                          >
                            {conversation.unreadCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  )
}

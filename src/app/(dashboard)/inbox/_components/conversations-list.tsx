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
          <h2 className="text-[14px] font-semibold text-[#0F172A]">Inbox</h2>
          <span className="inline-flex items-center rounded-full bg-[#4F46E5] px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums min-w-[20px] justify-center">
            {conversations.filter((c) => c.unreadCount > 0).length}
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8 text-[13px] rounded-lg bg-[#F8FAFC]/50 border-[#E2E8F0]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex-none flex items-center gap-4 px-4 border-b border-[#E2E8F0]">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={cn(
              "relative py-2.5 text-[12px] font-medium transition-colors",
              filter === tab.value
                ? "text-[#4F46E5]"
                : "text-[#64748B] hover:text-[#0F172A]"
            )}
          >
            {tab.label}
            {filter === tab.value && (
              <motion.div
                layoutId="inbox-filter-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F46E5] rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 px-4 py-12 text-center"
            >
              <Filter className="size-8 text-[#64748B]/30" />
              <p className="text-[13px] text-[#64748B]">
                No conversations found
              </p>
            </motion.div>
          ) : (
            filtered.map((conversation) => (
              <motion.button
                key={conversation.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "relative flex w-full items-start gap-3 px-4 py-3 text-left transition-colors h-[72px]",
                  activeConversationId === conversation.id
                    ? "bg-[#4F46E5]/5 border-l-2 border-l-[#4F46E5]"
                    : "hover:bg-[#F8FAFC]/50 border-l-2 border-l-transparent"
                )}
              >
                {/* Avatar with online dot */}
                <div className="relative flex-none">
                  <div className="flex items-center justify-center size-10 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[11px] font-semibold">
                    {getInitials(conversation.customer.name)}
                  </div>
                  {conversation.customer.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border-2 border-white bg-[#10B981]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "truncate text-[14px]",
                        conversation.unreadCount > 0
                          ? "font-semibold text-[#0F172A]"
                          : "font-medium text-[#0F172A]/80"
                      )}
                    >
                      {conversation.customer.name}
                    </span>
                    <span className="flex-none text-[11px] text-[#64748B]">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>

                  <p
                    className={cn(
                      "truncate text-[13px] mt-0.5",
                      conversation.unreadCount > 0
                        ? "font-medium text-[#0F172A]/70"
                        : "text-[#64748B]"
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

                    {conversation.unreadCount > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-[#4F46E5] min-w-[20px] h-5 px-1.5 text-[10px] font-bold text-white tabular-nums">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  )
}

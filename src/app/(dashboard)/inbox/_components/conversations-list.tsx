"use client"

import * as React from "react"
import { Search, MessageCircle, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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

const channelColors: Record<Channel, string> = {
  facebook: "bg-blue-500",
  instagram: "bg-linear-to-br from-purple-500 via-pink-500 to-orange-400",
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

  return (
    <div className="flex h-full flex-col border-r border-border bg-card">
      <div className="flex-none space-y-3 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Inbox</h2>
          <Badge variant="secondary" className="text-xs tabular-nums">
            {conversations.filter((c) => c.unreadCount > 0).length} unread
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setFilter} className="flex-none">
        <TabsList variant="line" className="w-full justify-start gap-0 px-4">
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="text-xs">
            Unread
          </TabsTrigger>
          <TabsTrigger value="facebook" className="text-xs">
            Facebook
          </TabsTrigger>
          <TabsTrigger value="instagram" className="text-xs">
            Instagram
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="flex-1">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 px-4 py-12 text-center"
            >
              <Filter className="size-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
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
                  "relative flex w-full items-start gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors hover:bg-accent/50",
                  activeConversationId === conversation.id &&
                    "border-l-2 border-l-primary bg-accent/70"
                )}
              >
                <div className="relative flex-none">
                  <Avatar size="default">
                    <AvatarFallback
                      className={cn(
                        "text-xs font-medium",
                        activeConversationId === conversation.id
                          ? "bg-primary/10 text-primary"
                          : "bg-muted"
                      )}
                    >
                      {getInitials(conversation.customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.customer.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-emerald-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "truncate text-sm",
                        conversation.unreadCount > 0
                          ? "font-semibold text-foreground"
                          : "font-medium text-foreground/80"
                      )}
                    >
                      {conversation.customer.name}
                    </span>
                    <span className="flex-none text-[11px] text-muted-foreground">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>

                  <div className="mt-0.5 flex items-center gap-2">
                    <p
                      className={cn(
                        "truncate text-xs",
                        conversation.unreadCount > 0
                          ? "font-medium text-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {conversation.isTyping ? (
                        <span className="italic text-primary">typing...</span>
                      ) : (
                        conversation.lastMessage
                      )}
                    </p>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white",
                        channelColors[conversation.customer.channel]
                      )}
                    >
                      {conversation.customer.channel === "facebook"
                        ? "FB"
                        : "IG"}
                    </span>

                    {conversation.unreadCount > 0 && (
                      <span className="ml-auto inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
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

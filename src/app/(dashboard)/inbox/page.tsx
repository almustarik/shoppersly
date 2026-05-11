"use client"

import * as React from "react"
import { AnimatePresence } from "framer-motion"

import { mockConversations, type Message } from "@/mock/inbox-data"
import { ConversationsList } from "./_components/conversations-list"
import { ChatArea } from "./_components/chat-area"
import { CustomerSidebar } from "./_components/customer-sidebar"

export default function InboxPage() {
  const [conversations, setConversations] = React.useState(mockConversations)
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  const activeConversation = React.useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId]
  )

  const handleSelectConversation = (id: string) => {
    setActiveId(id)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    )
  }

  const handleSendMessage = (conversationId: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      content,
      type: "text",
      sender: "agent",
      timestamp: new Date().toISOString(),
      seen: false,
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: content,
              lastMessageTime: newMessage.timestamp,
            }
          : c
      )
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      {/* Left Panel - Conversations */}
      <div className="w-80 flex-none">
        <ConversationsList
          conversations={conversations}
          activeConversationId={activeId}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Center Panel - Chat */}
      <ChatArea
        conversation={activeConversation}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        onSendMessage={handleSendMessage}
      />

      {/* Right Panel - Customer Sidebar */}
      <AnimatePresence>
        {sidebarOpen && activeConversation && (
          <CustomerSidebar
            customer={activeConversation.customer}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

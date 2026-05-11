import { create } from "zustand"
import type { Notification, User } from "@/types"

interface AppState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void

  notifications: Notification[]
  addNotification: (notification: Notification) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void

  user: User
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  notifications: [
    {
      id: "1",
      title: "New order received",
      message: "Order #1042 from Sarah Chen — $89.99",
      type: "success",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "2",
      title: "Low stock alert",
      message: "Wireless Earbuds Pro is below 10 units",
      type: "warning",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "3",
      title: "Campaign completed",
      message: "Summer Sale campaign reached 12.4k people",
      type: "info",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
  ],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),

  user: {
    id: "usr_001",
    name: "Alex Rivera",
    email: "alex@shoppersly.com",
    avatar: "",
    role: "owner",
    createdAt: "2024-01-15T00:00:00.000Z",
  },
}))

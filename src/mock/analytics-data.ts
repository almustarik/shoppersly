export const revenueByChannel = [
  { month: "Jan", facebook: 185000, instagram: 92000, direct: 45000 },
  { month: "Feb", facebook: 210000, instagram: 105000, direct: 52000 },
  { month: "Mar", facebook: 195000, instagram: 120000, direct: 48000 },
  { month: "Apr", facebook: 240000, instagram: 135000, direct: 62000 },
  { month: "May", facebook: 265000, instagram: 148000, direct: 71000 },
  { month: "Jun", facebook: 230000, instagram: 160000, direct: 68000 },
]

export const revenueVsOrders = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 4, 11)
  date.setDate(date.getDate() - (29 - i))
  return {
    date: date.toISOString().split("T")[0],
    revenue: Math.floor(Math.random() * 80000) + 30000,
    orders: Math.floor(Math.random() * 35) + 10,
  }
})

export const ordersByStatus = [
  { name: "Delivered", value: 456, color: "#10b981" },
  { name: "Processing", value: 124, color: "#6366f1" },
  { name: "Shipped", value: 89, color: "#8b5cf6" },
  { name: "Pending", value: 67, color: "#f59e0b" },
  { name: "Cancelled", value: 23, color: "#ef4444" },
]

export const ordersTrend = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 4, 11)
  date.setDate(date.getDate() - (29 - i))
  return {
    date: date.toISOString().split("T")[0],
    orders: Math.floor(Math.random() * 40) + 15,
    avgValue: Math.floor(Math.random() * 3000) + 2000,
  }
})

export const topProducts = [
  { name: "Premium Silk Saree", revenue: 285000, sold: 142 },
  { name: "Cotton Kurti Set", revenue: 198000, sold: 264 },
  { name: "Designer Lehenga", revenue: 176000, sold: 88 },
  { name: "Embroidered Salwar", revenue: 156000, sold: 195 },
  { name: "Banarasi Dupatta", revenue: 134000, sold: 268 },
  { name: "Georgette Blouse", revenue: 112000, sold: 320 },
  { name: "Bridal Jewelry Set", revenue: 98000, sold: 49 },
  { name: "Handloom Cotton Saree", revenue: 87000, sold: 145 },
  { name: "Palazzo Pants", revenue: 76000, sold: 380 },
  { name: "Chiffon Dupatta", revenue: 65000, sold: 325 },
]

export const categoryPerformance = [
  { category: "Sarees", revenue: 420000, orders: 350, growth: 12 },
  { category: "Kurtis", revenue: 310000, orders: 520, growth: 18 },
  { category: "Lehengas", revenue: 225000, orders: 112, growth: 8 },
  { category: "Jewelry", revenue: 180000, orders: 290, growth: 25 },
  { category: "Accessories", revenue: 145000, orders: 680, growth: 15 },
  { category: "Footwear", revenue: 98000, orders: 420, growth: -3 },
]

export const customerAcquisition = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2025, 4, 11)
  date.setDate(date.getDate() - (11 - i) * 7)
  return {
    week: `W${i + 1}`,
    newCustomers: Math.floor(Math.random() * 80) + 30,
    returning: Math.floor(Math.random() * 120) + 50,
  }
})

export const customerSegments = [
  { name: "VIP", value: 85, color: "#6366f1" },
  { name: "Regular", value: 340, color: "#8b5cf6" },
  { name: "New", value: 215, color: "#10b981" },
  { name: "At-risk", value: 67, color: "#f59e0b" },
]

export const customerLifetimeValue = [
  { range: "৳0-5K", count: 120 },
  { range: "৳5K-15K", count: 245 },
  { range: "৳15K-30K", count: 180 },
  { range: "৳30K-50K", count: 95 },
  { range: "৳50K-100K", count: 52 },
  { range: "৳100K+", count: 15 },
]

export const conversionFunnel = [
  { stage: "Visitors", count: 12500, percentage: 100 },
  { stage: "Product Views", count: 8200, percentage: 65.6 },
  { stage: "Add to Cart", count: 3400, percentage: 27.2 },
  { stage: "Checkout", count: 1850, percentage: 14.8 },
  { stage: "Purchase", count: 1240, percentage: 9.9 },
]

export const repeatPurchaseRate = Array.from({ length: 6 }, (_, i) => ({
  month: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"][i],
  rate: [28, 31, 29, 35, 38, 42][i],
}))

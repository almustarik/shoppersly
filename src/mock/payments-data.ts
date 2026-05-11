export type PaymentMethod = "bKash" | "Nagad" | "COD" | "Bank" | "Stripe"
export type TransactionStatus = "Completed" | "Pending" | "Failed" | "Refunded"

export interface Transaction {
  id: string
  customer: string
  amount: number
  method: PaymentMethod
  status: TransactionStatus
  orderId: string
  date: string
}

export const transactions: Transaction[] = [
  { id: "TXN-001", customer: "Fatima Akter", amount: 4500, method: "bKash", status: "Completed", orderId: "ORD-1201", date: "2025-05-11" },
  { id: "TXN-002", customer: "Rahim Uddin", amount: 12800, method: "Nagad", status: "Completed", orderId: "ORD-1202", date: "2025-05-11" },
  { id: "TXN-003", customer: "Nusrat Jahan", amount: 3200, method: "COD", status: "Pending", orderId: "ORD-1203", date: "2025-05-10" },
  { id: "TXN-004", customer: "Kamal Hossain", amount: 8900, method: "bKash", status: "Completed", orderId: "ORD-1204", date: "2025-05-10" },
  { id: "TXN-005", customer: "Sultana Begum", amount: 2100, method: "COD", status: "Failed", orderId: "ORD-1205", date: "2025-05-09" },
  { id: "TXN-006", customer: "Arif Rahman", amount: 15600, method: "Bank", status: "Completed", orderId: "ORD-1206", date: "2025-05-09" },
  { id: "TXN-007", customer: "Mina Khatun", amount: 6700, method: "bKash", status: "Refunded", orderId: "ORD-1207", date: "2025-05-08" },
  { id: "TXN-008", customer: "Jamal Ahmed", amount: 9400, method: "Nagad", status: "Completed", orderId: "ORD-1208", date: "2025-05-08" },
  { id: "TXN-009", customer: "Runa Laila", amount: 1850, method: "COD", status: "Pending", orderId: "ORD-1209", date: "2025-05-07" },
  { id: "TXN-010", customer: "Habib Mia", amount: 22000, method: "Bank", status: "Completed", orderId: "ORD-1210", date: "2025-05-07" },
  { id: "TXN-011", customer: "Taslima Akter", amount: 5300, method: "bKash", status: "Completed", orderId: "ORD-1211", date: "2025-05-06" },
  { id: "TXN-012", customer: "Shahid Ullah", amount: 7800, method: "Nagad", status: "Pending", orderId: "ORD-1212", date: "2025-05-06" },
  { id: "TXN-013", customer: "Priya Das", amount: 4200, method: "bKash", status: "Failed", orderId: "ORD-1213", date: "2025-05-05" },
  { id: "TXN-014", customer: "Rafiq Islam", amount: 18500, method: "Stripe", status: "Completed", orderId: "ORD-1214", date: "2025-05-05" },
  { id: "TXN-015", customer: "Nasima Begum", amount: 3600, method: "COD", status: "Completed", orderId: "ORD-1215", date: "2025-05-04" },
  { id: "TXN-016", customer: "Imran Khan", amount: 11200, method: "bKash", status: "Completed", orderId: "ORD-1216", date: "2025-05-04" },
  { id: "TXN-017", customer: "Sabina Yasmin", amount: 2900, method: "Nagad", status: "Refunded", orderId: "ORD-1217", date: "2025-05-03" },
  { id: "TXN-018", customer: "Belal Hossain", amount: 6100, method: "bKash", status: "Completed", orderId: "ORD-1218", date: "2025-05-03" },
  { id: "TXN-019", customer: "Afroza Khanam", amount: 14300, method: "Bank", status: "Pending", orderId: "ORD-1219", date: "2025-05-02" },
  { id: "TXN-020", customer: "Mizanur Rahman", amount: 8700, method: "bKash", status: "Completed", orderId: "ORD-1220", date: "2025-05-02" },
  { id: "TXN-021", customer: "Shirin Akter", amount: 5500, method: "COD", status: "Completed", orderId: "ORD-1221", date: "2025-05-01" },
  { id: "TXN-022", customer: "Nurul Haque", amount: 19800, method: "Stripe", status: "Completed", orderId: "ORD-1222", date: "2025-05-01" },
  { id: "TXN-023", customer: "Jesmin Akhter", amount: 7200, method: "Nagad", status: "Failed", orderId: "ORD-1223", date: "2025-04-30" },
  { id: "TXN-024", customer: "Abdur Rashid", amount: 3400, method: "bKash", status: "Completed", orderId: "ORD-1224", date: "2025-04-30" },
  { id: "TXN-025", customer: "Parveen Sultana", amount: 9900, method: "Bank", status: "Completed", orderId: "ORD-1225", date: "2025-04-29" },
  { id: "TXN-026", customer: "Salim Ullah", amount: 4800, method: "bKash", status: "Pending", orderId: "ORD-1226", date: "2025-04-29" },
  { id: "TXN-027", customer: "Monira Begum", amount: 16400, method: "Nagad", status: "Completed", orderId: "ORD-1227", date: "2025-04-28" },
  { id: "TXN-028", customer: "Tanvir Hasan", amount: 2600, method: "COD", status: "Refunded", orderId: "ORD-1228", date: "2025-04-28" },
]

export const revenueTrend = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 4, 11)
  date.setDate(date.getDate() - (29 - i))
  return {
    date: date.toISOString().split("T")[0],
    revenue: Math.floor(Math.random() * 80000) + 20000,
    transactions: Math.floor(Math.random() * 40) + 10,
  }
})

export const paymentMethodDistribution = [
  { name: "bKash", value: 45, color: "#E2136E" },
  { name: "COD", value: 30, color: "#6b7280" },
  { name: "Nagad", value: 15, color: "#F6921E" },
  { name: "Bank", value: 10, color: "#6366f1" },
]

export const dailyTransactionVolume = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(2025, 4, 11)
  date.setDate(date.getDate() - (13 - i))
  return {
    date: date.toISOString().split("T")[0],
    count: Math.floor(Math.random() * 50) + 15,
    amount: Math.floor(Math.random() * 150000) + 50000,
  }
})

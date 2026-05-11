import { mockOrders } from "@/mock/orders-data"
import OrderDetailPage from "./order-detail-client"

export function generateStaticParams() {
  return mockOrders.map((order) => ({ id: order.id }))
}

export default function Page() {
  return <OrderDetailPage />
}

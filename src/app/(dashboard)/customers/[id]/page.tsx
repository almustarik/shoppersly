import { customers } from "@/mock/customers-data"
import CustomerDetailPage from "./customer-detail-client"

export function generateStaticParams() {
  return customers.map((c) => ({ id: c.id }))
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <CustomerDetailPage params={params} />
}

import CustomerDetailPage from "./customer-detail-client"

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <CustomerDetailPage params={params} />
}

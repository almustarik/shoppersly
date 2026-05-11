import ProductDetailPage from "./product-detail-client"

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <ProductDetailPage params={params} />
}

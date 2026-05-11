import { products } from "@/mock/products-data"
import ProductDetailPage from "./product-detail-client"

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <ProductDetailPage params={params} />
}

export type ShipmentStatus =
  | "pickup_pending"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "returned"

export type CourierCode = "pathao" | "steadfast" | "redx" | "paperfly"

export interface TimelineStep {
  label: string
  date: string | null
  completed: boolean
  current: boolean
}

export interface Shipment {
  trackingId: string
  orderId: string
  customer: string
  phone: string
  courier: CourierCode
  status: ShipmentStatus
  pickupDate: string
  deliveryDate: string | null
  area: string
  amount: number
  timeline: TimelineStep[]
}

export interface CourierInfo {
  code: CourierCode
  name: string
  connected: boolean
  activeShipments: number
  deliveredToday: number
  successRate: number
  avgDeliveryTime: string
  color: string
}

export const shipmentStatusConfig: Record<
  ShipmentStatus,
  { label: string; className: string }
> = {
  pickup_pending: {
    label: "Pickup Pending",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  picked_up: {
    label: "Picked Up",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  in_transit: {
    label: "In Transit",
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  returned: {
    label: "Returned",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
}

export const couriers: CourierInfo[] = [
  {
    code: "pathao",
    name: "Pathao Courier",
    connected: true,
    activeShipments: 18,
    deliveredToday: 12,
    successRate: 94.5,
    avgDeliveryTime: "1.8 days",
    color: "#22c55e",
  },
  {
    code: "steadfast",
    name: "Steadfast Courier",
    connected: true,
    activeShipments: 14,
    deliveredToday: 9,
    successRate: 91.2,
    avgDeliveryTime: "2.1 days",
    color: "#3b82f6",
  },
  {
    code: "redx",
    name: "RedX",
    connected: true,
    activeShipments: 10,
    deliveredToday: 5,
    successRate: 89.8,
    avgDeliveryTime: "2.4 days",
    color: "#ef4444",
  },
  {
    code: "paperfly",
    name: "Paperfly",
    connected: false,
    activeShipments: 4,
    deliveredToday: 2,
    successRate: 87.3,
    avgDeliveryTime: "2.9 days",
    color: "#f97316",
  },
]

function buildTimeline(
  status: ShipmentStatus,
  pickupDate: string
): TimelineStep[] {
  const pickup = new Date(pickupDate)
  const steps: { label: string; hoursAfter: number }[] = [
    { label: "Order Placed", hoursAfter: -2 },
    { label: "Pickup Requested", hoursAfter: 0 },
    { label: "Picked Up", hoursAfter: 4 },
    { label: "In Hub", hoursAfter: 12 },
    { label: "Out for Delivery", hoursAfter: 24 },
    { label: "Delivered", hoursAfter: 30 },
  ]

  const statusOrder: ShipmentStatus[] = [
    "pickup_pending",
    "picked_up",
    "in_transit",
    "out_for_delivery",
    "delivered",
  ]

  const currentIndex =
    status === "returned" ? 3 : statusOrder.indexOf(status)
  const completedUpTo = currentIndex + 1

  return steps.map((step, i) => {
    const completed = i < completedUpTo
    const current = i === completedUpTo - 1
    const d = new Date(pickup.getTime() + step.hoursAfter * 3600000)

    return {
      label: step.label,
      date: completed ? d.toISOString() : null,
      completed,
      current,
    }
  })
}

export const shipments: Shipment[] = [
  {
    trackingId: "PTH-482916",
    orderId: "ORD-1001",
    customer: "Fatima Akter",
    phone: "01712345678",
    courier: "pathao",
    status: "in_transit",
    pickupDate: "2026-05-10T09:00:00Z",
    deliveryDate: null,
    area: "Dhanmondi, Dhaka",
    amount: 2450,
    timeline: buildTimeline("in_transit", "2026-05-10T09:00:00Z"),
  },
  {
    trackingId: "STD-739201",
    orderId: "ORD-1002",
    customer: "Rafiq Hossain",
    phone: "01898765432",
    courier: "steadfast",
    status: "delivered",
    pickupDate: "2026-05-08T10:00:00Z",
    deliveryDate: "2026-05-09T16:30:00Z",
    area: "Gulshan, Dhaka",
    amount: 3800,
    timeline: buildTimeline("delivered", "2026-05-08T10:00:00Z"),
  },
  {
    trackingId: "RDX-345678",
    orderId: "ORD-1003",
    customer: "Nusrat Jahan",
    phone: "01612345678",
    courier: "redx",
    status: "pickup_pending",
    pickupDate: "2026-05-12T08:00:00Z",
    deliveryDate: null,
    area: "Uttara, Dhaka",
    amount: 1250,
    timeline: buildTimeline("pickup_pending", "2026-05-12T08:00:00Z"),
  },
  {
    trackingId: "PTH-591034",
    orderId: "ORD-1004",
    customer: "Kamal Uddin",
    phone: "01512345678",
    courier: "pathao",
    status: "out_for_delivery",
    pickupDate: "2026-05-11T07:00:00Z",
    deliveryDate: null,
    area: "Mirpur, Dhaka",
    amount: 5600,
    timeline: buildTimeline("out_for_delivery", "2026-05-11T07:00:00Z"),
  },
  {
    trackingId: "STD-820147",
    orderId: "ORD-1005",
    customer: "Tasneem Rahman",
    phone: "01912345678",
    courier: "steadfast",
    status: "in_transit",
    pickupDate: "2026-05-10T11:00:00Z",
    deliveryDate: null,
    area: "Chittagong",
    amount: 4200,
    timeline: buildTimeline("in_transit", "2026-05-10T11:00:00Z"),
  },
  {
    trackingId: "PPF-901234",
    orderId: "ORD-1006",
    customer: "Arif Mahmud",
    phone: "01812345678",
    courier: "paperfly",
    status: "picked_up",
    pickupDate: "2026-05-11T14:00:00Z",
    deliveryDate: null,
    area: "Sylhet",
    amount: 1800,
    timeline: buildTimeline("picked_up", "2026-05-11T14:00:00Z"),
  },
  {
    trackingId: "RDX-678901",
    orderId: "ORD-1007",
    customer: "Sumaya Islam",
    phone: "01712349876",
    courier: "redx",
    status: "delivered",
    pickupDate: "2026-05-07T09:00:00Z",
    deliveryDate: "2026-05-08T15:00:00Z",
    area: "Banani, Dhaka",
    amount: 3200,
    timeline: buildTimeline("delivered", "2026-05-07T09:00:00Z"),
  },
  {
    trackingId: "PTH-234567",
    orderId: "ORD-1008",
    customer: "Imran Khan",
    phone: "01612347890",
    courier: "pathao",
    status: "returned",
    pickupDate: "2026-05-06T08:00:00Z",
    deliveryDate: null,
    area: "Mohammadpur, Dhaka",
    amount: 2100,
    timeline: buildTimeline("returned", "2026-05-06T08:00:00Z"),
  },
  {
    trackingId: "STD-456789",
    orderId: "ORD-1009",
    customer: "Maliha Chowdhury",
    phone: "01512347654",
    courier: "steadfast",
    status: "delivered",
    pickupDate: "2026-05-09T10:00:00Z",
    deliveryDate: "2026-05-10T14:00:00Z",
    area: "Wari, Dhaka",
    amount: 6700,
    timeline: buildTimeline("delivered", "2026-05-09T10:00:00Z"),
  },
  {
    trackingId: "PPF-567890",
    orderId: "ORD-1010",
    customer: "Hasib Ahmed",
    phone: "01812340987",
    courier: "paperfly",
    status: "in_transit",
    pickupDate: "2026-05-10T12:00:00Z",
    deliveryDate: null,
    area: "Rajshahi",
    amount: 2900,
    timeline: buildTimeline("in_transit", "2026-05-10T12:00:00Z"),
  },
  {
    trackingId: "RDX-890123",
    orderId: "ORD-1011",
    customer: "Sabrina Yeasmin",
    phone: "01912340987",
    courier: "redx",
    status: "pickup_pending",
    pickupDate: "2026-05-12T09:00:00Z",
    deliveryDate: null,
    area: "Bashundhara, Dhaka",
    amount: 4500,
    timeline: buildTimeline("pickup_pending", "2026-05-12T09:00:00Z"),
  },
  {
    trackingId: "PTH-123890",
    orderId: "ORD-1012",
    customer: "Rezaul Karim",
    phone: "01712348765",
    courier: "pathao",
    status: "delivered",
    pickupDate: "2026-05-08T08:00:00Z",
    deliveryDate: "2026-05-09T12:00:00Z",
    area: "Motijheel, Dhaka",
    amount: 1550,
    timeline: buildTimeline("delivered", "2026-05-08T08:00:00Z"),
  },
  {
    trackingId: "STD-901456",
    orderId: "ORD-1013",
    customer: "Ayesha Siddika",
    phone: "01612345432",
    courier: "steadfast",
    status: "out_for_delivery",
    pickupDate: "2026-05-11T06:00:00Z",
    deliveryDate: null,
    area: "Dhanmondi, Dhaka",
    amount: 8200,
    timeline: buildTimeline("out_for_delivery", "2026-05-11T06:00:00Z"),
  },
  {
    trackingId: "RDX-234890",
    orderId: "ORD-1014",
    customer: "Tanvir Hasan",
    phone: "01812346789",
    courier: "redx",
    status: "in_transit",
    pickupDate: "2026-05-10T13:00:00Z",
    deliveryDate: null,
    area: "Khulna",
    amount: 3100,
    timeline: buildTimeline("in_transit", "2026-05-10T13:00:00Z"),
  },
  {
    trackingId: "PTH-678234",
    orderId: "ORD-1015",
    customer: "Ruma Begum",
    phone: "01512349870",
    courier: "pathao",
    status: "delivered",
    pickupDate: "2026-05-07T10:00:00Z",
    deliveryDate: "2026-05-08T14:00:00Z",
    area: "Gulshan, Dhaka",
    amount: 5100,
    timeline: buildTimeline("delivered", "2026-05-07T10:00:00Z"),
  },
  {
    trackingId: "PPF-345012",
    orderId: "ORD-1016",
    customer: "Shahed Alam",
    phone: "01912347890",
    courier: "paperfly",
    status: "returned",
    pickupDate: "2026-05-05T08:00:00Z",
    deliveryDate: null,
    area: "Comilla",
    amount: 1900,
    timeline: buildTimeline("returned", "2026-05-05T08:00:00Z"),
  },
  {
    trackingId: "STD-567234",
    orderId: "ORD-1017",
    customer: "Lamia Haque",
    phone: "01712340987",
    courier: "steadfast",
    status: "picked_up",
    pickupDate: "2026-05-12T07:00:00Z",
    deliveryDate: null,
    area: "Uttara, Dhaka",
    amount: 7300,
    timeline: buildTimeline("picked_up", "2026-05-12T07:00:00Z"),
  },
  {
    trackingId: "RDX-901567",
    orderId: "ORD-1018",
    customer: "Mizanur Rahman",
    phone: "01612340987",
    courier: "redx",
    status: "delivered",
    pickupDate: "2026-05-09T08:00:00Z",
    deliveryDate: "2026-05-10T11:00:00Z",
    area: "Mirpur, Dhaka",
    amount: 2750,
    timeline: buildTimeline("delivered", "2026-05-09T08:00:00Z"),
  },
  {
    trackingId: "PTH-890567",
    orderId: "ORD-1019",
    customer: "Nazmul Huda",
    phone: "01812343210",
    courier: "pathao",
    status: "pickup_pending",
    pickupDate: "2026-05-12T10:00:00Z",
    deliveryDate: null,
    area: "Banani, Dhaka",
    amount: 4800,
    timeline: buildTimeline("pickup_pending", "2026-05-12T10:00:00Z"),
  },
  {
    trackingId: "STD-123678",
    orderId: "ORD-1020",
    customer: "Farzana Akhter",
    phone: "01512340987",
    courier: "steadfast",
    status: "delivered",
    pickupDate: "2026-05-08T07:00:00Z",
    deliveryDate: "2026-05-09T13:00:00Z",
    area: "Tejgaon, Dhaka",
    amount: 3600,
    timeline: buildTimeline("delivered", "2026-05-08T07:00:00Z"),
  },
]

export const logisticsSummary = {
  inTransit: 34,
  pendingPickup: 12,
  deliveredToday: 28,
  returns: 5,
}

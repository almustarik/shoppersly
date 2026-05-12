import {
  ShoppingBag,
  DollarSign,
  Truck,
  MessageCircle,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

// --- Stat Cards ---

export type StatCard = {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  trend: number;
  trendDirection: "up" | "down" | "neutral";
  icon: LucideIcon;
};

export const statsCards: StatCard[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: 245890,
    formattedValue: "৳2,45,890",
    trend: 12.5,
    trendDirection: "up",
    icon: DollarSign,
  },
  {
    id: "orders",
    title: "Orders Today",
    value: 47,
    formattedValue: "47",
    trend: 8.2,
    trendDirection: "up",
    icon: ShoppingBag,
  },
  {
    id: "deliveries",
    title: "Pending Deliveries",
    value: 23,
    formattedValue: "23",
    trend: 0,
    trendDirection: "neutral",
    icon: Truck,
  },
  {
    id: "conversations",
    title: "Active Conversations",
    value: 12,
    formattedValue: "12",
    trend: -3.1,
    trendDirection: "down",
    icon: MessageCircle,
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: 3.2,
    formattedValue: "3.2%",
    trend: 0.5,
    trendDirection: "up",
    icon: TrendingUp,
  },
];

// --- Revenue Chart (last 30 days) ---

export type RevenueDataPoint = {
  date: string;
  revenue: number;
};

export const revenueData: RevenueDataPoint[] = [
  { date: "Apr 13", revenue: 78500 },
  { date: "Apr 14", revenue: 92300 },
  { date: "Apr 15", revenue: 65800 },
  { date: "Apr 16", revenue: 110200 },
  { date: "Apr 17", revenue: 134500 },
  { date: "Apr 18", revenue: 98700 },
  { date: "Apr 19", revenue: 145200 },
  { date: "Apr 20", revenue: 156800 },
  { date: "Apr 21", revenue: 89400 },
  { date: "Apr 22", revenue: 72600 },
  { date: "Apr 23", revenue: 118900 },
  { date: "Apr 24", revenue: 167300 },
  { date: "Apr 25", revenue: 142100 },
  { date: "Apr 26", revenue: 178500 },
  { date: "Apr 27", revenue: 125600 },
  { date: "Apr 28", revenue: 93400 },
  { date: "Apr 29", revenue: 108700 },
  { date: "Apr 30", revenue: 154200 },
  { date: "May 1", revenue: 189600 },
  { date: "May 2", revenue: 167800 },
  { date: "May 3", revenue: 143500 },
  { date: "May 4", revenue: 198200 },
  { date: "May 5", revenue: 176400 },
  { date: "May 6", revenue: 112300 },
  { date: "May 7", revenue: 134800 },
  { date: "May 8", revenue: 156700 },
  { date: "May 9", revenue: 189300 },
  { date: "May 10", revenue: 201500 },
  { date: "May 11", revenue: 178900 },
  { date: "May 12", revenue: 245890 },
];

// --- Orders Chart (last 7 days) ---

export type OrdersDataPoint = {
  day: string;
  completed: number;
  pending: number;
  cancelled: number;
};

export const ordersData: OrdersDataPoint[] = [
  { day: "Mon", completed: 32, pending: 8, cancelled: 3 },
  { day: "Tue", completed: 28, pending: 12, cancelled: 2 },
  { day: "Wed", completed: 38, pending: 6, cancelled: 4 },
  { day: "Thu", completed: 45, pending: 10, cancelled: 1 },
  { day: "Fri", completed: 52, pending: 14, cancelled: 5 },
  { day: "Sat", completed: 41, pending: 9, cancelled: 2 },
  { day: "Sun", completed: 35, pending: 12, cancelled: 3 },
];

// --- Recent Orders ---

export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered";

export type RecentOrder = {
  id: string;
  customer: string;
  phone: string;
  products: string;
  total: number;
  formattedTotal: string;
  status: OrderStatus;
  date: string;
};

export const recentOrders: RecentOrder[] = [
  {
    id: "#SH-1247",
    customer: "Fatima Rahman",
    phone: "+880 1712-345678",
    products: "Silk Saree, Bangles Set",
    total: 4850,
    formattedTotal: "৳4,850",
    status: "Pending",
    date: "12 May, 2:30 PM",
  },
  {
    id: "#SH-1246",
    customer: "Kamal Hossain",
    phone: "+880 1898-765432",
    products: "Wireless Earbuds",
    total: 2200,
    formattedTotal: "৳2,200",
    status: "Confirmed",
    date: "12 May, 1:15 PM",
  },
  {
    id: "#SH-1245",
    customer: "Nusrat Jahan",
    phone: "+880 1654-321098",
    products: "Korean Skincare Set",
    total: 3500,
    formattedTotal: "৳3,500",
    status: "Shipped",
    date: "12 May, 11:40 AM",
  },
  {
    id: "#SH-1244",
    customer: "Rafiq Ahmed",
    phone: "+880 1912-876543",
    products: "Polo T-Shirt x3",
    total: 2700,
    formattedTotal: "৳2,700",
    status: "Delivered",
    date: "11 May, 9:20 PM",
  },
  {
    id: "#SH-1243",
    customer: "Anika Tasnim",
    phone: "+880 1567-234567",
    products: "Laptop Stand, USB Hub",
    total: 1850,
    formattedTotal: "৳1,850",
    status: "Shipped",
    date: "11 May, 6:45 PM",
  },
  {
    id: "#SH-1242",
    customer: "Mehedi Hasan",
    phone: "+880 1823-456789",
    products: "Running Shoes Nike",
    total: 8900,
    formattedTotal: "৳8,900",
    status: "Delivered",
    date: "11 May, 3:10 PM",
  },
];

// --- Top Products ---

export type TopProduct = {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  formattedRevenue: string;
  progress: number;
};

export const topProducts: TopProduct[] = [
  {
    id: "1",
    name: "Premium Silk Saree Collection",
    category: "Fashion",
    unitsSold: 156,
    revenue: 468000,
    formattedRevenue: "৳4,68,000",
    progress: 100,
  },
  {
    id: "2",
    name: "Korean Skincare Bundle",
    category: "Cosmetics",
    unitsSold: 132,
    revenue: 396000,
    formattedRevenue: "৳3,96,000",
    progress: 85,
  },
  {
    id: "3",
    name: "Wireless Bluetooth Earbuds",
    category: "Electronics",
    unitsSold: 98,
    revenue: 215600,
    formattedRevenue: "৳2,15,600",
    progress: 63,
  },
  {
    id: "4",
    name: "Men's Polo T-Shirt Pack",
    category: "Fashion",
    unitsSold: 87,
    revenue: 130500,
    formattedRevenue: "৳1,30,500",
    progress: 56,
  },
  {
    id: "5",
    name: "Organic Honey (Sundarbans)",
    category: "Food",
    unitsSold: 74,
    revenue: 74000,
    formattedRevenue: "৳74,000",
    progress: 47,
  },
];

// --- Activity Feed ---

export type ActivityItem = {
  id: string;
  type: "order" | "payment" | "delivery" | "message" | "review";
  message: string;
  timestamp: string;
};

export const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    type: "order",
    message: 'New order #SH-1247 from Fatima Rahman',
    timestamp: "2 min ago",
  },
  {
    id: "a2",
    type: "payment",
    message: "Payment received ৳3,500 via bKash",
    timestamp: "15 min ago",
  },
  {
    id: "a3",
    type: "delivery",
    message: "Order #SH-1240 delivered by Pathao",
    timestamp: "32 min ago",
  },
  {
    id: "a4",
    type: "message",
    message: "New message from Kamal Hossain on Messenger",
    timestamp: "45 min ago",
  },
  {
    id: "a5",
    type: "review",
    message: 'Nusrat Jahan left a 5★ review on "Silk Saree"',
    timestamp: "1 hour ago",
  },
  {
    id: "a6",
    type: "payment",
    message: "Payment received ৳8,900 via Nagad",
    timestamp: "1.5 hours ago",
  },
  {
    id: "a7",
    type: "order",
    message: 'New order #SH-1246 from Kamal Hossain',
    timestamp: "2 hours ago",
  },
  {
    id: "a8",
    type: "delivery",
    message: "Order #SH-1238 picked up by RedX",
    timestamp: "3 hours ago",
  },
];

// --- Courier Status ---

export type CourierProvider = {
  id: string;
  name: string;
  logo: string;
  color: string;
  connected: boolean;
  pendingPickups: number;
  inTransit: number;
  deliveredToday: number;
};

export const courierProviders: CourierProvider[] = [
  {
    id: "pathao",
    name: "Pathao",
    logo: "PA",
    color: "bg-emerald-500",
    connected: true,
    pendingPickups: 5,
    inTransit: 12,
    deliveredToday: 8,
  },
  {
    id: "steadfast",
    name: "Steadfast",
    logo: "SF",
    color: "bg-blue-500",
    connected: true,
    pendingPickups: 3,
    inTransit: 8,
    deliveredToday: 14,
  },
  {
    id: "redx",
    name: "RedX",
    logo: "RX",
    color: "bg-red-500",
    connected: false,
    pendingPickups: 7,
    inTransit: 5,
    deliveredToday: 6,
  },
  {
    id: "paperfly",
    name: "Paperfly",
    logo: "PF",
    color: "bg-violet-500",
    connected: true,
    pendingPickups: 2,
    inTransit: 4,
    deliveredToday: 3,
  },
];

export type Channel = "facebook" | "instagram"

export type MessageType = "text" | "image" | "order_link"

export interface Message {
  id: string
  conversationId: string
  content: string
  type: MessageType
  sender: "customer" | "agent"
  timestamp: string
  seen?: boolean
  imageUrl?: string
  orderId?: string
}

export interface Customer {
  id: string
  name: string
  avatar: string
  phone: string
  email: string
  location: string
  channel: Channel
  profileUrl: string
  isOnline: boolean
  totalOrders: number
  totalSpent: number
  avgOrderValue: number
  tags: string[]
  notes: string
  recentOrders: {
    id: string
    date: string
    amount: number
    status: "delivered" | "shipped" | "processing" | "cancelled"
    items: string
  }[]
}

export interface Conversation {
  id: string
  customer: Customer
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isTyping: boolean
  messages: Message[]
}

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    customer: {
      id: "cust-1",
      name: "Fatima Akter",
      avatar: "",
      phone: "+880 1711-234567",
      email: "fatima.akter@gmail.com",
      location: "Dhanmondi, Dhaka",
      channel: "facebook",
      profileUrl: "https://facebook.com/fatima.akter",
      isOnline: true,
      totalOrders: 12,
      totalSpent: 48500,
      avgOrderValue: 4042,
      tags: ["VIP", "Repeat Buyer"],
      notes: "Prefers cash on delivery. Usually orders for family.",
      recentOrders: [
        { id: "ORD-1045", date: "2026-05-10", amount: 3200, status: "shipped", items: "Silk Saree (Navy Blue)" },
        { id: "ORD-1032", date: "2026-05-03", amount: 5400, status: "delivered", items: "Kurti Set x2" },
        { id: "ORD-1018", date: "2026-04-22", amount: 2800, status: "delivered", items: "Cotton Salwar Kameez" },
      ],
    },
    lastMessage: "Order ta kobe ashbe? Tracking number peyechi but update dekhachi na",
    lastMessageTime: "2026-05-12T00:45:00Z",
    unreadCount: 2,
    isTyping: false,
    messages: [
      { id: "m1-1", conversationId: "conv-1", content: "Assalamu Alaikum! Apnar Navy Blue silk saree ta ki available?", type: "text", sender: "customer", timestamp: "2026-05-11T10:30:00Z" },
      { id: "m1-2", conversationId: "conv-1", content: "Walaikum Assalam! Ji sis, available ache. Price 3200 taka. Shall I book it for you?", type: "text", sender: "agent", timestamp: "2026-05-11T10:32:00Z", seen: true },
      { id: "m1-3", conversationId: "conv-1", content: "Yes please! Cash on delivery hobe?", type: "text", sender: "customer", timestamp: "2026-05-11T10:35:00Z" },
      { id: "m1-4", conversationId: "conv-1", content: "Of course! COD available. I've booked your order. Order ID: ORD-1045", type: "text", sender: "agent", timestamp: "2026-05-11T10:38:00Z", seen: true },
      { id: "m1-5", conversationId: "conv-1", content: "Your order has been shipped via Steadfast courier. Tracking: SF789456123", type: "text", sender: "agent", timestamp: "2026-05-11T18:00:00Z", seen: true },
      { id: "m1-6", conversationId: "conv-1", content: "Order ta kobe ashbe? Tracking number peyechi but update dekhachi na", type: "text", sender: "customer", timestamp: "2026-05-12T00:45:00Z" },
      { id: "m1-7", conversationId: "conv-1", content: "Apu ektu worried hoye gechi, kono update nai courier er", type: "text", sender: "customer", timestamp: "2026-05-12T00:46:00Z" },
    ],
  },
  {
    id: "conv-2",
    customer: {
      id: "cust-2",
      name: "Raihan Ahmed",
      avatar: "",
      phone: "+880 1812-345678",
      email: "raihan.ahmed@yahoo.com",
      location: "Chittagong",
      channel: "instagram",
      profileUrl: "https://instagram.com/raihan.ahmed",
      isOnline: true,
      totalOrders: 5,
      totalSpent: 22000,
      avgOrderValue: 4400,
      tags: ["New Customer"],
      notes: "",
      recentOrders: [
        { id: "ORD-1048", date: "2026-05-11", amount: 4500, status: "processing", items: "Panjabi (White Embroidered)" },
        { id: "ORD-1025", date: "2026-04-28", amount: 3800, status: "delivered", items: "Polo Shirt x2" },
      ],
    },
    lastMessage: "Bhai white panjabi ta ki Eid er age pabo?",
    lastMessageTime: "2026-05-12T00:30:00Z",
    unreadCount: 1,
    isTyping: true,
    messages: [
      { id: "m2-1", conversationId: "conv-2", content: "Hi, I saw the white embroidered panjabi on your page. Is it available in size L?", type: "text", sender: "customer", timestamp: "2026-05-11T14:00:00Z" },
      { id: "m2-2", conversationId: "conv-2", content: "Yes! Available in all sizes. L size stock ache. Price: 4500 BDT", type: "text", sender: "agent", timestamp: "2026-05-11T14:05:00Z", seen: true },
      { id: "m2-3", conversationId: "conv-2", content: "Great! Order dite chai. Chittagong e delivery koto din lagbe?", type: "text", sender: "customer", timestamp: "2026-05-11T14:10:00Z" },
      { id: "m2-4", conversationId: "conv-2", content: "Chittagong delivery takes 2-3 working days. Your order is confirmed! Order ID: ORD-1048", type: "text", sender: "agent", timestamp: "2026-05-11T14:15:00Z", seen: true },
      { id: "m2-5", conversationId: "conv-2", content: "Bhai white panjabi ta ki Eid er age pabo?", type: "text", sender: "customer", timestamp: "2026-05-12T00:30:00Z" },
    ],
  },
  {
    id: "conv-3",
    customer: {
      id: "cust-3",
      name: "Nusrat Jahan",
      avatar: "",
      phone: "+880 1913-456789",
      email: "nusrat.j@gmail.com",
      location: "Gulshan, Dhaka",
      channel: "facebook",
      profileUrl: "https://facebook.com/nusrat.jahan",
      isOnline: false,
      totalOrders: 28,
      totalSpent: 156000,
      avgOrderValue: 5571,
      tags: ["VIP", "Wholesale", "Repeat Buyer"],
      notes: "Wholesale buyer. Runs a boutique in Gulshan. Needs bulk pricing.",
      recentOrders: [
        { id: "ORD-1042", date: "2026-05-09", amount: 25000, status: "shipped", items: "Kurti Wholesale Lot (10 pcs)" },
        { id: "ORD-1030", date: "2026-05-01", amount: 18000, status: "delivered", items: "Saree Collection (5 pcs)" },
        { id: "ORD-1015", date: "2026-04-20", amount: 32000, status: "delivered", items: "Mixed Lot - Kurti & Saree (15 pcs)" },
      ],
    },
    lastMessage: "Next shipment er wholesale rate ta confirm koren please",
    lastMessageTime: "2026-05-11T22:15:00Z",
    unreadCount: 0,
    isTyping: false,
    messages: [
      { id: "m3-1", conversationId: "conv-3", content: "Apu, new kurti collection er wholesale rate koto?", type: "text", sender: "customer", timestamp: "2026-05-11T20:00:00Z" },
      { id: "m3-2", conversationId: "conv-3", content: "For 10+ pieces, wholesale rate is 1800/piece instead of 2500. 20+ pieces e 1600/piece.", type: "text", sender: "agent", timestamp: "2026-05-11T20:10:00Z", seen: true },
      { id: "m3-3", conversationId: "conv-3", content: "20 pieces nibo. Mixed colors. Next shipment er wholesale rate ta confirm koren please", type: "text", sender: "customer", timestamp: "2026-05-11T22:15:00Z" },
      { id: "m3-4", conversationId: "conv-3", content: "Done! 20 pcs at 1600/piece = 32,000 BDT. I'll prepare the lot. Same address?", type: "text", sender: "agent", timestamp: "2026-05-11T22:20:00Z", seen: true },
    ],
  },
  {
    id: "conv-4",
    customer: {
      id: "cust-4",
      name: "Kamal Hossain",
      avatar: "",
      phone: "+880 1614-567890",
      email: "kamal.h@outlook.com",
      location: "Sylhet",
      channel: "facebook",
      profileUrl: "https://facebook.com/kamal.hossain",
      isOnline: false,
      totalOrders: 2,
      totalSpent: 5600,
      avgOrderValue: 2800,
      tags: [],
      notes: "",
      recentOrders: [
        { id: "ORD-1044", date: "2026-05-10", amount: 2800, status: "cancelled", items: "Formal Shirt (Blue Check)" },
        { id: "ORD-1020", date: "2026-04-25", amount: 2800, status: "delivered", items: "Casual Shirt (Olive)" },
      ],
    },
    lastMessage: "Refund kobe pabo? Already 3 din hoye gelo",
    lastMessageTime: "2026-05-11T19:30:00Z",
    unreadCount: 3,
    isTyping: false,
    messages: [
      { id: "m4-1", conversationId: "conv-4", content: "Bhai, ami order cancel korte chai. ORD-1044", type: "text", sender: "customer", timestamp: "2026-05-10T15:00:00Z" },
      { id: "m4-2", conversationId: "conv-4", content: "We're sorry to hear that. May I know the reason for cancellation?", type: "text", sender: "agent", timestamp: "2026-05-10T15:15:00Z", seen: true },
      { id: "m4-3", conversationId: "conv-4", content: "Wrong size order hoye giyechilo. M size chai but L diye diyechi", type: "text", sender: "customer", timestamp: "2026-05-10T15:20:00Z" },
      { id: "m4-4", conversationId: "conv-4", content: "No worries! I've cancelled ORD-1044. Refund will be processed within 3-5 business days.", type: "text", sender: "agent", timestamp: "2026-05-10T15:30:00Z", seen: true },
      { id: "m4-5", conversationId: "conv-4", content: "Refund kobe pabo? Already 3 din hoye gelo", type: "text", sender: "customer", timestamp: "2026-05-11T19:30:00Z" },
      { id: "m4-6", conversationId: "conv-4", content: "Bhai please check koren, bKash e send korben bolsilein", type: "text", sender: "customer", timestamp: "2026-05-11T19:31:00Z" },
      { id: "m4-7", conversationId: "conv-4", content: "Kono reply nai? Seriously disappointed.", type: "text", sender: "customer", timestamp: "2026-05-11T19:45:00Z" },
    ],
  },
  {
    id: "conv-5",
    customer: {
      id: "cust-5",
      name: "Sabrina Islam",
      avatar: "",
      phone: "+880 1515-678901",
      email: "sabrina.islam@gmail.com",
      location: "Uttara, Dhaka",
      channel: "instagram",
      profileUrl: "https://instagram.com/sabrina.islam",
      isOnline: true,
      totalOrders: 8,
      totalSpent: 34200,
      avgOrderValue: 4275,
      tags: ["Influencer", "Repeat Buyer"],
      notes: "Fashion influencer with 25k followers. Collaboration potential.",
      recentOrders: [
        { id: "ORD-1049", date: "2026-05-12", amount: 6500, status: "processing", items: "Designer Kurti + Dupatta Set" },
        { id: "ORD-1035", date: "2026-05-05", amount: 4200, status: "delivered", items: "Printed Lawn Suit" },
      ],
    },
    lastMessage: "Can I get this in dusty pink? 😍",
    lastMessageTime: "2026-05-12T00:55:00Z",
    unreadCount: 1,
    isTyping: false,
    messages: [
      { id: "m5-1", conversationId: "conv-5", content: "Hi! Love your new designer kurti collection! 😍", type: "text", sender: "customer", timestamp: "2026-05-11T23:00:00Z" },
      { id: "m5-2", conversationId: "conv-5", content: "Thank you Sabrina! We have 6 new designs this week. Want me to share the catalog?", type: "text", sender: "agent", timestamp: "2026-05-11T23:05:00Z", seen: true },
      { id: "m5-3", conversationId: "conv-5", content: "Yes please! Also, I want to order the embroidered set from your latest post", type: "text", sender: "customer", timestamp: "2026-05-11T23:10:00Z" },
      { id: "m5-4", conversationId: "conv-5", content: "Here's the catalog link. The embroidered set is 6500 BDT. Available in Ivory, Dusty Pink, and Sage Green.", type: "text", sender: "agent", timestamp: "2026-05-11T23:15:00Z", seen: true },
      { id: "m5-5", conversationId: "conv-5", content: "I'll take the Ivory one! Order confirmed ORD-1049 ✨", type: "text", sender: "agent", timestamp: "2026-05-11T23:20:00Z", seen: true },
      { id: "m5-6", conversationId: "conv-5", content: "Can I get this in dusty pink? 😍", type: "text", sender: "customer", timestamp: "2026-05-12T00:55:00Z" },
    ],
  },
  {
    id: "conv-6",
    customer: {
      id: "cust-6",
      name: "Arif Mahmud",
      avatar: "",
      phone: "+880 1916-789012",
      email: "arif.mahmud@gmail.com",
      location: "Mirpur, Dhaka",
      channel: "facebook",
      profileUrl: "https://facebook.com/arif.mahmud",
      isOnline: false,
      totalOrders: 3,
      totalSpent: 9800,
      avgOrderValue: 3267,
      tags: ["Bulk Buyer"],
      notes: "",
      recentOrders: [
        { id: "ORD-1040", date: "2026-05-08", amount: 4200, status: "delivered", items: "T-Shirt Bundle (3 pcs)" },
      ],
    },
    lastMessage: "Same t-shirt bundle ta abar order dite chai, same colors",
    lastMessageTime: "2026-05-11T18:00:00Z",
    unreadCount: 0,
    isTyping: false,
    messages: [
      { id: "m6-1", conversationId: "conv-6", content: "Bhai, last order er t-shirt gulo onek valo chilo!", type: "text", sender: "customer", timestamp: "2026-05-11T17:30:00Z" },
      { id: "m6-2", conversationId: "conv-6", content: "Thank you bhai! Glad you liked them. 😊", type: "text", sender: "agent", timestamp: "2026-05-11T17:35:00Z", seen: true },
      { id: "m6-3", conversationId: "conv-6", content: "Same t-shirt bundle ta abar order dite chai, same colors", type: "text", sender: "customer", timestamp: "2026-05-11T18:00:00Z" },
      { id: "m6-4", conversationId: "conv-6", content: "Sure! Same bundle (Black, White, Navy) at 4200 BDT. Shall I confirm?", type: "text", sender: "agent", timestamp: "2026-05-11T18:05:00Z", seen: true },
    ],
  },
  {
    id: "conv-7",
    customer: {
      id: "cust-7",
      name: "Tasnim Rahman",
      avatar: "",
      phone: "+880 1717-890123",
      email: "tasnim.r@gmail.com",
      location: "Banani, Dhaka",
      channel: "instagram",
      profileUrl: "https://instagram.com/tasnim.rahman",
      isOnline: true,
      totalOrders: 15,
      totalSpent: 67500,
      avgOrderValue: 4500,
      tags: ["VIP", "Repeat Buyer", "Premium"],
      notes: "Prefers premium packaging. Always orders gift wrapping.",
      recentOrders: [
        { id: "ORD-1050", date: "2026-05-12", amount: 8500, status: "processing", items: "Bridal Dupatta + Jewelry Set" },
        { id: "ORD-1038", date: "2026-05-07", amount: 5200, status: "delivered", items: "Banarasi Saree (Red)" },
        { id: "ORD-1028", date: "2026-04-30", amount: 4800, status: "delivered", items: "Georgette Saree (Peach)" },
      ],
    },
    lastMessage: "Gift wrapping add koren please, it's for my sister's wedding! 🎁",
    lastMessageTime: "2026-05-12T01:00:00Z",
    unreadCount: 0,
    isTyping: false,
    messages: [
      { id: "m7-1", conversationId: "conv-7", content: "Hi! Need a bridal dupatta for my sister. What do you have?", type: "text", sender: "customer", timestamp: "2026-05-12T00:30:00Z" },
      { id: "m7-2", conversationId: "conv-7", content: "We have beautiful bridal dupattas in Gold, Red, and Maroon. Would you also like to see matching jewelry sets?", type: "text", sender: "agent", timestamp: "2026-05-12T00:35:00Z", seen: true },
      { id: "m7-3", conversationId: "conv-7", content: "Yes! Gold dupatta with matching jewelry. Budget around 8000-9000", type: "text", sender: "customer", timestamp: "2026-05-12T00:40:00Z" },
      { id: "m7-4", conversationId: "conv-7", content: "Perfect combo! Gold Bridal Dupatta (5500) + Pearl Jewelry Set (3000) = 8500 BDT. Order confirmed: ORD-1050", type: "text", sender: "agent", timestamp: "2026-05-12T00:45:00Z", seen: true },
      { id: "m7-5", conversationId: "conv-7", content: "Gift wrapping add koren please, it's for my sister's wedding! 🎁", type: "text", sender: "customer", timestamp: "2026-05-12T01:00:00Z" },
      { id: "m7-6", conversationId: "conv-7", content: "Of course! Premium gift wrapping added at no extra charge for you. 🎀", type: "text", sender: "agent", timestamp: "2026-05-12T01:02:00Z", seen: false },
    ],
  },
  {
    id: "conv-8",
    customer: {
      id: "cust-8",
      name: "Mehedi Hasan",
      avatar: "",
      phone: "+880 1818-901234",
      email: "mehedi.h@gmail.com",
      location: "Rajshahi",
      channel: "facebook",
      profileUrl: "https://facebook.com/mehedi.hasan",
      isOnline: false,
      totalOrders: 1,
      totalSpent: 1800,
      avgOrderValue: 1800,
      tags: ["New Customer"],
      notes: "",
      recentOrders: [
        { id: "ORD-1047", date: "2026-05-11", amount: 1800, status: "processing", items: "Casual Panjabi (Grey)" },
      ],
    },
    lastMessage: "Rajshahi te delivery charge koto?",
    lastMessageTime: "2026-05-11T16:00:00Z",
    unreadCount: 0,
    isTyping: false,
    messages: [
      { id: "m8-1", conversationId: "conv-8", content: "Hi, grey panjabi ta ki stock ache?", type: "text", sender: "customer", timestamp: "2026-05-11T15:00:00Z" },
      { id: "m8-2", conversationId: "conv-8", content: "Ji bhai, stock ache. Price: 1800 BDT", type: "text", sender: "agent", timestamp: "2026-05-11T15:10:00Z", seen: true },
      { id: "m8-3", conversationId: "conv-8", content: "Rajshahi te delivery charge koto?", type: "text", sender: "customer", timestamp: "2026-05-11T16:00:00Z" },
      { id: "m8-4", conversationId: "conv-8", content: "Rajshahi delivery charge 120 BDT, 3-4 working days lagbe.", type: "text", sender: "agent", timestamp: "2026-05-11T16:10:00Z", seen: true },
    ],
  },
  {
    id: "conv-9",
    customer: {
      id: "cust-9",
      name: "Ayesha Siddiqua",
      avatar: "",
      phone: "+880 1919-012345",
      email: "ayesha.s@gmail.com",
      location: "Bashundhara, Dhaka",
      channel: "instagram",
      profileUrl: "https://instagram.com/ayesha.siddiqua",
      isOnline: true,
      totalOrders: 6,
      totalSpent: 28800,
      avgOrderValue: 4800,
      tags: ["Repeat Buyer"],
      notes: "Loves pastel colors. Interested in new arrivals.",
      recentOrders: [
        { id: "ORD-1051", date: "2026-05-12", amount: 3600, status: "processing", items: "Linen Kurti (Lavender)" },
        { id: "ORD-1033", date: "2026-05-04", amount: 5200, status: "delivered", items: "Embroidered Abaya (Black)" },
      ],
    },
    lastMessage: "Lavender kurti ta khoob sundor! Pastel pink eo ashbe?",
    lastMessageTime: "2026-05-12T00:20:00Z",
    unreadCount: 2,
    isTyping: false,
    messages: [
      { id: "m9-1", conversationId: "conv-9", content: "Apu! New linen collection dekhlam, lavender ta too pretty! 💜", type: "text", sender: "customer", timestamp: "2026-05-11T23:30:00Z" },
      { id: "m9-2", conversationId: "conv-9", content: "Thank you! It's one of our bestsellers this week. Want to order?", type: "text", sender: "agent", timestamp: "2026-05-11T23:35:00Z", seen: true },
      { id: "m9-3", conversationId: "conv-9", content: "Yes! Just ordered. ORD-1051. Love the fabric quality of your stuff", type: "text", sender: "customer", timestamp: "2026-05-11T23:40:00Z" },
      { id: "m9-4", conversationId: "conv-9", content: "Lavender kurti ta khoob sundor! Pastel pink eo ashbe?", type: "text", sender: "customer", timestamp: "2026-05-12T00:20:00Z" },
      { id: "m9-5", conversationId: "conv-9", content: "Pastel pink version next week ashche! Shall I reserve one for you?", type: "text", sender: "customer", timestamp: "2026-05-12T00:22:00Z" },
    ],
  },
  {
    id: "conv-10",
    customer: {
      id: "cust-10",
      name: "Imran Khan",
      avatar: "",
      phone: "+880 1620-123456",
      email: "imran.khan@gmail.com",
      location: "Khulna",
      channel: "facebook",
      profileUrl: "https://facebook.com/imran.khan.bd",
      isOnline: false,
      totalOrders: 4,
      totalSpent: 14400,
      avgOrderValue: 3600,
      tags: [],
      notes: "",
      recentOrders: [
        { id: "ORD-1039", date: "2026-05-07", amount: 3600, status: "delivered", items: "Denim Shirt (Dark Wash)" },
        { id: "ORD-1022", date: "2026-04-26", amount: 4200, status: "delivered", items: "Chino Pants x2" },
      ],
    },
    lastMessage: "Thanks bhai, product quality onek valo 👍",
    lastMessageTime: "2026-05-11T14:00:00Z",
    unreadCount: 0,
    isTyping: false,
    messages: [
      { id: "m10-1", conversationId: "conv-10", content: "Denim shirt ta pelam, quality onek bhalo!", type: "text", sender: "customer", timestamp: "2026-05-11T13:30:00Z" },
      { id: "m10-2", conversationId: "conv-10", content: "So glad you love it! Don't forget to check our new arrivals this weekend 🎉", type: "text", sender: "agent", timestamp: "2026-05-11T13:35:00Z", seen: true },
      { id: "m10-3", conversationId: "conv-10", content: "Thanks bhai, product quality onek valo 👍", type: "text", sender: "customer", timestamp: "2026-05-11T14:00:00Z" },
    ],
  },
]

export const quickReplyTemplates = [
  { id: "qr-1", title: "Thank you", content: "Thank you for your order! We'll process it right away. 🙏" },
  { id: "qr-2", title: "Order shipped", content: "Your order has been shipped via {courier}. You'll receive a tracking number shortly!" },
  { id: "qr-3", title: "Processing", content: "We'll process your order shortly. You'll receive a confirmation within 1-2 hours." },
  { id: "qr-4", title: "Confirm address", content: "Please confirm your delivery address so we can ship your order." },
  { id: "qr-5", title: "Stock check", content: "Let me check the stock availability for you. I'll get back to you shortly!" },
  { id: "qr-6", title: "Payment received", content: "We've received your payment. Thank you! Your order is now being prepared." },
]

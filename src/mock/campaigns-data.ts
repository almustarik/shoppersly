export type CampaignStatus = "active" | "paused" | "completed" | "draft"
export type CampaignPlatform = "facebook" | "instagram" | "both"

export interface CampaignItem {
  id: string
  name: string
  platform: CampaignPlatform
  status: CampaignStatus
  budget: number
  spent: number
  reach: number
  impressions: number
  clicks: number
  ctr: number
  conversions: number
  revenue: number
  roas: number
  startDate: string
  endDate: string | null
  sparkline: number[]
}

export interface CampaignDailyMetric {
  date: string
  spend: number
  revenue: number
  roas: number
  fbSpend: number
  igSpend: number
  fbRevenue: number
  igRevenue: number
}

export const campaignStatusConfig: Record<
  CampaignStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  paused: {
    label: "Paused",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  completed: {
    label: "Completed",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
  },
  draft: {
    label: "Draft",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
}

export const platformConfig: Record<
  CampaignPlatform,
  { label: string; className: string }
> = {
  facebook: {
    label: "Facebook",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  instagram: {
    label: "Instagram",
    className: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  },
  both: {
    label: "FB + IG",
    className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
}

export const campaigns: CampaignItem[] = [
  {
    id: "camp-001",
    name: "Eid Collection Sale",
    platform: "both",
    status: "active",
    budget: 50000,
    spent: 32500,
    reach: 245000,
    impressions: 580000,
    clicks: 12400,
    ctr: 2.14,
    conversions: 68,
    revenue: 156000,
    roas: 4.8,
    startDate: "2026-04-20",
    endDate: "2026-05-20",
    sparkline: [1200, 1800, 2200, 1900, 2800, 3200, 2900, 3400, 3100, 2700, 3500, 3800],
  },
  {
    id: "camp-002",
    name: "Winter Fashion Drop",
    platform: "instagram",
    status: "active",
    budget: 25000,
    spent: 18200,
    reach: 128000,
    impressions: 310000,
    clicks: 7800,
    ctr: 2.52,
    conversions: 42,
    revenue: 84000,
    roas: 4.6,
    startDate: "2026-04-25",
    endDate: "2026-05-25",
    sparkline: [800, 1200, 1500, 1100, 1800, 2200, 1900, 2400, 2100, 1800, 2600, 2800],
  },
  {
    id: "camp-003",
    name: "Flash Sale - Electronics",
    platform: "facebook",
    status: "active",
    budget: 15000,
    spent: 12800,
    reach: 98000,
    impressions: 220000,
    clicks: 5200,
    ctr: 2.36,
    conversions: 31,
    revenue: 28000,
    roas: 2.19,
    startDate: "2026-05-05",
    endDate: "2026-05-15",
    sparkline: [600, 900, 1100, 1400, 1200, 1600, 1800, 1500, 1900, 2100, 1700, 2000],
  },
  {
    id: "camp-004",
    name: "Beauty Essentials Promo",
    platform: "instagram",
    status: "active",
    budget: 10000,
    spent: 7500,
    reach: 67000,
    impressions: 145000,
    clicks: 3900,
    ctr: 2.69,
    conversions: 25,
    revenue: 18500,
    roas: 2.47,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    sparkline: [400, 600, 800, 700, 1000, 1200, 1100, 1400, 1300, 1100, 1500, 1600],
  },
  {
    id: "camp-005",
    name: "Ramadan Special Offers",
    platform: "both",
    status: "completed",
    budget: 40000,
    spent: 38900,
    reach: 320000,
    impressions: 780000,
    clicks: 18500,
    ctr: 2.37,
    conversions: 95,
    revenue: 185000,
    roas: 4.76,
    startDate: "2026-03-01",
    endDate: "2026-04-01",
    sparkline: [2500, 3200, 3800, 4100, 3900, 4500, 4200, 3800, 4600, 3500, 3200, 2800],
  },
  {
    id: "camp-006",
    name: "New Arrival - Summer Collection",
    platform: "facebook",
    status: "paused",
    budget: 20000,
    spent: 8400,
    reach: 56000,
    impressions: 125000,
    clicks: 2800,
    ctr: 2.24,
    conversions: 15,
    revenue: 12500,
    roas: 1.49,
    startDate: "2026-05-01",
    endDate: null,
    sparkline: [500, 700, 900, 1100, 800, 1200, 1000, 0, 0, 0, 0, 0],
  },
  {
    id: "camp-007",
    name: "Pohela Boishakh Sale",
    platform: "both",
    status: "completed",
    budget: 35000,
    spent: 34200,
    reach: 290000,
    impressions: 650000,
    clicks: 15600,
    ctr: 2.4,
    conversions: 82,
    revenue: 165000,
    roas: 4.82,
    startDate: "2026-04-01",
    endDate: "2026-04-20",
    sparkline: [2000, 2800, 3500, 4000, 3800, 4200, 3600, 4500, 4100, 3900, 3400, 2600],
  },
  {
    id: "camp-008",
    name: "Home Decor Weekend",
    platform: "facebook",
    status: "draft",
    budget: 8000,
    spent: 0,
    reach: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    conversions: 0,
    revenue: 0,
    roas: 0,
    startDate: "2026-05-15",
    endDate: "2026-05-18",
    sparkline: [],
  },
]

export const dailyMetrics: CampaignDailyMetric[] = [
  { date: "May 1", spend: 2800, revenue: 8400, roas: 3.0, fbSpend: 1600, igSpend: 1200, fbRevenue: 4800, igRevenue: 3600 },
  { date: "May 2", spend: 3200, revenue: 10200, roas: 3.19, fbSpend: 1800, igSpend: 1400, fbRevenue: 5600, igRevenue: 4600 },
  { date: "May 3", spend: 2900, revenue: 9800, roas: 3.38, fbSpend: 1500, igSpend: 1400, fbRevenue: 5200, igRevenue: 4600 },
  { date: "May 4", spend: 3500, revenue: 12500, roas: 3.57, fbSpend: 2000, igSpend: 1500, fbRevenue: 7000, igRevenue: 5500 },
  { date: "May 5", spend: 3100, revenue: 10800, roas: 3.48, fbSpend: 1700, igSpend: 1400, fbRevenue: 6000, igRevenue: 4800 },
  { date: "May 6", spend: 3800, revenue: 13200, roas: 3.47, fbSpend: 2200, igSpend: 1600, fbRevenue: 7500, igRevenue: 5700 },
  { date: "May 7", spend: 4200, revenue: 15400, roas: 3.67, fbSpend: 2400, igSpend: 1800, fbRevenue: 8800, igRevenue: 6600 },
  { date: "May 8", spend: 3600, revenue: 12800, roas: 3.56, fbSpend: 2000, igSpend: 1600, fbRevenue: 7200, igRevenue: 5600 },
  { date: "May 9", spend: 4100, revenue: 14600, roas: 3.56, fbSpend: 2300, igSpend: 1800, fbRevenue: 8200, igRevenue: 6400 },
  { date: "May 10", spend: 3900, revenue: 13800, roas: 3.54, fbSpend: 2200, igSpend: 1700, fbRevenue: 7800, igRevenue: 6000 },
  { date: "May 11", spend: 4400, revenue: 16200, roas: 3.68, fbSpend: 2500, igSpend: 1900, fbRevenue: 9200, igRevenue: 7000 },
  { date: "May 12", spend: 4000, revenue: 14500, roas: 3.63, fbSpend: 2300, igSpend: 1700, fbRevenue: 8300, igRevenue: 6200 },
]

export const campaignsSummary = {
  activeCampaigns: 4,
  totalSpend: 45000,
  roas: 3.2,
  conversions: 156,
}

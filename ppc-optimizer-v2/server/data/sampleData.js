// Sample data mirroring the main dashboard's testData.js
// Swap these out with real report exports when ready.

export const sampleSearchTerms = [
  { "Search Term": "cheap power bank",        Clicks: 15, Orders: 0, CPC: 1.00, ACOS: 0,    "Match Type": "Broad"  },
  { "Search Term": "best power bank",         Clicks: 5,  Orders: 0, CPC: 0.50, ACOS: 0,    "Match Type": "Broad"  },
  { "Search Term": "usb c charger",           Clicks: 20, Orders: 2, CPC: 1.50, ACOS: 22.0, "Match Type": "Phrase" },
  { "Search Term": "fast charging power bank",Clicks: 30, Orders: 8, CPC: 1.10, ACOS: 18.5, "Match Type": "Broad"  },
  { "Search Term": "power bank bulk buy",     Clicks: 40, Orders: 15,CPC: 1.40, ACOS: 12.0, "Match Type": "Broad"  },
  { "Search Term": "power bank waterproof",   Clicks: 25, Orders: 5, CPC: 0.90, ACOS: 35.0, "Match Type": "Broad"  },
  { "Search Term": "slim power bank",         Clicks: 12, Orders: 0, CPC: 0.80, ACOS: 0,    "Match Type": "Broad"  },
];

export const sampleExistingKeywords = [
  "portable charger",
  "wireless earbuds",
];

export const sampleSkuData = [
  { sku: "PB-10K-BLK", revenue: 5000, cogs: 1500, fees: 800,  adSpend: 400 },
  { sku: "PB-20K-WHT", revenue: 8000, cogs: 3000, fees: 1200, adSpend: 900 },
  { sku: "PB-5K-RED",  revenue: 2000, cogs: 900,  fees: 400,  adSpend: 600 },
];

export const sampleSqpData = [
  { query: "power bank 10000mah", searchVolume: 12000, brandPurchaseShare: 0.04 },
  { query: "fast charging bank",  searchVolume: 8000,  brandPurchaseShare: 0.12 },
  { query: "usb c power bank",    searchVolume: 15000, brandPurchaseShare: 0.07 },
];

export const sampleTargetingData = [
  { query: "fast charging bank", matchType: "Exact" },
  { query: "usb c charger",      matchType: "Broad" },
];

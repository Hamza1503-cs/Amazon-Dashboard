"use strict";

/**
 * Profit Engine — SKU Health Analysis
 *
 * Calculates Net Profit and Net Margin per SKU, labels health status,
 * and returns the list sorted worst-to-best so problem SKUs surface first.
 *
 * Health thresholds:
 *   Margin > 20%   → Healthy   (Green)
 *   Margin 10–20%  → Watchlist (Yellow)
 *   Margin < 10%   → Bleeding  (Red)
 */

function getHealthLabel(marginPct) {
  if (marginPct > 20) return { status: "Healthy",   color: "Green"  };
  if (marginPct >= 10) return { status: "Watchlist", color: "Yellow" };
  return                      { status: "Bleeding",  color: "Red"    };
}

/**
 * @param {{ sku: string, revenue: number, cogs: number, fees: number, adSpend: number }[]} selleriseData
 * @returns {{ sku: string, revenue: number, cogs: number, fees: number, adSpend: number, netProfit: number, netMargin: number, status: string, color: string }[]}
 */
export function calculateSkuHealth(selleriseData) {
  const results = selleriseData.map((row) => {
    const revenue = Number(row.revenue) || 0;
    const cogs    = Number(row.cogs)    || 0;
    const fees    = Number(row.fees)    || 0;
    const adSpend = Number(row.adSpend) || 0;

    const netProfit = revenue - cogs - fees - adSpend;
    const netMargin = revenue > 0
      ? Math.round((netProfit / revenue) * 100 * 100) / 100
      : 0;

    const { status, color } = getHealthLabel(netMargin);

    return {
      sku: row.sku,
      revenue,
      cogs,
      fees,
      adSpend,
      netProfit: Math.round(netProfit * 100) / 100,
      netMargin,
      status,
      color,
    };
  });

  results.sort((a, b) => a.netMargin - b.netMargin);
  return results;
}

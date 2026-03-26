"use strict";

/**
 * SQP Engine — Search Query Performance Gap Analysis
 *
 * Compares SQP data with the Targeting Report to surface:
 *   - "Missing Coverage"        — query has no Exact Match entry
 *   - "Low Share - Increase Bids" — Exact Match exists but share < 10%
 */

function buildExactMatchSet(targetingData) {
  const exactMatches = new Set();
  for (const row of targetingData) {
    if (typeof row.matchType === "string" && row.matchType.trim().toLowerCase() === "exact") {
      exactMatches.add(row.query.trim().toLowerCase());
    }
  }
  return exactMatches;
}

/**
 * @param {{ query: string, searchVolume: number, brandPurchaseShare: number }[]} sqpData
 * @param {{ query: string, matchType: string }[]} targetingData
 * @returns {{ query: string, searchVolume: number, brandPurchaseShare: number, label: string, potentialUnitGain: number|null }[]}
 */
export function getFinalGapAnalysis(sqpData, targetingData) {
  const top50 = sqpData.slice(0, 50);
  const exactMatchSet = buildExactMatchSet(targetingData);
  const results = [];

  for (const row of top50) {
    const normalisedQuery = row.query.trim().toLowerCase();
    const hasExactMatch = exactMatchSet.has(normalisedQuery);

    if (!hasExactMatch) {
      results.push({
        query: row.query,
        searchVolume: row.searchVolume,
        brandPurchaseShare: row.brandPurchaseShare,
        label: "Missing Coverage",
        potentialUnitGain: Math.round(row.searchVolume * (1 - row.brandPurchaseShare)),
      });
    } else if (row.brandPurchaseShare < 0.1) {
      results.push({
        query: row.query,
        searchVolume: row.searchVolume,
        brandPurchaseShare: row.brandPurchaseShare,
        label: "Low Share - Increase Bids",
        potentialUnitGain: null,
      });
    }
  }

  return results;
}

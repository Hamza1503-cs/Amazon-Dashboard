const targetAcos = 30; // Maximum acceptable ACOS (%)

/**
 * Processes Amazon Search Term Report data to find new keyword opportunities.
 * Filters for high-converting terms not already targeted as Exact Match.
 *
 * @param {Array<Object>} searchTermData    - Rows from the Search Term Report
 * @param {Array<string>} existingKeywords  - List of terms already targeted as Exact Match
 * @returns {Array<Object>} New keyword opportunities with Search Term, Orders, ACOS, and Priority
 */
export function harvestKeywords(searchTermData, existingKeywords = []) {
  const ordersThreshold = 3;
  const exactTargeted = new Set(existingKeywords.map(kw => kw.toLowerCase()));

  const opportunities = searchTermData
    .filter(row => {
      if (row.Orders <= ordersThreshold) return false;
      if (row.ACOS > targetAcos) return false;
      if (row["Match Type"]?.toLowerCase() === "exact") return false;
      if (exactTargeted.has(row["Search Term"].toLowerCase())) return false;
      return true;
    })
    .map(row => ({
      searchTerm: row["Search Term"],
      matchType: row["Match Type"],
      orders: row.Orders,
      acos: row.ACOS,
      priority: row.Orders > 10 ? "High Priority" : "Standard",
    }))
    .sort((a, b) => a.acos - b.acos);

  return opportunities;
}

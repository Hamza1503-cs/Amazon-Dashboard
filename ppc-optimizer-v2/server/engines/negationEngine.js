const negationThreshold = 10;

/**
 * Processes Amazon Search Term Report data and identifies wasteful search terms.
 * A "bad" keyword has clicks above the threshold but zero orders.
 *
 * @param {Array<Object>} searchTermData - Array of rows from the Search Term Report
 * @returns {Array<Object>} List of bad keywords with wasted spend and click count
 */
export function processSearchTermReport(searchTermData) {
  const badKeywords = searchTermData
    .filter(row =>
      row.Clicks > negationThreshold &&
      row.Orders === 0 &&
      row["Match Type"]?.toLowerCase() !== "exact"
    )
    .map(row => ({
      searchTerm: row["Search Term"],
      matchType: row["Match Type"],
      clicks: row.Clicks,
      wastedSpend: parseFloat((row.Clicks * row.CPC).toFixed(2)),
    }))
    .sort((a, b) => b.wastedSpend - a.wastedSpend);

  return badKeywords;
}

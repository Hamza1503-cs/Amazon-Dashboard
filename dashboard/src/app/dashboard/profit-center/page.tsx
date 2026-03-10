import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const rows = [
  { sku: "AMZ-001", name: "Wireless Earbuds Pro", revenue: "$18,420", cogs: "$6,240", margin: "66%", trend: "up" },
  { sku: "AMZ-002", name: "Laptop Stand Aluminum", revenue: "$11,870", cogs: "$4,100", margin: "65%", trend: "up" },
  { sku: "AMZ-003", name: "USB-C Hub 7-Port", revenue: "$9,300", cogs: "$4,050", margin: "56%", trend: "down" },
  { sku: "AMZ-004", name: "Desk Cable Organizer", revenue: "$6,540", cogs: "$2,100", margin: "68%", trend: "up" },
  { sku: "AMZ-005", name: "Monitor Light Bar", revenue: "$5,990", cogs: "$2,950", margin: "51%", trend: "down" },
];

export default function ProfitCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profit Center</h2>
        <p className="text-sm text-gray-500 mt-1">
          Analyze margins, COGS, and profitability by SKU
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Gross Profit", value: "$52,100", icon: DollarSign, color: "#FF9900", bg: "bg-orange-50" },
          { label: "Avg. Margin", value: "61.2%", icon: TrendingUp, color: "#10B981", bg: "bg-green-50" },
          { label: "Total COGS", value: "$19,440", icon: BarChart3, color: "#6366F1", bg: "bg-indigo-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
            <div className={`${bg} p-3 rounded-lg`}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">SKU Profitability Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">COGS</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Margin</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.sku} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{row.sku}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-gray-700">{row.revenue}</td>
                  <td className="px-6 py-4 text-gray-700">{row.cogs}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                      {row.margin}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {row.trend === "up" ? (
                      <TrendingUp size={16} className="text-emerald-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-400" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { Target, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

const campaigns = [
  { name: "Brand Defense", spend: "$1,240", acos: "12%", roas: "8.3x", status: "healthy", impressions: "142K" },
  { name: "Category Attack — Earbuds", spend: "$3,800", acos: "28%", roas: "3.6x", status: "warning", impressions: "520K" },
  { name: "Competitor Conquest", spend: "$2,100", acos: "22%", roas: "4.5x", status: "healthy", impressions: "310K" },
  { name: "Retargeting — Past Visitors", spend: "$680", acos: "9%", roas: "11.1x", status: "healthy", impressions: "88K" },
  { name: "Auto — New Products", spend: "$950", acos: "41%", roas: "2.4x", status: "critical", impressions: "204K" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  healthy: { label: "Healthy", color: "text-emerald-700", bg: "bg-emerald-50", icon: CheckCircle2 },
  warning: { label: "Warning", color: "text-amber-700", bg: "bg-amber-50", icon: AlertTriangle },
  critical: { label: "Critical", color: "text-red-700", bg: "bg-red-50", icon: AlertTriangle },
};

export default function PPCOptimizerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">PPC Optimizer</h2>
        <p className="text-sm text-gray-500 mt-1">
          Monitor and optimize your Amazon Sponsored Ads campaigns
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Ad Spend", value: "$8,770", sub: "This month" },
          { label: "Avg. ACoS", value: "22.4%", sub: "Target: 20%" },
          { label: "Avg. ROAS", value: "4.5x", sub: "vs 4.1x last month" },
          { label: "Active Campaigns", value: "5", sub: "2 need attention" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Campaign Performance</h3>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FF9900" }}
          >
            <Zap size={13} />
            Auto-Optimize
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {["Campaign", "Impressions", "Spend", "ACoS", "ROAS", "Status"].map((h) => (
                  <th key={h} className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => {
                const s = statusConfig[c.status];
                const Icon = s.icon;
                return (
                  <tr key={c.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <Target size={15} className="text-gray-400 shrink-0" />
                        {c.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{c.impressions}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{c.spend}</td>
                    <td className="px-6 py-4 text-gray-700">{c.acos}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{c.roas}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}>
                        <Icon size={11} />
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

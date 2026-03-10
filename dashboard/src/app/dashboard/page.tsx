import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "$124,590",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
    bg: "bg-orange-50",
    iconColor: "#FF9900",
  },
  {
    label: "Total Orders",
    value: "3,842",
    change: "+8.1%",
    up: true,
    icon: ShoppingCart,
    bg: "bg-blue-50",
    iconColor: "#3B82F6",
  },
  {
    label: "Ad Spend",
    value: "$18,230",
    change: "-2.4%",
    up: false,
    icon: TrendingUp,
    bg: "bg-purple-50",
    iconColor: "#8B5CF6",
  },
  {
    label: "Active Clients",
    value: "47",
    change: "+3",
    up: true,
    icon: Users,
    bg: "bg-green-50",
    iconColor: "#10B981",
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-500 mt-1">
          Your key metrics at a glance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon, bg, iconColor }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`${bg} p-2.5 rounded-lg shrink-0`}>
              <Icon size={20} style={{ color: iconColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
              <div
                className={`flex items-center gap-1 text-xs font-medium mt-1 ${
                  up ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                <span>{change} vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Chart Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Revenue Trend
            </h3>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
              Last 30 days
            </span>
          </div>
          <div className="h-48 flex items-center justify-center rounded-lg bg-gray-50 border border-dashed border-gray-200">
            <p className="text-sm text-gray-400">Chart coming soon</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Top Products
          </h3>
          <div className="space-y-3">
            {["Product Alpha", "Product Beta", "Product Gamma", "Product Delta"].map(
              (name, i) => (
                <div key={name} className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "#FF9900" }}
                  />
                  <span className="text-sm text-gray-700 flex-1 truncate">
                    {name}
                  </span>
                  <span className="text-xs font-semibold text-gray-900">
                    {(90 - i * 15)}%
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

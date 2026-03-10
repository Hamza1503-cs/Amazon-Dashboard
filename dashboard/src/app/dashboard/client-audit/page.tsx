import { ClipboardList, CheckCircle2, XCircle, AlertTriangle, User } from "lucide-react";

const clients = [
  {
    name: "TechGadgets LLC",
    account: "A1B2C3D4",
    score: 87,
    issues: 2,
    status: "good",
    lastAudit: "Mar 8, 2026",
  },
  {
    name: "HomeDecor Co",
    account: "E5F6G7H8",
    score: 61,
    issues: 7,
    status: "warning",
    lastAudit: "Mar 5, 2026",
  },
  {
    name: "SportsPro Inc",
    account: "I9J0K1L2",
    score: 94,
    issues: 1,
    status: "good",
    lastAudit: "Mar 9, 2026",
  },
  {
    name: "BeautyBox Brand",
    account: "M3N4O5P6",
    score: 44,
    issues: 12,
    status: "critical",
    lastAudit: "Feb 28, 2026",
  },
  {
    name: "FoodFresh Store",
    account: "Q7R8S9T0",
    score: 78,
    issues: 4,
    status: "warning",
    lastAudit: "Mar 7, 2026",
  },
];

const auditChecks = [
  { check: "Listing completeness (title, bullets, images)", passed: true },
  { check: "A+ Content / Brand Story active", passed: true },
  { check: "Price competitiveness within 5% of Buy Box", passed: false },
  { check: "Review velocity ≥ 1 review/week", passed: true },
  { check: "Inventory health — no stockouts in 30 days", passed: false },
  { check: "PPC ACoS below category benchmark", passed: true },
  { check: "Negative keyword list updated this month", passed: false },
];

const scoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  good: { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-50", label: "Good" },
  warning: { icon: AlertTriangle, color: "text-amber-700", bg: "bg-amber-50", label: "Warning" },
  critical: { icon: XCircle, color: "text-red-700", bg: "bg-red-50", label: "Critical" },
};

export default function ClientAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Client Audit</h2>
        <p className="text-sm text-gray-500 mt-1">
          Account health scores and compliance checks for all clients
        </p>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((client) => {
          const s = statusConfig[client.status];
          const Icon = s.icon;
          return (
            <div
              key={client.account}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <User size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{client.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{client.account}</p>
                  </div>
                </div>
                <span className={`text-2xl font-bold ${scoreColor(client.score)}`}>
                  {client.score}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}>
                  <Icon size={11} />
                  {s.label}
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{client.issues} issue{client.issues !== 1 ? "s" : ""}</p>
                  <p className="text-xs text-gray-400">Audited {client.lastAudit}</p>
                </div>
              </div>
              {/* Score Bar */}
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${client.score}%`,
                    backgroundColor:
                      client.score >= 80 ? "#10B981" : client.score >= 60 ? "#F59E0B" : "#EF4444",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <ClipboardList size={16} style={{ color: "#FF9900" }} />
          <h3 className="text-sm font-semibold text-gray-900">Standard Audit Checklist</h3>
        </div>
        <ul className="divide-y divide-gray-50">
          {auditChecks.map(({ check, passed }) => (
            <li key={check} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors">
              {passed ? (
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              ) : (
                <XCircle size={16} className="text-red-400 shrink-0" />
              )}
              <span className={`text-sm ${passed ? "text-gray-700" : "text-gray-500 line-through"}`}>
                {check}
              </span>
              <span
                className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                  passed ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                }`}
              >
                {passed ? "Pass" : "Fail"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  Bot,
  ClipboardList,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Profit Center",
    href: "/dashboard/profit-center",
    icon: TrendingUp,
  },
  {
    label: "PPC Optimizer",
    href: "/dashboard/ppc-optimizer",
    icon: Target,
  },
  {
    label: "Listing AI",
    href: "/dashboard/listing-ai",
    icon: Bot,
  },
  {
    label: "Client Audit",
    href: "/dashboard/client-audit",
    icon: ClipboardList,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-white border-r border-gray-200 shrink-0">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ backgroundColor: "#FF9900" }}
        >
          <span className="text-white font-bold text-base leading-none">A</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">
            AmzSuite
          </p>
          <p className="text-xs text-gray-400 leading-tight">Pro Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              style={
                isActive
                  ? { backgroundColor: "#FF9900" }
                  : {}
              }
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              <span>{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-gray-600">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-400 truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

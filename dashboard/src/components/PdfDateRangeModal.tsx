"use client";

import { useState } from "react";
import { Calendar, X, Download, ChevronRight } from "lucide-react";

export type DateRangeOption = "weekly" | "biweekly" | "monthly" | "l90" | "custom";

interface DateRange {
  label: string;
  from: Date;
  to: Date;
}

interface PdfDateRangeModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (range: DateRange) => void;
  reportName?: string;
}

const PRESETS: { key: DateRangeOption; label: string; desc: string; days: number }[] = [
  { key: "weekly",   label: "Weekly",     desc: "Last 7 days",   days: 7   },
  { key: "biweekly", label: "Bi-Weekly",  desc: "Last 14 days",  days: 14  },
  { key: "monthly",  label: "Monthly",    desc: "Last 30 days",  days: 30  },
  { key: "l90",      label: "L90 Days",   desc: "Last 90 days",  days: 90  },
];

function toDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}

function subtractDays(d: Date, days: number) {
  const r = new Date(d);
  r.setDate(r.getDate() - days);
  return r;
}

function formatRange(from: Date, to: Date) {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${fmt(from)} – ${fmt(to)}`;
}

export default function PdfDateRangeModal({
  open,
  onClose,
  onConfirm,
  reportName = "Report",
}: PdfDateRangeModalProps) {
  const today = new Date();
  const [selected, setSelected] = useState<DateRangeOption>("monthly");
  const [customFrom, setCustomFrom] = useState(toDateInput(subtractDays(today, 30)));
  const [customTo, setCustomTo] = useState(toDateInput(today));

  if (!open) return null;

  function getRange(): DateRange {
    if (selected === "custom") {
      const from = new Date(customFrom);
      const to = new Date(customTo);
      return { label: formatRange(from, to), from, to };
    }
    const preset = PRESETS.find((p) => p.key === selected)!;
    const from = subtractDays(today, preset.days);
    return { label: formatRange(from, today), from, to: today };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
              <Calendar size={15} className="text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#0F172A]">Export PDF Report</h2>
              <p className="text-xs text-[#94A3B8]">{reportName} — select date range</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Presets */}
        <div className="px-6 py-4 space-y-2">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-3">
            Date Range
          </p>

          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => setSelected(p.key)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                  selected === p.key
                    ? "border-[#2563EB] bg-[#EFF6FF]"
                    : "border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F8FAFC]"
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${selected === p.key ? "text-[#2563EB]" : "text-[#0F172A]"}`}>
                    {p.label}
                  </p>
                  <p className="text-xs text-[#94A3B8]">{p.desc}</p>
                </div>
                {selected === p.key && (
                  <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Custom range */}
          <button
            onClick={() => setSelected("custom")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
              selected === "custom"
                ? "border-[#2563EB] bg-[#EFF6FF]"
                : "border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F8FAFC]"
            }`}
          >
            <div>
              <p className={`text-sm font-semibold ${selected === "custom" ? "text-[#2563EB]" : "text-[#0F172A]"}`}>
                Custom Date Range
              </p>
              <p className="text-xs text-[#94A3B8]">Pick your own start & end date</p>
            </div>
            <ChevronRight size={14} className={selected === "custom" ? "text-[#2563EB]" : "text-[#CBD5E1]"} />
          </button>

          {/* Custom inputs */}
          {selected === "custom" && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="block text-xs font-medium text-[#64748B] mb-1">From</label>
                <input
                  type="date"
                  value={customFrom}
                  max={customTo}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#64748B] mb-1">To</label>
                <input
                  type="date"
                  value={customTo}
                  min={customFrom}
                  max={toDateInput(today)}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white text-[#0F172A]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
          <div className="text-xs text-[#94A3B8]">
            <span className="font-medium text-[#64748B]">Period: </span>
            {selected === "custom"
              ? formatRange(new Date(customFrom), new Date(customTo))
              : (() => {
                  const p = PRESETS.find((x) => x.key === selected)!;
                  return formatRange(subtractDays(today, p.days), today);
                })()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(getRange());
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Download size={13} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

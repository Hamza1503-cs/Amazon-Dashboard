"use client";

import { useState } from "react";
import { Bot, Sparkles, Copy, RefreshCw } from "lucide-react";

const suggestions = [
  {
    field: "Title",
    original: "Wireless Earbuds with Charging Case",
    optimized:
      "Wireless Earbuds Pro | Active Noise Cancelling, 32H Battery, IPX5 Waterproof | Bluetooth 5.3 Earphones with LED Charging Case",
  },
  {
    field: "Bullet Point 1",
    original: "Good sound quality",
    optimized:
      "SUPERIOR SOUND QUALITY — Engineered with 10mm dynamic drivers and custom EQ tuning to deliver rich bass, crisp highs, and immersive stereo audio for music, calls, and podcasts.",
  },
  {
    field: "Search Terms",
    original: "earbuds wireless bluetooth",
    optimized:
      "wireless earbuds bluetooth noise cancelling earphones true wireless stereo earbuds sport workout earbuds ipx5 waterproof earbuds with mic",
  },
];

export default function ListingAIPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Listing AI</h2>
        <p className="text-sm text-gray-500 mt-1">
          AI-powered listing optimization for higher conversion and ranking
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bot size={18} style={{ color: "#FF9900" }} />
          <h3 className="text-sm font-semibold text-gray-900">Generate Optimized Copy</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              defaultValue="Wireless Earbuds Pro"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": "#FF9900" } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Target Keywords</label>
            <input
              type="text"
              defaultValue="noise cancelling, bluetooth 5.3, waterproof"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#FF9900" }}
        >
          <Sparkles size={15} />
          Generate with AI
        </button>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">AI Suggestions</h3>
        {suggestions.map(({ field, original, optimized }) => (
          <div key={field} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-md text-white"
                style={{ backgroundColor: "#FF9900" }}
              >
                {field}
              </span>
              <button
                onClick={() => handleCopy(optimized, field)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                {copied === field ? (
                  <span className="text-emerald-600 font-medium">Copied!</span>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                <p className="text-xs font-medium text-gray-400 mb-1">Original</p>
                <p className="text-sm text-gray-600">{original}</p>
              </div>
              <div className="rounded-lg border p-3" style={{ backgroundColor: "#FFF8EC", borderColor: "#FFD580" }}>
                <div className="flex items-center gap-1 mb-1">
                  <RefreshCw size={11} style={{ color: "#FF9900" }} />
                  <p className="text-xs font-medium" style={{ color: "#CC7A00" }}>AI Optimized</p>
                </div>
                <p className="text-sm text-gray-800">{optimized}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

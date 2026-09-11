"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

type Props = {
  code: string;
  title: string | null;
  discount: number | null;
  isPercentage: boolean;
};

export function PromoCodeCard({ code, title, discount, isPercentage }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for browsers that block clipboard
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const discountLabel = discount
    ? `${isPercentage ? `${discount}% OFF` : `$${discount} OFF`}`
    : null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl p-5 shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #ff9900 0%, #ff6600 40%, #ff3300 100%)",
      }}
    >
      {/* Sparkle decorations */}
      <span className="pointer-events-none absolute right-5 top-3 select-none text-white/50 text-lg leading-none">
        ✦
      </span>
      <span className="pointer-events-none absolute right-12 top-6 select-none text-white/30 text-xs leading-none">
        ✦
      </span>
      <span className="pointer-events-none absolute right-8 top-11 select-none text-white/20 text-[10px] leading-none">
        ✦
      </span>

      {/* "PROMO CODE" label */}
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-1">
        Promo Code
      </p>

      {/* Headline row */}
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        {title && (
          <p className="text-2xl font-extrabold text-white tracking-tight leading-none">
            {title}
          </p>
        )}
        {discountLabel && (
          <span className="rounded-full border border-white/40 bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
            GET {discountLabel}
          </span>
        )}
      </div>

      {/* Code pill + copy button */}
      <button
        onClick={handleCopy}
        className="group flex w-full items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-inner transition-all hover:bg-white active:scale-[0.98] cursor-pointer"
      >
        <span className="flex-1 text-center text-sm font-bold tracking-[0.15em] text-[#b5179e] uppercase">
          {code}
        </span>
        <span
          className={`ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition-all ${
            copied
              ? "bg-green-100 text-green-600"
              : "bg-primary/10 text-[#b5179e] group-hover:bg-primary/20"
          }`}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      {/* Copied feedback */}
      <p
        className={`mt-2 text-center text-[11px] font-medium text-white/80 transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        ✓ Copied to clipboard!
      </p>
    </div>
  );
}

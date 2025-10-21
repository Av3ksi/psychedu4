// File: /components/PricingSection.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // Importieren

export function PricingSection() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<string | null>("yearly");
  const t = useTranslations("pricingSection"); // Initialisieren

  // Übersetzungs-Keys statt fest codiertem Text verwenden
  const pricingTiers = [
    {
      id: "monthly",
      name: t("monthly.name"),
      price: "20 CHF", // Preis-Daten bleiben (könnten auch übersetzt werden, ist aber oft fix)
      interval: t("monthly.interval"),
      description: t("monthly.description"),
      features: [
        t("monthly.feature1"),
        t("monthly.feature2"),
        t("monthly.feature3"),
        t("monthly.feature4"),
      ],
      cta: t("monthly.cta"),
      popular: false,
    },
    {
      id: "yearly",
      name: t("yearly.name"),
      price: "200 CHF",
      interval: t("yearly.interval"),
      description: t("yearly.description"),
      features: [
        t("yearly.feature1"),
        t("yearly.feature2"),
        t("yearly.feature3"),
        t("yearly.feature4"),
      ],
      cta: t("yearly.cta"),
      popular: true,
      popularBadge: t("yearly.popularBadge"), // Key für das "Beliebt"-Label
    },
  ];

  const handleTierClick = (tierId: string) => {
    setSelectedTier((currentTier) => (currentTier === tierId ? null : tierId));
  };

  const handleCTAClick = (e: React.MouseEvent, href = "/dashboard") => {
    e.stopPropagation();
    router.push(href);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
      {pricingTiers.map((tier, i) => (
        <motion.div
          key={tier.id} // Key auf 'id' geändert, da 'name' jetzt übersetzt wird
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => handleTierClick(tier.id)}
          className={`relative rounded-2xl p-8 shadow-lg cursor-pointer transition-all duration-300 flex flex-col ${
            selectedTier === tier.id
              ? "bg-primary/5 dark:bg-primary/10 ring-2 ring-primary transform scale-105"
              : "bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 hover:ring-primary/50"
          }`}
        >
          <div className="flex-grow">
            {tier.popular && (
              <span className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 text-sm bg-primary text-white rounded-full">
                {/* Übersetzten Badge-Text verwenden */}
                {tier.popularBadge}
              </span>
            )}
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              {tier.name}
            </h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">
                {tier.price}
              </span>
              <span className="ml-1 text-slate-500 dark:text-slate-400">
                {tier.interval}
              </span>
            </div>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              {tier.description}
            </p>
            <ul className="mt-8 space-y-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => handleCTAClick(e, "/dashboard")}
            className={`mt-8 w-full py-3 px-4 rounded-lg text-center font-medium transition-colors ${
              selectedTier === tier.id
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {tier.cta}
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
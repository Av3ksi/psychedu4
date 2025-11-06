"use client";

import { PricingSection } from "@/components/PricingSection";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { VideoModal } from "@/components/VideoModal";
import { useTranslations } from "next-intl"; // Übersetzungen aktivieren

// --- Workflow-Abschnitte (Keys für Übersetzung) ---
const workflowSectionKeys = [
  { id: "overview", titleKey: "Psychedu Überblick" },
  { id: "authentication", titleKey: "Anmeldung & Zugang", sectionKey: "authentication" },
  { id: "payments", titleKey: "Preise & Abrechnung", sectionKey: "payments" },
  { id: "database", titleKey: "Lernplattform", sectionKey: "database" },
  { id: "features", titleKey: "Warum Psychedu?", sectionKey: "features" },
  { id: "pricing", titleKey: "Pläne", sectionKey: "pricing" },
];

// --- Übersetzbare Metriken ---
const metricsData: { [key: string]: Array<{ label: string; value: string }> } = {
  authentication: [
    { label: "metrics.authentication.languages", value: "metrics.authentication.languages_value" },
    { label: "metrics.authentication.duration", value: "metrics.authentication.duration_value" },
    { label: "metrics.authentication.progress", value: "metrics.authentication.progress_value" },
  ],
  payments: [
    { label: "metrics.payments.monthly", value: "metrics.payments.monthly_value" },
    { label: "metrics.payments.yearly", value: "metrics.payments.yearly_value" },
    { label: "metrics.payments.trial", value: "metrics.payments.trial_value" },
  ],
  database: [
    { label: "metrics.database.modules", value: "metrics.database.modules_value" },
    { label: "metrics.database.reviews", value: "metrics.database.reviews_value" },
    { label: "metrics.database.resources", value: "metrics.database.resources_value" },
  ],
  features: [
    { label: "metrics.features.prices", value: "metrics.features.prices_value" },
    { label: "metrics.features.relevance", value: "metrics.features.relevance_value" },
    { label: "metrics.features.knowledge", value: "metrics.features.knowledge_value" },
  ],
};

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const router = useRouter();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const t = useTranslations("landingPage"); // alle Übersetzungen über "landingPage" Namespace

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] relative">
      {/* Sticky Navigation */}
      <nav className="sticky top-18 z-40 bg-white/80 dark:bg-neutral-darker/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 overflow-x-auto hide-scrollbar">
            {workflowSectionKeys.map((section, index) => (
              <ScrollLink
                key={section.id}
                to={section.id}
                spy
                smooth
                offset={-100}
                duration={500}
                onSetActive={() => setActiveSection(section.id)}
                className="flex items-center cursor-pointer group min-w-fit mx-4 first:ml-0 last:mr-0"
              >
                <div className="relative">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-all
                      ${activeSection === section.id
                        ? "bg-primary dark:bg-primary-light text-white"
                        : "bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light group-hover:bg-primary/20 dark:group-hover:bg-primary-light/20"
                      }`}
                  >
                    {index + 1}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium hidden md:block whitespace-nowrap
                    ${activeSection === section.id
                      ? "text-primary dark:text-primary-light"
                      : "text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary-light"
                    }`}
                >
                  {t(section.titleKey)}
                </span>
              </ScrollLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="overview" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-20 pb-16 sm:pb-24 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              <span className="block">{t("heroSection.title")}</span>
              <span className="block text-primary dark:text-primary-light">
                {t("heroSection.subtitle")}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
              {t("heroSection.description")}
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg"
              >
                {t("heroSection.watchVideoButton")}
              </motion.button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-3 bg-white dark:bg-neutral-dark text-primary dark:text-primary-light border-2 border-primary rounded-lg shadow-lg"
              >
                {t("heroSection.startButton")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamische Sections */}
      {workflowSectionKeys.slice(1).map((sectionKey) => {
        const sectionContentKey = sectionKey.sectionKey;
        const metrics = sectionContentKey ? metricsData[sectionContentKey] : undefined;
        const index = workflowSectionKeys.findIndex((s) => s.id === sectionKey.id);
        const bgColor = index % 2 === 0 ? "bg-slate-50 dark:bg-[#0B1120]" : "bg-white dark:bg-[#0B1120]";

        if (!sectionContentKey) return null;

        return (
          <motion.section
            key={sectionKey.id}
            id={sectionKey.id}
            className={`py-20 ${bgColor}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            onViewportEnter={() => setActiveSection(sectionKey.id)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t(`sections.${sectionContentKey}.title`)}
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                {t(`sections.${sectionContentKey}.description`)}
              </p>

              {/* --- Metriken jetzt übersetzbar --- */}
              {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
                  {metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                    >
                      {/* beide Werte übersetzbar */}
                      <div className="text-3xl font-bold text-primary mb-2">
                        {t(metric.value)}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {t(metric.label)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {sectionKey.id === "pricing" && <PricingSection />}
            </div>
          </motion.section>
        );
      })}

      {/* CTA Section */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-xl p-12 border border-slate-200 dark:border-slate-700 text-center">
            <motion.h2
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              className="text-3xl font-bold text-slate-900 dark:text-white"
            >
              {t("cta.title")}
            </motion.h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              {t("cta.description")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg"
              >
                {t("cta.watchVideoButton")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/dashboard")}
                className="px-8 py-3 bg-white dark:bg-neutral-dark text-primary dark:text-primary-light border-2 border-primary rounded-lg shadow-lg"
              >
                {t("cta.startButton")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/about")}
                className="px-8 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg shadow-lg"
              >
                {t("cta.aboutButton")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/sources")}
                className="px-8 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg shadow-lg"
              >
                {t("cta.sourcesButton")}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="S1cnQG0-LP4"
      />
    </div>
  );
}

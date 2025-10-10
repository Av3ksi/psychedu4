"use client";

import { PricingSection } from "@/components/PricingSection";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { VideoModal } from "@/components/VideoModal";

const workflowSections = [
  {
    id: "overview",
    title: "Psychedu Überblick",
    description:
      "Mach deinen Psychologie-Abschluss online – schneller. Mehrsprachiges Lernen, geführte Lernpläne und professionelle Unterstützung.",
    bgColor: "bg-white dark:bg-[#0B1120]",
  },
  {
    id: "authentication",
    title: "Anmeldung & Zugang",
    description: "Sicheres Anmelden und Studenten-Dashboard zur Fortschrittsverfolgung.",
    bgColor: "bg-slate-50 dark:bg-[#0B1120]",
    metrics: [
      { label: "Sprachen", value: "Alle" },
      { label: "Studiendauer", value: "~12 Monate" },
      { label: "Fortschrittsverfolgung", value: "Echtzeit" },
    ],
  },
  {
    id: "payments",
    title: "Preise & Abrechnung",
    description: "Einfache Pläne: 20/Monat oder 200/Jahr. Jederzeit kündbar.",
    bgColor: "bg-white dark:bg-[#0B1120]",
    metrics: [
      { label: "Monatlich", value: "20" },
      { label: "Jährlich", value: "200" },
      { label: "Probezeit", value: "Ja" },
    ],
  },
  {
    id: "database",
    title: "Lernplattform",
    description:
      "Strukturierte Module, Quizze und Ressourcen, die auf einen Psychologie-Abschluss ausgerichtet sind.",
    bgColor: "bg-slate-50 dark:bg-[#0B1120]",
    metrics: [
      { label: "Themen", value: "50+" },
      { label: "Bewertungen", value: "Wöchentlich" },
      { label: "Reddit", value: "Psychedu" },
    ],
  },
  {
    id: "features",
    title: "Warum Psychedu?",
    description:
      "Traditionelle Bildung ist teuer und oft nicht auf das Wesentliche fokussiert. Wir bieten dir alles, was du für deinen Abschluss brauchst – kompakt, praxisnah und zu einem fairen Preis.",
    bgColor: "bg-white dark:bg-[#0B1120]",
    metrics: [
      { label: "Faire Preise", value: "Günstig" },
      { label: "Praxisrelevanz", value: "Fokussiert" },
      { label: "Bachelor-Wissen", value: "Kompakt" },
    ],
  },
  {
    id: "pricing",
    title: "Pläne",
    description: "20/Monat oder 200/Jahr – wähle, was zu dir passt.",
    bgColor: "bg-slate-50 dark:bg-[#0B1120]",
  },
];

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const router = useRouter();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] relative">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-darker/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 overflow-x-auto hide-scrollbar">
            {workflowSections.map((section, index) => (
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
                  {section.title}
                </span>
              </ScrollLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div id="overview" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-20 pb-16 sm:pb-24 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              <span className="block">Psychedu – Dein Psychologie-Abschluss</span>
              <span className="block text-primary dark:text-primary-light">
                Erhalte deinen Abschluss online in ~1 Jahr
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
              Studiere schneller mit einem geführten, mehrsprachigen Programm. Lerne überall, bleibe auf Kurs und schließe dein Studium früher ab.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg"
              >
                Video ansehen
              </motion.button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-3 bg-white dark:bg-neutral-dark text-primary dark:text-primary-light border-2 border-primary rounded-lg shadow-lg"
              >
                Kostenlose Testversion starten
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      {workflowSections.slice(1).map((section) => (
        <motion.section
          key={section.id}
          id={section.id}
          className={`py-20 ${section.bgColor}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          onViewportEnter={() => setActiveSection(section.id)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{section.description}</p>

            {section.metrics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
                {section.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {section.id === "pricing" && <PricingSection />}
          </div>
        </motion.section>
      ))}

      {/* CTA */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-xl p-12 border border-slate-200 dark:border-slate-700 text-center">
            <motion.h2 initial={{ y: 20 }} whileInView={{ y: 0 }} className="text-3xl font-bold text-slate-900 dark:text-white">
              Bereit, deinen Psychologie-Abschluss schneller zu machen?
            </motion.h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Lerne in deiner Sprache, folge einem 12-Monats-Plan und bleibe mit Mentoren auf Kurs.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg"
              >
                Video ansehen
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/dashboard")}
                className="px-8 py-3 bg-white dark:bg-neutral-dark text-primary dark:text-primary-light border-2 border-primary rounded-lg shadow-lg"
              >
                Kostenlose Testversion starten
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
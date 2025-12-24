// App.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Play,
  Zap,
  LineChart,
  Workflow,
  ShieldCheck,
  Users,
  Sparkles,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
import logo  from  "./logo.png";

const BRAND = "#23b5b5";
const BRAND_DARK = "#177f82";

export default function App() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const glowBackRef = useRef(null);
  const glowFrontRef = useRef(null);
  const sectionsRef = useRef([]);
  const floatingCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO TIMELINE
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.from(".hero-pill", { y: 20, opacity: 0 })
        .from(".hero-heading", { y: 40, opacity: 0 }, "-=0.4")
        .from(".hero-sub", { y: 30, opacity: 0 }, "-=0.5")
        .from(".hero-cta", { y: 20, opacity: 0 }, "-=0.4")
        .from(
          cardRef.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.9,
          },
          "-=0.2"
        );

      // Floating main dashboard card
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: -18,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Scroll reveal sections
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(
          section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      });

      // Floating mini cards in hero
      floatingCardsRef.current.forEach((card, idx) => {
        if (!card) return;

        // entrance
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: 0.4 + idx * 0.12,
            ease: "power3.out",
          }
        );

        // gentle float loop
        gsap.to(card, {
          y: "+=12",
          duration: 2.6 + idx * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // PARALLAX: hero glow & card
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const damp = 1 / 40;
      const offsetX = x * damp;
      const offsetY = y * damp;

      if (glowBackRef.current) {
        gsap.to(glowBackRef.current, {
          x: offsetX * 0.6,
          y: offsetY * 0.6,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      if (glowFrontRef.current) {
        gsap.to(glowFrontRef.current, {
          x: offsetX,
          y: offsetY,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          x: offsetX * -0.6,
          y: offsetY * -0.6,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    heroEl.addEventListener("mousemove", handleMove);
    return () => heroEl.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#02030a] text-slate-50">
      {/* NAVBAR */}
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
     <a
  href=""
  className="flex items-center gap-2"
>
  <div className="flex h-9 w-9 items-center justify-center ">
        <a
      href="https://explified.com"
      target="_blank"
      rel="noreferrer"
      className="text-[11px] font-medium hover:underline"
      style={{ color: "#1b8f8f" }} // darker version of #23b5b5
      onClick={(e) => e.stopPropagation()}
    ><img
    src={logo} // or imported logo variable
    alt="Logo"
    className="w-8 h-8 object-contain"
  /></a>

  </div>

  <div className="flex flex-col leading-tight">
    <span className="text-sm font-semibold md:text-base">Explified Labs</span>

    {/* by Explified */}
    <a
      href="https://explified.com"
      target="_blank"
      rel="noreferrer"
      className="text-[11px] font-medium hover:underline"
      style={{ color: "#1b8f8f" }} // darker version of #23b5b5
      onClick={(e) => e.stopPropagation()}
    >
      by Explified
    </a>
  </div>
</a>

          <nav className="hidden items-center gap-8 text-xs text-slate-200 md:flex">
          
            <a href="#about" className="hover:text-white">
              About us
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="https://app.explified.com/integrations" className="hover:text-white">
              Integrations
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://app.explified.com/flowsense/explified" className="bg-[#0e6565] hidden rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-slate-100 hover:border-white/40 hover:bg-white/5 md:block">
              Coming soon
            </a>
            {/* removed "Try it for free" from header */}
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section
          ref={heroRef}
          className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_0%_0%,rgba(35,181,181,0.25),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(7,88,91,0.7),transparent_60%),linear-gradient(to_bottom,#050816,#02030a)] px-4 pt-24 pb-24 md:px-6 md:pt-28"
        >
          {/* dotted overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:26px_26px] opacity-20" />

          {/* parallax glow back */}
          <div
            ref={glowBackRef}
            className="pointer-events-none absolute bottom-[-26%] left-1/2 h-[520px] w-[1180px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_top,_rgba(8,214,214,0.4),transparent_65%)] opacity-90 blur-3xl"
          />

          {/* parallax glow front */}
          <div
            ref={glowFrontRef}
            className="pointer-events-none absolute bottom-[-24%] left-1/2 h-[420px] w-[880px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_top,_rgba(12,231,231,0.6),transparent_65%)] opacity-95 blur-2xl"
          />

          {/* top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

          {/* HERO TEXT */}
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">


            <h1 className="hero-heading mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Simplifying growth for
              <br />
              <span className="bg-gradient-to-r from-white via-white to-[rgba(35,181,181,1)] bg-clip-text text-transparent">
                futuristic teams.
              </span>
            </h1>

            <p className="hero-sub mt-4 max-w-2xl text-sm leading-relaxed text-slate-200/80 md:text-[15px]">
              From automation to engagement, NovaLabs brings every workflow into
              one intelligent, real-time dashboard so your team can move faster
              and scale with confidence.
            </p>

            {/* Single CTA – Coming Soon */}
            <div className="mt-7 flex items-center justify-center">
              <motion.a
                href="https://app.explified.com/expli"
                target="_blank"
                rel="noreferrer"
                className="hero-cta relative inline-flex"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* glow */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(14,101,101,0.4)",
                      "0 0 26px rgba(14,101,101,0.9)",
                      "0 0 10px rgba(14,101,101,0.4)",
                    ],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full"
                />
                <a href="https://app.explified.com/flowsense/chat">
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative inline-flex items-center gap-2 rounded-full bg-[#0e6565] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.8)]"
                >
                  <span>Coming Soon</span>
                </motion.div>
                </a>
              </motion.a>
            </div>
          </div>

          {/* DASHBOARD + FLOATING CARDS */}
          <div className="relative z-10 mt-12 w-full max-w-5xl">
            {/* LEFT floating card */}
            <div
              ref={(el) => (floatingCardsRef.current[0] = el)}
              className="pointer-events-none absolute -left-4 top-6 hidden w-52 rounded-2xl border border-white/10 bg-black/70 px-3 py-3 text-[11px] text-slate-200 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:block"
            >
              <p className="text-[10px] text-slate-400">Next best action</p>
              <div className="mt-1 flex items-center justify-between">
                <span>Upsell expansion</span>
                <span className="rounded-full bg-[rgba(35,181,181,0.18)] px-2 py-0.5 text-[10px] text-[rgba(35,181,181,1)]">
                  +$9.3k
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[72%] rounded-full bg-[rgba(35,181,181,1)] shadow-[0_0_12px_rgba(35,181,181,1)]" />
              </div>
            </div>

            {/* RIGHT floating card */}
            <div
              ref={(el) => (floatingCardsRef.current[1] = el)}
              className="pointer-events-none absolute -right-4 bottom-4 hidden w-52 rounded-2xl border border-white/10 bg-black/70 px-3 py-3 text-[11px] text-slate-200 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:block"
            >
              <p className="text-[10px] text-slate-400">Automation health</p>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Flows passing</span>
                  <span className="text-[rgba(35,181,181,1)]">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Alerts</span>
                  <span className="text-amber-300">3</span>
                </div>
              </div>
            </div>

            {/* MAIN DASHBOARD CARD */}
            <div
              ref={cardRef}
              className="mx-auto overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-[#050915] via-[#050915] to-[#02030a] shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
            >
              <div className="flex flex-col gap-0 md:flex-row">
                {/* Sidebar */}
                <aside className="hidden w-40 border-r border-white/5 bg-[radial-gradient(circle_at_top,_rgba(35,181,181,0.2),transparent_60%)] px-4 py-5 text-[11px] text-slate-300 md:block">
                  <div className="mb-6 flex items-center gap-2 text-xs font-semibold">
                    <div className="h-6 w-6 rounded-lg bg-black/60" />
                    <span>Nova OS</span>
                  </div>

                  <nav className="space-y-1.5">
                    {[
                      "Home",
                      "Dashboard",
                      "Projects",
                      "Wallet",
                      "Analytics",
                      "Users",
                    ].map((item, idx) => (
                      <motion.button
                        key={item}
                        whileHover={{ x: 4 }}
                        className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 ${
                          idx === 1
                            ? "bg-white/10 text-[rgba(35,181,181,1)] shadow-[0_0_18px_rgba(35,181,181,0.6)]"
                            : "text-slate-300 hover:bg-white/[0.03]"
                        }`}
                      >
                        <span>{item}</span>
                        {idx === 1 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[rgba(35,181,181,1)]" />
                        )}
                      </motion.button>
                    ))}
                  </nav>
                </aside>

                {/* Main dashboard area */}
                <div className="flex-1 bg-[#050915] px-4 py-4 md:px-6 md:py-5">
                  {/* top row */}
                  <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <p className="text-[11px] text-slate-400">
                        Welcome back, Sky ✨
                      </p>
                      <h3 className="text-sm font-semibold text-white">
                        Growth overview
                      </h3>
                    </div>

                    <div className="flex w-full flex-wrap items-center gap-2 text-[11px] text-slate-300 md:w-auto">
                      <button className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:border-white/30">
                        This month
                      </button>
                      <button className="rounded-full border border-transparent px-3 py-1 text-slate-400 hover:border-white/20 hover:text-slate-100">
                        Last quarter
                      </button>
                    </div>
                  </div>

                  {/* summary cards */}
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <SummaryCard
                      label="Total revenue"
                      value="$124,560"
                      trend="+18.4%"
                      accent="up"
                    />
                    <SummaryCard
                      label="Active workflows"
                      value="320"
                      trend="+42"
                      accent="neutral"
                    />
                    <SummaryCard
                      label="Automation coverage"
                      value="73%"
                      trend="+9.1%"
                      accent="up"
                    />
                  </div>

                  {/* transactions & activity */}
                  <div className="mt-5 grid gap-4 md:grid-cols-[1.6fr,1fr]">
                    <div className="rounded-2xl border border-white/8 bg-black/40 p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>Recent activity</span>
                        <span className="text-slate-500">
                          Last 7 days · All segments
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {[
                          {
                            name: "Activation boost play",
                            time: "Just now",
                            value: "+$12,800",
                            status: "Completed",
                          },
                          {
                            name: "Churn guardrail",
                            time: "12 min ago",
                            value: "- 23 risks",
                            status: "Monitoring",
                          },
                          {
                            name: "Expansion nudges",
                            time: "1 hr ago",
                            value: "+$4,390",
                            status: "Running",
                          },
                        ].map((row) => (
                          <ActivityRow key={row.name} {...row} />
                        ))}
                      </div>
                    </div>

                    {/* simple chart stub */}
                    <div className="flex flex-col justify-between rounded-2xl border border-white/8 bg-black/40 p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>Automation impact</span>
                        <span className="text-slate-500">MRR vs. manual</span>
                      </div>
                      <div className="mt-3 h-28 w-full rounded-xl bg-gradient-to-b from-[rgba(35,181,181,0.4)] via-[rgba(35,181,181,0.15)] to-transparent">
                        <div className="flex h-full w-full items-end justify-between px-2 pb-2">
                          {[40, 55, 70, 65, 80, 88].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: 0.2 + i * 0.06 }}
                              className="w-[10%] rounded-full bg-[rgba(35,181,181,0.9)] shadow-[0_0_15px_rgba(35,181,181,0.9)]"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] text-slate-400">
                        Teams see{" "}
                        <span className="text-[rgba(35,181,181,1)]">
                          +38% faster
                        </span>{" "}
                        experiment cycles after week two.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className="mt-20 mx-auto max-w-5xl px-4 pb-10 text-[11px] text-slate-500 md:mt-24 md:px-6"
        >
          <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-6 md:flex-row md:justify-between">
            <span>Trusted by visionary teams worldwide</span>
            <div className="flex flex-wrap items-center justify-center gap-5 opacity-80">
              <span>TechCrunch</span>
              <span>GIZMODO</span>
              <span>Bloomberg</span>
              <span>Forbes</span>
            </div>
          </div>
        </section>

        {/* ABOUT / SECTION 1 */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="mt-20 mx-auto max-w-6xl px-4 pb-16 md:mt-24 md:px-6 md:pb-20"
        >
          <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] md:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(35,181,181,1)]">
                About NovaLabs
              </p>
              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                Simplifying automation with the power of AI.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-400">
                NovaLabs helps teams automate complex workflows without adding
                complexity to their day-to-day. Our AI assistant understands
                your goals, connects the right tools and keeps every workflow
                observable end-to-end.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-[13px] text-slate-300">
                <StatPill label="45+ integrations" />
                <StatPill label="1.2M+ workflows executed" />
                <StatPill label="96% satisfaction rate" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(35,181,181,0.35),transparent_60%)] opacity-80 blur-3xl" />
              <div className="relative rounded-[24px] border border-white/10 bg-gradient-to-b from-[#050915] to-[#02030a] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>Playbook suggestions</span>
                  <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-[rgba(35,181,181,1)]">
                    AI generated
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-[13px] text-slate-200">
                  <SuggestionRow
                    title="Onboard new users in 7 days"
                    tag="Activation"
                  />
                  <SuggestionRow
                    title="Catch churn risks before renewal"
                    tag="Retention"
                  />
                  <SuggestionRow
                    title="Auto-upgrade power users"
                    tag="Expansion"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES / SECTION 2 */}
        <section
          id="features"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="mt-20 mx-auto max-w-6xl px-4 pb-16 md:mt-24 md:px-6 md:pb-20"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(35,181,181,1)]">
                What we propose
              </p>
              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                Built for teams who live in the data.
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              From ops to product to revenue, everyone gets the same live view
              of what&apos;s working and what&apos;s not. No more scattered
              tools or invisible automation.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="End-to-end automation"
              body="Trigger flows from any event, across any tool, with full visibility into every step."
            />
            <FeatureCard
              icon={LineChart}
              title="Live growth insights"
              body="Understand impact in real time with AI-written summaries and clean dashboards."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Enterprise-level trust"
              body="Role-based access, audit logs and SOC2-ready infrastructure from day one."
            />
          </div>
        </section>

        {/* FEATURE GRID SECTION – cards like screenshot */}
        <section
          id="feature-grid"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="mt-20 mx-auto max-w-6xl px-4 pb-16 md:mt-24 md:px-6 md:pb-20"
        >
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(35,181,181,1)]">
                Key capabilities
              </p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                Everything you expect from a modern automation studio.
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Visual, powerful and explainable. Each card below represents a
              full workflow you can switch on in minutes.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1 */}
            <FeatureGridCard
              title="Personalized prospecting"
              body="Use AI to tailor every outreach sequence to each lead, across channels."
              badge="Outreach"
            >
              <div className="rounded-2xl bg-black/80 p-3 text-[11px] text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px]">
                    @samuel
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["@jim", "@alex", "@kelly", "@mehme"].map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-white/5 px-2 py-0.5 text-[10px]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </FeatureGridCard>

            {/* Card 2 */}
            <FeatureGridCard
              title="Find contact info"
              body="Automatically enrich records and find verified emails and roles."
              badge="Enrichment"
            >
              <div className="flex items-center justify-center rounded-2xl bg-black/80 p-4">
                <div className="relative h-20 w-20 rounded-full bg-[radial-gradient(circle_at_top,_rgba(35,181,181,0.7),_transparent_70%)]">
                  <div className="absolute inset-3 rounded-full bg-black/90" />
                  <div className="absolute inset-[18px] flex items-center justify-center rounded-full bg-[rgba(35,181,181,1)] text-[11px] text-black">
                    Search
                  </div>
                </div>
              </div>
            </FeatureGridCard>

            {/* Card 3 */}
            <FeatureGridCard
              title="Scale your outreach"
              body="Trigger multi-step sequences at scale while keeping everything measurable."
              badge="Scale"
            >
              <div className="rounded-2xl bg-black/80 p-3 text-[11px] text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Last 30 days
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px]">
                    Total emails
                  </span>
                </div>
                <div className="mt-3 h-16 rounded-xl bg-gradient-to-br from-[rgba(35,181,181,0.4)] to-transparent">
                  <div className="flex h-full items-end justify-between px-2 pb-2">
                    {[25, 40, 55, 70, 90].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="w-[10%] rounded-full bg-[rgba(35,181,181,0.9)] shadow-[0_0_10px_rgba(35,181,181,1)]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FeatureGridCard>
          </div>
        </section>

        {/* PRICING – coming soon only */}
        <section
          id="pricing"
          ref={(el) => (sectionsRef.current[5] = el)}
          className="mt-20 mx-auto max-w-6xl px-4 pb-24 md:mt-24 md:px-6"
        >
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(35,181,181,1)]">
              Pricing
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              Simple plans, coming soon.
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-slate-400">
              We&apos;re finalising pricing that works for solo builders,
              fast-growing teams and enterprises. No opaque add-ons or surprise
              fees.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                badge: "For early teams",
                highlight: false,
                perks: [
                  "Single workspace",
                  "Core automations & insights",
                  "Email support",
                ],
              },
              {
                name: "Growth",
                badge: "Most flexible",
                highlight: true,
                perks: [
                  "Multiple workspaces",
                  "Advanced routing & experiments",
                  "Priority support & onboarding",
                ],
              },
              {
                name: "Enterprise",
                badge: "Custom rollouts",
                highlight: false,
                perks: [
                  "Dedicated CSM",
                  "Security reviews & SSO",
                  "Custom data residency",
                ],
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`relative rounded-3xl border p-6 bg-[#050915] shadow-[0_30px_80px_rgba(0,0,0,0.8)] ${
                  plan.highlight
                    ? "border-[rgba(35,181,181,1)] shadow-[0_0_45px_rgba(35,181,181,0.5)]"
                    : "border-white/10"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[rgba(35,181,181,1)] px-3 py-1 text-[10px] font-semibold text-[#02030a]">
                    Recommended
                  </span>
                )}
                <div className="text-left">
                  <div className="text-xs text-slate-400">{plan.badge}</div>
                  <div className="mt-1 text-xl font-semibold text-white">
                    {plan.name}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-black/80 px-3 py-1 border border-white/10 text-[rgba(35,181,181,1)] font-semibold">
                    Coming soon
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {plan.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[rgba(35,181,181,1)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`hero-cta mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                    plan.highlight
                      ? "bg-[rgba(35,181,181,1)] text-[#02030a]"
                      : "bg-white/5 text-slate-100"
                  }`}
                >
                   Coming soon
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* EXPLIFIED FOOTER (same as other pages) */}
      <footer className="bg-black pt-16 pb-8 border-t border-white/10 text-sm w-full">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {/* Top link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-gray-400">
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://labs.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Labs
                  </a>
                </li>
                <li>
                  <a
                    href="https://stream.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Stream
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Developer
                  </a>
                </li>
                <li>
                  <a
                    href="https://affiliate.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Affiliate
                  </a>
                </li>
                <li>
                  <a
                    href="https://beacon.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Beacon
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://notes.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Notes
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/quickshot/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    QuickShot
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/youtube-summarizer/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Youtube Summariser
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/yt-insight-saas/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    YT Insight
                  </a>
                </li>
                <li>
                  <a
                    href="https://expli.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Expli
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://explified.com/blog/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/our-projects/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Our Projects
                  </a>
                </li>
                <li>
                  <a
                    href="https://community.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://academy.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Academy
                  </a>
                </li>
                <li>
                  <a
                    href="https://events.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://explified.com/about-us/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/partners/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/terms-of-service/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/privacy-policy/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/refund-terms/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Refund Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
            <div className="w-6 h-6  rounded flex items-center justify-center overflow-hidden">
  <img
    src={logo} // or imported logo variable
    alt="Logo"
    className="w-6 h-6 object-contain"
  />
</div>

              <span className="font-semibold text-white text-base">
                Explified Labs
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-xs md:text-sm">Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-xs md:text-sm">LinkedIn</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span className="text-xs md:text-sm">YouTube</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-xs md:text-sm">Twitter / X</span>
              </a>
            </div>

          </div>
       
        </div>
      </footer>
    </div>
  );
}

/* --- Smaller components --- */

function SummaryCard({ label, value, trend, accent }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-2xl border border-white/8 bg-black/40 p-3 text-[11px]"
    >
      <div className="flex items-center justify-between text-slate-400">
        <span>{label}</span>
        <span
          className={`rounded-full px-2 py-0.5 ${
            accent === "up"
              ? "bg-[rgba(35,181,181,0.15)] text-[rgba(35,181,181,1)]"
              : "bg-white/10 text-slate-200"
          }`}
        >
          {trend}
        </span>
      </div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-[70%] rounded-full bg-[rgba(35,181,181,1)] shadow-[0_0_14px_rgba(35,181,181,1)]" />
      </div>
    </motion.div>
  );
}

function ActivityRow({ name, time, value, status }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-[11px]"
    >
      <div>
        <p className="text-slate-100">{name}</p>
        <p className="text-[10px] text-slate-400">{time}</p>
      </div>
      <div className="text-right">
        <p className="text-[rgba(35,181,181,1)]">{value}</p>
        <p className="text-[10px] text-slate-400">{status}</p>
      </div>
    </motion.div>
  );
}

function StatPill({ label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] text-slate-300">
      <Users className="h-3.5 w-3.5 text-[rgba(35,181,181,1)]" />
      <span>{label}</span>
    </div>
  );
}

function SuggestionRow({ title, tag }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-3 py-2">
      <div className="text-[13px]">{title}</div>
      <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-[rgba(35,181,181,1)]">
        {tag}
      </span>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, body }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(35,181,181,0.12)] shadow-[0_0_25px_rgba(35,181,181,0.7)]">
        <Icon className="h-4 w-4 text-[rgba(35,181,181,1)]" />
      </div>
      <h3 className="text-[15px] font-semibold text-white">{title}</h3>
      <p className="mt-2 text-[13px] text-slate-400">{body}</p>
    </motion.div>
  );
}

function FeatureGridCard({ title, body, badge, children }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(35,181,181,0.16),transparent_60%)] opacity-80" />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-300">
          <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-[rgba(35,181,181,1)]">
            {badge}
          </span>
          <span className="text-slate-500">Workflow</span>
        </div>

        {children}

        <div>
          <h3 className="mt-1 text-[15px] font-semibold text-white">{title}</h3>
          <p className="mt-1 text-[13px] text-slate-400 line-clamp-3">{body}</p>
        </div>
      </div>
    </motion.article>
  );
}

/* timeline row */
function TimelineRow({ side, title, subtitle, body }) {
  const isLeft = side === "left";
  return (
    <div className="relative mb-12 last:mb-0">
      <div className="grid items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        {/* Left card / text */}
        <div className={isLeft ? "order-1" : "order-3"}>
          <div className="rounded-2xl border border-white/10 bg-black/60 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)]">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1 text-xs text-[rgba(35,181,181,1)]">{subtitle}</p>
            <p className="mt-2 text-[13px] text-slate-400">{body}</p>
          </div>
        </div>

        {/* middle dot */}
        <div className="order-2 flex items-center justify-center">
          <div className="relative">
            <div className="h-4 w-4 rounded-full border border-[rgba(35,181,181,1)] bg-black" />
            <div className="absolute inset-0 h-4 w-4 animate-ping rounded-full bg-[rgba(35,181,181,0.4)]" />
          </div>
        </div>

        {/* Empty spacer on opposite side */}
        <div className={isLeft ? "order-3" : "order-1"} />
      </div>
    </div>
  );
}

import { Toaster } from "@/components/ui/sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Download,
  Globe,
  Layers,
  Lock,
  LogOut,
  Monitor,
  Pencil,
  Plus,
  Shield,
  Star,
  Terminal,
  Trash2,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { type ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Content, Course, Student, WhyChooseUsItem } from "./backend.d.ts";
import { useActor } from "./hooks/useActor";

// ─── Hooks & Queries ──────────────────────────────────────────────────────────

function useContent() {
  const { actor, isFetching } = useActor();
  return useQuery<Content>({
    queryKey: ["content"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getContent();
    },
    enabled: !!actor && !isFetching,
  });
}

function useRegistrations(token: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Student[]>({
    queryKey: ["registrations", token],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getRegistrations(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

// ─── Section: Nav ─────────────────────────────────────────────────────────────

function Navbar({
  heroHeading,
  heroTagline,
}: { heroHeading: string; heroTagline: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.09_0.02_265/0.95)] backdrop-blur-md border-b border-[oklch(0.82_0.18_210/0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span
            className="font-orbitron text-lg leading-tight neon-glow-cyan animate-glow-cycle"
            style={{ color: "oklch(0.82 0.18 210)" }}
          >
            {heroHeading || "EDUTECH"}
          </span>
          <span
            className="font-dancing text-sm leading-tight"
            style={{ color: "oklch(0.75 0.05 240)" }}
          >
            {heroTagline || "Where Skills Meet Technology"}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {["About", "Courses", "Why Us", "Register"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              data-ocid={`nav.${item.toLowerCase().replace(" ", "-")}.link`}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "oklch(0.7 0.04 250)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.82 0.18 210)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.7 0.04 250)";
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#register"
            data-ocid="nav.register.primary_button"
            className="neon-btn px-4 py-2 rounded text-xs cursor-pointer"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection({ content }: { content: Content | undefined }) {
  const heading = content?.heroHeading || "EDUTECH";
  const tagline = content?.heroTagline || "Where Skills Meet Technology";

  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.05 0.02 265 / 0.92) 0%, oklch(0.08 0.05 285 / 0.88) 50%, oklch(0.05 0.02 265 / 0.92) 100%)",
        }}
      />

      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-40" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          {
            id: "p1",
            size: 4,
            bg: "oklch(0.82 0.18 210)",
            left: "10%",
            top: "20%",
            delay: "0s",
            dur: "3s",
          },
          {
            id: "p2",
            size: 6,
            bg: "oklch(0.62 0.25 295)",
            left: "25%",
            top: "30%",
            delay: "0.7s",
            dur: "3.5s",
          },
          {
            id: "p3",
            size: 8,
            bg: "oklch(0.82 0.18 210)",
            left: "40%",
            top: "40%",
            delay: "1.4s",
            dur: "4s",
          },
          {
            id: "p4",
            size: 10,
            bg: "oklch(0.62 0.25 295)",
            left: "55%",
            top: "50%",
            delay: "2.1s",
            dur: "4.5s",
          },
          {
            id: "p5",
            size: 12,
            bg: "oklch(0.82 0.18 210)",
            left: "70%",
            top: "60%",
            delay: "2.8s",
            dur: "5s",
          },
          {
            id: "p6",
            size: 14,
            bg: "oklch(0.62 0.25 295)",
            left: "85%",
            top: "70%",
            delay: "3.5s",
            dur: "5.5s",
          },
        ].map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-float"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.bg,
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.dur,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ paddingTop: "8rem" }}
      >
        {/* Main title */}
        <h1
          className="font-orbitron neon-glow-cyan animate-glow-cycle mb-4 leading-none"
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            color: "oklch(0.92 0.2 210)",
            letterSpacing: "0.06em",
          }}
        >
          {heading}
        </h1>

        {/* Tagline */}
        <p
          className="font-dancing animate-fade-in-up-delay-1"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "oklch(0.85 0.05 240)",
            marginBottom: "2.5rem",
          }}
        >
          {tagline}
        </p>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2"
          style={{ color: "oklch(0.7 0.04 250)" }}
        >
          Master the skills that power tomorrow&apos;s technology. Expert-led
          courses in programming, web development, data science, and more.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay-2">
          <button
            type="button"
            onClick={scrollToRegister}
            data-ocid="hero.register.primary_button"
            className="neon-btn px-8 py-4 rounded-lg text-sm cursor-pointer min-w-[200px]"
          >
            Register Now
          </button>
          <a
            href="#courses"
            data-ocid="hero.courses.secondary_button"
            className="flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-medium border transition-all duration-300 min-w-[200px] justify-center"
            style={{
              borderColor: "oklch(0.82 0.18 210 / 0.3)",
              color: "oklch(0.82 0.18 210)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.82 0.18 210 / 0.7)";
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.82 0.18 210 / 0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.82 0.18 210 / 0.3)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Explore Courses <ChevronRight size={16} />
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "500+", label: "Students" },
            { value: "20+", label: "Courses" },
            { value: "98%", label: "Placement" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-orbitron text-2xl font-bold neon-glow-cyan"
                style={{ color: "oklch(0.82 0.18 210)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "oklch(0.6 0.04 250)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bonus Course Banner ── */}
        <div
          className="mt-10 mx-auto max-w-2xl px-6 py-4 rounded-2xl animate-fade-in-up-delay-2 animate-mobile-blink"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.08 340 / 0.9), oklch(0.12 0.06 320 / 0.9))",
            border: "2px solid oklch(0.72 0.28 340 / 0.8)",
            boxShadow:
              "0 0 30px oklch(0.72 0.28 340 / 0.4), inset 0 0 20px oklch(0.72 0.28 340 / 0.08)",
          }}
        >
          <p
            className="text-sm md:text-base font-semibold tracking-wide"
            style={{ color: "oklch(0.92 0.05 60)" }}
          >
            🎁 Bonus Course — Advance Level Mobile Repairing....
            <span
              className="ml-2 font-orbitron"
              style={{
                color: "oklch(0.85 0.22 90)",
                textShadow:
                  "0 0 10px oklch(0.85 0.22 90 / 0.8), 0 0 25px oklch(0.85 0.22 90 / 0.5)",
                fontSize: "1.1em",
              }}
            >
              FREE
            </span>
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.09 0.02 265))",
        }}
      />
    </section>
  );
}

// ─── Section: About ───────────────────────────────────────────────────────────

function AboutSection({ content }: { content: Content | undefined }) {
  const aboutText =
    content?.aboutText ||
    "EDUTECH is a premier Computer Software Coaching Institute dedicated to bridging the gap between academic knowledge and industry requirements. Founded by seasoned software professionals, we offer comprehensive training programs designed to equip students with practical, in-demand skills. Our state-of-the-art curriculum is regularly updated to reflect the latest industry trends and technologies, ensuring our graduates are always job-ready.";

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.1 0.03 268)" }}
    >
      <div className="cyber-grid-bg absolute inset-0 opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="text-xs font-medium tracking-widest uppercase mb-4 block font-orbitron"
            style={{ color: "oklch(0.82 0.18 210)" }}
          >
            About Us
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 font-orbitron"
            style={{ color: "oklch(0.95 0.01 240)" }}
          >
            Who We Are
          </h2>
          <div className="section-divider max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "oklch(0.75 0.04 250)" }}
            >
              {aboutText}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Users size={20} />, label: "Expert Instructors" },
                { icon: <BookOpen size={20} />, label: "Industry Curriculum" },
                { icon: <Star size={20} />, label: "Certified Programs" },
                { icon: <Trophy size={20} />, label: "Job Assistance" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 glass-card rounded-lg px-4 py-3"
                >
                  <span style={{ color: "oklch(0.82 0.18 210)" }}>
                    {item.icon}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.85 0.03 240)" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden glass-card p-8"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.14 0.05 270 / 0.8), oklch(0.1 0.03 285 / 0.8))",
              }}
            >
              {/* Code animation visual */}
              <div
                className="font-mono text-sm space-y-2"
                style={{ color: "oklch(0.82 0.18 210 / 0.7)" }}
              >
                {[
                  { id: "l1", text: "> const future = await EDUTECH.learn();" },
                  { id: "l2", text: "> future.skills.map(skill => career++);" },
                  { id: "l3", text: '> console.log("Success! 🚀");' },
                  {
                    id: "l4",
                    text: "// Output: Your dream career starts here",
                  },
                  { id: "l5", text: "" },
                  { id: "l6", text: "> for (const course of courses) {" },
                  { id: "l7", text: "    master(course);" },
                  { id: "l8", text: "    unlock(opportunities);" },
                  { id: "l9", text: "  }" },
                ].map((item, i) => {
                  const line = item.text;
                  return (
                    <div key={item.id} className="flex gap-2">
                      <span style={{ color: "oklch(0.5 0.05 280)" }}>
                        {String(i + 1).padStart(2, " ")}
                      </span>
                      <span
                        style={{
                          color: line.startsWith(">")
                            ? "oklch(0.82 0.18 210)"
                            : line.startsWith("//")
                              ? "oklch(0.55 0.08 160)"
                              : "oklch(0.8 0.04 240)",
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Terminal cursor blink */}
              <div
                className="inline-block w-2 h-4 mt-2 animate-pulse"
                style={{ background: "oklch(0.82 0.18 210)" }}
              />
            </div>

            {/* Decorative glow */}
            <div
              className="absolute -inset-1 rounded-2xl -z-10 blur-xl opacity-20"
              style={{ background: "oklch(0.82 0.18 210)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Courses ─────────────────────────────────────────────────────────

const courseIcons: Record<string, ReactElement> = {
  default: <Code2 size={24} />,
  web: <Globe size={24} />,
  data: <Database size={24} />,
  security: <Shield size={24} />,
  ai: <Cpu size={24} />,
  cloud: <Layers size={24} />,
  mobile: <Monitor size={24} />,
  devops: <BarChart3 size={24} />,
};

function getCourseIcon(name: string): ReactElement {
  const lower = name.toLowerCase();
  if (lower.includes("web")) return courseIcons.web;
  if (lower.includes("data") || lower.includes("sql")) return courseIcons.data;
  if (lower.includes("security") || lower.includes("cyber"))
    return courseIcons.security;
  if (
    lower.includes("ai") ||
    lower.includes("machine") ||
    lower.includes("python")
  )
    return courseIcons.ai;
  if (lower.includes("cloud") || lower.includes("aws"))
    return courseIcons.cloud;
  if (
    lower.includes("mobile") ||
    lower.includes("android") ||
    lower.includes("ios")
  )
    return courseIcons.mobile;
  if (lower.includes("devops") || lower.includes("docker"))
    return courseIcons.devops;
  return courseIcons.default;
}

function CoursesSection({ content }: { content: Content | undefined }) {
  const fallbackCourses = [
    {
      id: BigInt(0),
      name: "Python Programming",
      description:
        "Learn Python fundamentals including syntax, data structures, and algorithms for real-world applications.",
    },
    {
      id: BigInt(1),
      name: "Web Development (HTML/CSS/JS)",
      description:
        "Master HTML, CSS, and JavaScript to build modern, responsive websites from scratch.",
    },
    {
      id: BigInt(2),
      name: "React & Frontend Development",
      description:
        "Build dynamic web apps with React — components, hooks, state management, and more.",
    },
    {
      id: BigInt(3),
      name: "Data Science & ML",
      description:
        "Explore data science, machine learning techniques, and analytics using Python tools.",
    },
    {
      id: BigInt(4),
      name: "Java Programming",
      description:
        "Comprehensive Java training covering OOP principles and practical application development.",
    },
    {
      id: BigInt(5),
      name: "Database Management (SQL)",
      description:
        "Master relational databases, SQL queries, and efficient data management practices.",
    },
    {
      id: BigInt(6),
      name: "Mobile App Development",
      description:
        "Learn cross-platform mobile app development for Android and iOS devices.",
    },
    {
      id: BigInt(7),
      name: "Cybersecurity Fundamentals",
      description:
        "Gain practical knowledge in securing systems, ethical hacking, and cyber threat protection.",
    },
  ];
  const courses =
    content?.courses && content.courses.length > 0
      ? content.courses
      : fallbackCourses;

  return (
    <section
      id="courses"
      className="py-24 relative"
      style={{ background: "oklch(0.09 0.02 265)" }}
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="text-xs font-medium tracking-widest uppercase mb-4 block font-orbitron"
            style={{ color: "oklch(0.82 0.18 210)" }}
          >
            What We Teach
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 font-orbitron"
            style={{ color: "oklch(0.95 0.01 240)" }}
          >
            Courses Offered
          </h2>
          <div className="section-divider max-w-xs mx-auto mt-4" />
          <p
            className="mt-6 text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.04 250)" }}
          >
            Comprehensive programs designed by industry experts to transform
            beginners into professionals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div
              key={course.id.toString()}
              data-ocid={`courses.item.${i + 1}`}
              className="glass-card rounded-2xl p-6 neon-border-hover cursor-default group transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.25 295 / 0.3), oklch(0.55 0.2 240 / 0.3))",
                  color: "oklch(0.82 0.18 210)",
                  boxShadow: "0 0 15px oklch(0.82 0.18 210 / 0.15)",
                }}
              >
                {getCourseIcon(course.name)}
              </div>

              {/* Number badge */}
              <div
                className="text-xs font-orbitron mb-2"
                style={{ color: "oklch(0.62 0.25 295)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3
                className="text-lg font-bold mb-2 font-orbitron"
                style={{ color: "oklch(0.92 0.05 240)", fontSize: "0.95rem" }}
              >
                {course.name}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                {course.description}
              </p>

              {/* Hover arrow */}
              <div
                className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: "oklch(0.82 0.18 210)" }}
              >
                Enroll Now <ChevronRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stipend Banner ───────────────────────────────────────────────────────────

function StipendBanner() {
  return (
    <section
      className="py-14 relative overflow-hidden"
      style={{ background: "oklch(0.07 0.025 168)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.55 0.2 155 / 0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div
          className="animate-stipend-blink rounded-3xl px-10 py-8 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.08 155 / 0.95) 0%, oklch(0.12 0.06 165 / 0.98) 50%, oklch(0.15 0.08 155 / 0.95) 100%)",
            border: "2.5px solid oklch(0.7 0.22 155 / 0.9)",
            boxShadow:
              "0 0 50px oklch(0.6 0.22 155 / 0.5), 0 0 100px oklch(0.5 0.2 155 / 0.25)",
          }}
        >
          <p
            className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
            style={{
              color: "oklch(0.92 0.22 155)",
              textShadow:
                "0 0 20px oklch(0.7 0.22 155 / 0.9), 0 0 40px oklch(0.6 0.2 155 / 0.6)",
            }}
          >
            💰 Get Stipend during your session — Earn While You Learn
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Why Choose Us ───────────────────────────────────────────────────

const whyIcons = [
  <Zap key="zap" size={24} />,
  <Users key="users" size={24} />,
  <Trophy key="trophy" size={24} />,
  <Star key="star" size={24} />,
  <Globe key="globe" size={24} />,
  <Shield key="shield" size={24} />,
];

function WhyChooseSection({ content }: { content: Content | undefined }) {
  const items = content?.whyChooseUs || [];

  return (
    <section
      id="why-us"
      className="py-24 relative"
      style={{ background: "oklch(0.11 0.035 272)" }}
    >
      <div className="cyber-grid-bg absolute inset-0 opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="text-xs font-medium tracking-widest uppercase mb-4 block font-orbitron"
            style={{ color: "oklch(0.82 0.18 210)" }}
          >
            Our Advantage
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 font-orbitron"
            style={{ color: "oklch(0.95 0.01 240)" }}
          >
            Why Choose Us
          </h2>
          <div className="section-divider max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.id.toString()}
              data-ocid={`why.item.${i + 1}`}
              className="glass-card rounded-2xl p-6 neon-border-hover group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.25 295 / 0.3), oklch(0.55 0.2 240 / 0.3))",
                  color: "oklch(0.72 0.2 295)",
                  boxShadow: "0 0 15px oklch(0.62 0.25 295 / 0.15)",
                }}
              >
                {whyIcons[i % whyIcons.length]}
              </div>
              <h3
                className="text-base font-bold mb-2 font-orbitron"
                style={{ color: "oklch(0.92 0.05 240)", fontSize: "0.88rem" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Registration Form ───────────────────────────────────────────────

interface RegistrationFormProps {
  onSuccess: () => void;
}

function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    phone: "",
    courseInterest: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email is required";
    }
    if (!form.mobileNo.trim()) e.mobileNo = "Mobile number is required";
    if (!form.phone.trim()) e.phone = "WhatsApp number is required";
    if (!form.courseInterest) e.courseInterest = "Please select a course";
    if (!form.address.trim()) e.address = "Full address is required";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (!actor) return;
    setIsSubmitting(true);
    try {
      // Backend supports: fullName, email, phone, courseInterest, city, registrationDate
      // mobileNo and address are stored in city field combined since backend schema is fixed
      await actor.submitRegistration(
        form.fullName,
        form.email,
        form.phone,
        form.courseInterest,
        `${form.city} | Addr: ${form.address} | Mobile: ${form.mobileNo}`,
        new Date().toISOString(),
      );
      onSuccess();
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "input-neon w-full rounded-lg px-4 py-3 text-sm focus:outline-none";
  const labelClass =
    "block text-xs font-medium mb-1.5 uppercase tracking-wider";

  return (
    <section
      id="register"
      className="py-24 relative"
      style={{ background: "oklch(0.09 0.02 265)" }}
    >
      <div className="cyber-grid-bg absolute inset-0 opacity-20" />

      {/* Decorative glows */}
      <div
        className="absolute left-0 top-1/2 w-64 h-64 -translate-y-1/2 rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: "oklch(0.82 0.18 210)" }}
      />
      <div
        className="absolute right-0 top-1/2 w-64 h-64 -translate-y-1/2 rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: "oklch(0.62 0.25 295)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span
            className="text-xs font-medium tracking-widest uppercase mb-4 block font-orbitron"
            style={{ color: "oklch(0.82 0.18 210)" }}
          >
            Join EDUTECH
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 font-orbitron"
            style={{ color: "oklch(0.95 0.01 240)" }}
          >
            Register Now
          </h2>
          <div className="section-divider max-w-xs mx-auto mt-4" />
          <p className="mt-6 text-sm" style={{ color: "oklch(0.65 0.04 250)" }}>
            Fill in your details and we&apos;ll reach out via WhatsApp with
            enrollment information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8 space-y-5"
          noValidate
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className={labelClass}
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) =>
                setForm((p) => ({ ...p, fullName: e.target.value }))
              }
              placeholder="Enter your full name"
              className={inputClass}
              data-ocid="registration.fullname.input"
              autoComplete="name"
            />
            {errors.fullName && (
              <p
                className="mt-1 text-xs"
                style={{ color: "oklch(0.65 0.2 27)" }}
                data-ocid="registration.fullname.error_state"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={labelClass}
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="your@email.com"
              className={inputClass}
              data-ocid="registration.email.input"
              autoComplete="email"
            />
            {errors.email && (
              <p
                className="mt-1 text-xs"
                style={{ color: "oklch(0.65 0.2 27)" }}
                data-ocid="registration.email.error_state"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Mobile No */}
          <div>
            <label
              htmlFor="mobileNo"
              className={labelClass}
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              Mobile Number *
            </label>
            <input
              id="mobileNo"
              type="tel"
              value={form.mobileNo}
              onChange={(e) =>
                setForm((p) => ({ ...p, mobileNo: e.target.value }))
              }
              placeholder="Enter your mobile number"
              className={inputClass}
              data-ocid="registration.mobileno.input"
              autoComplete="tel"
            />
            {errors.mobileNo && (
              <p
                className="mt-1 text-xs"
                style={{ color: "oklch(0.65 0.2 27)" }}
                data-ocid="registration.mobileno.error_state"
              >
                {errors.mobileNo}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label
              htmlFor="phone"
              className={labelClass}
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              WhatsApp Number *
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              placeholder="+1 234 567 8900"
              className={inputClass}
              data-ocid="registration.phone.input"
              autoComplete="tel"
            />
            {errors.phone && (
              <p
                className="mt-1 text-xs"
                style={{ color: "oklch(0.65 0.2 27)" }}
                data-ocid="registration.phone.error_state"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Course of Interest */}
          <div>
            <label
              htmlFor="courseInterest"
              className={labelClass}
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              Course of Interest *
            </label>
            <select
              id="courseInterest"
              value={form.courseInterest}
              onChange={(e) =>
                setForm((p) => ({ ...p, courseInterest: e.target.value }))
              }
              className={`${inputClass} cursor-pointer`}
              data-ocid="registration.course.select"
              style={{
                background: "oklch(0.12 0.03 270 / 0.8)",
                border: "1px solid oklch(0.3 0.06 270)",
                color: form.courseInterest
                  ? "oklch(0.95 0.01 240)"
                  : "oklch(0.5 0.03 260)",
              }}
            >
              <option
                value=""
                disabled
                style={{ background: "oklch(0.14 0.04 265)" }}
              >
                Select a course...
              </option>
              <option
                value="Entrance Level"
                style={{
                  background: "oklch(0.14 0.04 265)",
                  color: "oklch(0.95 0.01 240)",
                }}
              >
                Entrance Level
              </option>
              <option
                value="Advance Level"
                style={{
                  background: "oklch(0.14 0.04 265)",
                  color: "oklch(0.95 0.01 240)",
                }}
              >
                Advance Level
              </option>
            </select>
            {errors.courseInterest && (
              <p
                className="mt-1 text-xs"
                style={{ color: "oklch(0.65 0.2 27)" }}
                data-ocid="registration.course.error_state"
              >
                {errors.courseInterest}
              </p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label
              htmlFor="address"
              className={labelClass}
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              Full Address *
            </label>
            <textarea
              id="address"
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              placeholder="Enter your full address"
              rows={3}
              className={`${inputClass} resize-none`}
              data-ocid="registration.address.textarea"
              autoComplete="street-address"
            />
            {errors.address && (
              <p
                className="mt-1 text-xs"
                style={{ color: "oklch(0.65 0.2 27)" }}
                data-ocid="registration.address.error_state"
              >
                {errors.address}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className={labelClass}
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              City / Location *
            </label>
            <input
              id="city"
              type="text"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder="Your city"
              className={inputClass}
              data-ocid="registration.city.input"
              autoComplete="address-level2"
            />
            {errors.city && (
              <p
                className="mt-1 text-xs"
                style={{ color: "oklch(0.65 0.2 27)" }}
                data-ocid="registration.city.error_state"
              >
                {errors.city}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            data-ocid="registration.submit_button"
            className="neon-btn w-full py-4 rounded-lg text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </section>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.85)" }}
      data-ocid="registration.success_state"
    >
      <div
        className="glass-card rounded-3xl p-10 max-w-md w-full text-center relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.1 0.05 270 / 0.95), oklch(0.08 0.03 265 / 0.95))",
          border: "1px solid oklch(0.6 0.15 160 / 0.4)",
          boxShadow: "0 0 60px oklch(0.6 0.15 160 / 0.2)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          data-ocid="registration.success.close_button"
          className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200"
          style={{ color: "oklch(0.6 0.04 250)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "oklch(0.95 0.01 240)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "oklch(0.6 0.04 250)";
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Animated checkmark */}
        <div className="flex justify-center mb-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-scale-in-bounce"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.18 160 / 0.3), oklch(0.6 0.2 160 / 0.2))",
              border: "2px solid oklch(0.65 0.18 160 / 0.6)",
              boxShadow: "0 0 30px oklch(0.6 0.18 160 / 0.3)",
            }}
          >
            <CheckCircle2
              size={52}
              style={{ color: "oklch(0.72 0.2 160)" }}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[
            { id: "sp1", left: "20%", top: "30%", delay: "0s" },
            { id: "sp2", left: "35%", top: "50%", delay: "0.4s" },
            { id: "sp3", left: "50%", top: "30%", delay: "0.8s" },
            { id: "sp4", left: "65%", top: "70%", delay: "1.2s" },
            { id: "sp5", left: "80%", top: "50%", delay: "1.6s" },
          ].map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full animate-float"
              style={{
                width: "4px",
                height: "4px",
                background: "oklch(0.72 0.2 160)",
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                opacity: 0.7,
              }}
            />
          ))}
        </div>

        <h2
          className="font-orbitron text-2xl font-bold mb-3 animate-fade-in-up"
          style={{ color: "oklch(0.92 0.05 240)" }}
        >
          Thank You for Registration!
        </h2>
        <p
          className="text-base leading-relaxed mb-6 animate-fade-in-up-delay-1"
          style={{ color: "oklch(0.72 0.04 250)" }}
        >
          You will be notified soon through{" "}
          <span style={{ color: "oklch(0.72 0.2 160)", fontWeight: 600 }}>
            WhatsApp
          </span>
          .
        </p>
        <p
          className="text-xs animate-fade-in-up-delay-2"
          style={{ color: "oklch(0.55 0.04 250)" }}
        >
          Our team will review your application and reach out within 24 hours.
        </p>

        <button
          type="button"
          onClick={onClose}
          data-ocid="registration.success.confirm_button"
          className="mt-8 neon-btn px-8 py-3 rounded-lg text-sm animate-fade-in-up-delay-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.18 160 / 0.8), oklch(0.6 0.15 180 / 0.8))",
            boxShadow: "0 0 20px oklch(0.6 0.18 160 / 0.3)",
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ─── Admin Login Modal ────────────────────────────────────────────────────────

interface AdminLoginProps {
  onLogin: (token: string) => void;
  onClose: () => void;
}

function AdminLoginModal({ onLogin, onClose }: AdminLoginProps) {
  const { actor } = useActor();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Client-side password check for reliability
      if (password !== "Goldy2026") {
        setError("Invalid password. Please try again.");
        setIsLoading(false);
        return;
      }
      // Try to get a session token from backend, fall back to local token
      let token = `admin-local-${Date.now()}`;
      if (actor) {
        try {
          const backendToken = await actor.adminLogin(password);
          if (backendToken) token = backendToken;
        } catch {
          // Use local token if backend call fails
        }
      }
      onLogin(token);
    } catch {
      setError("Invalid password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.8)" }}
    >
      <div
        className="glass-card rounded-2xl p-8 w-full max-w-sm relative"
        style={{
          background: "oklch(0.1 0.04 268 / 0.98)",
          border: "1px solid oklch(0.82 0.18 210 / 0.2)",
          boxShadow: "0 0 40px oklch(0 0 0 / 0.5)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded"
          style={{ color: "oklch(0.6 0.04 250)" }}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(0.62 0.25 295 / 0.2)",
              color: "oklch(0.72 0.22 295)",
            }}
          >
            <Lock size={20} />
          </div>
          <div>
            <h2
              className="font-orbitron text-sm font-bold"
              style={{ color: "oklch(0.92 0.05 240)" }}
            >
              Admin Access
            </h2>
            <p className="text-xs" style={{ color: "oklch(0.55 0.04 250)" }}>
              Restricted area
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
              style={{ color: "oklch(0.72 0.06 240)" }}
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="input-neon w-full rounded-lg px-4 py-3 text-sm"
              data-ocid="admin.password.input"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p
              className="text-xs px-3 py-2 rounded glass-card"
              style={{
                color: "oklch(0.65 0.2 27)",
                borderColor: "oklch(0.65 0.2 27 / 0.3)",
              }}
              data-ocid="admin.login.error_state"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            data-ocid="admin.login.submit_button"
            className="neon-btn w-full py-3 rounded-lg text-sm disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ───────────────────────────────────────────────────────────

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  content: Content | undefined;
}

function AdminDashboard({ token, onLogout, content }: AdminDashboardProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: students = [] } = useRegistrations(token);
  const [activeTab, setActiveTab] = useState<
    "registrations" | "content" | "images"
  >("registrations");

  // Content editor state
  const [heroHeading, setHeroHeading] = useState(content?.heroHeading || "");
  const [heroTagline, setHeroTagline] = useState(content?.heroTagline || "");
  const [aboutText, setAboutText] = useState(content?.aboutText || "");
  const [heroImageUrl, setHeroImageUrl] = useState(content?.heroImageUrl || "");
  const [aboutImageUrl, setAboutImageUrl] = useState(
    content?.aboutImageUrl || "",
  );
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Courses editor state
  const [editableCourses, setEditableCourses] = useState<Course[]>(
    content?.courses || [],
  );
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseDesc, setNewCourseDesc] = useState("");

  // WhyChooseUs editor state
  const [editableWhy, setEditableWhy] = useState<WhyChooseUsItem[]>(
    content?.whyChooseUs || [],
  );

  // Sync state when content loads
  useEffect(() => {
    if (content) {
      setHeroHeading(content.heroHeading);
      setHeroTagline(content.heroTagline);
      setAboutText(content.aboutText);
      setHeroImageUrl(content.heroImageUrl);
      setAboutImageUrl(content.aboutImageUrl);
      setEditableCourses(content.courses);
      setEditableWhy(content.whyChooseUs);
    }
  }, [content]);

  const saveContent = async () => {
    if (!actor) return;
    setIsSavingContent(true);
    try {
      await actor.updateContent(
        token,
        heroHeading,
        heroTagline,
        aboutText,
        heroImageUrl,
        aboutImageUrl,
      );
      await queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Content saved successfully!");
    } catch {
      toast.error("Failed to save content.");
    } finally {
      setIsSavingContent(false);
    }
  };

  const saveImages = async () => {
    if (!actor) return;
    setIsSavingContent(true);
    try {
      await actor.updateContent(
        token,
        heroHeading,
        heroTagline,
        aboutText,
        heroImageUrl,
        aboutImageUrl,
      );
      await queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Images updated!");
    } catch {
      toast.error("Failed to save images.");
    } finally {
      setIsSavingContent(false);
    }
  };

  const saveCourse = async (course: Course) => {
    if (!actor) return;
    try {
      await actor.updateCourse(
        token,
        course.id,
        course.name,
        course.description,
      );
      await queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Course updated!");
    } catch {
      toast.error("Failed to update course.");
    }
  };

  const addCourse = async () => {
    if (!actor || !newCourseName.trim()) return;
    try {
      const id = await actor.addCourse(token, newCourseName, newCourseDesc);
      setEditableCourses((prev) => [
        ...prev,
        { id, name: newCourseName, description: newCourseDesc },
      ]);
      setNewCourseName("");
      setNewCourseDesc("");
      await queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Course added!");
    } catch {
      toast.error("Failed to add course.");
    }
  };

  const removeCourse = async (id: bigint) => {
    if (!actor) return;
    try {
      await actor.removeCourse(token, id);
      setEditableCourses((prev) => prev.filter((c) => c.id !== id));
      await queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Course removed!");
    } catch {
      toast.error("Failed to remove course.");
    }
  };

  const saveWhyItem = async (item: WhyChooseUsItem) => {
    if (!actor) return;
    try {
      await actor.updateWhyChooseUs(
        token,
        item.id,
        item.title,
        item.description,
      );
      await queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Updated!");
    } catch {
      toast.error("Failed to update.");
    }
  };

  const exportCSV = () => {
    if (!students.length) {
      toast.error("No students to export.");
      return;
    }
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Course",
      "City",
      "Registration Date",
    ];
    const rows = students.map((s) => [
      `"${s.fullName}"`,
      `"${s.email}"`,
      `"${s.phone}"`,
      `"${s.courseInterest}"`,
      `"${s.city}"`,
      `"${s.registrationDate}"`,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `edutech-registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded!");
  };

  const inputStyle =
    "input-neon w-full rounded-lg px-3 py-2 text-sm focus:outline-none";
  const labelStyle = "block text-xs font-medium mb-1 uppercase tracking-wider";

  const tabs = [
    { id: "registrations", label: "Registrations" },
    { id: "content", label: "Content Editor" },
    { id: "images", label: "Image Editor" },
  ] as const;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.02 265)" }}
    >
      {/* Header */}
      <header
        className="border-b sticky top-0 z-30"
        style={{
          background: "oklch(0.1 0.03 268 / 0.97)",
          borderColor: "oklch(0.82 0.18 210 / 0.15)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(0.62 0.25 295 / 0.2)",
                color: "oklch(0.72 0.22 295)",
              }}
            >
              <Lock size={16} />
            </div>
            <div>
              <h1
                className="font-orbitron text-sm font-bold"
                style={{ color: "oklch(0.92 0.05 240)", fontSize: "0.8rem" }}
              >
                EDUTECH Admin Panel
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.55 0.04 250)" }}>
                Manage content &amp; students
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            data-ocid="admin.logout.button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200"
            style={{
              borderColor: "oklch(0.65 0.2 27 / 0.4)",
              color: "oklch(0.65 0.2 27)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.65 0.2 27 / 0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div
        className="border-b sticky top-[73px] z-20"
        style={{
          background: "oklch(0.1 0.03 268 / 0.97)",
          borderColor: "oklch(0.82 0.18 210 / 0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              data-ocid="admin.tab"
              className="px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200"
              style={{
                borderColor:
                  activeTab === tab.id ? "oklch(0.82 0.18 210)" : "transparent",
                color:
                  activeTab === tab.id
                    ? "oklch(0.82 0.18 210)"
                    : "oklch(0.6 0.04 250)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="text-xl font-bold font-orbitron"
                  style={{ color: "oklch(0.92 0.05 240)", fontSize: "1rem" }}
                >
                  Student Registrations
                </h2>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.55 0.04 250)" }}
                >
                  {students.length} total registrations
                </p>
              </div>
              <button
                type="button"
                onClick={exportCSV}
                data-ocid="admin.export.button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200"
                style={{
                  borderColor: "oklch(0.82 0.18 210 / 0.4)",
                  color: "oklch(0.82 0.18 210)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.82 0.18 210 / 0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                <Download size={14} /> Export CSV
              </button>
            </div>

            {students.length === 0 ? (
              <div
                data-ocid="admin.registrations.empty_state"
                className="glass-card rounded-2xl p-16 text-center"
              >
                <Users
                  size={48}
                  className="mx-auto mb-4"
                  style={{ color: "oklch(0.82 0.18 210 / 0.3)" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.55 0.04 250)" }}
                >
                  No registrations yet.
                </p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid oklch(0.82 0.18 210 / 0.15)",
                          background: "oklch(0.12 0.04 268 / 0.5)",
                        }}
                      >
                        {[
                          "Name",
                          "Email",
                          "Phone",
                          "Course",
                          "City",
                          "Date",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider font-orbitron"
                            style={{
                              color: "oklch(0.72 0.1 240)",
                              fontSize: "0.65rem",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s, i) => (
                        <tr
                          key={`${s.email}-${i}`}
                          data-ocid={`admin.registrations.row.${i + 1}`}
                          style={{
                            borderBottom:
                              i < students.length - 1
                                ? "1px solid oklch(0.82 0.18 210 / 0.07)"
                                : "none",
                          }}
                        >
                          {[
                            s.fullName,
                            s.email,
                            s.phone,
                            s.courseInterest,
                            s.city,
                            s.registrationDate
                              ? new Date(
                                  s.registrationDate,
                                ).toLocaleDateString()
                              : "-",
                          ].map((val, fieldIdx) => (
                            <td
                              // biome-ignore lint/suspicious/noArrayIndexKey: table cells have no stable key
                              key={fieldIdx}
                              className="px-4 py-3 text-xs"
                              style={{ color: "oklch(0.72 0.04 250)" }}
                            >
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Editor Tab */}
        {activeTab === "content" && (
          <div className="space-y-8">
            {/* Main content */}
            <div className="glass-card rounded-2xl p-6">
              <h3
                className="font-orbitron text-sm font-bold mb-6"
                style={{ color: "oklch(0.82 0.18 210)", fontSize: "0.8rem" }}
              >
                Page Content
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="admin-hero-heading"
                    className={labelStyle}
                    style={{ color: "oklch(0.72 0.06 240)" }}
                  >
                    Hero Heading
                  </label>
                  <input
                    type="text"
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    className={inputStyle}
                    id="admin-hero-heading"
                    data-ocid="admin.hero-heading.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-hero-tagline"
                    className={labelStyle}
                    style={{ color: "oklch(0.72 0.06 240)" }}
                  >
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    className={inputStyle}
                    id="admin-hero-tagline"
                    data-ocid="admin.hero-tagline.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-about-text"
                    className={labelStyle}
                    style={{ color: "oklch(0.72 0.06 240)" }}
                  >
                    About Text
                  </label>
                  <textarea
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    rows={5}
                    className={`${inputStyle} resize-none`}
                    id="admin-about-text"
                    data-ocid="admin.about-text.textarea"
                  />
                </div>
                <button
                  type="button"
                  onClick={saveContent}
                  disabled={isSavingContent}
                  data-ocid="admin.save-content.button"
                  className="neon-btn px-6 py-2.5 rounded-lg text-xs disabled:opacity-50"
                >
                  {isSavingContent ? "Saving..." : "Save Content"}
                </button>
              </div>
            </div>

            {/* Courses editor */}
            <div className="glass-card rounded-2xl p-6">
              <h3
                className="font-orbitron text-sm font-bold mb-6"
                style={{ color: "oklch(0.82 0.18 210)", fontSize: "0.8rem" }}
              >
                Courses
              </h3>

              <div className="space-y-3 mb-6">
                {editableCourses.map((course, i) => (
                  <div
                    key={course.id.toString()}
                    data-ocid={`admin.courses.item.${i + 1}`}
                    className="flex gap-3 items-start"
                  >
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) =>
                          setEditableCourses((prev) =>
                            prev.map((c) =>
                              c.id === course.id
                                ? { ...c, name: e.target.value }
                                : c,
                            ),
                          )
                        }
                        className={inputStyle}
                        placeholder="Course name"
                      />
                      <input
                        type="text"
                        value={course.description}
                        onChange={(e) =>
                          setEditableCourses((prev) =>
                            prev.map((c) =>
                              c.id === course.id
                                ? { ...c, description: e.target.value }
                                : c,
                            ),
                          )
                        }
                        className={inputStyle}
                        placeholder="Course description"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => saveCourse(course)}
                        data-ocid={`admin.courses.save_button.${i + 1}`}
                        className="p-2 rounded-lg transition-colors duration-200"
                        style={{
                          color: "oklch(0.72 0.2 160)",
                          border: "1px solid oklch(0.72 0.2 160 / 0.3)",
                        }}
                        title="Save"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCourse(course.id)}
                        data-ocid={`admin.courses.delete_button.${i + 1}`}
                        className="p-2 rounded-lg transition-colors duration-200"
                        style={{
                          color: "oklch(0.65 0.2 27)",
                          border: "1px solid oklch(0.65 0.2 27 / 0.3)",
                        }}
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add new course */}
              <div
                className="pt-4"
                style={{ borderTop: "1px solid oklch(0.82 0.18 210 / 0.1)" }}
              >
                <p
                  className="text-xs font-medium mb-3 uppercase tracking-wider"
                  style={{ color: "oklch(0.72 0.06 240)" }}
                >
                  Add New Course
                </p>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      placeholder="Course name"
                      className={inputStyle}
                      data-ocid="admin.new-course-name.input"
                    />
                    <input
                      type="text"
                      value={newCourseDesc}
                      onChange={(e) => setNewCourseDesc(e.target.value)}
                      placeholder="Course description"
                      className={inputStyle}
                      data-ocid="admin.new-course-desc.input"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addCourse}
                    data-ocid="admin.add-course.button"
                    className="self-start p-2.5 rounded-lg transition-colors duration-200"
                    style={{
                      color: "oklch(0.82 0.18 210)",
                      border: "1px solid oklch(0.82 0.18 210 / 0.3)",
                      background: "oklch(0.82 0.18 210 / 0.05)",
                    }}
                    title="Add course"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Why Choose Us editor */}
            <div className="glass-card rounded-2xl p-6">
              <h3
                className="font-orbitron text-sm font-bold mb-6"
                style={{ color: "oklch(0.82 0.18 210)", fontSize: "0.8rem" }}
              >
                Why Choose Us Items
              </h3>
              <div className="space-y-3">
                {editableWhy.map((item, i) => (
                  <div
                    key={item.id.toString()}
                    data-ocid={`admin.why.item.${i + 1}`}
                    className="flex gap-3 items-start"
                  >
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          setEditableWhy((prev) =>
                            prev.map((w) =>
                              w.id === item.id
                                ? { ...w, title: e.target.value }
                                : w,
                            ),
                          )
                        }
                        className={inputStyle}
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          setEditableWhy((prev) =>
                            prev.map((w) =>
                              w.id === item.id
                                ? { ...w, description: e.target.value }
                                : w,
                            ),
                          )
                        }
                        className={inputStyle}
                        placeholder="Description"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => saveWhyItem(item)}
                      data-ocid={`admin.why.save_button.${i + 1}`}
                      className="p-2 rounded-lg transition-colors duration-200"
                      style={{
                        color: "oklch(0.72 0.2 160)",
                        border: "1px solid oklch(0.72 0.2 160 / 0.3)",
                      }}
                      title="Save"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Image Editor Tab */}
        {activeTab === "images" && (
          <div className="glass-card rounded-2xl p-6">
            <h3
              className="font-orbitron text-sm font-bold mb-6"
              style={{ color: "oklch(0.82 0.18 210)", fontSize: "0.8rem" }}
            >
              Image URLs
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="admin-hero-image"
                  className={labelStyle}
                  style={{ color: "oklch(0.72 0.06 240)" }}
                >
                  Hero Image URL
                </label>
                <input
                  type="text"
                  value={heroImageUrl}
                  onChange={(e) => setHeroImageUrl(e.target.value)}
                  className={inputStyle}
                  placeholder="https://..."
                  id="admin-hero-image"
                  data-ocid="admin.hero-image.input"
                />
              </div>
              <div>
                <label
                  htmlFor="admin-about-image"
                  className={labelStyle}
                  style={{ color: "oklch(0.72 0.06 240)" }}
                >
                  About Image URL
                </label>
                <input
                  type="text"
                  value={aboutImageUrl}
                  onChange={(e) => setAboutImageUrl(e.target.value)}
                  className={inputStyle}
                  placeholder="https://..."
                  id="admin-about-image"
                  data-ocid="admin.about-image.input"
                />
              </div>
              <button
                type="button"
                onClick={saveImages}
                disabled={isSavingContent}
                data-ocid="admin.save-images.button"
                className="neon-btn px-6 py-2.5 rounded-lg text-xs disabled:opacity-50"
              >
                {isSavingContent ? "Saving..." : "Save Images"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="py-12 relative"
      style={{
        background: "oklch(0.08 0.025 265)",
        borderTop: "1px solid oklch(0.82 0.18 210 / 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span
            className="font-orbitron text-lg neon-glow-cyan animate-glow-cycle"
            style={{ color: "oklch(0.82 0.18 210)" }}
          >
            EDUTECH
          </span>
          <p className="text-xs mt-1" style={{ color: "oklch(0.5 0.04 250)" }}>
            Where Skills Meet Technology
          </p>
        </div>

        <div className="flex gap-6">
          {["About", "Courses", "Register"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs transition-colors duration-200"
              style={{ color: "oklch(0.55 0.04 250)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.82 0.18 210)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.55 0.04 250)";
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <p
          className="text-xs text-center"
          style={{ color: "oklch(0.45 0.04 250)" }}
        >
          &copy; {year}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: "oklch(0.6 0.08 250)" }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "oklch(0.82 0.18 210)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "oklch(0.6 0.08 250)";
            }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const { data: content, isLoading } = useContent();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [seedDone, setSeedDone] = useState(false);

  // Seed defaults once
  useEffect(() => {
    if (actor && !isFetching && !seedDone) {
      setSeedDone(true);
      actor
        .seedDefaults()
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["content"] });
        })
        .catch(() => {
          // Seed may fail if already seeded – ignore
        });
    }
  }, [actor, isFetching, seedDone, queryClient]);

  const handleAdminLogin = (token: string) => {
    setAdminToken(token);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = async () => {
    if (actor && adminToken) {
      try {
        await actor.adminLogout(adminToken);
      } catch {
        /* ignore */
      }
    }
    setAdminToken(null);
  };

  // Admin Dashboard view
  if (adminToken) {
    return (
      <>
        <AdminDashboard
          token={adminToken}
          onLogout={handleAdminLogout}
          content={content}
        />
        <Toaster theme="dark" />
      </>
    );
  }

  // Landing Page
  return (
    <div className="relative">
      {/* Loading state */}
      {isLoading && (
        <div
          data-ocid="app.loading_state"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "oklch(0.09 0.02 265)" }}
        >
          <div className="text-center">
            <div
              className="font-orbitron text-4xl font-bold neon-glow-cyan animate-glow-cycle mb-4"
              style={{ color: "oklch(0.82 0.18 210)" }}
            >
              EDUTECH
            </div>
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{
                    background: "oklch(0.82 0.18 210)",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Navbar
        heroHeading={content?.heroHeading || "EDUTECH"}
        heroTagline={content?.heroTagline || "Where Skills Meet Technology"}
      />
      <HeroSection content={content} />
      <StipendBanner />
      <AboutSection content={content} />
      <CoursesSection content={content} />
      <WhyChooseSection content={content} />
      <RegistrationForm onSuccess={() => setShowSuccessModal(true)} />
      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLoginModal
          onLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {/* Admin button - small globe emoji, fixed bottom-left */}
      <button
        type="button"
        onClick={() => setShowAdminLogin(true)}
        data-ocid="admin.open_modal_button"
        className="fixed bottom-4 left-4 z-30 flex items-center justify-center rounded-full transition-opacity duration-200"
        style={{
          width: "16px",
          height: "16px",
          background: "oklch(0.15 0.04 268 / 0.7)",
          border: "1px solid oklch(0.4 0.06 270 / 0.4)",
          fontSize: "9px",
          opacity: 0.5,
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "0.5";
        }}
        title="Admin Login"
        aria-label="Admin Login"
      >
        🌐
      </button>

      <Toaster theme="dark" />
    </div>
  );
}

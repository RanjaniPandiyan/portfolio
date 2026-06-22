import { useState, useEffect, useRef } from "react";

const SKILLS = {
  Frontend: [
    { name: "React JS", level: 88 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "Bootstrap 5", level: 85 },
    { name: "JavaScript", level: 82 },
    { name: "React Router", level: 88 },
  ],
  Backend: [
    { name: "Node JS", level: 80 },
    { name: "Express JS", level: 78 },
    { name: "PHP", level: 75 },
  ],
  Database: [
    { name: "MongoDB", level: 80 },
    { name: "MySQL", level: 78 },
  ],
  Auth: [
    { name: "JWT Authentication", level: 85 },
    { name: "Role Based Access Control", level: 80 },
  ],
  Tools: [
    { name: "Git & GitHub", level: 85 },
    { name: "GitHub Actions (CI/CD)", level: 80 },
    { name: "Redux Toolkit", level: 80 },
    { name: "VS Code", level: 92 },
    { name: "Postman", level: 80 },
  ],
  Deployment: [
    {
      name: "Vercel",
      level: 90,
    },
    {
      name: "Render",
      level: 93,
    },
    {
      name: "MongoDB Atlas",
      level: 95,
    },
  ],
};

const PROJECTS = [
  {
    id: 1,
    title: "Full Stack E-Commerce Platform",
    category: "MERN Stack",
    gradient: "from-violet-600 to-indigo-600",
    accent: "#7c3aed",
    icon: "🛒",
    desc: "Complete MERN e-commerce platform with user and admin modules, JWT auth, and full order management.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Redux Toolkit"],
    features: [
      "JWT Authentication",
      "Product Management",
      "Shopping Cart",
      "Order Management",
      "Admin Dashboard",
      "WishList",
    ],
    size: "large",
    github_frontend: "https://github.com/RanjaniPandiyan/Ecommerce-site",
    live: "https://shopysite.vercel.app/",
  },
  {
    id: 2,
    title: "Admin Dashboard System",
    category: "Full Stack",
    gradient: "from-cyan-500 to-blue-600",
    accent: "#0891b2",
    icon: "📊",
    desc: "Responsive admin management dashboard with analytics, user/product management and CRUD operations.",
    tags: ["React", "Node.js", "MongoDB", "Bootstrap"],
    features: ["Dashboard Analytics", "User Management", "CRUD Ops"],
    size: "large",
    github_frontend: "https://github.com/RanjaniPandiyan/Ecommerce-site",
    live: "https://dev-ranjani.vercel.app/login",
  },
  {
    id: 3,
    title: "QR Product Authentication System",
    category: "PHP + MySQL",
    gradient: "from-emerald-500 to-teal-600",
    accent: "#059669",
    icon: "🔍",
    desc: "Final Year Project — Product authentication via QR codes using PHP and MySQL to combat counterfeiting.",
    tags: ["PHP", "MySQL", "QR Code", "Security"],
    features: [
      "QR Code Verification",
      "Product Authentication",
      "Anti-Counterfeit",
      "Secure Validation",
    ],
    size: "large",
    github_frontend: "#",
    live: "#",
  },
];

const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

const TYPEWRITER_STRINGS = [
  "Full Stack Developer",
  "MERN Stack Specialist",
  "React JS Developer",
  "Node.js Developer",
  "Web Application Builder",
];

function useTypewriter(strings, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx % strings.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setIdx((i) => i + 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, idx]);
  return text;
}

function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const [showTop, setShowTop] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("Frontend");

  const typed = useTypewriter(TYPEWRITER_STRINGS);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      const sections = NAV_LINKS.map((n) => document.getElementById(n));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].getBoundingClientRect().top <= 120) {
          setActiveSection(NAV_LINKS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const bg = dark ? "#0a0a0f" : "#f8f9fc";
  const surface = dark ? "#13131c" : "#ffffff";
  const surface2 = dark ? "#1a1a28" : "#f1f3f9";
  const text = dark ? "#e8e8f0" : "#1a1a2e";
  const textMuted = dark ? "#8888aa" : "#64648a";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const accent = "#7c3aed";
  const accent2 = "#06b6d4";

  const glass = {
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
    backdropFilter: "blur(20px)",
    border: `1px solid ${border}`,
    borderRadius: 16,
  };

  const filteredProjects =
    filterCat === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.includes(filterCat));

  return (
    <div
      style={{
        background: bg,
        color: text,
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Ambient BG */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "40%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)"
              : "none",
          }}
        />
      </div>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: dark ? "rgba(10,10,15,0.85)" : "rgba(248,249,252,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${border}`,
          padding: "0 5%",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          RP.
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background:
                  activeSection === l
                    ? `linear-gradient(135deg, ${accent}22, ${accent2}22)`
                    : "transparent",
                color: activeSection === l ? accent2 : textMuted,
                border: "none",
                padding: "6px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                display: window.innerWidth < 768 ? "none" : "block",
                transition: "all 0.2s",
              }}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => setDark((d) => !d)}
            style={{
              background: surface2,
              border: `1px solid ${border}`,
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: 18,
              marginLeft: 8,
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setMenuOpen((m) => !m)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 22,
              color: text,
              marginLeft: 4,
              display: "block",
            }}
          >
            ☰
          </button>
        </div>
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: 64,
              right: 20,
              background: surface,
              border: `1px solid ${border}`,
              borderRadius: 12,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: 160,
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: text,
                  padding: "8px 16px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="Home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "100px 5% 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="responsive-hero-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: dark
                  ? "rgba(124,58,237,0.15)"
                  : "rgba(124,58,237,0.08)",
                border: `1px solid rgba(124,58,237,0.3)`,
                borderRadius: 100,
                padding: "6px 16px",
                fontSize: 13,
                color: accent,
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              Available for opportunities in India & Singapore
            </div>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 16,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Building Modern
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Full Stack Web
              </span>
              <br />
              Applications
            </h1>
            <div
              style={{
                fontSize: 20,
                color: textMuted,
                marginBottom: 12,
                height: 32,
                fontWeight: 500,
              }}
            >
              <span style={{ color: accent2 }}>{typed}</span>
              <span
                style={{
                  borderRight: "2px solid " + accent,
                  animation: "blink 1s infinite",
                  marginLeft: 2,
                }}
              />
            </div>
            <p
              style={{
                color: textMuted,
                lineHeight: 1.8,
                marginBottom: 36,
                maxWidth: 500,
                fontSize: 16,
              }}
            >
              I develop scalable, responsive, and secure web applications using
              React, Node.js, Express.js, MongoDB, and modern web technologies.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              <button
                onClick={() => scrollTo("Projects")}
                style={{
                  background: `linear-gradient(135deg, ${accent}, #5b21b6)`,
                  color: "#fff",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                View Projects ↗
              </button>
              <a
                href="./Ranjani_Pandiyan_Developer.pdf"
                download
                style={{
                  background: "transparent",
                  color: text,
                  border: `1px solid ${border}`,
                  padding: "14px 28px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                ↓ Download Resume
              </a>
              <button
                onClick={() => scrollTo("Contact")}
                style={{
                  background: dark
                    ? "rgba(6,182,212,0.1)"
                    : "rgba(6,182,212,0.08)",
                  color: accent2,
                  border: `1px solid rgba(6,182,212,0.3)`,
                  padding: "14px 28px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Contact Me
              </button>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                ["GitHub", "https://github.com/RanjaniPandiyan", "#333"],
                [
                  "LinkedIn",
                  "https://www.linkedin.com/in/ranjani-pandiyan",
                  "#0077b5",
                ],

                ["Email", "mailto:ranjanipandiyan2@gmail.com", "#ea4335"],
              ].map(([label, url, col]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  style={{
                    color: textMuted,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 8,
                    background: dark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)",
                    border: `1px solid ${border}`,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = col)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = textMuted)
                  }
                >
                  {label === "GitHub" && "⚡"} {label === "LinkedIn" && "💼"}{" "}
                  {label === "Email" && "✉️"} {label}
                </a>
              ))}
            </div>
          </div>
          <div
            className="responsive-avatar-container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="responsive-avatar-wrapper"
              style={{ position: "relative", width: 380, height: 380 }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: `conic-gradient(from 0deg, ${accent}, ${accent2}, #ec4899, ${accent})`,
                  padding: 3,
                  animation: "spin 8s linear infinite",
                }}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    background: bg,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: "50%",
                  background: dark
                    ? `radial-gradient(circle at 35% 35%, rgba(124,58,237,0.3), rgba(6,182,212,0.15), ${surface})`
                    : `radial-gradient(circle at 35% 35%, rgba(124,58,237,0.15), rgba(6,182,212,0.08), ${surface})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 80 }}>
                  <img
                    src="./dev.png"
                    height="200px"
                    width="200px"
                    style={{ opacity: 0.8 }}
                  ></img>
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk'",
                    fontWeight: 700,
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Ranjani Pandiyan
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: textMuted,
                    textAlign: "center",
                  }}
                >
                  Full Stack Developer
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  {["React", "Node", "MongoDB"].map((t) => (
                    <span
                      key={t}
                      style={{
                        background: `rgba(124,58,237,0.15)`,
                        color: accent,
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Floating badges */}
              {[
                { icon: "⚛️", label: "React", top: "5%", left: "-5%" },
                { icon: "🟢", label: "Node.js", top: "5%", right: "-5%" },
                { icon: "🍃", label: "MongoDB", bottom: "15%", left: "-8%" },
                { icon: "🐘", label: "MySQL", bottom: "15%", right: "-8%" },
              ].map(({ icon, label, ...pos }) => (
                <div
                  className="floating-badge"
                  key={label}
                  style={{
                    position: "absolute",
                    ...pos,
                    background: surface,
                    border: `1px solid ${border}`,
                    borderRadius: 12,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    boxShadow: dark
                      ? "0 8px 32px rgba(0,0,0,0.4)"
                      : "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  {icon} {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ padding: "0 5% 60px", position: "relative", zIndex: 1 }}>
        <div
          className="responsive-stats-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {[
            { val: "1+", label: "Years Experience", icon: "🏆" },
            { val: "3+", label: "Projects Built", icon: "🚀" },
            { val: "MERN", label: "Stack Specialist", icon: "⚡" },
            { val: "B2B", label: "CRM & Dashboards", icon: "💼" },
          ].map(({ val, label, icon }) => (
            <ScrollReveal key={label} delay={100}>
              <div
                style={{ ...glass, padding: "24px 20px", textAlign: "center" }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    fontFamily: "'Space Grotesk'",
                    background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {val}
                </div>
                <div style={{ fontSize: 13, color: textMuted, marginTop: 4 }}>
                  {label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section
        id="About"
        style={{ padding: "80px 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span
                style={{
                  color: accent,
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                About Me
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "'Space Grotesk'",
                }}
              >
                The Developer Behind the Code
              </h2>
            </div>
          </ScrollReveal>
          <div
            className="responsive-about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 60,
              alignItems: "center",
            }}
          >
            <ScrollReveal delay={100}>
              <div style={{ position: "relative" }}>
                <div style={{ ...glass, padding: 32, borderRadius: 20 }}>
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ fontSize: 72, marginBottom: 12 }}>
                      <img
                        src="./dev.png"
                        height="200px"
                        width="200px"
                        style={{ opacity: 0.8 }}
                      ></img>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk'",
                        fontWeight: 700,
                        fontSize: 22,
                        marginBottom: 4,
                      }}
                    >
                      Ranjani Pandiyan
                    </h3>
                    <p
                      style={{ color: accent2, fontWeight: 600, fontSize: 14 }}
                    >
                      Full Stack Web Developer
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {[
                      {
                        icon: "🎓",
                        label: "M.Sc Computer Science  ",
                        sub: "Bharathidasan University",
                      },
                      {
                        icon: "💼",
                        label: "Web Developer",
                        sub: "UK Info Tech · May 2023 – Jan 2024",
                      },
                      {
                        icon: "📍",
                        label: "Location",
                        sub: "India · Open to Singapore",
                      },
                    ].map(({ icon, label, sub }) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: "12px 16px",
                          background: dark
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.03)",
                          borderRadius: 10,
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>
                            {label}
                          </div>
                          <div style={{ color: textMuted, fontSize: 13 }}>
                            {sub}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk'",
                    fontWeight: 700,
                    fontSize: 24,
                    marginBottom: 20,
                  }}
                >
                  Motivated developer crafting{" "}
                  <span style={{ color: accent }}>real-world</span> web
                  solutions
                </h3>
                <p
                  style={{
                    color: textMuted,
                    lineHeight: 1.9,
                    marginBottom: 20,
                    fontSize: 15,
                  }}
                >
                  I'm a Full Stack Web Developer with hands-on experience
                  building production-ready web applications — from e-commerce
                  platforms to CRM systems, recruitment management tools, and
                  admin dashboards.
                </p>
                <p
                  style={{
                    color: textMuted,
                    lineHeight: 1.9,
                    marginBottom: 28,
                    fontSize: 15,
                  }}
                >
                  I completed my Master's in Computer Science at Bharathidasan
                  University and gained real industry experience at UK Info
                  Tech, where I developed PHP/MySQL applications and
                  collaborated with cross-functional teams on client projects.
                </p>
                <div
                  className="responsive-subskills-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 32,
                  }}
                >
                  {[
                    "MERN Stack Development",
                    "RESTful API Design",
                    "JWT & Auth Systems",
                    "Responsive UI Design",
                    "Database Architecture",
                    "Agile Collaboration",
                  ].map((skill) => (
                    <div
                      key={skill}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: textMuted,
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: accent, fontWeight: 700 }}>✓</span>{" "}
                      {skill}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    onClick={() => scrollTo("Projects")}
                    style={{
                      background: `linear-gradient(135deg, ${accent}, #5b21b6)`,
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    View My Work →
                  </button>
                  <button
                    onClick={() => scrollTo("Contact")}
                    style={{
                      background: "transparent",
                      color: accent2,
                      border: `1px solid rgba(6,182,212,0.4)`,
                      padding: "12px 24px",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="Skills"
        style={{
          padding: "80px 5%",
          position: "relative",
          zIndex: 1,
          background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span
                style={{
                  color: accent,
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                Tech Stack
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "'Space Grotesk'",
                }}
              >
                Technologies I Work With
              </h2>
            </div>
          </ScrollReveal>
          {/* Skill category tabs */}
          <ScrollReveal delay={100}>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              {Object.keys(SKILLS).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCat(cat)}
                  style={{
                    background:
                      activeSkillCat === cat
                        ? `linear-gradient(135deg, ${accent}, #5b21b6)`
                        : dark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                    color: activeSkillCat === cat ? "#fff" : textMuted,
                    border:
                      activeSkillCat === cat ? "none" : `1px solid ${border}`,
                    padding: "8px 20px",
                    borderRadius: 100,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 14,
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div style={{ ...glass, padding: "40px", borderRadius: 20 }}>
              <div
                className="responsive-skills-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px 48px",
                }}
              >
                {SKILLS[activeSkillCat].map(({ name, level }, i) => (
                  <div key={name} style={{ animationDelay: `${i * 100}ms` }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: 14 }}>
                        {name}
                      </span>
                      <span
                        style={{
                          color: accent2,
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        {level}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: dark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)",
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${level}%`,
                          background: `linear-gradient(90deg, ${accent}, ${accent2})`,
                          borderRadius: 100,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          {/* Tech logos grid */}
          <ScrollReveal delay={200}>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              {[
                "React JS",
                "Node.js",
                "Express.js",
                "MongoDB",
                "MySQL",
                "PHP",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Bootstrap",
                "Git",
                "JWT",
                "VS Code",
                "Postman",
              ].map((tech) => (
                <div
                  key={tech}
                  style={{
                    ...glass,
                    padding: "10px 18px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: textMuted,
                    borderRadius: 100,
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = text;
                    e.currentTarget.style.borderColor = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = textMuted;
                    e.currentTarget.style.borderColor = border;
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="Projects"
        style={{ padding: "80px 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span
                style={{
                  color: accent,
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                Portfolio
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "'Space Grotesk'",
                }}
              >
                Featured Projects
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              {["All", "MERN", "Full Stack", "PHP"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterCat(f)}
                  style={{
                    background:
                      filterCat === f
                        ? `linear-gradient(135deg, ${accent}, #5b21b6)`
                        : "transparent",
                    color: filterCat === f ? "#fff" : textMuted,
                    border: `1px solid ${filterCat === f ? "transparent" : border}`,
                    padding: "8px 20px",
                    borderRadius: 100,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <div
            className="responsive-projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: 24,
            }}
          >
            {filteredProjects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100}>
                <div
                  style={{
                    ...glass,
                    padding: 0,
                    overflow: "hidden",
                    borderRadius: 20,
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = dark
                      ? `0 24px 60px rgba(124,58,237,0.2)`
                      : `0 24px 60px rgba(0,0,0,0.12)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Project header banner */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}33, ${p.accent}11)`,
                      padding: "32px 28px 24px",
                      borderBottom: `1px solid ${border}`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        fontSize: 100,
                        opacity: 0.06,
                      }}
                    >
                      {p.icon}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ fontSize: 36 }}>{p.icon}</div>
                      <span
                        style={{
                          background: `${p.accent}22`,
                          color: p.accent,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 12px",
                          borderRadius: 100,
                          border: `1px solid ${p.accent}44`,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        {p.category}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk'",
                        fontWeight: 700,
                        fontSize: 20,
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        color: textMuted,
                        fontSize: 14,
                        lineHeight: 1.7,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                  <div style={{ padding: "20px 28px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginBottom: 20,
                      }}
                    >
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: dark
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.05)",
                            color: textMuted,
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 6,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 20,
                      }}
                    >
                      {p.features.map((f) => (
                        <div
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            color: textMuted,
                          }}
                        >
                          <span style={{ color: accent }}>✓</span> {f}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <a
                        href={p.live}
                        style={{
                          flex: 1,
                          background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`,
                          color: "#fff",
                          border: "none",
                          padding: "10px 0",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: 13,
                          textAlign: "center",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        Live Demo ↗
                      </a>
                      <a
                        href={p.github_frontend}
                        style={{
                          flex: 1,
                          background: "transparent",
                          color: textMuted,
                          border: `1px solid ${border}`,
                          padding: "10px 0",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: 13,
                          textAlign: "center",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        GitHub ⚡
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="Experience"
        style={{
          padding: "80px 5%",
          position: "relative",
          zIndex: 1,
          background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span
                style={{
                  color: accent,
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                Career
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "'Space Grotesk'",
                }}
              >
                Work Experience
              </h2>
            </div>
          </ScrollReveal>
          <div
            className="responsive-experience-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
              alignItems: "start",
            }}
          >
            <ScrollReveal delay={100}>
              <div
                style={{
                  position: "relative",
                  paddingLeft: 32,
                  borderLeft: `2px solid ${accent}44`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: -8,
                    top: 0,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                    boxShadow: `0 0 20px ${accent}66`,
                  }}
                />
                <div style={{ ...glass, padding: 28, borderRadius: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Space Grotesk'",
                          fontWeight: 700,
                          fontSize: 20,
                          marginBottom: 4,
                        }}
                      >
                        Web Developer
                      </h3>
                      <p
                        style={{
                          color: accent2,
                          fontWeight: 600,
                          fontSize: 15,
                        }}
                      >
                        UK Info Tech · Pudukkottai
                      </p>
                    </div>
                    <span
                      style={{
                        background: `${accent}22`,
                        color: accent,
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "6px 14px",
                        borderRadius: 100,
                        border: `1px solid ${accent}33`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      May 2023 – Jan 2024
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[
                      "Developed PHP and MySQL web applications for various clients",
                      "Built and maintained CRM (Customer Relationship Management) systems",
                      "Developed Recruitment Management Systems end-to-end",
                      "Created responsive admin dashboards with analytics modules",
                      "Collaborated with cross-functional teams on project delivery",
                    ].map((r) => (
                      <div
                        key={r}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                          fontSize: 14,
                          color: textMuted,
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{ color: accent, marginTop: 3, flexShrink: 0 }}
                        >
                          ▸
                        </span>{" "}
                        {r}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginTop: 16,
                    }}
                  >
                    {[
                      "PHP",
                      "MySQL",
                      "JavaScript",
                      "CSS3",
                      "CRM",
                      "Admin Dashboard",
                    ].map((t) => (
                      <span
                        key={t}
                        style={{
                          background: dark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.05)",
                          color: textMuted,
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk'",
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 8,
                  }}
                >
                  Education
                </h3>
                {[
                  {
                    degree: "M.Sc Computer Science",
                    school: "Bharathidasan University",
                    type: "Master's Degree with A+ Grade",
                    icon: "🎓",
                  },
                ].map((edu) => (
                  <div
                    key={edu.degree}
                    style={{
                      ...glass,
                      padding: 24,
                      borderRadius: 16,
                      display: "flex",
                      gap: 16,
                    }}
                  >
                    <div style={{ fontSize: 36 }}>{edu.icon}</div>
                    <div>
                      <h4
                        style={{
                          fontWeight: 700,
                          fontSize: 17,
                          marginBottom: 4,
                        }}
                      >
                        {edu.degree}
                      </h4>
                      <p
                        style={{
                          color: accent2,
                          fontWeight: 600,
                          fontSize: 14,
                          marginBottom: 4,
                        }}
                      >
                        {edu.school}
                      </p>
                      <span
                        style={{
                          background: `${accent}22`,
                          color: accent,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 100,
                        }}
                      >
                        {edu.type}
                      </span>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    ...glass,
                    padding: 24,
                    borderRadius: 16,
                    marginTop: 8,
                  }}
                >
                  <h4
                    style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}
                  >
                    Soft Skills
                  </h4>
                  <div
                    className="responsive-softskills-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    }}
                  >
                    {[
                      "Fast Learner",
                      "Problem Solver",
                      "Team Player",
                      "Good Communication",
                    ].map((s) => (
                      <div
                        key={s}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 14,
                          color: textMuted,
                        }}
                      >
                        <span style={{ color: accent, fontSize: 16 }}>⚡</span>{" "}
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY HIRE ME */}
      <section style={{ padding: "80px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span
                style={{
                  color: accent,
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                Value Proposition
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "'Space Grotesk'",
                }}
              >
                Why Hire Me?
              </h2>
            </div>
          </ScrollReveal>
          <div
            className="responsive-value-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {[
              {
                icon: "🏭",
                title: "Real Industry Experience",
                desc: "Hands-on experience at UK Info Tech building production web apps, CRM systems, and recruitment management tools.",
              },
              {
                icon: "⚡",
                title: "Full Stack Capability",
                desc: "End-to-end development from React front-ends to Node.js/Express APIs and MongoDB/MySQL databases.",
              },
              {
                icon: "🔐",
                title: "Security Best Practices",
                desc: "JWT authentication, Role-Based Access Control, and secure API development are second nature to me.",
              },
              {
                icon: "📱",
                title: "Responsive Design",
                desc: "Every application I build works beautifully across desktop, tablet, and mobile devices.",
              },
              {
                icon: "🚀",
                title: "Fast Learner",
                desc: "I quickly adapt to new technologies, frameworks, and team workflows to deliver value from day one.",
              },
              {
                icon: "🤝",
                title: "Team Player",
                desc: "Strong communication and collaboration skills, experienced working in cross-functional development teams.",
              },
            ].map(({ icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div
                  style={{
                    ...glass,
                    padding: 28,
                    borderRadius: 16,
                    height: "100%",
                    transition: "all 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}66`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = border;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
                  <h3
                    style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{ color: textMuted, fontSize: 14, lineHeight: 1.7 }}
                  >
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="Contact"
        style={{
          padding: "80px 5% 100px",
          position: "relative",
          zIndex: 1,
          background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span
                style={{
                  color: accent,
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                Get In Touch
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "'Space Grotesk'",
                }}
              >
                Let's Work Together
              </h2>
              <p
                style={{
                  color: textMuted,
                  maxWidth: 500,
                  margin: "12px auto 0",
                  lineHeight: 1.8,
                }}
              >
                I'm open to full-time opportunities, contract work, and
                freelance projects in India and Singapore.
              </p>
            </div>
          </ScrollReveal>
          <div
            className="responsive-contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 40,
            }}
          >
            <ScrollReveal delay={100}>
              <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
                {[
                  {
                    icon: "✉️",
                    label: "Email",
                    val: "ranjanipandiyan2@gmail.com",
                    color: "#ea4335",
                    href: "mailto:ranjanipandiyan2@gmail.com",
                  },
                  {
                    icon: "💼",
                    label: "LinkedIn",
                    val: "linkedin.com/in/ranjani-pandiyan",
                    color: "#0077b5",
                    href: "https://www.linkedin.com/in/ranjani-pandiyan/",
                  },
                  {
                    icon: "⚡",
                    label: "GitHub",
                    val: "github.com/RanjaniPandiyan",
                    color: "#6e5494",
                    href: "https://github.com/RanjaniPandiyan/",
                  },
                ].map(({ icon, label, val, color, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      ...glass,
                      padding: "18px 22px",
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      textDecoration: "none",
                      color: text,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${color}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = border;
                    }}
                  >
                    <div
                      style={{
                        fontSize: 28,
                        width: 48,
                        height: 48,
                        background: `${color}18`,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: textMuted,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: dark ? "#070710" : "#1a1a2e",
          color: "#888",
          padding: "48px 5% 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="responsive-footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: 40,
              marginBottom: 40,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk'",
                  fontWeight: 800,
                  fontSize: 24,
                  background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 12,
                }}
              >
                Ranjani Pandiyan
              </div>
              <p style={{ lineHeight: 1.8, maxWidth: 320, fontSize: 14 }}>
                Full Stack Web Developer building scalable, secure, and
                responsive web applications with the MERN stack.
              </p>
            </div>
            <div>
              <h4
                style={{
                  color: "#ccc",
                  fontWeight: 700,
                  marginBottom: 16,
                  fontSize: 14,
                }}
              >
                Quick Links
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {NAV_LINKS.map((l) => (
                  <button
                    key={l}
                    onClick={() => scrollTo(l)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#666",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: 14,
                      padding: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ccc")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4
                style={{
                  color: "#ccc",
                  fontWeight: 700,
                  marginBottom: 16,
                  fontSize: 14,
                }}
              >
                Connect
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[
                  ["GitHub", "https://github.com/RanjaniPandiyan"],
                  ["LinkedIn", "https://www.linkedin.com/in/ranjani-pandiyan"],
                  ["Email", "mailto:ranjanipandiyan2@gmail.com"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    style={{
                      color: "#666",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ccc")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{ fontSize: 13 }}>
              © 2024 Ranjani Pandiyan. All rights reserved.
            </p>
            <p style={{ fontSize: 13 }}>
              Full Stack Developer · India 🇮🇳 · Open to Singapore 🇸🇬
            </p>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            border: "none",
            color: "#fff",
            fontSize: 20,
            cursor: "pointer",
            zIndex: 200,
            boxShadow: `0 8px 24px ${accent}66`,
          }}
        >
          ↑
        </button>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${accent}66; border-radius: 100px; }
        input::placeholder, textarea::placeholder { color: ${textMuted}; }
        
        /* Universal Responsive Fallback for section layouts */
        @media (max-width: 991px) {
          .responsive-hero-grid,
          .responsive-about-grid,
          .responsive-experience-grid,
          .responsive-contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .responsive-value-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .responsive-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .responsive-footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
          }
          .responsive-hero-grid {
            padding-top: 40px !important;
            text-align: center;
          }
          .responsive-hero-grid p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .responsive-hero-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .responsive-avatar-container {
            order: -1 !important; /* Move avatar above hero text on small mobile screens */
            margin-bottom: 20px;
          }
          .responsive-avatar-wrapper {
            width: 280px !important;
            height: 280px !important;
          }
          .responsive-avatar-wrapper div[style*="font-size: 80"] {
            font-size: 50px !important;
          }
          .floating-badge {
            display: none !important; /* Hide overlay absolute items that cause horizontal overflow on small displays */
          }
          .responsive-stats-grid,
          .responsive-value-grid,
          .responsive-skills-grid,
          .responsive-subskills-grid,
          .responsive-footer-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

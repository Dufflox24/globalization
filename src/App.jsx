import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HeroScene, IFINetworkScene, TimelineScene, AttributesScene } from './ThreeScenes'
import './index.css'

// ===== ANIMATION VARIANTS =====
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
}
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
}

// Animated section wrapper
function AnimSection({ children, className, id }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, amount: 0.1 })
    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {children}
        </motion.div>
    )
}

// ===== NAVBAR =====
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none' }}>
            <div className="nav-logo">GlobalCorp</div>
            <ul className="nav-links">
                <li><a onClick={() => scrollTo('ifi')}>IFI Role</a></li>
                <li><a onClick={() => scrollTo('history')}>History</a></li>
                <li><a onClick={() => scrollTo('attributes')}>Attributes</a></li>
            </ul>
        </nav>
    )
}

// ===== HERO =====
function Hero() {
    return (
        <section className="hero">
            <div className="hero-canvas">
                <HeroScene />
            </div>
            <div className="hero-content">
                <motion.div {...{ initial: 'hidden', animate: 'visible', variants: stagger }}>
                    <motion.div variants={fadeUp} className="hero-badge">
                        Market Integration
                    </motion.div>
                    <motion.h1 variants={fadeUp} className="hero-title">
                        <span className="line1">The Rise of the</span>
                        <span className="line2">Global Corporation</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="hero-subtitle">
                        Explore the forces, history, and corporate structures that shaped the hyper-connected modern economy — from IFIs to the stateless giants of today.
                    </motion.p>
                    <motion.a variants={fadeUp} className="hero-cta" onClick={() => document.getElementById('ifi')?.scrollIntoView({ behavior: 'smooth' })} href="#">
                        Explore the Story ↓
                    </motion.a>
                </motion.div>
            </div>
            <div className="scroll-indicator">
                <div className="scroll-line" />
                <span>Scroll</span>
            </div>
        </section>
    )
}

// ===== STATS BAR =====
function StatsBar() {
    const stats = [
        { num: '195+', label: 'Countries in Global Market' },
        { num: '$100T+', label: 'World GDP (2023)' },
        { num: '~80%', label: 'Trade via Global Corporations' },
        { num: '3', label: 'Major IFI Pillars' },
        { num: '4', label: 'Defining Eras (20th Century)' },
    ]
    return (
        <div className="stats-bar">
            <div className="stats-inner">
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                        <div className="stat-item-num">{s.num}</div>
                        <div className="stat-item-label">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

// ===== IFI SECTION =====
function IFISection() {
    const cards = [
        {
            icon: '📊',
            color: 'rgba(245,158,11,0.15)',
            iconBg: 'rgba(245,158,11,0.2)',
            title: 'Promoting Economic Stability',
            text: 'The IMF monitors global economic trends and exchange rates, providing short-term loans to countries in balance-of-payment crises — preventing financial contagion from spreading across borders.'
        },
        {
            icon: '🏗️',
            color: 'rgba(59,130,246,0.15)',
            iconBg: 'rgba(59,130,246,0.2)',
            title: 'Funding Development',
            text: 'The World Bank and regional banks like the Asian Development Bank provide long-term loans and grants for infrastructure, education, and health — building the foundations needed for trade integration.'
        },
        {
            icon: '🔓',
            color: 'rgba(16,185,129,0.15)',
            iconBg: 'rgba(16,185,129,0.2)',
            title: 'Reducing Trade Barriers',
            text: 'IFIs champion trade liberalization — removing tariffs and quotas through "Structural Adjustment Programs," weaving isolated national economies into a single global fabric of commerce.'
        },
        {
            icon: '📜',
            color: 'rgba(139,92,246,0.15)',
            iconBg: 'rgba(139,92,246,0.2)',
            title: 'Establishing Rules of the Game',
            text: 'By creating a shared framework of rules and international standards, IFIs reduce risk for global investors and encourage capital to flow freely across borders, lubricating the global market engine.'
        },
    ]

    return (
        <div className="section-full ifi-section" id="ifi">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 01</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">
                        International Financial <span>Institutions</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">
                        IFIs serve as the <strong style={{ color: 'var(--text-primary)' }}>"architects" and "stabilizers"</strong> of the global economy — ensuring the market system functions smoothly, especially during times of crisis.
                    </motion.p>
                </AnimSection>

                <motion.div
                    className="ifi-network-canvas"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <IFINetworkScene />
                </motion.div>

                <motion.div
                    className="ifi-cards"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {cards.map((c, i) => (
                        <motion.div key={i} variants={fadeUp} className="ifi-card" style={{ background: `linear-gradient(135deg, ${c.color} 0%, var(--bg-card) 100%)` }}>
                            <div className="ifi-card-icon" style={{ background: c.iconBg }}>{c.icon}</div>
                            <div className="ifi-card-title">{c.title}</div>
                            <div className="ifi-card-text">{c.text}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

// ===== HISTORY SECTION =====
function HistorySection() {
    const eras = [
        {
            period: '1900 – 1914',
            color: '#f59e0b',
            colorLight: 'rgba(245,158,11,0.2)',
            heading: 'The Pre-War "Golden Age"',
            text: 'Powered by steam engines and the telegraph, anchored by the Gold Standard, the century opened with high levels of market integration. Colonial empires traded efficiently within their vast networks, and capital flowed across borders with surprising freedom.'
        },
        {
            period: '1914 – 1945',
            color: '#ef4444',
            colorLight: 'rgba(239,68,68,0.2)',
            heading: 'The Great Disintegration',
            text: 'Two World Wars and the Great Depression shattered the global economy. Nations turned inward with protectionist policies and soaring tariffs. Currencies fluctuated wildly, global trade plummeted, and the world fragmented into isolated economic islands.'
        },
        {
            period: '1945 – 1970s',
            color: '#3b82f6',
            colorLight: 'rgba(59,130,246,0.2)',
            heading: 'The Bretton Woods Era',
            text: 'Allied nations rebuilt at Bretton Woods, creating the IMF and World Bank to prevent another Depression. The GATT agreement gradually lowered trade barriers. This era of "managed openness" saw commerce grow while governments still tightly controlled global finance.'
        },
        {
            period: '1980s – 1990s',
            color: '#10b981',
            colorLight: 'rgba(16,185,129,0.2)',
            heading: 'The Neoliberal Turn & Hyper-Globalization',
            text: 'Deregulation and free markets took center stage (Reagan / Thatcher era). The Soviet collapse in 1991 opened the entire world to capitalism. Containerized shipping and the internet allowed supply chains to be sliced up and spread across the globe, creating true hyper-globalization.'
        },
    ]

    return (
        <div className="section-full timeline-section" id="history">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 02</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">
                        A Short History of <span>Global Integration</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">
                        The 20th century was a volatile era — the global market shattered, then painstakingly rebuilt itself into a hyper-connected system across four distinct eras.
                    </motion.p>
                </AnimSection>

                <motion.div
                    className="timeline-canvas"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <TimelineScene />
                </motion.div>

                <div className="timeline">
                    {eras.map((era, i) => (
                        <motion.div
                            key={i}
                            className="timeline-item"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <div className="timeline-dot" style={{ borderColor: era.color, background: era.colorLight }} />
                            <div className="timeline-era" style={{ color: era.color }}>{era.period}</div>
                            <div className="timeline-title">{era.heading}</div>
                            <div className="timeline-text">{era.text}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ===== ATTRIBUTES SECTION =====
function AttributesSection() {
    const attrs = [
        {
            num: '01',
            tag: 'Supply Chain',
            tagColor: '#3b82f6',
            tagBg: 'rgba(59,130,246,0.15)',
            barColor: '#3b82f6',
            title: 'Global Supply Chain',
            text: 'They do not just sell globally — they make globally. A product\'s components may be sourced from ten different countries based on where materials are cheapest or highest quality, optimizing every link of the manufacturing chain.'
        },
        {
            num: '02',
            tag: 'Identity',
            tagColor: '#8b5cf6',
            tagBg: 'rgba(139,92,246,0.15)',
            barColor: '#8b5cf6',
            title: 'Borderless Identity',
            text: 'While they maintain a legal headquarters, global corporations consider themselves "stateless." They list stock on multiple exchanges and move profits to jurisdictions with the most favorable tax laws — owing loyalty to no single nation.'
        },
        {
            num: '03',
            tag: 'Branding',
            tagColor: '#f59e0b',
            tagBg: 'rgba(245,158,11,0.15)',
            barColor: '#f59e0b',
            title: 'Standardized Marketing',
            text: 'Unlike multidomestic companies that adapt products per culture, global corporations push a standardized brand identity worldwide. An iPhone or a can of Coca-Cola is largely the same whether bought in Manila, Munich, or Mumbai.'
        },
        {
            num: '04',
            tag: 'Scale',
            tagColor: '#10b981',
            tagBg: 'rgba(16,185,129,0.15)',
            barColor: '#10b981',
            title: 'Economies of Scale',
            text: 'By producing in massive quantities, cost per unit drops dramatically, making it nearly impossible for smaller local competitors to match their prices. This structural advantage becomes a formidable barrier to market entry.'
        },
        {
            num: '05',
            tag: 'Talent',
            tagColor: '#06b6d4',
            tagBg: 'rgba(6,182,212,0.15)',
            barColor: '#06b6d4',
            title: 'Integration of Talent',
            text: 'They recruit from the global talent pool. A CEO may be from one continent, the CFO from another, and R&D located in a third. The best minds in the world are sought out regardless of nationality or geography.'
        },
    ]

    return (
        <div className="section-full attributes-section" id="attributes">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 03</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">
                        Attributes of a <span>Global Corporation</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">
                        Unlike a standard multinational, the global corporation views the entire world as a single market — defined by five key attributes that set it apart from regional or domestic competitors.
                    </motion.p>
                </AnimSection>

                <motion.div
                    className="attributes-canvas"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <AttributesScene />
                </motion.div>

                <motion.div
                    className="attributes-grid"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {attrs.map((a, i) => (
                        <motion.div key={i} variants={fadeUp} className="attribute-card"
                            style={{ '--bar-color': a.barColor }}
                            whileHover={{ borderColor: a.barColor, boxShadow: `0 0 30px ${a.barColor}33` }}
                        >
                            <div className="attribute-number" style={{ color: a.barColor }}>{a.num}</div>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${a.barColor}, transparent)`, borderRadius: '24px 24px 0 0' }} />
                            <div className="attribute-tag" style={{ color: a.tagColor, background: a.tagBg }}>{a.tag}</div>
                            <div className="attribute-title">{a.title}</div>
                            <div className="attribute-text">{a.text}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

// ===== FOOTER =====
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">GlobalCorp</div>
            <p className="footer-text">
                Market Integration: The Rise of the Global Corporation<br />
                An interactive educational resource on 20th-century economic globalization.
            </p>
        </footer>
    )
}

// ===== MAIN APP =====
export default function App() {
    return (
        <>
            <div className="animated-bg" />
            <Navbar />
            <main>
                <Hero />
                <StatsBar />
                <div className="divider" />
                <IFISection />
                <div className="divider" />
                <HistorySection />
                <div className="divider" />
                <AttributesSection />
            </main>
            <Footer />
        </>
    )
}

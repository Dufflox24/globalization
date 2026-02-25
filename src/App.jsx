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

function AnimSection({ children, className, id }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, amount: 0.1 })
    return (
        <motion.div ref={ref} id={id} className={className}
            variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
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
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    return (
        <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none' }}>
            <div className="nav-logo">GlobalCorp</div>
            <ul className="nav-links">
                <li><a onClick={() => scrollTo('ifi')}>IFI Role</a></li>
                <li><a onClick={() => scrollTo('history')}>History</a></li>
                <li><a onClick={() => scrollTo('corp-types')}>Corp Types</a></li>
                <li><a onClick={() => scrollTo('drivers')}>Drivers</a></li>
                <li><a onClick={() => scrollTo('benefits')}>Benefits</a></li>
                <li><a onClick={() => scrollTo('digital')}>Digital</a></li>
                <li><a onClick={() => scrollTo('future')}>Future</a></li>
            </ul>
        </nav>
    )
}

// ===== HERO =====
function Hero() {
    return (
        <section className="hero">
            <div className="hero-canvas"><HeroScene /></div>
            <div className="hero-content">
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.div variants={fadeUp} className="hero-badge">Market Integration</motion.div>
                    <motion.h1 variants={fadeUp} className="hero-title">
                        <span className="line1">The Rise of the</span>
                        <span className="line2">Global Corporation</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="hero-subtitle">
                        Explore the forces, history, and corporate structures that shaped the hyper-connected modern economy — from IFIs to the digital giants of today.
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

// ===== PART 01: IFI SECTION =====
function IFISection() {
    const cards = [
        { icon: '📊', color: 'rgba(245,158,11,0.15)', iconBg: 'rgba(245,158,11,0.2)', title: 'Promoting Economic Stability', text: 'The IMF monitors global economic trends and exchange rates, providing short-term loans to countries facing balance-of-payment crises to prevent financial contagion from spreading.' },
        { icon: '🏗️', color: 'rgba(59,130,246,0.15)', iconBg: 'rgba(59,130,246,0.2)', title: 'Funding Development', text: 'The World Bank and regional banks like the ADB provide long-term loans and grants for infrastructure, education, and health — building the foundations nations need for global trade.' },
        { icon: '🔓', color: 'rgba(16,185,129,0.15)', iconBg: 'rgba(16,185,129,0.2)', title: 'Reducing Trade Barriers', text: 'IFIs champion trade liberalization through "Structural Adjustment Programs," removing tariffs and quotas to weave isolated national economies into a single global fabric.' },
        { icon: '📜', color: 'rgba(139,92,246,0.15)', iconBg: 'rgba(139,92,246,0.2)', title: 'Establishing Rules of the Game', text: 'By creating shared frameworks of rules and international standards, IFIs reduce risk for global investors and encourage capital to flow freely across borders.' },
    ]
    return (
        <div className="section-full ifi-section" id="ifi">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 01</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">International Financial <span>Institutions</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">IFIs serve as the <strong style={{ color: 'var(--text-primary)' }}>"architects" and "stabilizers"</strong> of the global economy, ensuring the market system functions smoothly especially during crises.</motion.p>
                </AnimSection>
                <motion.div className="ifi-network-canvas" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                    <IFINetworkScene />
                </motion.div>
                <motion.div className="ifi-cards" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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

// ===== PART 02: HISTORY =====
function HistorySection() {
    const eras = [
        { period: '1900–1914', color: '#f59e0b', colorLight: 'rgba(245,158,11,0.2)', heading: 'The Pre-War "Golden Age"', text: 'Powered by steam engines and the telegraph, and anchored by the Gold Standard, trade flourished and colonial empires traded efficiently within their vast networks.' },
        { period: '1914–1945', color: '#ef4444', colorLight: 'rgba(239,68,68,0.2)', heading: 'The Great Disintegration', text: 'Two World Wars and the Great Depression forced nations inward with protectionist tariffs. Global trade plummeted and the world fragmented into isolated economic islands.' },
        { period: '1945–1970s', color: '#3b82f6', colorLight: 'rgba(59,130,246,0.2)', heading: 'The Bretton Woods Era', text: 'Allied nations created the IMF and World Bank to prevent another Depression, and signed GATT to lower trade barriers — an era of "managed openness" with controlled finance.' },
        { period: '1980s–1990s', color: '#10b981', colorLight: 'rgba(16,185,129,0.2)', heading: 'The Neoliberal Turn & Hyper-Globalization', text: 'Free-market deregulation (Reagan/Thatcher), the Soviet collapse in 1991, containerized shipping, and the internet allowed supply chains to span the entire globe.' },
    ]
    return (
        <div className="section-full timeline-section" id="history">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 02</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">A Short History of <span>Global Integration</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">The 20th century was a volatile era — the global market shattered, then painstakingly rebuilt itself into a hyper-connected system across four distinct eras.</motion.p>
                </AnimSection>
                <motion.div className="timeline-canvas" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
                    <TimelineScene />
                </motion.div>
                <div className="timeline">
                    {eras.map((era, i) => (
                        <motion.div key={i} className="timeline-item" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}>
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

// ===== PART 03: ATTRIBUTES =====
function AttributesSection() {
    const attrs = [
        { num: '01', tag: 'Supply Chain', tagColor: '#3b82f6', tagBg: 'rgba(59,130,246,0.15)', barColor: '#3b82f6', title: 'Global Supply Chain', text: 'They don\'t just sell globally — they make globally. Components may be sourced from ten different countries based on where materials are cheapest or highest quality.' },
        { num: '02', tag: 'Identity', tagColor: '#8b5cf6', tagBg: 'rgba(139,92,246,0.15)', barColor: '#8b5cf6', title: 'Borderless Identity', text: 'While maintaining a legal headquarters, global corporations consider themselves "stateless," listing stock on multiple exchanges and moving profits to favorable tax jurisdictions.' },
        { num: '03', tag: 'Branding', tagColor: '#f59e0b', tagBg: 'rgba(245,158,11,0.15)', barColor: '#f59e0b', title: 'Standardized Marketing', text: 'Unlike multidomestic companies, global corporations push a standardized brand identity worldwide — an iPhone or Coca-Cola is largely the same whether bought in Manila or Munich.' },
        { num: '04', tag: 'Scale', tagColor: '#10b981', tagBg: 'rgba(16,185,129,0.15)', barColor: '#10b981', title: 'Economies of Scale', text: 'By producing in massive quantities, cost per unit drops dramatically, making it nearly impossible for smaller local competitors to match their prices.' },
        { num: '05', tag: 'Talent', tagColor: '#06b6d4', tagBg: 'rgba(6,182,212,0.15)', barColor: '#06b6d4', title: 'Integration of Talent', text: 'They recruit from the global talent pool — a CEO from one continent, a CFO from another, and R&D located in a third, seeking the best minds regardless of geography.' },
    ]
    return (
        <div className="section-full attributes-section" id="attributes">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 03</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Attributes of a <span>Global Corporation</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">Unlike a standard multinational, the global corporation views the entire world as a single market — defined by five key attributes.</motion.p>
                </AnimSection>
                <motion.div className="attributes-canvas" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                    <AttributesScene />
                </motion.div>
                <motion.div className="attributes-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {attrs.map((a, i) => (
                        <motion.div key={i} variants={fadeUp} className="attribute-card" whileHover={{ borderColor: a.barColor, boxShadow: `0 0 30px ${a.barColor}33` }}>
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

// ===== PART 04: CORP TYPES =====
function CorpTypesSection() {
    const types = [
        {
            abbr: 'MNC', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', iconBg: 'rgba(59,130,246,0.2)', icon: '🏢',
            full: 'Multinational Corporation',
            text: 'A company based in one country that actively operates and earns revenue in one or more other countries through foreign subsidiaries or branches.',
            example: 'McDonald\'s Corporation', exampleDetail: 'Main office in the USA, but branches worldwide.'
        },
        {
            abbr: 'TNC', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', iconBg: 'rgba(139,92,246,0.2)', icon: '🌐',
            full: 'Transnational Corporation',
            text: 'Business enterprises that manage production or deliver services in more than one country, holding assets and operating facilities outside their home country.',
            example: 'Unilever', exampleDetail: 'Operates worldwide and adjusts products based on each country.'
        },
        {
            abbr: 'GC', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', iconBg: 'rgba(6,182,212,0.2)', icon: '🌍',
            full: 'Global Corporation',
            text: 'A large company that operates and does business in many countries around the world, treating the entire planet as a single unified market.',
            example: 'Coca-Cola Company', exampleDetail: 'Sells drinks in almost every country with a standardized brand.'
        },
    ]
    return (
        <div className="section-full corp-types-section" id="corp-types">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 04</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Types of <span>Global Business</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">Understanding the difference between domestic, multinational, transnational, and global corporations is key to analyzing how businesses expand internationally.</motion.p>
                </AnimSection>
                <motion.div className="corp-types-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {types.map((t, i) => (
                        <motion.div key={i} variants={fadeUp} className="corp-type-card"
                            style={{ background: `linear-gradient(135deg, ${t.bg} 0%, var(--bg-card) 100%)`, borderColor: `${t.color}40` }}
                            whileHover={{ borderColor: t.color, boxShadow: `0 0 30px ${t.color}33` }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${t.color}, transparent)`, borderRadius: '24px 24px 0 0' }} />
                            <div className="corp-type-header">
                                <div className="corp-type-icon" style={{ background: t.iconBg }}>{t.icon}</div>
                                <div>
                                    <div className="corp-type-name" style={{ color: t.color }}>{t.abbr}</div>
                                </div>
                            </div>
                            <div className="corp-type-full">{t.full}</div>
                            <div className="corp-type-text">{t.text}</div>
                            <div className="corp-type-example">
                                <span>📌</span>
                                <span><strong>{t.example}</strong> — {t.exampleDetail}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

// ===== PART 05: DRIVERS =====
function DriversSection() {
    const drivers = [
        {
            icon: '🌐', color: '#06b6d4', title: 'Technological Advancements',
            text: 'The internet, mobile phones, and faster transportation make global business easier and faster, eliminating traditional barriers of distance and communication.',
            example: 'Online platforms like Amazon allow people to buy products from other countries instantly.',
            exColor: '#06b6d4'
        },
        {
            icon: '🔗', color: '#3b82f6', title: 'Global Supply Chains',
            text: 'Global supply chains integrate world markets by distributing production across countries to reduce costs, increase efficiency, and connect economies.',
            example: 'A single smartphone may have components from over 40 countries before reaching the consumer.',
            exColor: '#3b82f6'
        },
        {
            icon: '🤝', color: '#10b981', title: 'Free Trade Agreements',
            text: 'Treaties between two or more countries that reduce or eliminate trade barriers such as tariffs, quotas, and import restrictions to promote the free flow of goods and services.',
            example: 'ASEAN Free Trade Area (AFTA) connects Southeast Asian markets with reduced tariffs.',
            exColor: '#10b981'
        },
    ]
    return (
        <div className="section-full drivers-section" id="drivers">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 05</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Drivers of <span>Market Integration</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">Three fundamental forces have accelerated the integration of global markets, transforming how goods, services, and capital move across borders.</motion.p>
                </AnimSection>
                <motion.div className="drivers-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {drivers.map((d, i) => (
                        <motion.div key={i} variants={fadeUp} className="driver-card"
                            whileHover={{ borderColor: d.color, boxShadow: `0 0 30px ${d.color}33` }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${d.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
                            <span className="driver-icon">{d.icon}</span>
                            <div className="driver-title" style={{ color: d.color }}>{d.title}</div>
                            <div className="driver-text">{d.text}</div>
                            <div className="driver-example" style={{ borderColor: d.exColor, color: '#64748b' }}>
                                <strong style={{ color: 'var(--text-secondary)' }}>Example:</strong> {d.example}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

// ===== PART 06: BENEFITS =====
function BenefitsSection() {
    const benefits = [
        {
            icon: '💼', color: '#10b981', iconBg: 'rgba(16,185,129,0.2)',
            title: 'Job Creation',
            text: 'Global corporations create employment by establishing factories, offices, and service centers worldwide, ranging from manufacturing to management and technical roles.',
            bullets: ['BPO companies in the Philippines employ thousands of call center agents.', 'Electronics manufacturers in Southeast Asia provide factory jobs for local workers.', 'Automotive plants in Thailand and Mexico employ skilled technicians and engineers.']
        },
        {
            icon: '⚙️', color: '#3b82f6', iconBg: 'rgba(59,130,246,0.2)',
            title: 'Technology Transfer',
            text: 'When global corporations invest abroad, they bring advanced technology and expertise. Local workers gain new skills and domestic industries learn modern production methods.',
            bullets: ['Semiconductor companies in Taiwan sharing chip manufacturing techniques.', 'International fast-food chains introducing efficient food safety and logistics systems.', 'Renewable energy firms bringing solar and wind technologies to developing countries.']
        },
        {
            icon: '🏷️', color: '#f59e0b', iconBg: 'rgba(245,158,11,0.2)',
            title: 'Lower Prices for Consumers',
            text: 'Global corporations reduce costs through mass production, global sourcing, and efficient supply chains, passing savings on to consumers through lower prices and more choices.',
            bullets: ['Affordable smartphones produced through global supply chains.', 'Clothing brands manufacturing in multiple countries to keep prices low.', 'Large retail chains offering competitively priced household goods.']
        },
        {
            icon: '📈', color: '#8b5cf6', iconBg: 'rgba(139,92,246,0.2)',
            title: 'Economic Growth',
            text: 'Foreign investments from global corporations stimulate economic activity by increasing production, exports, and tax revenues, while also supporting local suppliers.',
            bullets: ['Export growth from electronics manufacturing in the Philippines.', 'Infrastructure improvements near industrial zones funded by foreign investors.', 'Growth of local businesses supplying materials to multinational companies.']
        },
    ]
    return (
        <div className="section-full benefits-section" id="benefits">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 06</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Benefits of <span>Global Corporations</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">Global corporations bring significant economic and social advantages to both their home countries and the nations where they operate.</motion.p>
                </AnimSection>
                <motion.div className="benefit-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {benefits.map((b, i) => (
                        <motion.div key={i} variants={fadeUp} className="benefit-card"
                            whileHover={{ borderColor: b.color, boxShadow: `0 0 25px ${b.color}33` }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${b.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
                            <div className="benefit-header">
                                <div className="benefit-icon" style={{ background: b.iconBg }}>{b.icon}</div>
                                <div className="benefit-title">{b.title}</div>
                            </div>
                            <div className="benefit-text">{b.text}</div>
                            <ul className="bullet-list">
                                {b.bullets.map((item, j) => (
                                    <li key={j} style={{ '--dot-color': b.color }}>
                                        <span style={{ position: 'absolute', left: 0, top: '0.3rem', color: b.color, fontSize: '0.55rem' }}>●</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

// ===== PART 07: CHALLENGES =====
function ChallengesSection() {
    const challenges = [
        {
            icon: '🌿', color: '#ef4444', iconBg: 'rgba(239,68,68,0.2)',
            title: 'Environmental Damage',
            text: 'Large-scale industrial production and resource extraction can lead to pollution and deforestation. Weak regulations in some countries allow companies to harm ecosystems and communities.',
            bullets: ['Deforestation caused by large-scale palm oil plantations in Southeast Asia.', 'Industrial waste from factories polluting rivers and water supplies.', 'High carbon emissions from global shipping and manufacturing.']
        },
        {
            icon: '⚖️', color: '#f59e0b', iconBg: 'rgba(245,158,11,0.2)',
            title: 'Income Inequality',
            text: 'While global corporations generate wealth, benefits are unevenly distributed. Wage gaps between developed and developing countries can widen, contributing to social imbalance.',
            bullets: ['Factory workers earning low wages compared to corporate executives.', 'Outsourcing jobs to low-cost countries, reducing wages in higher-income nations.', 'Urban areas prospering while rural communities remain underdeveloped.']
        },
        {
            icon: '🎭', color: '#8b5cf6', iconBg: 'rgba(139,92,246,0.2)',
            title: 'Cultural Homogenization',
            text: 'The global spread of multinational brands can reduce local traditions, languages, and products. Global branding often overshadows cultural diversity despite local market adaptations.',
            bullets: ['International fast-food chains replacing traditional local eateries.', 'Western fashion trends influencing local clothing styles.', 'Global media shaping entertainment preferences worldwide.']
        },
    ]
    return (
        <div className="section-full challenges-section" id="challenges">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 07</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Challenges & <span>Criticisms</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">Despite their benefits, global corporations face significant criticisms around environmental responsibility, economic fairness, and cultural impact.</motion.p>
                </AnimSection>
                <motion.div className="benefit-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {challenges.map((c, i) => (
                        <motion.div key={i} variants={fadeUp} className="benefit-card"
                            whileHover={{ borderColor: c.color, boxShadow: `0 0 25px ${c.color}33` }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${c.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
                            <div className="benefit-header">
                                <div className="benefit-icon" style={{ background: c.iconBg }}>{c.icon}</div>
                                <div className="benefit-title">{c.title}</div>
                            </div>
                            <div className="benefit-text">{c.text}</div>
                            <ul className="bullet-list">
                                {c.bullets.map((item, j) => (
                                    <li key={j}>
                                        <span style={{ position: 'absolute', left: 0, top: '0.3rem', color: c.color, fontSize: '0.55rem' }}>●</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

// ===== PART 08: DEVELOPING COUNTRIES =====
function DevelopingSection() {
    const pros = ['Job Creation and Employment Opportunities', 'Technology Transfer and Skill Development', 'Economic Growth and Increased Exports']
    const cons = ['Labor Exploitation and Poor Working Conditions', 'Environmental Degradation', 'Economic Dependence']
    return (
        <div className="section-full developing-section" id="developing">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 08</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Impact on <span>Developing Countries</span></motion.h2>
                </AnimSection>
                <motion.div className="developing-intro" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    Global corporations can accelerate development by creating jobs, transferring technology, and boosting economic growth. However, without strong regulations, they can also contribute to exploitation, environmental harm, and economic dependency.
                </motion.div>
                <motion.div className="pros-cons-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <motion.div variants={fadeUp} className="pros-card">
                        <div className="pros-cons-heading" style={{ color: '#10b981' }}>✅ Positive Impacts</div>
                        {pros.map((p, i) => (
                            <div key={i} className="pros-cons-item">
                                <span className="dot" style={{ background: '#10b981' }} />
                                {p}
                            </div>
                        ))}
                    </motion.div>
                    <motion.div variants={fadeUp} className="cons-card">
                        <div className="pros-cons-heading" style={{ color: '#ef4444' }}>⚠️ Negative Impacts</div>
                        {cons.map((c, i) => (
                            <div key={i} className="pros-cons-item">
                                <span className="dot" style={{ background: '#ef4444' }} />
                                {c}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

// ===== PART 09: DIGITAL GLOBAL CORPS =====
function DigitalSection() {
    const cards = [
        {
            icon: '🚀', color: '#3b82f6', title: 'Rise of Tech Giants',
            text: 'The digital age enabled technology companies to grow into powerful global corporations operating across borders via the internet, cloud computing, and digital services. Their influence extends beyond commerce into communication, media, and daily life.'
        },
        {
            icon: '🛒', color: '#06b6d4', title: 'E-Commerce Expansion',
            text: 'E-commerce platforms allow businesses to sell goods and services online to customers worldwide, removing geographical barriers and enabling even small businesses to access international markets.'
        },
        {
            icon: '📱', color: '#8b5cf6', title: 'Platform Economy',
            text: 'Digital platforms connect users, service providers, and businesses in a shared online marketplace. These platforms create value by facilitating interactions rather than producing goods themselves.'
        },
    ]
    return (
        <div className="section-full digital-section" id="digital">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 09</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Digital <span>Global Corporations</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">Digital global corporations use technology and online platforms to connect markets, expand e-commerce, and transform global economic activity.</motion.p>
                </AnimSection>
                <motion.div className="digital-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {cards.map((c, i) => (
                        <motion.div key={i} variants={fadeUp} className="digital-card"
                            whileHover={{ borderColor: c.color, boxShadow: `0 0 30px ${c.color}33` }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${c.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{c.icon}</div>
                            <div className="driver-title" style={{ color: c.color, marginBottom: '0.6rem' }}>{c.title}</div>
                            <div className="driver-text">{c.text}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

// ===== PART 10: REGULATION =====
function RegulationSection() {
    return (
        <div className="section-full regulation-section" id="regulation">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 10</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Global Regulation & <span>Governance</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">As global corporations grow larger and more powerful, international frameworks for regulation and accountability become increasingly essential.</motion.p>
                </AnimSection>
                <motion.div className="regulation-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <motion.div variants={fadeUp} className="regulation-card" whileHover={{ borderColor: '#3b82f6', boxShadow: '0 0 30px rgba(59,130,246,0.2)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #3b82f6, transparent)', borderRadius: '24px 24px 0 0' }} />
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚖️</div>
                        <div className="attribute-title" style={{ color: '#3b82f6', marginBottom: '0.75rem' }}>Anti-Trust Laws</div>
                        <div className="attribute-text">Anti-trust laws prevent monopolies and promote fair competition. They stop corporations from abusing dominance through price-fixing, market division, or eliminating competitors — ensuring markets remain open and competitive.</div>
                        <div className="impact-box" style={{ borderColor: '#3b82f6' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Impact:</strong> Anti-trust laws protect consumers from high prices and limited choices while encouraging innovation.
                        </div>
                    </motion.div>
                    <motion.div variants={fadeUp} className="regulation-card" whileHover={{ borderColor: '#10b981', boxShadow: '0 0 30px rgba(16,185,129,0.2)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #10b981, transparent)', borderRadius: '24px 24px 0 0' }} />
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌱</div>
                        <div className="attribute-title" style={{ color: '#10b981', marginBottom: '0.75rem' }}>Corporate Social Responsibility (CSR)</div>
                        <div className="attribute-text">CSR refers to a company's commitment to operate ethically and contribute positively to society — including environmental protection, fair labor practices, community development, and sustainable business operations.</div>
                        <div className="impact-box" style={{ borderColor: '#10b981' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Impact:</strong> CSR promotes sustainable development and improves corporate reputation while benefiting communities and the environment.
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

// ===== PART 11: FUTURE =====
function FutureSection() {
    const pillars = [
        {
            icon: '📡', color: '#06b6d4', title: 'Cross-Border Data Flows',
            text: 'Data moves across countries faster than physical goods, enabling real-time management of operations, consumer insights, and global supply chain coordination.',
            bullets: ['Global teams collaborating through cloud platforms', 'International financial transactions processed instantly', 'Streaming services delivering content worldwide']
        },
        {
            icon: '🏫', color: '#3b82f6', title: 'Expansion of Digital Services',
            text: 'Online education, remote work, telemedicine, and digital banking can now be delivered globally without any physical presence.',
            bullets: ['Freelancers working for international clients online', 'Online learning platforms reaching students worldwide', 'Digital payment systems enabling cross-border transactions']
        },
        {
            icon: '🛍️', color: '#8b5cf6', title: 'Growth of Digital Platforms',
            text: 'Online platforms connect buyers, sellers, workers, and service providers globally, reducing the need for intermediaries.',
            bullets: ['E-commerce marketplaces connecting small businesses globally', 'Ride-hailing and delivery apps expanding across countries', 'Social media platforms enabling global marketing']
        },
        {
            icon: '🌍', color: '#10b981', title: 'Rise of Remote Work & Global Talent',
            text: 'Digital tools allow companies to hire talent from anywhere in the world, creating a borderless, flexible workforce.',
            bullets: ['Companies outsourcing IT services to global freelancers', 'Remote teams collaborating across time zones', 'Virtual assistants supporting businesses internationally']
        },
    ]
    const opps = ['Greater access to global markets for small businesses', 'Increased innovation through global collaboration', 'More flexible work opportunities']
    const challenges = ['Digital divide between developed and developing countries', 'Data privacy and cybersecurity risks', 'Market dominance by large tech companies']

    return (
        <div className="section-full future-section" id="future">
            <div className="section" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimSection>
                    <motion.div variants={fadeUp} className="section-label">Part 11</motion.div>
                    <motion.h2 variants={fadeUp} className="section-title">Future of <span>Market Integration</span></motion.h2>
                    <motion.p variants={fadeUp} className="section-desc">
                        <strong style={{ color: 'var(--text-primary)' }}>Digital globalization</strong> refers to the increasing integration of global markets through digital technologies — enabling the instant flow of data, services, and ideas across borders without physical trade.
                    </motion.p>
                </AnimSection>
                <motion.div className="future-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {pillars.map((p, i) => (
                        <motion.div key={i} variants={fadeUp} className="future-card"
                            whileHover={{ borderColor: p.color, boxShadow: `0 0 25px ${p.color}33` }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${p.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
                            <div className="future-card-title">
                                <span>{p.icon}</span>
                                <span style={{ color: p.color }}>{p.title}</span>
                            </div>
                            <div className="attribute-text" style={{ marginBottom: '0.85rem' }}>{p.text}</div>
                            <ul className="bullet-list">
                                {p.bullets.map((b, j) => (
                                    <li key={j}>
                                        <span style={{ position: 'absolute', left: 0, top: '0.3rem', color: p.color, fontSize: '0.55rem' }}>●</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="opp-challenge-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <motion.div variants={fadeUp} className="pros-card">
                        <div className="pros-cons-heading" style={{ color: '#10b981' }}>🚀 Opportunities</div>
                        {opps.map((o, i) => (
                            <div key={i} className="pros-cons-item">
                                <span className="dot" style={{ background: '#10b981' }} />{o}
                            </div>
                        ))}
                    </motion.div>
                    <motion.div variants={fadeUp} className="cons-card">
                        <div className="pros-cons-heading" style={{ color: '#ef4444' }}>⚡ Challenges</div>
                        {challenges.map((c, i) => (
                            <div key={i} className="pros-cons-item">
                                <span className="dot" style={{ background: '#ef4444' }} />{c}
                            </div>
                        ))}
                    </motion.div>
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
                <div className="divider" />
                <CorpTypesSection />
                <div className="divider" />
                <DriversSection />
                <div className="divider" />
                <BenefitsSection />
                <div className="divider" />
                <ChallengesSection />
                <div className="divider" />
                <DevelopingSection />
                <div className="divider" />
                <DigitalSection />
                <div className="divider" />
                <RegulationSection />
                <div className="divider" />
                <FutureSection />
            </main>
            <Footer />
        </>
    )
}

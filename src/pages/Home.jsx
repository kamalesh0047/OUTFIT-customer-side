import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Truck, RefreshCw, ShieldCheck, Zap, ArrowRight, Star, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import QuickView from '../components/QuickView.jsx'
import { CATEGORIES } from '../data/products.js'
import { useState, useRef } from 'react'

const PageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }
const word = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
}

const MARQUEE = [
  'FREE SHIPPING OVER ₹1499',
  'NEW SEASON DROP',
  'CURATED ESSENTIALS',
  'MEN & WOMEN',
  '30-DAY RETURNS',
  'TIMELESS SILHOUETTES',
]

export default function Home() {
  const headline = ['Style', 'Beyond', 'Trends']
  const displayCategories = CATEGORIES
  const [quickView, setQuickView] = useState(null)
  const categoriesRef = useRef(null)
  const heroRef = useRef(null)
  const magneticRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleShopClick = (e) => {
    e.preventDefault()
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMagnetic = (e) => {
    const el = magneticRef.current
    if (!el) return

    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)

    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }

  const resetMagnetic = () => {
    if (magneticRef.current) {
      magneticRef.current.style.transform = 'translate(0, 0)'
    }
  }

  return (
    <motion.div {...PageMotion}>
      <section className="hero" ref={heroRef}>
        <motion.img
          className="hero__bg"
          src="https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
          alt="Fashion hero background"
          loading="eager"
          style={{ y: bgY, scale: bgScale }}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
        />

        <div className="hero__overlay" />
        <div className="hero__grain" />

        <motion.div
          className="container hero__content"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.img
            className="hero__logo"
            src="https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F8ece058782244bdda9f1d6c2f07eec1c?format=webp&width=800&height=1200"
            alt="OUTFIT Logo"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />

          <motion.span
            className="eyebrow eyebrow--hero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles size={14} /> Premium Fashion Marketplace
          </motion.span>

          <motion.h1 className="hero__title" variants={stagger} initial="hidden" animate="show">
            {headline.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                style={{ display: 'inline-block', marginRight: '.28em' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Curated essentials for Men & Women - timeless silhouettes, exceptional materials,
            effortless minimalism.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <button
              ref={magneticRef}
              onClick={handleShopClick}
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              className="btn hero__cta"
            >
              Shop Now <ArrowRight size={18} />
            </button>
          </motion.div>

          <motion.div
            className="hero__trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="hero__stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span>Loved by 25,000+ customers</span>
          </motion.div>
        </motion.div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-dot" />
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="marquee__item">
              {t} <span className="marquee__dot">✦</span>
            </span>
          ))}
        </div>
      </section>

      <section className="section container" ref={categoriesRef}>
        <Reveal>
          <div className="section__head">
            <span className="eyebrow">Browse</span>
            <h2>Shop by Category</h2>
            <p className="section__sub">Find your fit across our most-loved edits.</p>
          </div>
        </Reveal>

        <div className="cat-grid">
          {displayCategories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <Link to={`/category/${c.slug}`} className="cat-card">
                <div className="cat-card__media">
                  <img src={c.cover} alt={c.label} loading="lazy" />
                </div>

                
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="editorial">
          <Reveal delay={0.1}>
            <div className="editorial__copy">
              <h2>Designed to last, styled to move</h2>
              <p>
                Every piece is chosen for how it feels in your hands and how it wears over time -
                premium fabrics, considered cuts, and a palette that never goes out of style.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container promo">
          {[
            [Truck, 'Free Shipping', 'On orders over ₹1499'],
            [RefreshCw, 'Easy Returns', '30-day hassle-free'],
            [ShieldCheck, 'Secure Payments', '256-bit encryption'],
            [Zap, 'Fast Delivery', '1 business day'],
          ].map(([Icon, t, s], i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="promo__item">
                <span className="promo__icon">
                  <Icon size={24} />
                </span>
                <div>
                  <strong>{t}</strong>
                  <span>{s}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} />}
    </motion.div>
  )
}
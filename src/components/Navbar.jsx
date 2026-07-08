import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import './navbar.css'

const LINKS = [
  { to:'/', label:'Home' },
  { to:'/category/shirts', label:'Men', submenu: [
    { to:'/category/shirts', label:'Shirts & T-Shirts' },
    { to:'/category/pants', label:'Pants & Jeans' }
  ], icon: 'female'},
  { to:'/category/women-dresses', label:'Women' },
  { to:'/category/accessories', label:'Accessories' },
  { to:'/category/new-arrivals', label:'New Arrivals' },
  { to:'/about', label:'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const { setOpen, count } = useCart()
  const { count: wCount } = useWishlist()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll(); window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [menuOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const closeMobile = () => { setMenuOpen(false); setMobileExpanded(null) }

  return (
    <header className={'nav' + (scrolled ? ' nav--scrolled' : '')}>
      <div className="container nav__inner">
        <button className="nav__burger" aria-label="Menu" onClick={()=>setMenuOpen(true)}><Menu size={22}/></button>
       

        {/* ── DESKTOP NAV ── */}
        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/" className={({isActive})=>'nav__link'+(isActive?' is-active':'')}>Home</NavLink>
          {LINKS.slice(1).map((l,i)=>(
            <div key={i} className="nav__link-wrapper">
              <NavLink to={l.to} onClick={(e)=>{if(l.submenu) e.preventDefault(); l.submenu && setOpenDropdown(openDropdown === i+1 ? null : i+1)}} className={({isActive})=>'nav__link'+(isActive?' is-active':''+(l.submenu ? ' nav__link--dropdown' : ''))}>{l.label}{l.icon && <div className="nav__gender-icons"><svg className="nav__gender-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M18 16 L12 24 L12 40 L15 40 L15 48 L21 48 L21 40 L27 40 L27 24 L21 16 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/></svg><svg className="nav__gender-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="46" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M46 16 L38 24 L35 40 L38 40 L38 48 L44 48 L44 40 L50 40 L47 24 L58 24 L58 40 L61 40 L61 48 L55 48 L55 40 L58 24 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/></svg></div>}{l.submenu && <ChevronDown size={14} className="nav__chevron" />}</NavLink>
              {l.submenu && openDropdown === i+1 && (
                <div className="nav__dropdown">
                  {l.submenu.map((sub, si)=>(
                    <NavLink key={si} to={sub.to} className={({isActive})=>'nav__dropdown-link'+(isActive?' is-active':'')} onClick={()=>setOpenDropdown(null)}>{sub.label}</NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="nav__actions">
          <button className="nav__icon" aria-label="Search" onClick={()=>setSearchOpen(true)}><Search size={20}/></button>
          <Link to="/wishlist" className="nav__icon" aria-label="Wishlist">
            <Heart size={20}/>{wCount>0 && <span className="nav__badge">{wCount}</span>}
          </Link>
          <Link to="/account" className="nav__icon" aria-label="Account"><User size={20}/></Link>
          <button className="nav__icon" aria-label="Cart" onClick={()=>setOpen(true)}>
            <ShoppingBag size={20}/>{count>0 && <span className="nav__badge">{count}</span>}
          </button>
        </div>
      </div>

      {/* ── SEARCH OVERLAY ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div className="nav__search" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.3,ease:[0.22,0.61,0.36,1]}}>
            <form className="container nav__search-inner" onSubmit={handleSearchSubmit}>
              <Search size={20}/>
              <input
                autoFocus
                className="nav__search-input"
                placeholder="Search for shirts, accessories, dresses…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="nav__icon" aria-label="Close search" onClick={()=>setSearchOpen(false)}><X size={20}/></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="nav__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />

            <motion.div
              className="nav__mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {/* head */}
              <div className="nav__mobile-head">
                <span className="nav__logo">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F6d6fa49e05dc4ee5b306c7e8fab303d9%2F7d8058eabb8e43169db875405ec4e568?format=webp&width=800&height=1200"
                    alt="OUTFIT Logo"
                    className="nav__logo-image"
                  />
                </span>
                <button className="nav__icon" aria-label="Close" onClick={closeMobile}>
                  <X size={22} />
                </button>
              </div>

              {/* links with accordion dropdowns */}
              <nav className="nav__mobile-nav">
                {LINKS.map((l, i) => (
                  l.submenu ? (
                    <div key={i} className="nav__mobile-group">
                      <button
                        className={`nav__mobile-link nav__mobile-link--parent${mobileExpanded === i ? ' is-open' : ''}`}
                        onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                      >
                        <span>{l.label}</span>
                        <ChevronDown size={18} className={`nav__mobile-chevron${mobileExpanded === i ? ' is-open' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === i && (
                          <motion.div
                            className="nav__mobile-sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                          >
                            {/* "View All" link for the parent category */}
                            <NavLink to={l.to} className="nav__mobile-sublink" onClick={closeMobile}>
                              View All {l.label}
                            </NavLink>
                            {l.submenu.map((sub, si) => (
                              <NavLink key={si} to={sub.to} className="nav__mobile-sublink" onClick={closeMobile}>
                                {sub.label}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink key={i} to={l.to} className="nav__mobile-link" onClick={closeMobile}>
                      <span>{l.label}</span>
                    </NavLink>
                  )
                ))}
              </nav>

              {/* bottom actions */}
              <div className="nav__mobile-foot">
                <Link to="/wishlist" className="nav__mobile-action" onClick={closeMobile}>
                  <Heart size={18} /> Wishlist {wCount > 0 && <span className="nav__mobile-count">{wCount}</span>}
                </Link>
                <Link to="/account" className="nav__mobile-action" onClick={closeMobile}>
                  <User size={18} /> Account
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

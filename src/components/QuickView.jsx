import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'
import Price from './Price.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function QuickView({ product, onClose }) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  if (!product) return null
  const stock = Number(product.stock ?? 0)
  const outOfStock = stock === 0

  const handleAdd = () => {
    if (outOfStock) { addToast('This product is out of stock'); return }
    const result = addItem(product, {
      size: product.sizes?.[0] || 'One Size',
      color: product.colors?.[0] || '',
    })
    if (!result.ok) { addToast(result.message); return }
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div className="drawer__scrim" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} />
          <motion.div role="dialog" aria-label={product.name} className="qview__wrap">
            <motion.div className="qview" initial={{opacity:0,scale:.96,y:16}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:16}} transition={{duration:.3,ease:[0.22,0.61,0.36,1]}}>
              <img className="qview__img" src={product.image || product.imageUrl} alt={product.name} />
              <div className="qview__body">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span className="eyebrow">{product.brand || 'OUTFIT'}</span>
                  <button className="nav__icon" onClick={onClose} aria-label="Close"><X size={18}/></button>
                </div>
                <h3 style={{fontSize:22}}>{product.name}</h3>
                <Rating value={product.rating || 5} count={product.reviews || 0} />
                <Price price={product.price} original={Number(product.original || product.originalPrice)} />
                {outOfStock
                  ? <span style={{color:'var(--danger)',fontSize:13,fontWeight:600}}>Out of stock</span>
                  : stock <= 5 && <span style={{color:'#D4A017',fontSize:13,fontWeight:600}}>Only {stock} left</span>}
                {product.description && <p style={{color:'var(--muted)',fontSize:14}}>{product.description}</p>}
                <button className="btn btn--block" onClick={handleAdd} disabled={outOfStock}>{outOfStock ? 'Sold out' : 'Add to Cart'}</button>
                <Link to={`/product/${product.id}`} className="btn btn--ghost btn--block" onClick={onClose}>View Full Details</Link>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

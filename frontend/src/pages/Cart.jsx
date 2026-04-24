import { Link } from 'react-router-dom'

export default function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + (item.sellingPrice || 0), 0)

  const removeItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => setCart([])

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth:600, margin:'80px auto', textAlign:'center', padding:'0 24px' }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🧺</div>
        <h2 style={{ fontFamily:'DM Serif Display,serif', fontSize:26, marginBottom:8 }}>
          Your cart is empty
        </h2>
        <p style={{ color:'#78716C', marginBottom:24 }}>
          Add some fresh produce from our catalog
        </p>
        <Link to="/catalog" style={{
          display:'inline-block', padding:'10px 28px',
          background:'#F97316', color:'#fff',
          borderRadius:8, fontSize:14, fontWeight:500, textDecoration:'none',
        }}>Browse Catalog</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth:800, margin:'0 auto', padding:'32px 24px' }}>
      <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:28, marginBottom:4 }}>
        Your Cart
      </h1>
      <p style={{ color:'#78716C', marginBottom:28 }}>
        {cart.length} item{cart.length > 1 ? 's' : ''} · ready to checkout
      </p>

      {/* Cart items */}
      <div style={{
        background:'#fff', border:'1px solid #E7E5E4',
        borderRadius:12, overflow:'hidden',
        boxShadow:'0 1px 3px rgba(0,0,0,0.07)',
        marginBottom:20,
      }}>
        {cart.map((item, i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', gap:16,
            padding:'16px 20px',
            borderBottom: i < cart.length-1 ? '1px solid #F5F5F4' : 'none',
          }}>
            {/* Emoji */}
            <div style={{
  width:52, height:52, borderRadius:10,
  overflow:'hidden', flexShrink:0,
}}>
  <img
    src={item.image || 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=100&q=80'}
    alt={item.title}
    style={{ width:'100%', height:'100%', objectFit:'cover' }}
  />
</div>

            {/* Info */}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:'#1C1917', marginBottom:2 }}>
                {item.title}
              </div>
              <div style={{ fontSize:12, color:'#A8A29E' }}>
                📍 {item.origin || 'India'} · {item.isSeasonal ? '✓ Seasonal' : '∞ Year Round'}
              </div>
            </div>

            {/* Price */}
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontSize:18, fontWeight:600, color:'#1C1917' }}>
                ₹{item.sellingPrice}/kg
              </div>
              <div style={{ fontSize:11, color:'#A8A29E' }}>
                Farmer: ₹{item.costPrice}/kg
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(i)}
              style={{
                width:32, height:32, borderRadius:8,
                border:'1px solid #E7E5E4', background:'#fff',
                color:'#A8A29E', fontSize:16, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background='#FEF2F2'; e.currentTarget.style.color='#EF4444' }}
              onMouseLeave={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#A8A29E' }}
            >✕</button>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div style={{
        background:'#fff', border:'1px solid #E7E5E4',
        borderRadius:12, padding:20,
        boxShadow:'0 1px 3px rgba(0,0,0,0.07)',
        marginBottom:16,
      }}>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:16 }}>Order Summary</div>
        {cart.map((item, i) => (
          <div key={i} style={{
            display:'flex', justifyContent:'space-between',
            fontSize:13, color:'#78716C', marginBottom:8,
          }}>
            <span>{item.title}</span>
            <span>₹{item.sellingPrice}/kg</span>
          </div>
        ))}
        <div style={{
          borderTop:'1px solid #E7E5E4', marginTop:12, paddingTop:12,
          display:'flex', justifyContent:'space-between',
          fontSize:16, fontWeight:600, color:'#1C1917',
        }}>
          <span>Total</span>
          <span style={{ color:'#F97316' }}>₹{total}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:12 }}>
        <button
          onClick={clearCart}
          style={{
            padding:'11px 24px', borderRadius:8,
            border:'1px solid #E7E5E4', background:'#fff',
            color:'#78716C', fontSize:14, fontWeight:500, cursor:'pointer',
          }}
        >Clear Cart</button>
        <button
          style={{
            flex:1, padding:'11px 24px', borderRadius:8,
            border:'none', background:'#F97316',
            color:'#fff', fontSize:14, fontWeight:500, cursor:'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background='#EA6A00'}
          onMouseLeave={e => e.currentTarget.style.background='#F97316'}
        >
          <Link to="/checkout" style={{
  flex:1, padding:'11px 24px', borderRadius:8,
  border:'none', background:'#F97316',
  color:'#fff', fontSize:14, fontWeight:500,
  cursor:'pointer', textDecoration:'none',
  display:'flex', alignItems:'center', justifyContent:'center',
}}>
  Proceed to Checkout →
</Link>
        </button>
      </div>

      <div style={{ textAlign:'center', marginTop:16 }}>
        <Link to="/catalog" style={{ fontSize:13, color:'#A8A29E' }}>
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header({ onSearch, cartCount = 0 }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleKey = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate('/catalog?search=' + encodeURIComponent(query))
    }
  }

  const navLink = (path, label) => (
    <Link to={path} style={{
      padding: '6px 14px', borderRadius: 8,
      fontSize: 13, fontWeight: 500,
      color:      pathname === path ? '#F97316' : '#78716C',
      background: pathname === path ? '#FFF7ED' : 'transparent',
      textDecoration: 'none',
    }}>{label}</Link>
  )

  return (
    <header style={{
      background: '#fff', borderBottom: '1px solid #E7E5E4',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', height: 60,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>

        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{
            width:34, height:34, background:'#F97316', borderRadius:8,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
          }}>🍊</div>
          <div style={{ fontFamily:'DM Serif Display,serif', fontSize:18, color:'#1C1917' }}>
            Orange Hub
          </div>
        </Link>

        {/* Nav links */}
        <nav style={{ display:'flex', gap:4 }}>
          {navLink('/',        'Dashboard')}
          {navLink('/catalog', 'Catalog')}
          {navLink('/product', 'Product')}
        </nav>

        {/* Search bar */}
        <div style={{ position:'relative', marginLeft:'auto' }}>
          <span style={{
            position:'absolute', left:10, top:'50%',
            transform:'translateY(-50%)',
            color:'#A8A29E', fontSize:14, pointerEvents:'none',
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search produce..."
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              onSearch && onSearch(e.target.value)
            }}
            onKeyDown={handleKey}
            style={{
              paddingLeft:32, paddingRight:12,
              paddingTop:7, paddingBottom:7,
              border:'1px solid #E7E5E4', borderRadius:8,
              background:'#FAFAF9', fontSize:13,
              color:'#1C1917', width:220, outline:'none',
              fontFamily:'DM Sans,sans-serif',
            }}
            onFocus={e => e.target.style.borderColor='#F97316'}
            onBlur={e => e.target.style.borderColor='#E7E5E4'}
          />
        </div>

        {/* Cart button */}
       <Link to="/cart" style={{
          display:'flex', alignItems:'center', gap:8,
          padding:'7px 16px', background:'#F97316',
          color:'#fff', borderRadius:8,
          fontSize:13, fontWeight:500, textDecoration:'none',
          flexShrink: 0,
        }}>
          🧺 Cart
          {cartCount > 0 && (
            <span style={{
              background:'#fff', color:'#F97316',
              width:20, height:20, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:11, fontWeight:700,
            }}>{cartCount}</span>
          )}
        </Link>

      </div>
    </header>
  )
}
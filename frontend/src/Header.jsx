import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header style={{
      background: '#fff', borderBottom: '1px solid #E7E5E4',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        height: 60, display: 'flex', alignItems: 'center', gap: 32
      }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{
            width:34, height:34, background:'#F97316', borderRadius:8,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:18
          }}>🍊</div>
          <div>
            <div style={{ fontFamily:'DM Serif Display, serif', fontSize:18, color:'#1C1917' }}>
              Orange Hub
            </div>
            <div style={{ fontSize:11, color:'#A8A29E', marginTop:-2 }}>
              Farmer → Consumer
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display:'flex', gap:4 }}>
          {[
            { path:'/',        label:'Dashboard' },
            { path:'/catalog', label:'Catalog'   },
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              padding: '6px 14px', borderRadius: 8,
              textDecoration: 'none', fontSize: 13, fontWeight: 500,
              background: pathname === path ? '#FFF7ED' : 'transparent',
              color:      pathname === path ? '#F97316' : '#78716C',
            }}>{label}</Link>
          ))}
        </nav>

        {/* Cart */}
        <div style={{ marginLeft:'auto' }}>
          <button style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'7px 16px', background:'#F97316', color:'#fff',
            border:'none', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer'
          }}>
            🧺 Cart
            <span style={{
              background:'#fff', color:'#F97316', width:18, height:18,
              borderRadius:'50%', display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:11, fontWeight:700
            }}>0</span>
          </button>
        </div>
      </div>
    </header>
  )
}
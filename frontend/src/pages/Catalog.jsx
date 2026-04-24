import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const MOCK = [
  { _id:'1', image:'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400&q=80', title:'Nagpur Oranges',   origin:'Vidarbha, MH',  sellingPrice:40,  costPrice:28, isSeasonal:true,  months:'Jan–Mar' },
  { _id:'2', image:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80', title:'Kashmiri Apples',  origin:'Sopore, J&K',   sellingPrice:120, costPrice:80, isSeasonal:true,  months:'Sep–Nov' },
  { _id:'3', image:'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80', title:'Alphonso Mango',   origin:'Ratnagiri, MH', sellingPrice:180, costPrice:110,isSeasonal:true,  months:'Apr–Jun' },
  { _id:'4', image:'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80', title:'Cavendish Banana', origin:'Jalgaon, MH',   sellingPrice:30,  costPrice:18, isSeasonal:false, months:'Year Round' },
  { _id:'5', image:'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=80', title:'Coorg Lemons',     origin:'Coorg, KA',     sellingPrice:55,  costPrice:32, isSeasonal:false, months:'Year Round' },
  { _id:'6', image:'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80', title:'Nashik Grapes',    origin:'Nashik, MH',    sellingPrice:60,  costPrice:38, isSeasonal:true,  months:'Jan–Mar' },
  { _id:'7', image:'https://images.unsplash.com/photo-1595743825637-cdafc8ad4173?w=400&q=80', title:'HP Peaches',       origin:'Shimla, HP',    sellingPrice:90,  costPrice:55, isSeasonal:true,  months:'Jul–Aug' },
  { _id:'8', image:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80', title:'Dussehri Mango',   origin:'Lucknow, UP',   sellingPrice:160, costPrice:95, isSeasonal:true,  months:'Jun–Jul' },
]

function Chip({ label, val, filter, setFilter }) {
  return (
    <button onClick={() => setFilter(val)} style={{
      padding:'6px 16px', borderRadius:20,
      border:'1px solid #E7E5E4',
      background: filter===val ? '#F97316' : '#fff',
      color:      filter===val ? '#fff' : '#78716C',
      fontSize:12, fontWeight:500, cursor:'pointer',
    }}>{label}</button>
  )
}

export default function Catalog({ addToCart }) {
  const [filter, setFilter] = useState('all')
  const [searchParams] = useSearchParams()
  const urlSearch = searchParams.get('search') || ''
  const [localSearch, setLocalSearch] = useState('')

  const activeSearch = localSearch || urlSearch

  const filtered = MOCK.filter(p => {
    const matchFilter =
      filter === 'seasonal'  ? p.isSeasonal  :
      filter === 'yearround' ? !p.isSeasonal : true
    const matchSearch =
      p.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
      p.origin.toLowerCase().includes(activeSearch.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>

      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:28, marginBottom:4 }}>
          Product Catalog
        </h1>
        <p style={{ color:'#78716C' }}>{filtered.length} products · direct from farmers</p>
      </div>

      {/* Search + filters */}
      <div style={{ display:'flex', gap:10, marginBottom:24, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ position:'relative' }}>
          <span style={{
            position:'absolute', left:10, top:'50%',
            transform:'translateY(-50%)', color:'#A8A29E',
            fontSize:14, pointerEvents:'none',
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name or region..."
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            style={{
              paddingLeft:32, paddingRight:12, paddingTop:8, paddingBottom:8,
              border:'1px solid #E7E5E4', borderRadius:8,
              background:'#fff', fontSize:13, color:'#1C1917',
              width:260, outline:'none', fontFamily:'DM Sans,sans-serif',
            }}
            onFocus={e => e.target.style.borderColor='#F97316'}
            onBlur={e => e.target.style.borderColor='#E7E5E4'}
          />
        </div>
        <Chip label="All"        val="all"       filter={filter} setFilter={setFilter} />
        <Chip label="Seasonal"   val="seasonal"  filter={filter} setFilter={setFilter} />
        <Chip label="Year Round" val="yearround" filter={filter} setFilter={setFilter} />
        {activeSearch && (
          <button onClick={() => setLocalSearch('')} style={{
            padding:'6px 12px', borderRadius:20, border:'1px solid #E7E5E4',
            background:'#fff', color:'#78716C', fontSize:12, cursor:'pointer',
          }}>✕ Clear</button>
        )}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'60px 24px' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
          <div style={{ fontSize:16, fontWeight:500, color:'#78716C' }}>
            No results for "{activeSearch}"
          </div>
          <button onClick={() => setLocalSearch('')} style={{
            marginTop:12, padding:'8px 20px', background:'#F97316',
            color:'#fff', border:'none', borderRadius:8,
            fontSize:13, fontWeight:500, cursor:'pointer',
          }}>Clear Search</button>
        </div>
      )}

      {/* Product grid */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',
        gap:16,
      }}>
        {filtered.map(p => {
          const margin = Math.round(((p.sellingPrice - p.costPrice) / p.sellingPrice) * 100)
          return (
            <div key={p._id} style={{
              background:'#fff', border:'1px solid #E7E5E4',
              borderRadius:12, overflow:'hidden',
              boxShadow:'0 1px 3px rgba(0,0,0,0.07)',
              transition:'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.07)' }}
            >
             <div style={{
  height:160, position:'relative', overflow:'hidden',
}}>
  <img
    src={p.image}
    alt={p.title}
    loading="lazy"
    style={{
      width:'100%', height:'100%',
      objectFit:'cover',
      transition:'transform 0.3s ease',
    }}
    onMouseEnter={e => e.target.style.transform='scale(1.05)'}
    onMouseLeave={e => e.target.style.transform='scale(1)'}
  />
                <span style={{
                  position:'absolute', top:10, left:10,
                  padding:'3px 9px', borderRadius:20,
                  fontSize:10, fontWeight:600,
                  background: p.isSeasonal ? '#F0FDF4' : '#FFF7ED',
                  color:      p.isSeasonal ? '#16A34A' : '#F97316',
                }}>
                  {p.isSeasonal ? '✓ Seasonal' : '∞ Year Round'}
                </span>
              </div>
              <div style={{ padding:14 }}>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:3 }}>{p.title}</div>
                <div style={{ fontSize:12, color:'#A8A29E', marginBottom:10 }}>
                  📍 {p.origin} · 📅 {p.months}
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:20, fontWeight:600 }}>₹{p.sellingPrice}/kg</div>
                    <div style={{ fontSize:11, color:'#A8A29E' }}>Farmer: ₹{p.costPrice}/kg</div>
                  </div>
                  <span style={{
                    fontSize:11, fontWeight:600, color:'#16A34A',
                    background:'#F0FDF4', padding:'3px 8px', borderRadius:20,
                  }}>+{margin}%</span>
                </div>
                <button
                  onClick={() => addToCart && addToCart(p)}
                  style={{
                    width:'100%', padding:9, background:'#1C1917', color:'#fff',
                    border:'none', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='#F97316'}
                  onMouseLeave={e => e.currentTarget.style.background='#1C1917'}
                >Add to Cart</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
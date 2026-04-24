export default function ProductDetail() {
  const info = [
    { head:'🌾 Farming Details', rows:[
      ['Farmer',       'Ramesh Patel'],
      ['Region',       'Vidarbha, Maharashtra'],
      ['Harvest Date', '15 Jan 2025'],
      ['Batch Size',   '1,200 kg'],
      ['Certified',    'Organic ✓'],
    ]},
    { head:'🍊 Nutrition (per 100g)', rows:[
      ['Calories',   '47 kcal'],
      ['Vitamin C',  '53.2 mg'],
      ['Fiber',      '2.4 g'],
      ['Sugars',     '9.4 g'],
      ['Potassium',  '181 mg'],
    ]},
    { head:'💰 Pricing', rows:[
      ['Farmer Cost',    '₹28/kg'],
      ['Logistics',      '₹6/kg'],
      ['Platform Fee',   '₹6/kg'],
      ['Selling Price',  '₹40/kg'],
      ['Farmer Share',   '70%'],
    ]},
    { head:'📅 Seasonality', rows:[
      ['January',   '◆ Peak'],
      ['February',  '◆ Peak'],
      ['March',     '● Available'],
      ['Apr – Nov', '○ Off Season'],
      ['December',  '◑ Limited'],
    ]},
  ]

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>
      <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:28, marginBottom:4 }}>
        Nagpur Oranges
      </h1>
      <p style={{ color:'#78716C', marginBottom:28 }}>
        Vidarbha, Maharashtra · Seasonal Jan–Mar
      </p>

      {/* Hero */}
      <div style={{
        background:'#FFF7ED', border:'1px solid #E7E5E4',
        borderRadius:12, padding:40, textAlign:'center', marginBottom:24,
      }}>
        <div style={{ fontSize:80, marginBottom:12 }}>🍊</div>
        <div style={{ fontFamily:'DM Serif Display,serif', fontSize:22, marginBottom:8 }}>
          Nagpur Oranges
        </div>
        <span style={{
          background:'#16A34A', color:'#fff',
          padding:'5px 16px', borderRadius:20,
          fontSize:12, fontWeight:600,
        }}>✓ Seasonal Fruit</span>
      </div>

      {/* Info grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
        {info.map((section, si) => (
          <div key={si} style={{
            background:'#fff', border:'1px solid #E7E5E4',
            borderRadius:12, overflow:'hidden',
            boxShadow:'0 1px 3px rgba(0,0,0,0.07)',
          }}>
            <div style={{
              padding:'12px 16px', background:'#FAFAF9',
              borderBottom:'1px solid #E7E5E4',
              fontSize:12, fontWeight:600, color:'#78716C',
              textTransform:'uppercase', letterSpacing:'0.5px',
            }}>{section.head}</div>
            {section.rows.map(([k,v], ri) => (
              <div key={ri} style={{
                display:'flex', justifyContent:'space-between',
                padding:'10px 16px',
                borderBottom: ri < section.rows.length-1 ? '1px solid #F5F5F4' : 'none',
                fontSize:13,
              }}>
                <span style={{ color:'#78716C' }}>{k}</span>
                <span style={{ fontWeight:500, color:'#1C1917' }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
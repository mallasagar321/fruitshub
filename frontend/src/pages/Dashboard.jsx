import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const SELL   = [38,40,42,45,50,55,52,48,44,42,40,38]
const COST   = [24,26,27,28,32,36,34,30,28,26,25,24]
const MARGIN = SELL.map((s,i) => s - COST[i])

const SEASON = [
  { fruit:'🍊 Nagpur Orange',  months:[1,2,3],            peak:[1,2] },
  { fruit:'🥭 Alphonso Mango', months:[4,5,6],            peak:[4,5] },
  { fruit:'🍇 Nashik Grapes',  months:[1,2,3,12],         peak:[1,2] },
  { fruit:'🍎 Kashmiri Apple', months:[9,10,11],          peak:[10,11] },
  { fruit:'🍑 HP Peaches',     months:[7,8],              peak:[7,8] },
  { fruit:'🍌 Banana',         months:[1,2,3,4,5,6,7,8,9,10,11,12], peak:[] },
  { fruit:'🍋 Lemon',          months:[1,2,3,4,5,6,7,8,9,10,11,12], peak:[] },
]

export default function Dashboard() {
  const plData = {
    labels: MONTHS,
    datasets: [
      { type:'bar',  label:'Selling Price (₹/kg)', data:SELL,   backgroundColor:'rgba(249,115,22,0.85)', borderRadius:4, order:2 },
      { type:'bar',  label:'Farmer Cost (₹/kg)',   data:COST,   backgroundColor:'rgba(22,163,74,0.85)',  borderRadius:4, order:3 },
      { type:'line', label:'Margin (₹/kg)',         data:MARGIN, borderColor:'#F59E0B', borderWidth:2, pointBackgroundColor:'#F59E0B', pointRadius:4, fill:false, tension:0, order:1, yAxisID:'y2' },
    ],
  }

  const plOptions = {
    responsive:true, maintainAspectRatio:false,
    plugins:{
      legend:{ position:'top', labels:{ font:{ family:'DM Sans', size:12 }, boxWidth:12, padding:16 } },
      tooltip:{ callbacks:{ label: ctx => ctx.dataset.label + ': ₹' + ctx.parsed.y } },
    },
    scales:{
      x:{ ticks:{ font:{ family:'DM Sans', size:11 }, color:'#78716C' }, grid:{ color:'rgba(0,0,0,0.04)' } },
      y:{ ticks:{ font:{ family:'DM Sans', size:11 }, color:'#78716C', callback: v => '₹'+v }, grid:{ color:'rgba(0,0,0,0.04)' } },
      y2:{ position:'right', ticks:{ font:{ family:'DM Sans', size:11 }, color:'#F59E0B', callback: v => '₹'+v }, grid:{ display:false } },
    },
  }

  const marginData = {
    labels:['Citrus','Tropical','Stone Fruit','Bananas','Berries'],
    datasets:[{
      label:'Margin %',
      data:[32,39,38,40,28],
      backgroundColor:['rgba(249,115,22,0.85)','rgba(22,163,74,0.85)','rgba(22,163,74,0.85)','rgba(22,163,74,0.85)','rgba(249,115,22,0.85)'],
      borderRadius:6,
    }],
  }

  const marginOptions = {
    indexAxis:'y', responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label: ctx => ' '+ctx.parsed.x+'%' } } },
    scales:{
      x:{ min:0, max:60, ticks:{ font:{ family:'DM Sans', size:11 }, color:'#78716C', callback: v => v+'%' }, grid:{ color:'rgba(0,0,0,0.04)' } },
      y:{ ticks:{ font:{ family:'DM Sans', size:12 }, color:'#78716C' }, grid:{ display:false } },
    },
  }

  const card = { background:'#fff', border:'1px solid #E7E5E4', borderRadius:12, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,0.07)', marginBottom:20 }

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>

      <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:28, marginBottom:4 }}>Analytics Dashboard</h1>
      <p style={{ color:'#78716C', marginBottom:28 }}>Live overview </p>

      {/* Stat Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Total Revenue',   value:'₹2.4L', trend:'▲ +18% this month',          h:true  },
          { label:'Platform Margin', value:'22%',   trend:'Avg across all SKUs',         h:false },
          { label:'Farmer Payouts',  value:'₹1.8L', trend:'74% goes to farmers',         h:false },
          { label:'Active Products', value:'47',    trend:'23 seasonal · 24 year-round', h:false },
        ].map((s,i) => (
          <div key={i} style={{ background:s.h?'#F97316':'#fff', border:'1px solid #E7E5E4', borderRadius:12, padding:20, boxShadow:'0 1px 3px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8, color:s.h?'rgba(255,255,255,0.75)':'#A8A29E' }}>{s.label}</div>
            <div style={{ fontSize:28, fontWeight:600, lineHeight:1, color:s.h?'#fff':'#1C1917' }}>{s.value}</div>
            <div style={{ fontSize:12, marginTop:6, color:s.h?'rgba(255,255,255,0.9)':'#16A34A' }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* P&L Chart */}
      <div style={card}>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:2 }}>Profit / Loss — Selling Price vs Farmer Cost</div>
        <div style={{ fontSize:12, color:'#A8A29E', marginBottom:16 }}>Monthly average · Django Analytics API</div>
        <div style={{ position:'relative', height:280 }}>
          <Bar data={plData} options={plOptions} />
        </div>
      </div>

      {/* Seasonality Table */}
      <div style={card}>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:2 }}>Seasonal Availability — 12 Month Calendar</div>
        <div style={{ fontSize:12, color:'#A8A29E', marginBottom:12 }}>Django Analytics API · /api/analytics/seasonality</div>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:16 }}>
          {[{color:'#F97316',label:'Peak'},{color:'#16A34A',label:'Available'},{color:'#FDE68A',label:'Limited'},{color:'#F5F5F4',label:'Off season'}].map((l,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#78716C' }}>
              <div style={{ width:10, height:10, borderRadius:3, background:l.color, border:'1px solid #E7E5E4' }}/>{l.label}
            </div>
          ))}
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ borderCollapse:'collapse', width:'100%', minWidth:750 }}>
            <thead>
              <tr>
                <th style={{ textAlign:'left', padding:'8px 0', fontSize:12, color:'#A8A29E', fontWeight:600, minWidth:160, borderBottom:'2px solid #E7E5E4' }}>Fruit</th>
                {MONTHS.map(m=><th key={m} style={{ padding:'8px 4px', fontSize:11, color:'#A8A29E', fontWeight:600, textAlign:'center', borderBottom:'2px solid #E7E5E4' }}>{m}</th>)}
              </tr>
            </thead>
            <tbody>
              {SEASON.map((row,ri)=>(
                <tr key={ri} style={{ borderBottom:'1px solid #F5F5F4' }}>
                  <td style={{ padding:'10px 0', fontSize:13, fontWeight:500 }}>{row.fruit}</td>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>{
                    const isPeak=row.peak.includes(m)
                    const isAvail=row.months.includes(m)
                    const isLimit=!isPeak&&!isAvail&&(row.months.includes(m-1)||row.months.includes(m+1))
                    const bg=isPeak?'#F97316':isAvail?'#16A34A':isLimit?'#FDE68A':'#F5F5F4'
                    const sym=isPeak?'▲':isAvail?'●':isLimit?'◑':''
                    const tc=(isPeak||isAvail)?'#fff':isLimit?'#92400E':'transparent'
                    return(
                      <td key={m} style={{ padding:'8px 4px', textAlign:'center' }}>
                        <div style={{ width:28, height:22, borderRadius:4, background:bg, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:10, color:tc }}>{sym}</div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Margin Chart */}
      <div style={card}>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:2 }}>Platform Margin by Category</div>
        <div style={{ fontSize:12, color:'#A8A29E', marginBottom:16 }}>Green = above 35% target · Orange = below target</div>
        <div style={{ position:'relative', height:200 }}>
          <Bar data={marginData} options={marginOptions} />
        </div>
      </div>

    </div>
  )
}

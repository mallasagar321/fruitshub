 import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Checkout({ cart, setCart }) {
  const [step, setStep] = useState(1)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name:'', email:'', phone:'',
    address:'', city:'', pincode:'', state:'',
    payment:'upi',
    upi:'', card:'', expiry:'', cvv:'',
  })

  const total = cart.reduce((sum, item) => sum + (item.sellingPrice || 0), 0)

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const inputStyle = {
    width:'100%', padding:'10px 12px',
    border:'1px solid #E7E5E4', borderRadius:8,
    fontSize:13, color:'#1C1917',
    background:'#fff', outline:'none',
    fontFamily:'DM Sans,sans-serif',
  }

  const labelStyle = {
    fontSize:12, fontWeight:500,
    color:'#78716C', marginBottom:4, display:'block',
  }

  const card = {
    background:'#fff', border:'1px solid #E7E5E4',
    borderRadius:12, padding:24,
    boxShadow:'0 1px 3px rgba(0,0,0,0.07)',
    marginBottom:16,
  }

  const placeOrder = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    const orderId = 'OH' + Date.now().toString().slice(-6)
    setOrder({
      id: orderId,
      items: cart,
      total,
      name: form.name,
      address: form.address + ', ' + form.city + ' - ' + form.pincode,
      payment: form.payment,
      date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' }),
    })
    setCart([])
    setStep(3)
    setLoading(false)
  }

  if (cart.length === 0 && step !== 3) {
    return (
      <div style={{ maxWidth:500, margin:'80px auto', textAlign:'center', padding:'0 24px' }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🧺</div>
        <h2 style={{ fontFamily:'DM Serif Display,serif', fontSize:26, marginBottom:8 }}>Cart is empty</h2>
        <Link to="/catalog" style={{
          display:'inline-block', padding:'10px 28px',
          background:'#F97316', color:'#fff',
          borderRadius:8, fontSize:14, fontWeight:500, textDecoration:'none',
        }}>Browse Catalog</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth:860, margin:'0 auto', padding:'32px 24px' }}>

      {/* Step indicator */}
      {step < 3 && (
        <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:32 }}>
          {['Delivery', 'Payment', 'Confirmation'].map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', flex: i < 2 ? 1 : 0 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{
                  width:32, height:32, borderRadius:'50%',
                  background: step > i+1 ? '#16A34A' : step === i+1 ? '#F97316' : '#E7E5E4',
                  color: step >= i+1 ? '#fff' : '#A8A29E',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:13, fontWeight:600,
                }}>{step > i+1 ? '✓' : i+1}</div>
                <div style={{
                  fontSize:11, fontWeight:500,
                  color: step === i+1 ? '#F97316' : step > i+1 ? '#16A34A' : '#A8A29E',
                }}>{s}</div>
              </div>
              {i < 2 && (
                <div style={{
                  flex:1, height:2, background: step > i+1 ? '#16A34A' : '#E7E5E4',
                  margin:'0 8px', marginBottom:20,
                }}/>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns: step === 3 ? '1fr' : '1fr 340px', gap:20 }}>

        {/* LEFT — form */}
        <div>

          {/* ── STEP 1: Delivery ── */}
          {step === 1 && (
            <>
              <h2 style={{ fontFamily:'DM Serif Display,serif', fontSize:22, marginBottom:20 }}>
                Delivery Details
              </h2>
              <div style={card}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input style={inputStyle} placeholder="Ramesh Kumar"
                      value={form.name} onChange={e => update('name', e.target.value)}
                      onFocus={e => e.target.style.borderColor='#F97316'}
                      onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input style={inputStyle} placeholder="98765 43210" type="tel"
                      value={form.phone} onChange={e => update('phone', e.target.value)}
                      onFocus={e => e.target.style.borderColor='#F97316'}
                      onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                  </div>
                  <div style={{ gridColumn:'1/-1' }}>
                    <label style={labelStyle}>Email</label>
                    <input style={inputStyle} placeholder="you@email.com" type="email"
                      value={form.email} onChange={e => update('email', e.target.value)}
                      onFocus={e => e.target.style.borderColor='#F97316'}
                      onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                  </div>
                  <div style={{ gridColumn:'1/-1' }}>
                    <label style={labelStyle}>Street Address *</label>
                    <input style={inputStyle} placeholder="House No, Street, Area"
                      value={form.address} onChange={e => update('address', e.target.value)}
                      onFocus={e => e.target.style.borderColor='#F97316'}
                      onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                  </div>
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input style={inputStyle} placeholder="Mumbai"
                      value={form.city} onChange={e => update('city', e.target.value)}
                      onFocus={e => e.target.style.borderColor='#F97316'}
                      onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Pincode *</label>
                    <input style={inputStyle} placeholder="400001" type="number"
                      value={form.pincode} onChange={e => update('pincode', e.target.value)}
                      onFocus={e => e.target.style.borderColor='#F97316'}
                      onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                  </div>
                  <div style={{ gridColumn:'1/-1' }}>
                    <label style={labelStyle}>State</label>
                    <select style={{ ...inputStyle, cursor:'pointer' }}
                      value={form.state} onChange={e => update('state', e.target.value)}>
                      <option value="">Select State</option>
                      {['Maharashtra','Delhi','Karnataka','Tamil Nadu','Gujarat',
                        'Rajasthan','Uttar Pradesh','West Bengal','Madhya Pradesh','Punjab'].map(s =>
                        <option key={s} value={s}>{s}</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <button
                disabled={!form.name || !form.phone || !form.address || !form.city || !form.pincode}
                onClick={() => setStep(2)}
                style={{
                  width:'100%', padding:13, borderRadius:8, border:'none',
                  background: form.name && form.phone && form.address && form.city && form.pincode
                    ? '#F97316' : '#E7E5E4',
                  color: form.name && form.phone && form.address && form.city && form.pincode
                    ? '#fff' : '#A8A29E',
                  fontSize:14, fontWeight:500, cursor:'pointer',
                }}
              >Continue to Payment →</button>
            </>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === 2 && (
            <>
              <h2 style={{ fontFamily:'DM Serif Display,serif', fontSize:22, marginBottom:20 }}>
                Payment Method
              </h2>

              {/* Payment options */}
              <div style={card}>
                {[
                  { val:'upi',  label:'UPI',         icon:'📱', desc:'GPay, PhonePe, Paytm' },
                  { val:'card', label:'Credit / Debit Card', icon:'💳', desc:'Visa, Mastercard, RuPay' },
                  { val:'cod',  label:'Cash on Delivery', icon:'💵', desc:'Pay when delivered' },
                  { val:'netbanking', label:'Net Banking', icon:'🏦', desc:'All major banks' },
                ].map(opt => (
                  <div
                    key={opt.val}
                    onClick={() => update('payment', opt.val)}
                    style={{
                      display:'flex', alignItems:'center', gap:14,
                      padding:'14px 16px', borderRadius:8, marginBottom:8,
                      border: form.payment === opt.val
                        ? '2px solid #F97316' : '1px solid #E7E5E4',
                      background: form.payment === opt.val ? '#FFF7ED' : '#fff',
                      cursor:'pointer', transition:'all 0.15s',
                    }}
                  >
                    <div style={{
                      width:20, height:20, borderRadius:'50%',
                      border: form.payment === opt.val
                        ? '6px solid #F97316' : '2px solid #D1D5DB',
                      flexShrink:0,
                    }}/>
                    <div style={{ fontSize:20 }}>{opt.icon}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:'#1C1917' }}>{opt.label}</div>
                      <div style={{ fontSize:11, color:'#A8A29E' }}>{opt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* UPI input */}
              {form.payment === 'upi' && (
                <div style={{ ...card, marginTop:-8 }}>
                  <label style={labelStyle}>UPI ID</label>
                  <input style={inputStyle} placeholder="yourname@upi"
                    value={form.upi} onChange={e => update('upi', e.target.value)}
                    onFocus={e => e.target.style.borderColor='#F97316'}
                    onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                </div>
              )}

              {/* Card input */}
              {form.payment === 'card' && (
                <div style={{ ...card, marginTop:-8 }}>
                  <div style={{ marginBottom:14 }}>
                    <label style={labelStyle}>Card Number</label>
                    <input style={inputStyle} placeholder="1234 5678 9012 3456"
                      maxLength={19} value={form.card}
                      onChange={e => update('card', e.target.value
                        .replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())}
                      onFocus={e => e.target.style.borderColor='#F97316'}
                      onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <div>
                      <label style={labelStyle}>Expiry Date</label>
                      <input style={inputStyle} placeholder="MM/YY" maxLength={5}
                        value={form.expiry} onChange={e => update('expiry', e.target.value)}
                        onFocus={e => e.target.style.borderColor='#F97316'}
                        onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                    </div>
                    <div>
                      <label style={labelStyle}>CVV</label>
                      <input style={inputStyle} placeholder="•••" maxLength={3} type="password"
                        value={form.cvv} onChange={e => update('cvv', e.target.value)}
                        onFocus={e => e.target.style.borderColor='#F97316'}
                        onBlur={e => e.target.style.borderColor='#E7E5E4'} />
                    </div>
                  </div>
                </div>
              )}

              {form.payment === 'cod' && (
                <div style={{ ...card, marginTop:-8, background:'#F0FDF4', borderColor:'#BBF7D0' }}>
                  <div style={{ fontSize:13, color:'#16A34A', fontWeight:500 }}>
                    ✓ Pay ₹{total} in cash when your order arrives
                  </div>
                </div>
              )}

              <div style={{ display:'flex', gap:12 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding:'11px 20px', borderRadius:8,
                    border:'1px solid #E7E5E4', background:'#fff',
                    color:'#78716C', fontSize:13, cursor:'pointer',
                  }}
                >← Back</button>
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  style={{
                    flex:1, padding:'13px', borderRadius:8, border:'none',
                    background: loading ? '#E7E5E4' : '#F97316',
                    color: loading ? '#A8A29E' : '#fff',
                    fontSize:14, fontWeight:500, cursor:'pointer',
                  }}
                >
                  {loading ? '⏳ Processing payment...' : `Pay ₹${total} & Place Order`}
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3: Confirmation ── */}
          {step === 3 && order && (
            <div style={{ textAlign:'center', maxWidth:560, margin:'40px auto' }}>
              <div style={{
                width:72, height:72, background:'#F0FDF4',
                borderRadius:'50%', display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:36, margin:'0 auto 20px',
              }}>✓</div>
              <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:28, marginBottom:8, color:'#16A34A' }}>
                Order Placed!
              </h1>
              <p style={{ color:'#78716C', marginBottom:28, fontSize:14 }}>
                Thank you, {order.name}! Your order has been confirmed.
              </p>

              {/* Order details */}
              <div style={{ ...card, textAlign:'left' }}>
                <div style={{ display:'flex', justifyContent:'space-between',
                  alignItems:'center', marginBottom:16 }}>
                  <div style={{ fontSize:15, fontWeight:600 }}>Order #{order.id}</div>
                  <span style={{
                    background:'#F0FDF4', color:'#16A34A',
                    padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600,
                  }}>Confirmed</span>
                </div>
                {order.items.map((item, i) => (
                  <div key={i} style={{
                    display:'flex', justifyContent:'space-between',
                    padding:'8px 0', borderBottom:'1px solid #F5F5F4',
                    fontSize:13,
                  }}>
                    <span style={{ color:'#1C1917' }}>{item.title}</span>
                    <span style={{ color:'#78716C' }}>₹{item.sellingPrice}/kg</span>
                  </div>
                ))}
                <div style={{
                  display:'flex', justifyContent:'space-between',
                  padding:'12px 0 0', fontSize:15, fontWeight:600,
                }}>
                  <span>Total Paid</span>
                  <span style={{ color:'#F97316' }}>₹{order.total}</span>
                </div>
              </div>

              {/* Delivery info */}
              <div style={{ ...card, textAlign:'left' }}>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Delivery Info</div>
                <div style={{ fontSize:13, color:'#78716C', lineHeight:1.7 }}>
                  <div>📍 {order.address}</div>
                  <div>💳 {order.payment.toUpperCase()}</div>
                  <div>📅 Placed on {order.date}</div>
                  <div style={{ marginTop:8, color:'#16A34A', fontWeight:500 }}>
                    🚚 Estimated delivery: 2–4 business days
                  </div>
                </div>
              </div>

              <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
                <Link to="/" style={{
                  padding:'10px 24px', borderRadius:8,
                  border:'1px solid #E7E5E4', background:'#fff',
                  color:'#78716C', fontSize:13, textDecoration:'none',
                }}>Go to Dashboard</Link>
                <Link to="/catalog" style={{
                  padding:'10px 24px', borderRadius:8,
                  background:'#F97316', color:'#fff',
                  fontSize:13, fontWeight:500, textDecoration:'none',
                }}>Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — order summary sidebar */}
        {step < 3 && (
          <div>
            <div style={card}>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:14 }}>
                Order Summary ({cart.length} items)
              </div>
              {cart.map((item, i) => (
                <div key={i} style={{
                  display:'flex', gap:10, alignItems:'center',
                  marginBottom:12, paddingBottom:12,
                  borderBottom: i < cart.length-1 ? '1px solid #F5F5F4' : 'none',
                }}>
                 <div style={{
  width:40, height:40, borderRadius:8,
  overflow:'hidden', flexShrink:0,
}}>
  <img
    src={item.image || ''}
    alt={item.title}
    style={{ width:'100%', height:'100%', objectFit:'cover' }}
  />
</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:500, color:'#1C1917' }}>{item.title}</div>
                    <div style={{ fontSize:11, color:'#A8A29E' }}>₹{item.costPrice}/kg farmer price</div>
                  </div>
                  <div style={{ fontSize:13, fontWeight:600 }}>₹{item.sellingPrice}</div>
                </div>
              ))}
              <div style={{
                borderTop:'1px solid #E7E5E4', paddingTop:12, marginTop:4,
                display:'flex', justifyContent:'space-between',
                fontSize:15, fontWeight:600,
              }}>
                <span>Total</span>
                <span style={{ color:'#F97316' }}>₹{total}</span>
              </div>
              <div style={{
                marginTop:12, padding:'10px 12px',
                background:'#F0FDF4', borderRadius:8,
                fontSize:12, color:'#16A34A', fontWeight:500,
              }}>
                🌾 ₹{Math.round(total * 0.7)} goes directly to farmers
              </div>
            </div>

            {/* Delivery estimate */}
            <div style={{ ...card, background:'#FFF7ED', borderColor:'#FED7AA' }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#92400E', marginBottom:6 }}>
                🚚 Free Delivery
              </div>
              <div style={{ fontSize:12, color:'#92400E' }}>
                Estimated 2–4 business days · Fresh produce packed daily
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
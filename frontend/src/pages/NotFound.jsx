 import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign:'center', padding:'80px 24px' }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🍊</div>
      <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:32, marginBottom:8 }}>
        Page Not Found
      </h1>
      <p style={{ color:'#78716C', marginBottom:24 }}>
        This page doesn't exist.
      </p>
      <Link to="/" style={{
        padding:'10px 24px', background:'#F97316',
        color:'#fff', borderRadius:8, fontWeight:500,
      }}>Go Home</Link>
    </div>
  )
}
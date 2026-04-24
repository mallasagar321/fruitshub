import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header        from './components/Header'
import Dashboard     from './pages/Dashboard'
import Catalog       from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart          from './pages/Cart'
import NotFound      from './pages/NotFound'
import Checkout from './pages/Checkout'

function AppInner() {
  const navigate = useNavigate()
  const [cart,  setCart]  = useState([])
  const [toast, setToast] = useState('')

  const addToCart = (product) => {
    setCart(prev => [...prev, product])
    setToast(product.title + ' added to cart!')
    setTimeout(() => setToast(''), 2500)
  }

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate('/catalog?search=' + encodeURIComponent(query))
    }
  }

  return (
    <>
      <Header
        onSearch={handleSearch}
        cartCount={cart.length}
      />

      {/* Toast notification */}
      {toast && (
        <div style={{
          position:'fixed', bottom:24, right:24, zIndex:999,
          background:'#1C1917', color:'#fff',
          padding:'12px 20px', borderRadius:10,
          fontSize:13, fontWeight:500,
          boxShadow:'0 4px 16px rgba(0,0,0,0.2)',
        }}>
          ✓ {toast}
        </div>
      )}

      <Routes>
        <Route path="/"         element={<Dashboard />} />
        <Route path="/catalog"  element={<Catalog addToCart={addToCart} />} />
        <Route path="/product"  element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart"     element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="*"         element={<NotFound />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
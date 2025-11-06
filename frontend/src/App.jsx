import React, { useEffect, useState } from 'react'
import Products from './components/Products'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import Receipt from './components/Receipt'

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [showCheckout, setShowCheckout] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setError('')
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error('Failed to load products')
        const j = await res.json()
        setProducts(j)
      } catch (e) {
        setError(e.message || 'Something went wrong')
      }
    })()
  }, [])

  async function refreshCart() {
    try {
      setError('')
      const res = await fetch('/api/cart?userId=guest')
      if (!res.ok) throw new Error('Failed to load cart')
      const j = await res.json()
      setCart(j)
    } catch (e) {
      setError(e.message || 'Something went wrong')
    }
  }
  useEffect(() => { refreshCart() }, [])

  async function addToCart(productId) {
    try {
      setError('')
      const res = await fetch('/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId, qty: 1, userId: 'guest' }) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Failed to add to cart')
      }
      await refreshCart()
    } catch (e) {
      setError(e.message || 'Something went wrong')
    }
  }

  async function removeFromCart(id) {
    try {
      setError('')
      const res = await fetch('/api/cart/' + id, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to remove item')
      await refreshCart()
    } catch (e) {
      setError(e.message || 'Something went wrong')
    }
  }

  async function updateQty(id, qty) {
    try {
      setError('')
      const res = await fetch('/api/cart/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ qty }) })
      if (!res.ok) throw new Error('Failed to update quantity')
      await refreshCart()
    } catch (e) {
      setError(e.message || 'Something went wrong')
    }
  }

  async function checkout(data) {
    try {
      setError('')
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cartItems: cart.items, ...data, userId: 'guest' }) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Checkout failed')
      }
      const j = await res.json()
      setReceipt(j.receipt)
      setShowCheckout(false)
      await refreshCart()
    } catch (e) {
      setError(e.message || 'Something went wrong')
    }
  }

  return (
    <div className="container">
      <header><h1>Vibe Commerce — Mock Cart</h1></header>
      {error && <div style={{ background:'#ffe6e6', color:'#a00', padding:8, border:'1px solid #f5c2c2', borderRadius:6, marginBottom:12 }}>{error}</div>}
      <main className="grid">
        <Products products={products} onAdd={addToCart} />
        <Cart cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onCheckout={() => setShowCheckout(true)} />
      </main>
      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} onSubmit={checkout} />}
      {receipt && <Receipt receipt={receipt} onClose={() => setReceipt(null)} />}
    </div>
  )
}

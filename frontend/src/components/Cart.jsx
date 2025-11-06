import React from 'react'

export default function Cart({ cart, onRemove, onUpdateQty, onCheckout }) {
  return (
    <aside className="cart">
      <h2>Cart</h2>
      {cart.items.length === 0 ? <p>Cart is empty</p> : (
        <>
          <ul>
            {cart.items.map(i => (
              <li key={i.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{i.name}</strong>
                    <div>₹{(i.price * i.qty).toFixed(2)}</div>
                  </div>
                  <div>
                    <input type="number" value={i.qty} min="1" style={{ width: 60 }} onChange={(e) => onUpdateQty(i.id, Number(e.target.value))} />
                    <button onClick={() => onRemove(i.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="total" style={{ marginTop: 8 }}>Total: ₹{cart.total.toFixed(2)}</div>
          <button onClick={onCheckout}>Checkout</button>
        </>
      )}
    </aside>
  )
}

import React, { useState } from 'react'

export default function CheckoutModal({ onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Checkout</h3>
        <label style={{ display: 'block', marginBottom: 8 }}>Name<input value={name} onChange={e => setName(e.target.value)} /></label>
        <label style={{ display: 'block', marginBottom: 8 }}>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onSubmit({ name, email })}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

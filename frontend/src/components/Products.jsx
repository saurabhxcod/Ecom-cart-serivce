import React from 'react'

export default function Products({ products, onAdd }) {
  return (
    <section className="products">
      <h2>Products</h2>
      <div className="grid-products">
        {products.map(p => (
          <div className="card" key={p._id}>
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1520975682030-0f8f6d07d2a5?auto=format&fit=crop&w=1200&q=60'
                }}
              />
            ) : (
              <div style={{ height: 120, background: '#f0f0f0', borderRadius: 6, marginBottom: 8 }} />
            )}
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button onClick={() => onAdd(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  )
}

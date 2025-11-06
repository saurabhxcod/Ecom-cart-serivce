import React, { useRef } from 'react'

export default function Receipt({ receipt, onClose }) {
  const ref = useRef(null)

  function formatCurrency(n) {
    return `₹${Number(n).toFixed(2)}`
  }

  function handlePrint() {
    window.print()
  }

  if (!receipt) return null

  return (
    <div className="modal">
      <div className="receipt-card" ref={ref}>
        <div className="receipt-header">
          <div>
            <h3>Vibe Commerce</h3>
            <div className="muted">Order #{receipt.id}</div>
          </div>
          <div className="muted" style={{ textAlign: 'right' }}>
            <div>{new Date(receipt.timestamp).toLocaleString()}</div>
            {receipt.name && <div>{receipt.name}</div>}
            {receipt.email && <div>{receipt.email}</div>}
          </div>
        </div>

        <div className="receipt-body">
          <table className="receipt-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {(receipt.items || []).map(it => (
                <tr key={it.id}>
                  <td className="truncate">{it.name}</td>
                  <td style={{ textAlign: 'center' }}>{it.qty}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(it.unitPrice)}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(it.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="receipt-totals">
            <div className="row"><span>Subtotal</span><strong>{formatCurrency(receipt.subtotal ?? receipt.total)}</strong></div>
            {typeof receipt.tax === 'number' && <div className="row"><span>Tax (10%)</span><strong>{formatCurrency(receipt.tax)}</strong></div>}
            <div className="row grand"><span>Grand Total</span><strong>{formatCurrency(receipt.total)}</strong></div>
          </div>
        </div>

        <div className="receipt-actions no-print">
          <button onClick={handlePrint}>Print</button>
          <button data-variant="danger" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}



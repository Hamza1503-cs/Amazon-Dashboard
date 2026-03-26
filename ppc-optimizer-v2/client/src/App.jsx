import { useState, useEffect } from 'react'

export default function App() {
  const [status, setStatus] = useState('Checking server...')

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('Server not reachable'))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>PPC Optimizer v2</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Experimentation sandbox</p>

      <div style={{
        background: '#1e293b',
        borderRadius: '8px',
        padding: '1rem 1.5rem',
        display: 'inline-block'
      }}>
        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>API status: </span>
        <span style={{ color: '#22c55e' }}>{status}</span>
      </div>
    </div>
  )
}

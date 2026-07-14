'use client'

import { useState, useRef, useEffect } from 'react'

interface Country {
  code: string
  label: string
  flag: string
}

const COUNTRIES: Country[] = [
  { code: 'KE', label: 'Kenya', flag: '🇰🇪' },
  { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
  { code: 'ZA', label: 'South Africa', flag: '🇿🇦' },
  { code: 'TZ', label: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', label: 'Uganda', flag: '🇺🇬' },
  { code: 'RW', label: 'Rwanda', flag: '🇷🇼' },
  { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'DE', label: 'Germany', flag: '🇩🇪' },
  { code: 'AE', label: 'UAE', flag: '🇦🇪' },
  { code: 'IN', label: 'India', flag: '🇮🇳' },
  { code: 'CN', label: 'China', flag: '🇨🇳' },
]

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export default function CountrySelector({ initialCountry }: { initialCountry: string }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(() => {
    const info = COUNTRIES.find((c) => c.code === initialCountry)
    return info || COUNTRIES[0]
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = getCookie('country-override') || getCookie('country')
    if (stored) {
      const info = COUNTRIES.find((c) => c.code === stored)
      if (info) setCurrent(info)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectCountry(country: Country) {
    setCurrent(country)
    document.cookie = `country-override=${country.code};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
    document.cookie = `country=${country.code};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
    setOpen(false)
    window.location.reload()
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          color: '#ccc',
          cursor: 'pointer',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: '0.2rem 0.4rem',
          borderRadius: '4px',
          transition: 'background 0.15s',
        }}
        aria-label="Select shipping country"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.25rem',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            zIndex: 200,
            minWidth: '180px',
            maxHeight: '280px',
            overflowY: 'auto',
            padding: '0.3rem 0',
          }}
        >
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => selectCountry(c)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: 'none',
                background: c.code === current.code ? '#e8f5e9' : 'transparent',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: '#333',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (c.code !== current.code) e.currentTarget.style.background = '#f5f5f5'
              }}
              onMouseLeave={(e) => {
                if (c.code !== current.code) e.currentTarget.style.background = 'transparent'
              }}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
              {c.code === current.code && (
                <span style={{ marginLeft: 'auto', color: '#2e7d32', fontWeight: 700 }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

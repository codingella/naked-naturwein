// components/LayoutSelector.js
import React from 'react'
import { set, unset, PatchEvent } from 'sanity'

const options = [
    {
    title: 'Fullscreen',
    value: 'fullscreen',
    icon: () => (
    <svg width="40" height="24">
        <rect width="40" height="24" x="0" y="0" stroke="#ccc" fill="#ccc" strokeWidth="1" />
    </svg>
    ),
    },
  {
    title: 'Passepartout',
    value: 'passepartout',
    icon: () => (
      <svg width="40" height="24">
        <rect width="40" height="24" x="0" y="0" stroke="#ccc" fill="none" strokeWidth="1" />
        <rect width="16" height="18" x="12" y="3" stroke="#ccc" fill="#ccc" strokeWidth="1" />
        </svg>
    ),
  },
  {
    title: 'Left Right',
    value: 'leftRight',
    icon: () => (
    <svg width="40" height="24">
        <rect width="40" height="24" x="0" y="0" stroke="#ccc" fill="none" strokeWidth="1" />
        <rect width="8" height="10" x="8" y="3" stroke="#ccc" fill="#ccc" strokeWidth="1" />
        <rect width="8" height="10" x="24" y="11" stroke="#ccc" fill="#ccc" strokeWidth="1" />
    </svg>
    ),
  },
  {
    title: 'Right Left',
    value: 'rightLeft',
    icon: () => (
    <svg width="40" height="24">
        <rect width="40" height="24" x="0" y="0" stroke="#ccc" fill="none" strokeWidth="1" />
        <rect width="8" height="10" x="24" y="3" stroke="#ccc" fill="#ccc" strokeWidth="1" />
        <rect width="8" height="10" x="8" y="11" stroke="#ccc" fill="#ccc" strokeWidth="1" />
    </svg>
    ),
  },
]

export default function LayoutSelector({ value, onChange, type }) {
  const handleChange = (val) => {
    onChange(PatchEvent.from(val ? set(val) : unset()))
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleChange(option.value)}
            style={{
              border: isActive ? '2px solid rgb(150, 150, 150)' : '1px solid #e3e4e8',
              padding: '0.5rem',
              background: 'white',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: '90px',
            }}
          >
            <div style={{ paddingBottom: '2px' }}>{option.icon()}</div>
            <div style={{ fontSize: '12px', marginTop: '6px' }}>{option.title}</div>
          </button>
        )
      })}
    </div>
  )
}

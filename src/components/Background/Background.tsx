'use client'
import React from 'react'
import './Background.css'

export const Background: React.FC = () => {
  return (
    <div className="paper-bg" aria-hidden="true">
      <div className="paper-noise" />
      <div className="paper-dots" />
      <div className="paper-texture" />
    </div>
  )
}

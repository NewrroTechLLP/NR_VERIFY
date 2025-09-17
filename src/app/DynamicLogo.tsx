// src/app/DynamicLogo.tsx
'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const DynamicLogo = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // --- IMPORTANT ---
  // Replace these with your actual logo URLs
  const darkLogoUrl = '/images/logo-dark.png' // Assuming this is the dark mode logo
  const lightLogoUrl = '/images/logo-light.png' // Replace with your light mode logo URL

  // This useEffect ensures the component only renders on the client, preventing hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine the correct logo source based on the resolved theme
  const logoSrc = resolvedTheme === 'dark' ? darkLogoUrl : lightLogoUrl

  if (!mounted) {
    // To prevent layout shift, render a placeholder with the same dimensions as the logo
    return <div style={{ width: 200, height: 50 }} />
  }

  return (
    <Image
      src={logoSrc}
      alt="Newrro Tech LLP Logo"
      width={200}
      height={100}
      priority // Helps load the logo faster
    />
  )
}
import React from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body>
        <main>{children}</main>
      </body>
      <GoogleAnalytics />
    </html>
  )
}

export default Layout

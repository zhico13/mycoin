import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MYCOIN",
  description: "mycoin, a nostalgic meme coin project created on the pump.fun platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/98.css" />
        <link rel="icon" href="/images/mycoin-folder.png" type="image/png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}


import './globals.css'
// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'FlexiTUBE',
  description: 'Platform FlexiTUBE',
  verification: {
    google: 'ABC123...xyz', // Ganti dengan kode verifikasi asli kamu
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Meta verifikasi Google */}
        <meta name="google-site-verification" content="ABC123...xyz" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

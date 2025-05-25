// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'FlexiTUBE',
  description: 'Platform FlexiTUBE',
  verification: {
    google: 'google6d835a241361b1dd', // Ganti dengan kode verifikasi asli kamu
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Meta verifikasi Google */}
        <meta name="google-site-verification" content="google6d835a241361b1dd" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

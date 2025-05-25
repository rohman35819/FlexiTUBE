// app/layout.tsx (Next.js 13+ app dir)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="google6d835a241361b1dd" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import '../../styles/globals.css'

export const metadata = {
  title: 'FlexiTUBE Dashboard',
  description: 'Simulasi serangan XSS dan lainnya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col min-h-screen">
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} FlexiTUBE • Pentest Simulation Dashboard
        </footer>
        
      </body>
    </html>
  )
}

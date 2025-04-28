import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DNA to Protein Translator",
  description: "Translate DNA sequences to proteins and simulate mutations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="border-b">
              <div className="container flex h-16 items-center px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <span className="text-emerald-600 text-2xl">🧬</span>
                  <span>DNA Translator</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                  <Link href="/input" className="text-sm font-medium hover:underline">
                    Input
                  </Link>
                  <Link href="/translation" className="text-sm font-medium hover:underline">
                    Translation
                  </Link>
                  <Link href="/mutation" className="text-sm font-medium hover:underline">
                    Mutation
                  </Link>
                  <Link href="/results" className="text-sm font-medium hover:underline">
                    Results
                  </Link>
                </nav>
              </div>
            </header>
            <main className="flex-1 bg-gray-50">{children}</main>
            <footer className="border-t py-6">
              <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <p className="text-center text-sm text-muted-foreground md:text-left">
                  &copy; {new Date().getFullYear()} DNA Translator. All rights reserved.
                </p>
                <nav className="flex gap-4">
                  <Link href="#" className="text-sm font-medium hover:underline">
                    About
                  </Link>
                  <Link href="#" className="text-sm font-medium hover:underline">
                    Privacy
                  </Link>
                  <Link href="#" className="text-sm font-medium hover:underline">
                    Terms
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

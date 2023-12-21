import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from './components/NavigationBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AWS CRUD POC',
  description: 'POC for invoking AWS Lambda functions through API Gateways authenticated using Cognito',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className={`${inter.className} bg-[url('/grid.svg')] overflow-y-scroll p-4`}>
        <NavigationBar />
        <div className="rounded-lg p-px">
          {children}
        </div>
      </body>
    </html>
  )
}

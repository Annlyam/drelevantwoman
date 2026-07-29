import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Studio',
  description: 'Sanity Studio for content management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}

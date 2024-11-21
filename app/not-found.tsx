import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">404 - Page Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link 
        href="/"
        className="text-primary underline hover:text-primary/80"
      >
        Return Home
      </Link>
    </div>
  )
}
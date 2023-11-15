import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div>
        <Link href="/">Next.js</Link>
        <Link href="/users">User</Link>
    </div>
  )
}

export default NavBar
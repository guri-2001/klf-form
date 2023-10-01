"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Signout = () => {
  return (
    <div>Signout
      <button onClick={() => signOut({ callbackUrl: "http://localhost:3000/login" })}>Log Out</button>

    </div>
  )
}

export default Signout
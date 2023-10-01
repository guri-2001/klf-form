// "use client"
// import { useSession } from 'next-auth/react';
import Signout from './signout/page';


export default function Home() {
  // const { data: session } = useSession()
  return (
    <div>
      <h1>Home Page</h1>
          {/* <h1>{ session.user.name }</h1> */}
      <Signout />
    </div>
  )
}


import { redirect } from 'next/navigation'

import { getServerAuthSession } from "~/server/auth";
import Navbar from '../_components/Navbar';

export default async function page() {
  const session = await getServerAuthSession()

  if(!session) {
    redirect('/sign-in');
  }

  return (
    <div className='container'>
      <Navbar />
      <h1>Mail</h1>
    </div>
  )
}
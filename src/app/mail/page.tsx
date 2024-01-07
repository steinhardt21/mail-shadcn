
import { redirect } from 'next/navigation'

import { getServerAuthSession } from "~/server/auth";
import Navbar from '../_components/Navbar';
import { api } from "~/trpc/server"

export default async function page() {
  const session = await getServerAuthSession()

  if(!session) {
    redirect('/sign-in');
  }

  const threads = await api.mail.getLastThreads.query()
  console.log(threads)
  return (
    <div className='container'>
      <Navbar />
      <h1>Mail</h1>
    </div>
  )
}
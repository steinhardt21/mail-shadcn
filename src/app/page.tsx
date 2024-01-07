import { redirect } from 'next/navigation'

import { getServerAuthSession } from "~/server/auth";
import Navbar from './_components/Navbar';
import Mail from './_components/mailpage/Mail';

export default async function Page() {
  const session = await getServerAuthSession()

  if(!session) {
    redirect('/sign-in');
  }

  return (
    <div className='container'>
      <Navbar />
      <Mail />
    </div>
  )
}
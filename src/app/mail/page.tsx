
import { redirect } from 'next/navigation'
import { getServerAuthSession } from "~/server/auth";

export default async function page() {
  const session = await getServerAuthSession()

  if(!session) {
    redirect('/sign-in');
  }

  return (
    <div>
      <h1>Mail</h1>
    </div>
  )
}
"use client"

import { signOut } from "next-auth/react"
import {DropdownMenuItem, DropdownMenuShortcut} from './ui/dropdown-menu'
export default function SignOutButton() {
  return (
   <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/sign-in'})}>
     Log out
     <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
   </DropdownMenuItem>
  )
}
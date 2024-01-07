'use client'
import { atom, useAtom } from "jotai"
  
export type Mail = {
  id: string
  name: string
  email: string
  subject: string
  text: string
  date: string
  read: boolean
};

type Config = {
  selected: Mail["id"] | null
}

const configAtom = atom<Config>({selected: ''})

export function useMail() {
  return useAtom(configAtom)
}

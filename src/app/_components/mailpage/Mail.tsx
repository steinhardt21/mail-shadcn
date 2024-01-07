"use client"

import { type gmail_v1 } from 'googleapis'

import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"

import { api } from "~/trpc/react"
import { TooltipProvider } from '../ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs"
import { MailList } from './MailList';
import { MailDisplay } from './MailDisplay';
import { type Mail, useMail } from './use-mail';

export default function Mail() {
  const [mail] = useMail()
  const {data, isLoading, isError} = api.mail.getLastThreads.useQuery()
  
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error</div>

  const threads: gmail_v1.Schema$Thread[] = data.threads
  console.log(threads)

  // NOTE: This is a temporary solution to get the data from the API, it will be replaced with a proper clean solution later
  const mails: Mail[] = threads.map((thread: gmail_v1.Schema$Thread) => {
    if(thread.messages === undefined) return { id: '', name: '', email: '', subject: '', text: '', date: '', read: false}
    
    const id = thread.id ?? ''
    const name = thread.messages[0]?.payload?.headers?.find((header) => header.name === 'From')?.value?.split('<')[0]?.trim() ?? ''
    const email = thread.messages[0]?.payload?.headers?.find((header) => header.name === 'From')?.value?.split('<')[1]?.replace('>', '')?.trim() ?? ''
    const subject = thread.messages[0]?.payload?.headers?.find((header) => header.name === 'Subject')?.value?.trim() ?? ''
    const text = thread.messages[0]?.snippet?.trim() ?? ''
    const date = thread.messages[0]?.payload?.headers?.find((header) => header.name === 'Date')?.value?.trim()  ?? ''
    const read = thread.messages[0]?.labelIds?.includes('UNREAD') ?? false
    
    const mail = { id, name, email, subject, text, date, read }
    return mail
  })

  const defaultLayout = [440, 655]
  return (
    
      <div className="mt-6 overflow-hidden border rounded-lg shadow-lg bg-background">
        <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup direction="horizontal" className="h-full max-h-[650px] items-stretch">
          <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
            <Tabs defaultValue="all">
              <div className="flex items-center px-4 py-2">
                <h1 className="text-xl font-bold">Inbox</h1>
                <TabsList className="ml-auto">
                  <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">All mail</TabsTrigger>
                  <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Read</TabsTrigger>
                </TabsList>
              </div>
              <Separator />
              <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8" />
                  </div>
                </form>
              </div>
              <TabsContent value="all" className="m-0">
                <MailList items={mails} />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <MailList items={mails.filter((item) => !item.read)} />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <MailDisplay
              mail={mails.find((item) => item.id === mail.selected) ?? null}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        </TooltipProvider>
      </div>
  )
}
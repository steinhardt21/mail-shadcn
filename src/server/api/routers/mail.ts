import { google, type gmail_v1 } from "googleapis";
import { OAuth2Client } from 'google-auth-library';

import { createTRPCRouter, protectedProcedure} from "~/server/api/trpc";

export const mailRouter = createTRPCRouter({
  getLastThreads: protectedProcedure
    .query(async ({ ctx }) => {

    const threadWithEmails: gmail_v1.Schema$Thread[] = [];

    const clientId: string = process.env.GOOGLE_CLIENT_ID ?? '';
    const clientSecret: string = process.env.GOOGLE_CLIENT_SECRET ?? '';
   
    //Initialization of the OAuth2 client
    const account = await ctx.db.account.findFirst({ where: { userId: ctx.session.user?.id } })
    const accessToken = account?.access_token;
    const refreshToken = account?.refresh_token;
    const auth: OAuth2Client = new OAuth2Client(clientId, clientSecret);;
    auth.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
    
    // Specification of what we want to access from the user's gmail account
    const maxLastThreads = 10;    
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth: auth });
    const lastThreads = await gmail.users.threads.list({ userId: 'me', maxResults: maxLastThreads})

    if (!lastThreads?.data?.threads) {
      return {
        threads: [],
      }
    }

    // Get for each threads the mails
    for (const thread of lastThreads.data.threads) {
      const threadDetails = await gmail.users.threads.get({ userId: 'me', id: thread.id!});
      threadWithEmails.push(threadDetails.data);
    }

    return {
      threads: threadWithEmails,
    }
  }),
})
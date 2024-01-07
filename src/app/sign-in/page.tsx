import Link from "next/link"

import GoogleSignInButton from "../_components/signIn/GoogleSignInButton"
import MicrosoftSignInButton from "../_components/signIn/MicrosoftSignInButton"

export default function page() {

  return (
    <div className="min-h-screen bg-landing bg-[url('/ping.svg')]">
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-8 sm:px-6 lg:space-y-12 lg:px-8">
      <div className="w-full sm:mx-auto sm:max-w-md">
      </div>
      <div className="w-full space-y-4 sm:mx-auto sm:max-w-md">
        <div className="px-4 py-8 bg-gray-900 border-gray-700 shadow border-y sm:rounded-lg sm:border-x sm:px-10">
          <div className="flex flex-col justify-center text-center animate-fade-in">
            <span className="text-sm font-medium text-gray-300">Sign in with</span>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <GoogleSignInButton />
              <MicrosoftSignInButton />
            </div>
            <p className="prose prose-sm mx-auto mt-6 max-w-[18rem] text-xs text-gray-500">
              By signing in, you agree to our <Link href="/info/terms-of-service" className="text-green-wiseloop">Terms of Service</Link> and <Link className="text-green-wiseloop" href="/info/privacy-policy">Privacy Policy</Link>.                
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
'use client'

export default function MicrosoftSignInButton() {
  return <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gray-800 border border-gray-700 rounded-md shadow-sm hover:bg-gray-700 hover:text-gray-100" type="button"><span className=""><span className="sr-only">Sign in with</span><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="microsoft" className="mr-2 svg-inline--fa fa-microsoft" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"></path></svg><span>Microsoft</span></span></button>
}
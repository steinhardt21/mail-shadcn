
import ModeToggle from "./ModeToggle"
import UserBar from "./Userbar"

export default function Navbar() {
  return(
    <div className="sticky top-0 z-50 flex items-center justify-between w-full p-4 border-b h-14 supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
      <div className="flex flex-row justify-center gap-5">
        <span>Cool Mail</span>
      </div>
      <div className="flex flex-row gap-2">
        <ModeToggle />
        <UserBar />
      </div>
    </div>
  )
}
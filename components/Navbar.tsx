import Image from "next/image"
import Link from "next/link"
import Navitems from "./Navitems"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
                <Image src="/images/logo.svg" width={46} height={44} alt="logo" />
            </div>
        </Link>

        <div className="flex items-center gap-8">
            <Navitems />
            <SignedOut>
              <SignInButton>
                <button className="btn-signin">Sign in</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar


import { OrganizationSwitcher, SignOutButton, UserButton,SignedIn } from "@clerk/nextjs";
import Image from "next/image";
//import {usePathname,useRouter} from 'next/navigation'
import {dark} from '@clerk/themes'

export default function Home() {
  // const router=useRouter()
  // const pathname =usePathname()

  //console.log(pathname)

  return (
    <div>
      
      <div>home page , no matter logged in or not</div>
      <SignedIn>
        content that show only after logged in
        <div>you are signed in</div>

      </SignedIn>
      
      
    </div>
  )
}
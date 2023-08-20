"use client"

import { OrganizationSwitcher, SignOutButton, UserButton,SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import {usePathname,useRouter} from 'next/navigation'
import {dark} from '@clerk/themes'

export default function Home() {
  const router=useRouter()
  const pathname =usePathname()

  //console.log(pathname)

  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
      <div>hi no matter logged in or not</div>
      <SignedIn>
        {/* content that show only after logged in */}
        <div>you are signed in</div>
        <SignOutButton
          signOutCallback={()=>router.push('/sign-in')}
        >
          <Image
            src="/assets/door.svg"
            alt="logout"
            width={24}
            height={24}
            />
        </SignOutButton>
      </SignedIn>
      <div>
      {
        //return false
        // pathname.includes("/sign-in")?
        // (<div>true</div>):
        // (<div>false</div>)
      } 
      </div>
      {/* <OrganizationSwitcher
        appearance={{
          baseTheme:dark,
          elements:{
            organizationSwitcherTrigger:"py-2 px-4"
          }
        }}
      /> */}
      
    </div>
  )
}
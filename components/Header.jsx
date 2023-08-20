"use client"

import { UserButton } from "@clerk/nextjs"
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {useRouter} from 'next/navigation'

export default function header(){
    const router=useRouter()

    return(
        <div>
            <UserButton afterSignOutUrl="/"/>
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
            this is header
        </div>
    )
}
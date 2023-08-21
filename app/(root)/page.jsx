

import { OrganizationSwitcher, SignOutButton, UserButton,SignedIn } from "@clerk/nextjs";
import Image from "next/image";
//import {usePathname,useRouter} from 'next/navigation'
import {dark} from '@clerk/themes'
import { useSession } from 'next-auth/client'

import {Grid} from '@mui/material'
export default function Home() {
  // const router=useRouter()
  // const pathname =usePathname()
  const [session] = useSession();
  //console.log(pathname)
  const list=[1,2,3,4,5,6,7,8,9]
  return (
    <div>
      {session ? (
        <></>
      ) : (
        <div>
          please log in to view the folder page
        </div>
      )}
      <div>home page , no matter logged in or not</div>
      <SignedIn>
        content that show only after logged in
        <div>you are signed in</div>
        <Grid container>
          <Grid xs={4}>
            course a
          </Grid>
          <Grid xs={4}>
          course b
          </Grid>
          <Grid xs={4}>
          course c
          </Grid>
          <Grid xs={4}>
          course d
          </Grid>
          <Grid xs={4}>
          course e
          </Grid>
          <Grid xs={4}>
          course f
          </Grid>


        </Grid>
      </SignedIn>
      
      
    </div>
  )
}
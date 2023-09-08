

import { SignOutButton, UserButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from 'next/link'
import { homeList } from '@/lib/constant'
//import {usePathname,useRouter} from 'next/navigation'
import { dark } from '@clerk/themes'
import { Grid, Box } from '@mui/material'
export default function Home() {
  return (
    <div className="homeBackGround">
      <Grid container>
        {homeList.map(item => {
          return (
            <Grid item xs={4}>
              <Link href={item.href} className="disableLinkStyle" prefetch >
                <Box className="Box">
                  {item.icon}
                  <div style={{ marginTop: '10px' }}>{item.title}</div>
                </Box>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
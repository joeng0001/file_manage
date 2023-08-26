

import { OrganizationSwitcher, SignOutButton, UserButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";

import Link from 'next/link'
//import {usePathname,useRouter} from 'next/navigation'
import { dark } from '@clerk/themes'
import { Grid, Box } from '@mui/material'
import { SiCsharp, SiJavascript, SiPhp } from "react-icons/si";
import { DiJava, DiPython, DiHtml5, DiCss3, DiRuby, DiSwift, DiRust } from "react-icons/di"
import { BsFiletypeTxt, BsCardImage ,BsFiletypePdf,BsFiletypeDoc} from "react-icons/bs"
export default function Home() {
  // const router=useRouter()
  // const pathname =usePathname()

  //console.log(pathname)
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="homeBackGround">
      <SignedIn>
        <Grid container>
          <Grid item xs={4}>
            <Link href="/viewer/code/csharp" className="disableLinkStyle">
            <Box className="Box">
              <SiCsharp size={20}/>
              <div>C#</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/java" className="disableLinkStyle">
            <Box className="Box">
              <DiJava size={20}/>
              <div>JAVA</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/python" className="disableLinkStyle">
            <Box className="Box">
              <DiPython size={20}/>
              <div>Python</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/html" className="disableLinkStyle">
            <Box className="Box">
              <DiHtml5 size={20}/>
              <div>HTML</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/css" className="disableLinkStyle">
            <Box className="Box">
              <DiCss3 size={20}/>
              <div>CSS</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/javascript" className="disableLinkStyle">
            <Box className="Box">
              <SiJavascript size={20}/>
              <div>JavaScript</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/php" className="disableLinkStyle">
            <Box className="Box">
              <SiPhp size={20}/>
              <div>PHP</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/ruby" className="disableLinkStyle">
            <Box className="Box">
              <DiRuby size={20}/>
              <div>Ruby</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/swift" className="disableLinkStyle">
            <Box className="Box">
              <DiSwift size={20}/>
              <div>Swift</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/rust" className="disableLinkStyle">
            <Box className="Box">
              <DiRust size={20}/>
              <div>Rust</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/code/txt" className="disableLinkStyle">
            <Box className="Box">
              <BsFiletypeTxt size={20}/>
              <div>TXT</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/image" className="disableLinkStyle">
            <Box className="Box">
              <BsCardImage size={20}/>
              <div>Image</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/pdf" className="disableLinkStyle">
            <Box className="Box">
              <BsFiletypePdf size={20}/>
              <div>Pdf</div>
            </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="viewer/doc" className="disableLinkStyle">
            <Box className="Box">
              <BsFiletypeDoc size={20}/>
              <div>Doc/Docx</div>
            </Box>
            </Link>
          </Grid>


        </Grid>
      </SignedIn>


    </div>
  )
}
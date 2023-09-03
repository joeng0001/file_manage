

import { SignOutButton, UserButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";

import Link from 'next/link'
//import {usePathname,useRouter} from 'next/navigation'
import { dark } from '@clerk/themes'
import { Grid, Box } from '@mui/material'
import { TiDocumentAdd } from "react-icons/ti"
import { PiFileZipLight } from "react-icons/pi"
import { SiCsharp, SiJavascript, SiPhp } from "react-icons/si";
import { DiJava, DiPython, DiHtml5, DiCss3, DiRuby, DiSwift, DiRust } from "react-icons/di"
import { BsFiletypeTxt, BsCardImage, BsFiletypePdf, BsFiletypeDoc } from "react-icons/bs"

export default function Home() {

  const list = [
    {
      href: '/folderViewer/csharp/?page=1',
      icon: <SiCsharp size={40} />,
      title: 'C#'
    },
    {
      href: '/folderViewer/java/?page=1',
      icon: <DiJava size={40} />,
      title: 'JAVA'
    },
    {
      href: '/folderViewer/python/?page=1',
      icon: <DiPython size={40} />,
      title: 'Python'
    },
    {
      href: '/folderViewer/html/?page=1',
      icon: <DiHtml5 size={40} />,
      title: 'HTML'
    },
    {
      href: '/folderViewer/css/?page=1',
      icon: <DiCss3 size={40} />,
      title: 'CSS'
    },
    {
      href: '/folderViewer/javascript/?page=1',
      icon: <SiJavascript size={40} />,
      title: 'JavaScript'
    },
    {
      href: '/folderViewer/php/?page=1',
      icon: <SiPhp size={40} />,
      title: 'PHP'
    },
    {
      href: '/folderViewer/ruby/?page=1',
      icon: <DiRuby size={40} />,
      title: 'Ruby'
    },
    {
      href: '/folderViewer/swift/?page=1',
      icon: <DiSwift size={40} />,
      title: 'Swift'
    },
    {
      href: '/folderViewer/rust/?page=1',
      icon: <DiRust size={40} />,
      title: 'Rust'
    },
    {
      href: '/folderViewer/txt/?page=1',
      icon: <BsFiletypeTxt size={40} />,
      title: 'TXT'
    },
    {
      href: '/folderViewer/image/?page=1',
      icon: <BsCardImage size={40} />,
      title: 'Image'
    },
    {
      href: '/folderViewer/pdf/?page=1',
      icon: <BsFiletypePdf size={40} />,
      title: 'PDF'
    },
    {
      href: '/folderViewer/doc/?page=1',
      icon: <BsFiletypeDoc size={40} />,
      title: 'Doc/Docx'
    },
    {
      href: '/folderViewer/others/?page=1',
      icon: <TiDocumentAdd size={40} />,
      title: 'Others'
    },
    {
      href: '/folderViewer/zip/?page=1',
      icon: <PiFileZipLight size={40} />,
      title: 'Zip'
    }



  ]

  return (
    <div className="homeBackGround">
      <Grid container>
        {list.map(item => {
          return (
            <Grid item xs={4}>
              <Link href={item.href} className="disableLinkStyle">
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
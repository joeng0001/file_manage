import { ClerkProvider } from "@clerk/nextjs"
import {Inter} from "next/font/google"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import '../globals.css'

export const metadata ={
    title:'file manage',
    description:'an next js app'
}

const inter=Inter({subsets:["latin"]})

export default function RootLayout({ children }){
    return (
       <ClerkProvider >
            <html lang="en">
                <body suppressHydrationWarning={true} className={`${inter.className} fullWidth`}>
                    <Header/>
                    {children}
                    <Footer/>
                </body>
            </html>
      </ClerkProvider>
    )
}
import { ClerkProvider } from "@clerk/nextjs"
import {Inter} from "next/font/google"

import '../globals.css'
import '@/app/(auth)/auth.css'
export const metadata ={
    title:'file manage',
    description:'an next js app'
}

const inter=Inter({subsets:["latin"]})

export default function RootLayout({ children }){
    return (
       <ClerkProvider >
            <html lang="en">
                <body suppressHydrationWarning={true} className={`${inter.className} AuthBackground` }>
                    {children}
                </body>
            </html>
       </ClerkProvider>
    )
}
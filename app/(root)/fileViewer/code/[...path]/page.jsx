"use client"

import AceEditor from '@/components/AceEditor'
import {motion} from "framer-motion"
import {Cursor,useTypewriter}from 'react-simple-typewriter'

export default function showByLanguage({params}){

    const fileType=params?.extension


    const [text,count]=useTypewriter({
        words:[
            "Hi edit your code here",
            "welcome to my website"
        ],
        loop:true,
        delaySpeed:2000
    })


    return (
        <div>
            <h1>
                <span>{text}</span>
                <Cursor cursorColor="#000000"/>
            </h1>
            <motion.div
                initial={{
                    x:1000
                }}
                animate={{
                    x:0
                }}
                transition={{
                    duration:2
                }}
            >
                php python java
            </motion.div>
            <AceEditor/>
        </div>
    )
}
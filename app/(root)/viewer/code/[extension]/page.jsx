"use client"

import AceEditor from '@/components/AceEditor'
import {motion} from "framer-motion"


export default function showByLanguage({params}){

    const fileType=params?.extension





    return (
        <div>
            edit...
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
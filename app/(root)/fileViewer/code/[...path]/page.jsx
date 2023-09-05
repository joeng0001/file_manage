"use client"

import AceEditor from '@/components/Editor/AceEditor'
import { motion } from "framer-motion"
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import Decoration from '@/components/DecorationFloadtingBtn'
import { Button } from '@mui/material'
import { cyan, pink, lightGreen, purple } from '@mui/material/colors'

export default function showByLanguage({ params, searchParams }) {
    const path = params?.path.join('/')
    const name = searchParams.name
    const type = searchParams.type


    const [text, count] = useTypewriter({
        words: [
            "Edit your code file here",
            "Welcome!"
        ],
        loop: true,
        delaySpeed: 2000
    })

    return (
        <div>
            <h1>
                <span>{text}</span>
                <Cursor cursorColor="#000000" />
            </h1>

            <motion.div
                initial={{
                    x: 2000
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    duration: 2
                }}
                style={{
                    display: 'flex'
                }}
            >
                <Decoration />
                <Button variant='contained' style={{ marginLeft: '10px', marginRight: '10px', backgroundColor: pink[700] }}>Delete</Button>
                <Button variant='contained' style={{ marginRight: '10px', backgroundColor: lightGreen[700] }}>Save</Button>
                <Button variant='contained' style={{ marginRight: '10px', backgroundColor: cyan[700] }}>Edit Comment</Button>
                <Button variant='contained' style={{ marginRight: '10px', backgroundColor: purple[700] }}>Get Zip File</Button>
            </motion.div>
            <AceEditor path={path} name={name} type={type} />


        </div>
    )
}
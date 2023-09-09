"use client"

import { Cursor, useTypewriter } from 'react-simple-typewriter'

export default function Banner(props) {

    const [text, count] = useTypewriter({
        words: props.words,
        loop: true,
        delaySpeed: 2000
    })
    return (
        <h1>
            <span>{text}</span>
            <Cursor cursorColor="#000000" />
        </h1>
    )
}
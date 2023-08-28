"use client"
import QuillEditor from "@/components/Editor/QuillEditor"
import {Cursor,useTypewriter}from 'react-simple-typewriter'


export default function showByLanguage(){
    
    const [text,count]=useTypewriter({
        words:[
            "Edit your .doc/.docx file here",
            "Welcome"
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
            <QuillEditor/>
        </div>
    )
}
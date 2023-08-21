"use client"

import { useEffect, useState } from "react"

import AceEditor from 'react-ace';


// warning can be safely ignore -> file is renamed by next js default behaviour
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';

import 'ace-builds/src-noconflict/mode-text';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-twilight';
export default function AceEditorCom(props) {

    const [content,setContent]=useState()
    const [comment,setComment]=useState()

    useEffect(() => {
        
    }, [])

    useEffect(() => {

    }, [])
    return (
        <>
            {/* <input type='file' accept=".html, .css, .js" onChange={(e) => fileSelect(e)} /> */}
            <AceEditor
                mode="html"
                theme="twilight"
                name="html"
                value={content}
                fontSize={14}
                onChange={(e,v)=>setContent(v)}
                style={{ height: '200px', width: '95%', marginBottom: '5px' }}
            />
            <AceEditor
                mode="html"
                theme="twilight"
                name="html"
                value={comment}
                fontSize={14}
                onChange={(e,v)=>setComment(v)}
                style={{ height: '200px', width: '95%', marginBottom: '5px' }}
            />

           
        </>
    )
}
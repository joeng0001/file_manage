"use client"
import { useEffect, useState } from "react"
// import dynamic from 'next/dynamic';
// const AceEditor = dynamic(() => import('react-ace'), { ssr: false });

import AceEditor from 'react-ace'

// warning can be safely ignore -> file is renamed by next js default behaviour
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/mode-swift'
import 'ace-builds/src-noconflict/mode-rust'



import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-twilight';
export default function AceEditorCom(props) {

    const [content, setContent] = useState()
    const [comment, setComment] = useState()

    const fetchFileContent = async () => {
        console.log("fetchong file content", props.name, props.type, props.path)
        const res = await fetch(`/api/file?name=${props.name}&type=${props.type}&path=${props.path}`)
        const real_res = await res.json()
        console.log("after fetch file content.real res", real_res)
        const byteCharacters = atob(real_res.content);
        setContent(byteCharacters)
    }

    useEffect(() => {
        fetchFileContent()
    }, [])
    return (
        <>
            {/* <input type='file' accept=".html, .css, .js" onChange={(e) => fileSelect(e)} /> */}
            <AceEditor
                mode="java"
                theme="twilight"
                name="html"
                value={content}
                fontSize={14}
                style={{ height: '60vh', width: '95%', marginTop: '40px', marginBottom: '5px' }}
            />


        </>
    )
}
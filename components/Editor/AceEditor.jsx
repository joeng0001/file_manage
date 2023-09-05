"use client"
import { useEffect, useState } from "react"

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


    const [content, setContent] = useState("Content Loading...")



    const fetchFileContent = async () => {


        console.log("fetchong file content", props.name, props.type, props.path)
        const res = await fetch(`/api/file?name=${props.name}&type=${props.type}&path=${props.path}`)
        const real_res = await res.json()
        console.log("after fetch file content.real res", real_res)
        if (real_res.content) {
            setContent(atob(real_res.content))
        } else {
            setContent("")
        }


    }

    useEffect(() => {
        fetchFileContent()
    }, [props.name, props.type, props.path])
    return (
        <>
            <AceEditor
                mode="java"
                theme="twilight"
                name="html"
                fontSize={14}
                style={{ height: '70vh', width: '95%', marginTop: '40px', marginBottom: '5px' }}
                value={content}
            />


        </>
    )
}
"use client"
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

    return (
        <div>
            <AceEditor
                ref={props.editorRef}
                mode={`${props.type}`}
                theme="twilight"
                fontSize={14}
                style={{ height: '70vh', width: '95%', marginTop: '40px', marginBottom: '5px' }}
                placeholder="Empty File ..."
            />
        </div>
    )
}
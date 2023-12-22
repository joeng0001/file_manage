"use client"

import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function QuillEditor(props) {
    const handleChange = (v) => {
        props.setEditorContent(v)
    }
    return (
        <div>
            <ReactQuill
                placeholder="Start typing..."
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"]
                    ]
                }}
                style={{ height: '70vh' }}
                value={props.editorContent}
                onChange={handleChange}
            />
        </div>
    )
}
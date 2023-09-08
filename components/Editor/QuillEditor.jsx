"use client"

import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function QuillEditor(props) {
    const [content, setContent] = useState("")

    useEffect(() => {
        setContent(props.editorContent)
    }, [props.editorContent])

    return (
        <div>
            <ReactQuill
                value={content}
                onChange={props.setEditorContent}
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
                dangerouslySetInnerHTML={{ __html: content }}

            />
        </div>
    )
}
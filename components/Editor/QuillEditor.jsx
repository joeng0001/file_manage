"use client"

import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function QuillEditor(props){
    const content="..."

    return (
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
            style={{height:'75vh'}}
            
        />
    )
}
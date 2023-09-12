"use client"

import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";


// export default function PDFEditor({ params, searchParams }) {

//     const path = params?.path.join('/')
//     const name = searchParams.name
//     const type = searchParams.type
//     const [url, setURL] = useState('')
//     const inputRef = useRef()
//     const fileUpload = (e) => {
//         if (e.target.files) {
//             const reader = new FileReader();
//             reader.readAsDataURL(e.target.files[0]);
//             reader.onload = async () => {
//                 let base64String = reader.result.split(',')[1];
//                 props.setNewContent(base64String)
//             }
//         }
//     }
//     const fetchFileContent = async () => {

//         const res = await fetch(`/api/file?name=${name}&type=${type}&path=${path}`)
//             .then(async response => {
//                 const res = await response.json()
//                 if (!response.ok) {
//                     throw new Error(res.message);
//                 }
//                 return res
//             })
//             .then(res => {
//                 const byteCharacters = atob(real_res.data.base64String);
//                 const byteNumbers = new Array(byteCharacters.length);
//                 for (let i = 0; i < byteCharacters.length; i++) {
//                     byteNumbers[i] = byteCharacters.charCodeAt(i);
//                 }
//                 const byteArray = new Uint8Array(byteNumbers);
//                 const blob = new Blob([byteArray], { type: 'application/pdf' });
//                 setURL(URL.createObjectURL(blob));
//             })
//             .catch(e => {
//                 controlSnackbar(true, 'error', e.message)
//             });



//     }
//     useEffect(() => {
//         const byteCharacters = props.textContent
//         const byteNumbers = new Array(byteCharacters.length);
//         for (let i = 0; i < byteCharacters.length; i++) {
//             byteNumbers[i] = byteCharacters.charCodeAt(i);
//         }
//         const byteArray = new Uint8Array(byteNumbers);
//         const blob = new Blob([byteArray], { type: 'application/pdf' });
//         setURL(URL.createObjectURL(blob));
//     }, [props.textContent])

//     useEffect(() => {
//         fetchFileContent()
//     }, [])
//     return (
//         <div>
//             <embed id="embed" src={url} type="application/pdf" width="100%" height="90%" ></embed>
//             <div>For PDF file,download and
//                 <Button style={{ marginLeft: '10px', marginRight: '10px' }} variant="outlined" onClick={() => { inputRef.current.click() }} >
//                     UPLOAD
//                     <input ref={inputRef} type='file' accept=".pdf" onChange={(e) => fileUpload(e)}
//                         className="HidedButton" />
//                 </Button>
//                 it back for editing</div>

//         </div>
//     );
// }

export default function test() {
    return (
        <div>testing...</div>
    )
}

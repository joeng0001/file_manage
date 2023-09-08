"use client"

import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Snackbar from '@/components/Snackbar'

export default function PDFEditor({ params, searchParams }) {

    const path = params?.path.join('/')
    const name = searchParams.name
    const type = searchParams.type
    const [url, setURL] = useState('')
    const inputRef = useRef()

    const [loading, setLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const controlSnackbar = (open, severity, message) => {
        setSnackbarSeverity(severity)
        setSnackbarMessage(message)
        setSnackbarOpen(open)
    }

    const fileDownload = async (e) => {

        const res = await fetch(`/api/file?path=${path}&name=${name}&type=${type}`)
            .then(async response => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res
            })
            .then(res => {
                const byteCharacters = atob(res.content);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                    const slice = byteCharacters.slice(offset, offset + 1024);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                const blob = new Blob(byteArrays, { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = name;
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch(e => {
                controlSnackbar(true, 'error', e.message)
            });


    }

    const fileUpload = (e) => {
        if (e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async () => {
                let base64String = reader.result.split(',')[1];
                setLoading(true)
                await fetch('/api/file',
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            name,
                            extension: '.pdf',
                            path,
                            base64String
                        })
                    }).then(res => {
                        controlSnackbar(true, "success", "file uploaded")
                        fetchFileContent()
                    }).catch(err => {
                        controlSnackbar(true, "error", "Error!" + err.message)
                    }).finally(() => {
                        setLoading(false)
                    })
            }
        }
    }
    const fetchFileContent = async () => {
        console.log("fetching data")
        const res = await fetch(`/api/file?name=${name}&type=${type}&path=${path}`)
            .then(async response => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                console.log("get res", res)
                return res
            })
            .then(res => {
                console.log("get return res", res)
                const byteCharacters = atob(res.content);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                setURL(URL.createObjectURL(blob));
            })
            .catch(e => {
                controlSnackbar(true, 'error', e.message)
            });
    }


    useEffect(() => {
        fetchFileContent()
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>For PDF file,
                <Button style={{ marginLeft: '10px', marginRight: '10px' }} variant="outlined" onClick={fileDownload} >
                    Download
                </Button>


                and
                <Button style={{ marginLeft: '10px', marginRight: '10px' }} variant="outlined" onClick={() => { inputRef.current.click() }} >
                    UPLOAD
                    <input ref={inputRef} type='file' accept=".pdf" onChange={(e) => fileUpload(e)}
                        className="HidedButton" />
                </Button>
                it back for editing</div>
            <div>Comment dialog TO BE DONE</div>
            <embed id="embed" src={url} type="application/pdf" width="90%" style={{ height: '85vh' }} ></embed>

            <Snackbar setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} />
        </div>
    );
}


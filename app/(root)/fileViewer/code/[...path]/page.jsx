"use client"

import AceEditor from '@/components/Editor/AceEditor'
import { motion } from "framer-motion"
import Banner from "@/components/Banner"
import Decoration from '@/components/DecorationFloadtingBtn'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from '@mui/material'
import { cyan, pink, lightGreen, purple } from '@mui/material/colors'
import { useEffect, useState, useRef } from 'react'
import Snackbar from '@/components/Snackbar'
import ApiLoading from '@/components/ApiLoading'
import { useRouter } from 'next/navigation'

export default function showByLanguage({ params, searchParams }) {
    const path = params?.path.join('/')
    const name = searchParams.name
    const type = searchParams.type
    const router = useRouter()
    const [editorRef] = [useRef()]
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
    const [commentsDialog, setCommentsDialog] = useState(false)
    const [comments, setComments] = useState("Loading...")

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const words = [
        "Edit your code file here!",
        "Welcome!"
    ]

    const confirmDeleteFile = async () => {
        setLoading(true)
        await fetch('/api/file',
            {
                method: "DELETE",
                body: JSON.stringify({ path: path, name: name, type: type })
            }).then(res => {
                controlSnackbar(true, "success", "file deleted")
                router.back()
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setConfirmDeleteDialog(false)
                setLoading(false)
            })
    }
    const controlSnackbar = (open, severity, message) => {
        setSnackbarSeverity(severity)
        setSnackbarMessage(message)
        setSnackbarOpen(open)
    }

    const getZip = async () => {
        try {
            const res = await fetch(`/api/zipFile?path=${path}&name=${name}&type=${type}`)
            const real_res = await res.json()
            const byteCharacters = atob(real_res);
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
            const blob = new Blob(byteArrays, { type: 'application/zip' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'achiver.zip';
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (e) {
            controlSnackbar(true, 'error', e.message)
        }
    }

    const fetchFileContent = async () => {
        const res = await fetch(`/api/file?name=${name}&type=${type}&path=${path}`)
            .then(async response => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res
            })
            .catch(e => {
                controlSnackbar(true, 'error', e.message)
            });
        if (res.content) {
            await editorRef?.current?.editor?.setValue(atob(res.content))
        } else {
            await editorRef?.current?.editor?.setValue("")
        }
        await editorRef?.current?.editor?.gotoLine(1)

    }
    const saveComments = async () => {
        setLoading(true)
        await fetch('/api/file',
            {
                method: "PUT",
                body: JSON.stringify({ path, name, type, comments })
            }).then(res => {
                controlSnackbar(true, "success", "comment saved")
                fetchComments()
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setLoading(false)
                setCommentsDialog(false)
            })
    }
    const saveFileContent = async () => {
        await fetch('/api/file',
            {
                method: "PUT",
                body: JSON.stringify({ path, name, type, base64String: btoa(editorRef?.current?.editor?.getValue()) })
            }).then(res => {
                controlSnackbar(true, "success", "content saved")
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                fetchFileContent()
            })
    }
    const fetchComments = async () => {
        const res = await fetch(`/api/file?name=${name}&type=${type}&path=${path}`)
            .then(async response => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                setComments(res.comments)
                return res
            })
            .catch(e => {
                controlSnackbar(true, 'error', e.message)
            });
    }

    useEffect(() => {
        fetchFileContent()
        fetchComments()
    }, [])

    return (
        <div>
            <Banner words={words} />
            <motion.div
                initial={{
                    x: 2000
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    duration: 2
                }}
                style={{
                    display: 'flex'
                }}
            >
                <Decoration />
                <Button variant='contained' style={{ marginLeft: '10px', marginRight: '10px', backgroundColor: pink[700] }} onClick={() => setConfirmDeleteDialog(true)}>Delete</Button>
                <Button variant='contained' style={{ marginRight: '10px', backgroundColor: lightGreen[700] }} onClick={saveFileContent}>Save</Button>
                <Button variant='contained' style={{ marginRight: '10px', backgroundColor: cyan[700] }} onClick={() => setCommentsDialog(true)}>Edit Comment</Button>
                <Button variant='contained' style={{ marginRight: '10px', backgroundColor: purple[700] }} onClick={getZip}>Get Zip File</Button>
            </motion.div>
            <AceEditor type={type} loading={loading} editorRef={editorRef} />
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={confirmDeleteDialog}
            >
                <DialogTitle>
                    <span style={{ fontSize: '24px', fontWeight: '300', color: 'red' }}>Alert</span>
                </DialogTitle>
                {
                    loading ?
                        <DialogContent>
                            <ApiLoading />
                        </DialogContent>
                        :
                        <div>
                            <DialogContent>
                                <div>Delete file <span style={{ fontSize: '24px', fontWeight: '200', color: 'red' }}>{name}</span> is Irretrievable!</div>
                                <div style={{ marginTop: '15px' }}>Stay in the page and save a file can re-create the file</div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmDeleteDialog(false)}>Cancel</Button>
                                <Button onClick={confirmDeleteFile}>Confirm</Button>
                            </DialogActions>
                        </div>
                }

            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={commentsDialog}
            >
                <DialogTitle>
                    Edit Comment
                </DialogTitle>

                {
                    loading ?
                        <DialogContent>
                            <ApiLoading />
                        </DialogContent>
                        :
                        <div>
                            <DialogContent>
                                <TextField value={comments} onChange={(e) => setComments(e.target.value)} label="Comment" variant="outlined" color="secondary" multiline rows={4} fullWidth />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setCommentsDialog(false)}>Back</Button>
                                <Button onClick={saveComments}>Save</Button>
                            </DialogActions>
                        </div>
                }
            </Dialog>
            <Snackbar setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} />
        </div>
    )
}
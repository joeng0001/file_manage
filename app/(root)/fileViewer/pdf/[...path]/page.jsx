"use client"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Snackbar from '@/components/Snackbar'
import ApiLoading from "@/components/ApiLoading"
import { lightGreen, pink } from '@mui/material/colors'
import { MdComment } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function PDFEditor({ params, searchParams }) {
    const router = useRouter()
    const path = params?.path.join('/')
    const name = searchParams.name
    const type = searchParams.type
    const [url, setURL] = useState('')
    const [inputRef, commentsRef] = [useRef(), useRef()]
    const [comments, setComments] = useState("")
    const [commentsDialog, setCommentsDialog] = useState(false)

    const [loading, setLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

    const controlSnackbar = (open, severity, message) => {
        setSnackbarSeverity(severity)
        setSnackbarMessage(message)
        setSnackbarOpen(open)
    }

    const fileDownload = async (e) => {
        await fetch(`/api/file?path=${path}&name=${name}&type=${type}`)
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
                await fetch('/api/file',
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            name,
                            type,
                            path,
                            base64String
                        })
                    }).then(res => {
                        controlSnackbar(true, "success", "file uploaded")
                        fetchFileContent()
                    }).catch(err => {
                        controlSnackbar(true, "error", "Error!" + err.message)
                    })
            }
        }
    }
    const fetchFileContent = async () => {
        await fetch(`/api/file?name=${name}&type=${type}&path=${path}`)
            .then(async response => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res
            })
            .then(res => {
                setComments(res.comments)
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
    const saveComments = async () => {
        setLoading(true)
        await fetch('/api/file',
            {
                method: "PUT",
                body: JSON.stringify({
                    name,
                    type,
                    path,
                    comments
                })
            }).then(res => {
                controlSnackbar(true, "success", "comment saved")
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setCommentsDialog(false)
                setLoading(false)
                fetchComments()
            })
    }

    const fetchComments = async () => {
        await fetch(`/api/file?name=${name}&type=${type}&path=${path}`)
            .then(async response => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res
            })
            .then(res => {
                setComments(res.comments)
            })
            .catch(e => {
                controlSnackbar(true, 'error', e.message)
            });
    }

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

    useEffect(() => {
        fetchFileContent()
        fetchComments()
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
            <div style={{ marginBottom: '10px' }}>
                <Button variant="contained" style={{ backgroundColor: lightGreen[400] }} onClick={() => setCommentsDialog(true)}><MdComment />Edit Comment</Button>

                <Button variant='contained' style={{ marginLeft: '10px', backgroundColor: pink[700] }} onClick={() => setConfirmDeleteDialog(true)}>Delete</Button>
            </div>
            <embed id="embed" src={url} type="application/pdf" width="90%" style={{ height: '70vh' }} ></embed>
            <Snackbar setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} />
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
                                <Button onClick={() => confirmDeleteFile()}>Confirm</Button>
                            </DialogActions>
                        </div>
                }

            </Dialog>
            <Snackbar setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} />
        </div>
    );
}


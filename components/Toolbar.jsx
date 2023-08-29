"use client"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from "@mui/material"
import { useState, useRef } from "react"
import {PiFolderPlusBold,PiFilePlusBold} from 'react-icons/pi'
import {MdComment,MdFileUpload} from 'react-icons/md'
import ApiLoading from "@/components/ApiLoading"
export default function toolbar(props) {

    const [fileDialog, setFileDialog] = useState(false)
    const [folderDialog, setFolderDialog] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [commentsDialog,setCommentsDialog]=useState(false)

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState({})
    const [inputRef,fileRef,folderRef,fileRemarkRef,folderRemarkRef,commentsRef] = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()]
    const createFile = async () => {
        setLoading(true)
        //create file,then redirect user to edit page to contuinue the creation
        await fetch('/api/file',
            {
                method: "POST",
                body: JSON.stringify({
                  name:fileRef.current.value,
                  remarks:fileRemarkRef.current.value
                })
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("created")
                setSnackbarOpen(true)
                setFileDialog(false)
            }).catch(err => {
                setSnackbarSeverity("error")
                setSnackbarMessage("Error!" + err.message)
                setSnackbarOpen(true)
            }).finally(() => {
                setLoading(false)
            })
    }
    const createFolder = async () => {
        setLoading(true)
        await fetch('/api/file',
            {
                method: "POST",
                body: JSON.stringify({
                  name:folderRef.current.value,
                  remarks:folderRemarkRef.current.value
                })
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("created")
                setSnackbarOpen(true)
                setFolderDialog(false)
            }).catch(err => {
                setSnackbarSeverity("error")
                setSnackbarMessage("Error!" + err.message)
                setSnackbarOpen(true)
            }).finally(() => {
                setLoading(false)
            })
        setLoading(false)
    }

    const fileSelect = async (e) => {
        if (e.target.files) {
            const targetFile = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            console.log(e.target.files[0])
            reader.onload = async () => {
                let base64String = reader.result.split(',')[1];

                setFile({
                    name: targetFile.name,
                    type: targetFile.type,
                    base64String: base64String,

                    currentPath: props.path
                })

                setConfirmDialog(true)
            }
        }
    }
    const fileUpload = async () => {
        setLoading(true)
        await fetch('/api/file',
            {
                method: "POST",
                body: JSON.stringify({ file })
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("upload success")
                setSnackbarOpen(true)
                setConfirmDialog(false)
            }).catch(err => {
                setSnackbarSeverity("error")
                setSnackbarMessage("Error!" + err.message)
                setSnackbarOpen(true)
            }).finally(() => {
                setFile(null)
                setLoading(false)
            })
    }
    const cancelUpload = () => {
        setFile(null)
        setSnackbarSeverity("warning")
        setSnackbarMessage("Upload Cancelled")
        setSnackbarOpen(true)
        setConfirmDialog(false)
    }

    const saveComments=async()=>{
        setLoading(true)
        await fetch('/api/folder',
            {
                method: "PUT",
                body: JSON.stringify({ comment: commentsRef.current.value})
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("upload success")
                setSnackbarOpen(true)
            }).catch(err => {
                setSnackbarSeverity("error")
                setSnackbarMessage("Error!" + err.message)
                setSnackbarOpen(true)
            }).finally(() => {
                setCommentsDialog(false)
                setLoading(false)
            })
    }
    return (
        <div>
            <div className="toolbar">

                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => setFileDialog(true)}><PiFilePlusBold/>Create File</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => setFolderDialog(true)}><PiFolderPlusBold/>Create Folder</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => { inputRef.current.click() }}>
                    <MdFileUpload/>Upload File
                    <input ref={inputRef} type='file' accept=".jpg, .pdf, .png, .doc, .docx, .txt, .html, .css, .js, .py"
                        onChange={(e) => fileSelect(e)} className="HidedButton" />
                    
                </Button>s
                <Button variant="outlined" style={{marginBottom:'10px'}} onClick={()=>setCommentsDialog(true)}><MdComment/>Edit Comment</Button>

            </div>
            <Dialog
 ds
                fullWidth={true}
                maxWidth='sm'
                open={fileDialog}
            >
                <DialogTitle>
                    Create File
                </DialogTitle>
                {
                    loading ?
                        <DialogContent>
                            <ApiLoading />
                        </DialogContent>
                        :
                        <div>
                            <DialogContent>
                                <TextField inputRef={fileRef} label="File Name" variant="outlined" />
                                <TextField inputRef={fileRemarkRef} label="Remarks..." variant="outlined" color="secondary" />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setFileDialog(false)}>Back</Button>
                                <Button onClick={createFile}>Create</Button>
                            </DialogActions>
                        </div>
                }
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={folderDialog}
            >
                <DialogTitle>
                    Create Folder
                </DialogTitle>

                {
                    loading ?
                        <DialogContent>
                            <ApiLoading />
                        </DialogContent>
                        :
                        <div>
                            <DialogContent>
                                <TextField inputRef={folderRef} label="Folder Name" variant="outlined" />
                                <TextField inputRef={folderRemarkRef} label="Remarks..." variant="outlined" color="secondary"/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setFolderDialog(false)}>Back</Button>
                                <Button onClick={createFolder}>Create</Button>
                            </DialogActions>
                        </div>
                }
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={confirmDialog}
            >
                <DialogTitle>
                    Confirm Required
                </DialogTitle>
                {
                    loading ?
                        <DialogContent>
                            <ApiLoading />
                        </DialogContent>
                        :
                        <div>

                            <DialogContent>
                                Upload file <span style={{ fontSize: '18px' }}>
                                    {file?.name}
                                </span>
                                ?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={cancelUpload}>Cancel</Button>
                                <Button onClick={fileUpload}>Confirm</Button>
                            </DialogActions>
                        </div>
                }

            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={remarksDialog}
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
                                <TextField inputRef={commentsRef} label="Comment..." variant="outlined" color="secondary"/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setCommentsDialog(false)}>Back</Button>
                                <Button onClick={saveComments}>Save</Button>
                            </DialogActions>
                        </div>
                }
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
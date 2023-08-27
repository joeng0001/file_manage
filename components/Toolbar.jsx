"use client"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,Snackbar,Alert } from "@mui/material"
import { useState, useRef } from "react"

import ApiLoading from "@/components/ApiLoading"
export default function toolbar(props) {

    const [fileDialog, setFileDialog] = useState(false)
    const [folderDialog, setFolderDialog] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)

    const [snackbarOpen,setSnackbarOpen]=useState(false)
    const [snackbarSeverity,setSnackbarSeverity]=useState('success')
    const [snackbarMessage,setSnackbarMessage]=useState("")

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState({})
    const inputRef = useRef()
    const fileSelect = async (e) => {
        //preview the file
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
            }).then(res=>{
                setSnackbarSeverity("success")
                setSnackbarMessage("upload success")
                setSnackbarOpen(true)
                setConfirmDialog(false)
            }).catch(err=>{
                setSnackbarSeverity("error")
                setSnackbarMessage("Error!"+err.message)
                setSnackbarOpen(true)
            }).finally(()=>{
                setFile(null)
                setLoading(false)
            })
    }
    const cancelUpload=()=>{
        setFile(null)
        setSnackbarSeverity("warning")
        setSnackbarMessage("Upload Cancelled")
        setSnackbarOpen(true)
        setConfirmDialog(false)
    }
    return (
        <div>
            <div className="toolbar">

                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => setFileDialog(true)}>Create File(text only)</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }}>Create Folder</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => { inputRef.current.click() }}>
                    Upload File
                    <input ref={inputRef} type='file' accept=".jpg, .pdf, .png, .doc, .docx, .txt, .html, .css, .js, .py"
                        onChange={(e) => fileSelect(e)} className="HidedButton" />
                </Button>

            </div>
            <Dialog

                fullWidth={true}
                maxWidth='sm'
                open={fileDialog}
            >
                <DialogTitle>
                    Create File
                </DialogTitle>
                <DialogContent>
                    <TextField label="File Name" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button>Back</Button>
                    <Button>Create</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={fileDialog}
            >
                <DialogTitle>
                    Create Folder
                </DialogTitle>
                <DialogContent>
                    <TextField label="Folder Name" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button>Back</Button>
                    <Button>Create</Button>
                </DialogActions>
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
                                Upload file <span style={{fontSize:'18px'}}>
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
            <Snackbar open={snackbarOpen} autoHideDuration={5000} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
                <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
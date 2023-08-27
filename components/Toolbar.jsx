"use client"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material"
import { useState,useRef } from "react"
export default function toolbar(props) {

    const [fileDialog, setFileDialog] = useState(false)
    const [folderDialog, setFolderDialog] = useState(false)

    const inputRef=useRef()
    const fileUpload = async (e) => {
        console.log("click")
        //preview the file
        if (e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            let type = e.target.files[0].type
            console.log(e.target.files[0])
            reader.onload = async () => {
                let base64String = reader.result.split(',')[1];
                
            }
        }
    }
    return (
        <div>
            <div className="toolbar">

                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => setFileDialog(true)}>Create File(text only)</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }}>Create Folder</Button>
                <Button variant="outlined" style={{marginBottom:'10px'}} onClick={() => { inputRef.current.click() }}>  
                    Upload File
                    <input ref={inputRef} type='file' accept=".jpg, .pdf, .png, .doc, .docx, .txt, .html, .css, .js, .py" 
                    onChange={(e) => fileUpload(e)} className="HidedButton" />
                </Button>

            </div>
            <Dialog

                fullWidth={true}
                maxWidth='sm'
                open={fileDialog}
                onClose={() => setFileDialog(false)}>
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
                onClose={() => setFileDialog(false)}>
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
        </div>
    )
}
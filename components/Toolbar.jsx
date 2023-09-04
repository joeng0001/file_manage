"use client"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, Autocomplete, Tooltip } from "@mui/material"
import { useState, useRef } from "react"
import { PiFolderPlusBold, PiFilePlusBold } from 'react-icons/pi'
import { MdComment, MdFileUpload } from 'react-icons/md'
import ApiLoading from "@/components/ApiLoading"
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'

import { fileTypeOption } from '@/lib/constant'
export default function toolbar(props) {

    const [fileDialog, setFileDialog] = useState(false)
    const [folderDialog, setFolderDialog] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [commentsDialog, setCommentsDialog] = useState(false)

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState({})
    let fileExtension = fileTypeOption[0].extension

    const [uploadButtonRef, fileRef, folderRef, fileCommentRef, folderCommentRef, commentsRef, confirmFileCommentRef] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
    const createFile = async () => {
        setLoading(true)
        console.log({
            name: fileRef.current.value,
            extension: fileExtension,
            path: props.path,
            comment: fileCommentRef.current.value
        })
        //create file,then redirect user to edit page to contuinue the creation
        await fetch('/api/file',
            {
                method: "POST",
                body: JSON.stringify({
                    name: fileRef.current.value + fileExtension,
                    extension: fileExtension,
                    path: props.path,
                    comment: fileCommentRef.current.value
                })
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("created")
                setSnackbarOpen(true)
                setFileDialog(false)
                props.fetchData()
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
        await fetch('/api/folder',
            {
                method: "POST",
                body: JSON.stringify({
                    name: folderRef.current.value,
                    path: props.path,
                    comments: folderCommentRef.current.value
                })
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("created")
                setSnackbarOpen(true)
                setFolderDialog(false)
                props.fetchData()
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
                    extension: '.' + targetFile.name.split('.').slice(-1)[0],//extension
                    base64String: base64String,
                    path: props.path,
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
                body: JSON.stringify({ ...file, comments: confirmFileCommentRef.current.value })
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("upload success")
                setSnackbarOpen(true)
                setConfirmDialog(false)
                props.fetchData()
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

    const saveComments = async () => {
        setLoading(true)
        await fetch('/api/folder',
            {
                method: "PUT",
                body: JSON.stringify({ comment: commentsRef.current.value, path: props.path })
            }).then(res => {
                setSnackbarSeverity("success")
                setSnackbarMessage("upload success")
                setSnackbarOpen(true)
                props.fetchData()
            }).catch(err => {
                setSnackbarSeverity("error")
                setSnackbarMessage("Error!" + err.message)
                setSnackbarOpen(true)
            }).finally(() => {
                setCommentsDialog(false)
                setLoading(false)
            })
    }

    const apitest = async () => {
        //console.log(props.path)
        await fetch(`/api/folder?path=java`,)
            .then(async (res) => {
                const a = await res.json()
                console.log(a)
                setSnackbarSeverity("success")
                setSnackbarMessage("upload success")
                setSnackbarOpen(true)
            })
    }

    const renderOption = (props, option, state) => {
        console.log(props, option)
        return (

            <li {...props} key={option.extension} >
                <Tooltip title={option.extension} placement="right">
                    <div>{option.displayName}</div>
                </Tooltip>
            </li>


        );
    };

    return (

        <div>
            <div className="toolbar">

                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => setFileDialog(true)}><PiFilePlusBold />Create File</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => setFolderDialog(true)}><PiFolderPlusBold />Create Folder</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => { uploadButtonRef.current.click() }}>
                    <MdFileUpload />Upload File
                    <input ref={uploadButtonRef} type='file' accept=".jpg, .pdf, .png, .cs,.java,.py,.html,.css,.js,.php,.rb,.swift,.rs,.txt,.doc,.docx"
                        onChange={(e) => fileSelect(e)} className="HidedButton" />

                </Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => setCommentsDialog(true)}><MdComment />Edit Comment</Button>
                <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={apitest}>API test</Button>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button>
                        <BsArrowLeftSquareFill size={20} />
                        <span style={{ marginLeft: '10px' }}>
                            Last Page
                        </span>
                    </Button>
                    <Button>
                        <span style={{ marginRight: '10px' }}> Next Page</span>
                        <BsArrowRightSquareFill size={20} />
                    </Button>
                </div>
            </div>
            <Dialog

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
                                <TextField inputRef={fileRef} label="File Name" variant="outlined" sx={{ width: 200 }} />
                                <Autocomplete
                                    options={fileTypeOption}
                                    getOptionLabel={(option) => option.displayName}
                                    size="small"
                                    renderInput={params => <TextField {...params} />}
                                    renderOption={renderOption}
                                    onChange={(e, v) => { fileExtension = v?.extension ?? null }}
                                    defaultValue={fileTypeOption[0]}
                                    sx={{ width: 200, marginTop: '10px' }}
                                />
                                <TextField inputRef={fileCommentRef} label="Remarks..." variant="outlined" color="secondary" sx={{ width: 400, marginTop: '10px' }} />
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
                                <TextField inputRef={folderCommentRef} label="Comment..." variant="outlined" color="secondary" />
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
                                <div>
                                    Upload file <span style={{ fontSize: '18px' }}>
                                        {file?.name}
                                    </span>
                                    ?</div>
                                <TextField inputRef={confirmFileCommentRef} label="comment for upload file" variant="outlined" sx={{ width: 400 }} />
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
                                <TextField inputRef={commentsRef} label="Comment..." variant="outlined" color="secondary" />
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
"use client"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, Tooltip } from "@mui/material"
import { useState, useRef } from "react"
import { PiFolderPlusBold, PiFilePlusBold } from 'react-icons/pi'
import { MdComment, MdFileUpload } from 'react-icons/md'
import ApiLoading from "@/components/ApiLoading"
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import { fileTypeOption } from '@/lib/constant'
import { cyan, pink, lightGreen, purple, brown, lightBlue } from '@mui/material/colors'

export default function toolbar(props) {
    const [fileDialog, setFileDialog] = useState(false)
    const [folderDialog, setFolderDialog] = useState(false)
    const [confirmUploadDialog, setConfirmUploadDialog] = useState(false)
    const [commentsDialog, setCommentsDialog] = useState(false)
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState({})
    let fileExtension = fileTypeOption[0].extension

    const [uploadButtonRef, fileRef, folderRef, fileCommentRef, folderCommentRef, commentsRef, confirmFileCommentRef] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
    const createFile = async () => {
        setLoading(true)
        await fetch('/api/file',
            {
                method: "POST",
                body: JSON.stringify({
                    name: fileRef.current.value + fileExtension,
                    extension: fileExtension,
                    path: props.path,
                    comment: fileCommentRef.current.value,
                    base64String: btoa("")
                })
            }).then(res => {
                props.controlSnackbar(true, "success", "empty file created")
                setFileDialog(false)
                props.fetchData()
            }).catch(err => {
                props.controlSnackbar(true, "error", "Error!" + err.message)
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
                props.controlSnackbar(true, "success", "empty folder created")
                setFolderDialog(false)
                props.fetchData()
            }).catch(err => {
                props.controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setLoading(false)
            })
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

                setConfirmUploadDialog(true)
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
                props.controlSnackbar(true, "success", "file uploaded")
                setConfirmUploadDialog(false)
                props.fetchData()
            }).catch(err => {
                props.controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setFile(null)
                setLoading(false)
            })
    }
    const cancelUpload = () => {
        setFile(null)
        props.controlSnackbar(true, "warning", "Upload Cancelled")
        setConfirmUploadDialog(false)
    }
    const saveComments = async () => {
        setLoading(true)
        await fetch('/api/folder',
            {
                method: "PUT",
                body: JSON.stringify({ comments: commentsRef.current.value, path: props.path })
            }).then(res => {
                props.controlSnackbar(true, "success", "Comment Saved")
                props.fetchComments()
            }).catch(err => {
                props.controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setCommentsDialog(false)
                setLoading(false)
            })
    }
    const apitest = async () => {
        //console.log(props.path)
        await fetch(`/api/folder?path=java`)
            .then(async (res) => {
                const a = await res.json()
                console.log(a)
                props.controlSnackbar(true, "success", "uplaod success")
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
    const confirmDeleteFolder = async () => {
        setLoading(true)
        await fetch('/api/folder',
            {
                method: "DELETE",
                body: JSON.stringify({ path: props.path })
            }).then(res => {
                props.controlSnackbar(true, "success", "folder deleted")
                props.fetchData()
            }).catch(err => {
                props.controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setConfirmDeleteDialog(false)
                setLoading(false)
            })
    }

    return (

        <div>
            <div className="toolbar">

                <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: brown[400] }} onClick={() => setFileDialog(true)}><PiFilePlusBold />Create File</Button>
                <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: lightBlue[400] }} onClick={() => setFolderDialog(true)}><PiFolderPlusBold />Create Folder</Button>
                <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: cyan[400] }} onClick={() => { uploadButtonRef.current.click() }}>
                    <MdFileUpload />Upload File
                    <input ref={uploadButtonRef} type='file' accept=".jpg, .pdf, .png, .cs,.java,.py,.html,.css,.js,.php,.rb,.swift,.rs,.txt,.doc,.docx"
                        onChange={(e) => fileSelect(e)} className="HidedButton" />

                </Button>
                <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: pink[400] }} onClick={() => setConfirmDeleteDialog(true)}>Delete</Button>
                <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: lightGreen[400] }} onClick={() => setCommentsDialog(true)}><MdComment />Edit Comment</Button>
                <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: purple[400] }} onClick={apitest}>API test</Button>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => props.lastPage()} variant="contained" style={{ marginRight: '5px', backgroundColor: purple[400] }}>
                        <BsArrowLeftSquareFill size={20} />
                        <span style={{ marginLeft: '10px' }}>
                            Last Page
                        </span>
                    </Button>
                    <Button onClick={() => props.nextPage()} variant="contained" style={{ marginLeft: '5px', backgroundColor: purple[400] }}>
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
                open={confirmUploadDialog}
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
                                <TextField inputRef={commentsRef} label="Comment" variant="outlined" color="secondary" multiline rows={4} fullWidth defaultValue={props.comments} />
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
                                Delete folder <span style={{ fontSize: '24px', fontWeight: '200', color: 'red' }}>{props.path.split('/').pop()}</span> will delete all Folders And Files inside it!
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmDeleteDialog(false)}>Cancel</Button>
                                <Button onClick={confirmDeleteFolder}>Confirm</Button>
                            </DialogActions>
                        </div>
                }

            </Dialog>
        </div>

    )
}
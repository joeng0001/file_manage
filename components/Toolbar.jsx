"use client"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, Tooltip } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import { PiFolderPlusBold, PiFilePlusBold } from 'react-icons/pi'
import { MdComment, MdFileUpload } from 'react-icons/md'
import ApiLoading from "@/components/ApiLoading"
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import { fileTypeOption } from '@/lib/constant'
import { cyan, pink, lightGreen, purple, brown, lightBlue, blueGrey } from '@mui/material/colors'
import Snackbar from "@/components/Snackbar"
import { useRouter, useSearchParams, useParams } from "next/navigation"
export default function toolbar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = useParams()
    const path = params.path.join('/')
    let fileExtension = fileTypeOption[0].extension
    const page = searchParams.get('page')

    const [fileDialog, setFileDialog] = useState(false)
    const [folderDialog, setFolderDialog] = useState(false)
    const [confirmUploadDialog, setConfirmUploadDialog] = useState(false)
    const [commentsDialog, setCommentsDialog] = useState(false)
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState({})

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [comments, setComments] = useState("")

    const nextPage = () => {
        router.push(`/folderViewer/${path}?page=${page * 1 + 1}`)
    }
    const lastPage = () => {
        if (page <= 1) return null
        router.push(`/folderViewer/${path}?page=${page * 1 - 1}`)
    }

    const controlSnackbar = (open, severity, message) => {
        setSnackbarSeverity(severity)
        setSnackbarMessage(message)
        setSnackbarOpen(open)
    }

    const fetchComments = async () => {
        const res = await fetch(`/api/folder?path=${path}&page=${page}`)
        const real_res = await res.json()
        setComments(real_res.comments)
    }
    useEffect(() => {
        fetchComments()
    }, [page])

    const [uploadButtonRef, fileRef, folderRef, fileCommentRef, folderCommentRef, commentsRef, confirmFileCommentRef] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
    const createFile = async () => {
        setLoading(true)
        await fetch('/api/file',
            {
                method: "POST",
                body: JSON.stringify({
                    name: fileRef.current.value + fileExtension,
                    extension: fileExtension,
                    path: path,
                    comment: fileCommentRef.current.value,
                    base64String: btoa("")
                })
            }).then(res => {
                controlSnackbar(true, "success", "empty file created")
                setFileDialog(false)
                router.refresh();
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
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
                    path: path,
                    comments: folderCommentRef.current.value
                })
            }).then(res => {
                controlSnackbar(true, "success", "empty folder created")
                setFolderDialog(false)
                router.refresh();
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setLoading(false)
            })
    }
    const fileSelect = async (e) => {
        if (e.target.files) {
            const targetFile = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async () => {
                let base64String = reader.result.split(',')[1];
                setFile({
                    name: targetFile.name,
                    extension: '.' + targetFile.name.split('.').slice(-1)[0],//extension
                    base64String: base64String,
                    path: path,
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
                controlSnackbar(true, "success", "file uploaded")
                setConfirmUploadDialog(false)
                router.refresh();
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setFile(null)
                setLoading(false)
            })
    }
    const cancelUpload = () => {
        setFile(null)
        controlSnackbar(true, "warning", "Upload Cancelled")
        setConfirmUploadDialog(false)
    }
    const saveComments = async () => {
        setLoading(true)
        await fetch('/api/folder',
            {
                method: "PUT",
                body: JSON.stringify({ comments: commentsRef.current.value, path: path })
            }).then(res => {
                controlSnackbar(true, "success", "Comment Saved")
                fetchComments()
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setCommentsDialog(false)
                setLoading(false)
            })
    }
    const renderOption = (props, option, state) => {
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
                body: JSON.stringify({ path: path })
            }).then(res => {
                controlSnackbar(true, "success", "folder deleted")
                router.refresh()
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setConfirmDeleteDialog(false)
                setLoading(false)
            })
    }

    return (
        <>
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
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => lastPage()} variant="contained" style={{ marginRight: '5px', backgroundColor: purple[400] }}>
                        <BsArrowLeftSquareFill size={20} />
                        <span style={{ marginLeft: '10px' }}>
                            Last Page
                        </span>
                    </Button>
                    <Button onClick={() => nextPage()} variant="contained" style={{ marginLeft: '5px', backgroundColor: purple[400] }}>
                        <span style={{ marginRight: '10px' }}> Next Page</span>
                        <BsArrowRightSquareFill size={20} />
                    </Button>
                </div>
                <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: blueGrey[400] }} onClick={() => router.back()}><MdComment />Back</Button>
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
                                <TextField inputRef={commentsRef} label="Comment" variant="outlined" color="secondary" multiline rows={4} fullWidth defaultValue={comments} />
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
                                Delete folder <span style={{ fontSize: '24px', fontWeight: '200', color: 'red' }}>{path.split('/').pop()}</span> will delete all Folders And Files inside it!
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmDeleteDialog(false)}>Cancel</Button>
                                <Button onClick={confirmDeleteFolder}>Confirm</Button>
                            </DialogActions>
                        </div>
                }
            </Dialog>
            <Snackbar setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} />
        </>
    )
}
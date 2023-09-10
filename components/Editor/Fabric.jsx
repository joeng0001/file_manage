"use client"
import { useState, useEffect, useRef } from 'react';
import { MdComment } from 'react-icons/md'

import ApiLoading from "@/components/ApiLoading"
import { fabric } from "fabric"
import { pink, lightGreen, } from '@mui/material/colors'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from '@mui/material'
import Snackbar from '@/components/Snackbar'
import { useRouter } from 'next/navigation';
export default function ck(props) {
    const router = useRouter()
    const path = props.path
    const name = props.name
    const type = props.type
    const [canvasSub, setCanvasSub] = useState(null)
    const [commentsDialog, setCommentsDialog] = useState(false)
    const [comments, setComments] = useState("Loading...")
    const [canvasRef, colorRef, widthRef, clearRef] = [useRef(), useRef(), useRef(), useRef()]
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const controlSnackbar = (open, severity, message) => {
        setSnackbarSeverity(severity)
        setSnackbarMessage(message)
        setSnackbarOpen(open)
    }
    const saveChange = async () => {
        const base64String = canvasSub.toDataURL(`image/${type}`)
        await fetch('/api/file',
            {
                method: "PUT",
                body: JSON.stringify({
                    name,
                    type,
                    path,
                    base64String: base64String.replace(/^data:image\/\w+;base64,/, '')
                })
            }).then(res => {
                controlSnackbar(true, "success", "file uploaded")
                fetchFileContent()
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            })
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
            .then(async res => {
                const byteCharacters = atob(res.content);
                initCanvas(byteCharacters)
            })
            .catch(e => {
                console.error(e)
                //controlSnackbar(true, 'error', e.message)
            });
    }
    const initCanvas = (byteCharacters) => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
        });
        setCanvasSub(canvas)
        canvas.freeDrawingBrush.color = 'black';
        canvas.freeDrawingBrush.width = 5;
        // init image
        const binaryString = byteCharacters
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: `image/${type}` });
        const url = URL.createObjectURL(blob)
        fabric.Image.fromURL(url, (img) => {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height
            });
        });
        // config toobar element
        colorRef.current.addEventListener('change', function (e) {
            canvas.freeDrawingBrush.color = e.target.value;
        });

        widthRef.current.addEventListener('change', function (e) {
            canvas.freeDrawingBrush.width = parseInt(e.target.value, 10);
        });

        clearRef.current.addEventListener('click', function (e) {
            console.log("clearing")
            canvas.clear()
            //reset the image
            fabric.Image.fromURL(url, (img) => {
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height
                });
            });

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
                //fetchFileContent()
                router.back()
            }).catch(err => {
                controlSnackbar(true, "error", "Error!" + err.message)
            }).finally(() => {
                setConfirmDeleteDialog(false)
                setLoading(false)
            })
    }
    const fetchComments = async () => {
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
                setComments(res.comments)
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
    useEffect(() => {
        fetchFileContent()
        fetchComments()
    }, [])
    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <canvas
                    ref={canvasRef}
                    width={1400}
                    height={700}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <label >Color:</label>
                <input type="color" ref={colorRef} />
                <label >Brush width:</label>
                <input type="number" defaultValue={5} ref={widthRef} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <Button variant="contained" color="error" ref={clearRef} style={{ marginRight: '10px' }}>Clear</Button>
                <Button variant="contained" onClick={saveChange} color="secondary" style={{ marginRight: '10px' }}>Save</Button>
                <Button variant="contained" style={{ backgroundColor: lightGreen[400], marginRight: '10px' }} onClick={() => setCommentsDialog(true)}><MdComment />Edit Comment</Button>
                <Button variant="contained" style={{ backgroundColor: pink[400], marginRight: '10px' }} onClick={() => setConfirmDeleteDialog(true)}>Delete</Button>
            </div>
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
    )
}   
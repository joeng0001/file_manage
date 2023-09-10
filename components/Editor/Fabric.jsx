"use client"
import { useState, useEffect, useRef } from 'react';
import { MdComment } from 'react-icons/md'

import ApiLoading from "@/components/ApiLoading"
import { fabric } from "fabric"
import { pink, lightGreen, } from '@mui/material/colors'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from '@mui/material'
export default function ck(props) {

    const path = props.path
    const name = props.name
    const type = props.type
    const [canvasSub, setCanvasSub] = useState(null)
    const [commentsDialog, setCommentsDialog] = useState(false)
    const [canvasRef, colorRef, widthRef, clearRef] = [useRef(), useRef(), useRef(), useRef()]
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const saveChange = async () => {
        console.log("saving")
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
    useEffect(() => {
        fetchFileContent()
    }, [])
    return (
        <div >
            <canvas
                id='canvas-id'
                ref={canvasRef}
                width={1400}
                height={700}
                onChange={() => { console.log("canvas changing") }}

            />
            <div>
                <label htmlFor="color">Color:</label>
                <input type="color" id="color" ref={colorRef} />
                <label htmlFor="brush-width">Brush width:</label>
                <input type="number" id="brush-width" defaultValue={5} ref={widthRef} />
                <Button variant="contained" id="clear-canvas" color="error" ref={clearRef}>Clear</Button>
                <Button variant="contained" onClick={saveChange} color="secondary">Save</Button>
                <Button variant="contained" style={{ backgroundColor: lightGreen[400] }} onClick={() => setCommentsDialog(true)}><MdComment />Edit Comment</Button>
                <Button variant="contained" style={{ backgroundColor: pink[400] }} onClick={() => setConfirmDeleteDialog(true)}>Delete</Button>
            </div>
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
        </div>
    )
}   
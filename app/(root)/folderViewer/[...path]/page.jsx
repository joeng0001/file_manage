"use client"
import { Grid, Box } from "@mui/material"
import Link from "next/link"
import Toolbar from "@/components/Toolbar"
import { FcOpenedFolder, FcFile } from "react-icons/fc"
import { useEffect, useState } from 'react'
import ApiLoading from "@/components/ApiLoading"
import Snackbar from "@/components/Snackbar"
import { useRouter } from "next/navigation"

export default function fileList({ params, searchParams }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [fileList, setFileList] = useState([])
    const [folderList, setFolderList] = useState([])

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [comments, setComments] = useState("")

    const pathsList = params?.path
    const page = searchParams?.page

    const nextPage = () => {
        router.push(`/folderViewer/${pathsList.join('/')}?page=${page * 1 + 1}`)
    }
    const lastPage = () => {
        if (page <= 1) return null
        router.push(`/folderViewer/${pathsList.join('/')}?page=${page * 1 - 1}`)
    }

    const controlSnackbar = (open, severity, message) => {
        setSnackbarSeverity(severity)
        setSnackbarMessage(message)
        setSnackbarOpen(open)
    }

    const fetchData = async () => {
        setLoading(true)
        const res = await fetch(`/api/folder?path=${pathsList.join('/')}&page=${page}`)
        const real_res = await res.json()
        setFileList(() => real_res?.list?.filter(item => !item.isFolder) ?? [])
        setFolderList(() => real_res?.list?.filter(item => item.isFolder) ?? [])
        setLoading(false)
    }

    const fetchComments = async () => {
        const res = await fetch(`/api/folder?path=${pathsList.join('/')}&page=${page}`)
        const real_res = await res.json()
        setComments(real_res.comments)
    }
    useEffect(() => {
        fetchData()
        fetchComments()
    }, [page])
    return (
        <div className="homeBackGround">
            <div className="GridContainer">
                {
                    loading ?
                        <ApiLoading /> :

                        <>
                            <Grid container>
                                {
                                    folderList?.map(folder => (
                                        <Grid item xs={4} key={folder.name}>
                                            <Link href={`/folderViewer/${folder.path}/${folder.name}/?page=1`} className="disableLinkStyle" >
                                                <Box className="Box">
                                                    <FcOpenedFolder size={40} />
                                                    <div style={{ marginTop: '10px' }}>{folder.name}</div>
                                                </Box>
                                            </Link>
                                        </Grid>
                                    ))
                                }

                                {
                                    fileList?.map(file => (
                                        <Grid item xs={4} key={file.name}>
                                            <Link href={`/fileViewer/${file.viewType}/${file.path}?name=${file.name}&type=${file.type}`} className="disableLinkStyle" >
                                                <Box className="Box">
                                                    <FcFile size={40} />
                                                    <div style={{ marginTop: '10px' }}>{file.name}</div>
                                                </Box>
                                            </Link>
                                        </Grid>
                                    ))
                                }
                                {
                                    (folderList?.length > 0 || fileList?.length > 0) ? <></> : <div style={{
                                        display: 'flex', justifyContent: 'center', width: '100%'
                                    }}>Empty Folder</div>
                                }
                            </Grid>
                            <Toolbar path={pathsList.join("/")} fetchData={fetchData} controlSnackbar={controlSnackbar} nextPage={nextPage} lastPage={lastPage} comments={comments} fetchComments={fetchComments} />
                        </>
                }

            </div>
            <Snackbar setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} />
        </div>
    )
}
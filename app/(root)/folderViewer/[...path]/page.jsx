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


    const pathsList = params?.path
    const page = searchParams?.page
    //console.log(params,searchParams)
    //console.log(item)

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
        console.log(real_res)
        setFileList(() => real_res?.list?.filter(item => !item.isFolder) ?? [])
        setFolderList(() => real_res?.list?.filter(item => item.isFolder) ?? [])
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [page])
    // prompt dialog ,get name  and create file ,then redirect to that page
    return (
        <div className="homeBackGround">
            {
                (folderList && fileList) ? <></> : <div style={{
                    display: 'flex', justifyContent: 'center', width: '100%'
                }}>Empty Folder</div>
            }
            <div className="GridContainer">
                {
                    loading ?
                        <ApiLoading /> :

                        <>
                            <Grid container>
                                {
                                    folderList?.map(folder => (
                                        <Grid item xs={4} key={folder.name}>
                                            <Link href={`/folderViewer/${folder.path}/${folder.name}/?page=1`} className="disableLinkStyle">
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
                                            <Link href={`/fileViewer/${file.viewType}/${file.path}?name=${file.name}&type=${file.type}`} className="disableLinkStyle">
                                                <Box className="Box">
                                                    <FcFile size={40} />
                                                    <div style={{ marginTop: '10px' }}>{file.name}</div>
                                                </Box>
                                            </Link>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            <Toolbar path={pathsList.join("/")} fetchData={fetchData} controlSnackbar={controlSnackbar} nextPage={nextPage} lastPage={lastPage} />
                        </>
                }

            </div>
            <Snackbar setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} />
        </div>
    )
}
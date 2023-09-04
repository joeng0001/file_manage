"use client"
import { Grid, Box } from "@mui/material"
import Link from "next/link"
import Toolbar from "@/components/Toolbar"
import { FcOpenedFolder, FcFile } from "react-icons/fc"
import { useEffect, useState } from 'react'
import ApiLoading from "@/components/ApiLoading"
export default function fileList({ params, searchParams }) {
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [folderList, setFolderList] = useState([])
    const pathsList = params?.path
    const page = searchParams?.page
    //console.log(params,searchParams)
    //console.log(item)

    //const [fileList, folderList] = [res.fileList, res.folderList]


    const fetchData = async () => {
        setLoading(true)
        const res = await fetch(`/api/folder?path=${pathsList.join('/')}`)
        const real_res = await res.json()
        console.log(real_res)
        setFileList(real_res.fileList)
        setFolderList(real_res.folderList)
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])
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
                                    folderList.map(folder => (
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
                                    fileList.map(file => (
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
                            <Toolbar path={pathsList.join("/")} fetchData={fetchData} />
                        </>
                }
            </div>
        </div>
    )
}
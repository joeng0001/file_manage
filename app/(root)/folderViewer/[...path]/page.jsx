"use client"
import { Grid, Box } from "@mui/material"
import Link from "next/link"
import Toolbar from "@/components/Toolbar"
import { FcOpenedFolder, FcFile } from "react-icons/fc"
import { useEffect, useState } from 'react'
import ApiLoading from "@/components/ApiLoading"
export default function fileList({ params, searchParams }) {
    const [loading, setLoading] = useState(false)
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
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])
    // prompt dialog ,get name  and create file ,then redirect to that page
    return (
        <div className="homeBackGround">
            <div className="GridContainer">
                {
                    loading ?
                        <ApiLoading /> :

                        <>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Link href="/folderViewer/csharp/?page=1" className="disableLinkStyle">
                                        <Box className="Box">
                                            <FcOpenedFolder size={40} />
                                            <div>C#</div>
                                        </Box>
                                    </Link>
                                </Grid>
                                <Grid item xs={4}>
                                    <Link href="/folderViewer/csharp/?page=1" className="disableLinkStyle">
                                        <Box className="Box">
                                            <FcFile size={40} />
                                            <div>C#</div>
                                        </Box>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Toolbar path={pathsList.join("/")} />
                        </>
                }
            </div>
        </div>
    )
}
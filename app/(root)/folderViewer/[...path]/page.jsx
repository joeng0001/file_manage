import { Grid, Box } from "@mui/material"
import Link from "next/link"
import Toolbar from "@/components/Toolbar"
import { FcOpenedFolder, FcFile } from "react-icons/fc"

export default function fileList({ params, searchParams }) {
    const paths = params?.path
    const page = searchParams?.page
    //console.log(params,searchParams)
    //console.log(item)

    const folderList = []
    const fileList = []

    // prompt dialog ,get name  and create file ,then redirect to that page
    return (
        <div className="homeBackGround">
            <div style={{ display: 'flex' }}>
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
                <Toolbar path={paths.join("/")} />
            </div>

        </div>
    )
}
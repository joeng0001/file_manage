import { Grid, Box} from "@mui/material"
import Link from "next/link"
import Toolbar from "@/components/Toolbar"
export default function fileList({ params, searchParams }) {

    const types = params?.type
    const page = searchParams?.page
    const level = types.length
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
                                <div>C#</div>
                            </Box>
                        </Link>
                    </Grid>
                </Grid>
                <Toolbar path={types.join("/")}/>
            </div>

        </div>
    )
}
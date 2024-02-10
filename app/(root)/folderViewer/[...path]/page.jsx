import { Grid, Box } from "@mui/material"
import Link from "next/link"
import Toolbar from "@/components/Toolbar"
import { FcOpenedFolder, FcFile } from "react-icons/fc"
import Folder from "@/models/folder";
import {
    connectToDB,
    createRootFolderIfNotExist,
    getFolder,
} from "@/lib/database";
import { extension2typeDictionary, extension2viewType } from "@/lib/constant";

const getList = async (pathList, page) => {
    try {
        await connectToDB();
        await createRootFolderIfNotExist(pathList[0]);
        const folder = await getFolder(pathList, 1, pathList.length);
        await Folder.findByIdAndUpdate(folder._id, { lastViewAt: new Date() });
        const fileList =
            folder?.fileList?.map((file) => {
                return {
                    name: file.name,
                    path: file.path,
                    viewType: extension2viewType[file.extension],
                    type: extension2typeDictionary[file.extension],
                };
            }) ?? [];
        const folderList =
            folder?.folderList?.map((folder) => {
                return { name: folder.name, path: folder.path };
            }) ?? [];
        return [folderList.slice(9 * (page - 1), 9 * page), fileList.slice(9 * (page - 1), 9 * page)]
    } catch (error) {
        return [[], []]
    }
}

export default async function fileList({ params, searchParams }) {
    const pathsList = params?.path
    const page = searchParams?.page
    let [folderList, fileList] = await getList(pathsList, page)
    return (
        <div className="homeBackGround">
            <div className="GridContainer">
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
                <Toolbar />
            </div>
        </div>
    )
}
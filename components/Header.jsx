"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { AppBar, Toolbar, IconButton, Typography, Autocomplete, TextField, Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Tooltip } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { styled, } from '@mui/material/styles';
import Link from "next/link";
import dynamic from "next/dynamic";


import { FcFolder, FcDocument, FcHome, FcAbout } from "react-icons/fc"
import { ImFilesEmpty } from "react-icons/im"
import { PiFoldersBold } from "react-icons/pi"
import { RiArrowGoBackFill } from "react-icons/ri"
import { BiLogOut } from "react-icons/bi"
import { IoReload } from "react-icons/io5"
const UserButton = dynamic(() => import('@clerk/nextjs').then((module) => module.UserButton), {
    ssr: false,
})
const SignOutButton = dynamic(() => import('@clerk/nextjs').then((module) => module.SignOutButton), {
    ssr: false,
})
export default function header() {
    const router = useRouter()

    const [loadingSearchList, setLoadingSearchList] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [options, setOptions] = useState([])
    const [recentFileList, setRecentFileList] = useState([])
    const [recentFolderList, setRecentFolderList] = useState([])
    // Create a custom styled component for the dropdown list

    const renderOption = (props, option, state) => {
        const backgroundColor = option.label === 'file' ? 'lightgray' : 'darkgray'; // Customize background color based on option type

        return (


            <li {...props} key={option.id} style={{ backgroundColor, borderBottom: '1px solid gray' }} >
                <Tooltip title={option.path ?? 'path not provided'} placement="right">
                    <div>
                        <span style={{ fontWeight: 600 }}>
                            [{option.label}]
                        </span>

                        &nbsp;{option.name}</div>
                </Tooltip>
            </li>


        );
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const initOptionsList = async () => {
        setLoadingSearchList(true)
        const res = await fetch(`/api/searchList`,)
        const real_res = await res.json()

        setOptions([
            ...real_res.files.map((file) => {
                return {
                    label: 'file',
                    ...file
                }
            }),
            ...real_res.folders.map((folder) => {
                return {
                    label: 'folder',
                    ...folder
                }
            })
        ])
        setLoadingSearchList(false)
    }

    const initRecentViewList = async () => {
        const res = await fetch(`/api/recentView`,)
        const real_res = await res.json()
        setRecentFolderList(real_res.folderList)
        setRecentFileList(real_res.fileList)
    }

    useEffect(() => {
        initOptionsList()
        initRecentViewList()
    }, [])
    return (
        <div>

            <Box sx={{ display: 'flex', flexGrow: 1 }}>

                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={() => setDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            File Manage
                        </Typography>
                        <SearchIcon style={{ marginLeft: '5px' }} />

                        <Autocomplete
                            getOptionLabel={(option) => option.name}
                            renderOption={renderOption}
                            options={options}
                            size="small"
                            renderInput={params => <TextField  {...params} placeholder="Search" />}
                            className="Search_TextField"
                            onOpen={() => initOptionsList()}
                            noOptionsText={loadingSearchList ? "Loading..." : "no options available"}
                            onChange={(e, option) => router.push(
                                option.label === 'folder' ?
                                    `/folderViewer/${option.path}/${option.name}` :
                                    `/fileViewer/${option.viewType}/${option.path}?name=${option.name}&type=${option.type}`

                            )}
                        />
                        <Box sx={{ flexGrow: 1 }} />

                        <UserButton afterSignOutUrl="/" />
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor={'left'}
                open={drawer}
                sx={{
                    width: 320,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 320,
                        boxSizing: 'border-box',
                    },
                }}
                onClose={() => setDrawer(false)}
            >
                <DrawerHeader>
                    <IconButton onClick={() => setDrawer(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link href="/" className="disableLinkStyle" style={{ color: 'black' }}>
                        <ListItem disablePadding>

                            <ListItemButton>
                                <ListItemIcon>
                                    <FcHome />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItemButton>

                        </ListItem>
                    </Link>
                    <ListItem disablePadding onClick={() => router.back()}>
                        <ListItemButton>
                            <ListItemIcon>
                                <RiArrowGoBackFill />
                            </ListItemIcon>
                            <ListItemText primary={"Back to last page"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding onClick={initRecentViewList}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PiFoldersBold />
                            </ListItemIcon>
                            <ListItemText primary={"Recent Viewed Folder"} />

                            <IoReload />
                        </ListItemButton>
                    </ListItem>
                    {
                        recentFolderList.map(folder => {
                            return (
                                <Link key={folder.path + folder.name} href={`/folderViewer/${folder.path}/${folder.name}?page=1`} className="disableLinkStyle" style={{ color: 'black' }}>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <FcFolder />
                                            </ListItemIcon>
                                            <ListItemText primary={folder.name} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            )
                        })
                    }


                </List>
                <Divider />
                <List>
                    <ListItem disablePadding onClick={initRecentViewList}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ImFilesEmpty />
                            </ListItemIcon>
                            <ListItemText primary={"Recent Viewed File"} />
                            <IoReload />

                        </ListItemButton>
                    </ListItem>
                    {
                        recentFileList.map(file => {
                            return (
                                <Link key={file.path + file.name} href={`/fileViewer/${file.viewType}/${file.path}?name=${file.name}&type=${file.type}`} className="disableLinkStyle" style={{ color: 'black' }}>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <FcDocument />
                                            </ListItemIcon>
                                            <ListItemText primary={file.name} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            )
                        })
                    }

                </List>
                <Box sx={{ flexGrow: 1, flexDirection: 'column' }} />
                <List style={{ marginBottom: '10px' }}>
                    <Link href="/about" className="disableLinkStyle" style={{ color: 'black' }}>
                        <ListItem disablePadding>
                            <ListItemButton>

                                <ListItemIcon>
                                    <FcAbout />
                                </ListItemIcon>
                                <ListItemText primary={"about"} />

                            </ListItemButton>

                        </ListItem>
                    </Link>
                    <ListItem disablePadding >
                        <SignOutButton
                            signOutCallback={() => router.push('/sign-in')}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <BiLogOut />
                                </ListItemIcon>
                                <ListItemText primary={"sign out"} />
                            </ListItemButton>
                        </SignOutButton>
                    </ListItem>
                </List>


            </Drawer>
            <DrawerHeader />
        </div>
    )
}
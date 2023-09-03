"use client"

import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { AppBar, Toolbar, IconButton, Typography, Autocomplete, TextField, Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Tooltip } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import InboxIcon from "@mui/icons-material/Inbox"
import { styled, useTheme } from '@mui/material/styles';
import Link from "next/link";
import dynamic from "next/dynamic";
const UserButton = dynamic(() => import('@clerk/nextjs').then((module) => module.UserButton), {
    ssr: false,
})
const SignOutButton = dynamic(() => import('@clerk/nextjs').then((module) => module.SignOutButton), {
    ssr: false,
})
export default function header() {
    const router = useRouter()
    const [drawer, setDrawer] = useState(false)
    const [options, setOptions] = useState([])
    // Create a custom styled component for the dropdown list

    const renderOption = (props, option, state) => {
        const backgroundColor = option.label === 'file' ? 'lightgray' : 'darkgray'; // Customize background color based on option type

        return (


            <li {...props} key={option.id} style={{ backgroundColor }}>
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

    const searching = async (keyword) => {
        console.log("keyword", keyword)
        const res = await fetch(`/api/searchList?keyword=${keyword}`,)
        const real_res = await res.json()
        console.log(real_res)
    }
    const initOptionsList = async () => {
        console.log("init option list")
        const res = await fetch(`/api/searchList`,)
        const real_res = await res.json()

        setOptions([
            ...real_res.files.map((file) => {
                return {
                    label: 'file',
                    name: file.name,
                    id: file.id,
                    path: file.path
                }
            }),
            ...real_res.folders.map((folder) => {
                return {
                    label: 'folder',
                    name: folder.name,
                    id: folder.id,
                    path: folder.path
                }
            })
        ])

    }

    useEffect(() => {
        initOptionsList()
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
                            onOpen={initOptionsList}
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
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
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
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"hi"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"hi"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"bye"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"bye"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Box sx={{ flexGrow: 1, flexDirection: 'column' }} />
                <List>
                    <ListItem disablePadding>

                        <ListItemButton>
                            <Link href="/about" style={{ textDecoration: 'none', outline: 'none', display: 'flex' }}>
                                <ListItemIcon onClick={() => router.push('/about')}>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={"about"} />
                            </Link>
                        </ListItemButton>

                    </ListItem>
                </List>
                <List>
                    <ListItem disablePadding>
                        <SignOutButton
                            signOutCallback={() => router.push('/sign-in')}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <Image
                                        src="/assets/door.svg"
                                        alt="logout"
                                        width={24}
                                        height={24}
                                    />
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
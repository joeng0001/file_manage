"use client"

import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {useRouter} from 'next/navigation'
import {useState} from 'react'

import {AppBar,Toolbar,IconButton,Typography,Autocomplete, TextField,Box,Drawer} from "@mui/material"
import {Divider,List,ListItem,ListItemButton,ListItemText,ListItemIcon} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import  SearchIcon  from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import InboxIcon from "@mui/icons-material/Inbox"
import { styled, useTheme } from '@mui/material/styles';
export default function header(){
    const router=useRouter()
    const [drawer,setDrawer]=useState(false)
    const options=[1,2,3,4]
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }));
    return(
        <div>
    
            <Box sx={{ display:'flex',flexGrow: 1 }}>
                
                <AppBar position="fixed">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={()=>setDrawer(true)}
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
                    <Autocomplete
                        options={options}
                        getOptionLabel={(option) => option.type + '-->' + option.name}
                        size="small"
                        renderInput={(params) => <TextField {...params}  />}
                    />
                    <Box sx={{ flexGrow: 1 }} /> 
                    <UserButton afterSignOutUrl="/"/>
                        
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
                onClose={()=>setDrawer(false)}
            >
                 <DrawerHeader>
                    <IconButton onClick={()=>setDrawer(false)}>
                         <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem  disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"hi"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding>
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
                    <ListItem  disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"bye"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"bye"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Box sx={{ flexGrow: 1,flexDirection:'column' }} />
                <List>
                    <ListItem  disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"seek help"} />
                        </ListItemButton>
                    </ListItem>
                </List>    
                <List>
                    <ListItem  disablePadding>
                    <SignOutButton
                        signOutCallback={()=>router.push('/sign-in')}
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
            <DrawerHeader/>
        </div>
    )
}
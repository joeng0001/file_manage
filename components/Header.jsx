"use client"

import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {useRouter} from 'next/navigation'

import {AppBar,Toolbar,IconButton,Typography,Search,SearchIcon,StyledInputBase,Box,Drawer} from "@mui/material"
import {MenuIcon,SearchIcon} from "@mui/icons"
export default function header(){
    const router=useRouter()
    const [drawer,setDrawer]=useState(false)


    return(
        <div>
            <UserButton afterSignOutUrl="/"/>
            <SignOutButton
                signOutCallback={()=>router.push('/sign-in')}
                >
                <Image
                    src="/assets/door.svg"
                    alt="logout"
                    width={24}
                    height={24}
                    />
            </SignOutButton>
            this is header
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
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
                    <Search>
                        <SearchIcon />
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor={'left'}
                open={drawer}
                onClose={()=>setDrawer(false)}
            >
                <div>inside</div>
            </Drawer>
        </div>
    )
}
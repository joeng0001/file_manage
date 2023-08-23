import { SignUp } from "@clerk/nextjs";
import {Box} from '@mui/material'

export default function Page() {
  return (

      <Box
        sx={{

          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column',
        }}
      >
        <div className="signUpTitle"> 
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        SIGN UP TO CONTINUE</div>
        <SignUp />;
      </Box>

  )
  
  
  
 
}
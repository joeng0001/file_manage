import { SignIn } from "@clerk/nextjs";
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
        <div className="signInTitle"> 
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          SIGN IN TO CONTINUE
        </div>
        <SignIn />;
      </Box>

  )
  
  
  
 
}
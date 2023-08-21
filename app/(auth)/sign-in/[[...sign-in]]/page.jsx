import { SignIn } from "@clerk/nextjs";
import {Box} from '@mui/material'
import {grey} from '@mui/material/colors'

export default function Page() {
  return (
    <div className="loginPageBackground">
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: grey[900],
          '&:hover': {
            backgroundColor: grey[800],
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <SignIn />;
      </Box>
    </div>
  )
  
  
  
 
}
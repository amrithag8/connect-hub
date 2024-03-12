import { Box, Button, Container, TextField } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from "@mui/styles";
import { axiosInstance } from '../utils/interceptor';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles({
    formStyle: {
      
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      border: "1px solid #D7D7D7",
      padding:"40px",
    },
  
    
    boxStyle: {
      width: "100%",
      height: "100vh",
      textAlign: "center",
      
  
      
    },
    
  });



function EmailVerifyPage() {
    const Navigate=useNavigate();
    const[userEmail, setUserEmail]=useState();

const verificationHandler=async()=>{
   try {
    const response=await axiosInstance("/users/verify-email", {
        method:"POST",
        data:{userEmail}
    })
    Navigate("/otp");
   } catch (error) {
    alert(error.response.data.message);
   }


}

    const classes = useStyles();
  return (
    <Box className={classes.boxStyle}>
        <h1 style={{marginTop:"100px"}}>Connect App</h1>
        <Container maxWidth="xs" >
      <Box className={classes.formStyle}>
        <h3>Verification</h3>
        <TextField
          
          id="outlined-basic"
          label="Email/Username"
          variant="outlined"
          fullWidth
          onChange={(e)=>setUserEmail(e.target.value)}
          
        />
        
        <Button
          sx={{ textTransform: "none", fontSize: "18px", marginBottom:"40px" }}
          
          variant="contained"
          fullWidth
          onClick={verificationHandler}
        >
          Continue
        </Button>
        
      </Box>
      </Container>
      
    </Box>
  )
}

export default EmailVerifyPage

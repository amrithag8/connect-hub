import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { axiosInstance } from "../utils/interceptor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


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

export const ResetPassword = () => {
  const Navigate=useNavigate();
const[newResetPass, setNewResetPass]=useState();
const[confirmResetPass, setConfirmResetPass]=useState();
  const resetpassHandler=async()=>{
    try {
      
      if(newResetPass===confirmResetPass){
        const response=await axiosInstance("/users/reset-pass", {
          method:"POST",
          data:{newResetPass }
        })
        Navigate("/login");
      }
      else{
        alert("Both passwords are different");
      }
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
        <h3>Reset Password</h3>

        
        <TextField
        
          className={classes.textStyle}
          id="outlined-basic"
          label="New password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e)=>setNewResetPass(e.target.value)}
        />
        
        
        <TextField
          className={classes.textStyle}
          id="outlined-basic"
          label="Confirm password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e)=>setConfirmResetPass(e.target.value)}
        />
        
        
        <Button
          sx={{ textTransform: "none", fontSize: "18px", marginBottom:"40px" }}
          className={classes.textStyle}
          variant="contained"
          fullWidth
          onClick={resetpassHandler}
        >
          Submit
        </Button>
        </Box>
        
      </Container>
      
      
    </Box>
  );
};

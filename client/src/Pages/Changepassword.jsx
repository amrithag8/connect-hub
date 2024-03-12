import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { axiosInstance } from "../utils/interceptor";
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

export const ChangePassword = () => {
  const Navigate=useNavigate();
  const[currentPass, setCurrentPass]=useState();
  const[newPass, setNewPass]=useState();
  const[confirmNewPass, setConfirmNewPass]=useState();
  const classes = useStyles();
const passwordChangeHandler=async()=>{
  try {
    if(newPass===confirmNewPass){
      const response=await axiosInstance("/users/change-pass",{
        method:"POST",
        data:{currentPass,newPass }
      });
      alert(response.data.message);
      Navigate("/");
    }
    else{
      alert("Passowrds does not match");
    }
    
  } catch (error) {
   alert(error.response.data.message); 
  }
}

  return (
    <Box className={classes.boxStyle}>
        <h1 style={{marginTop:"100px"}}>Connect App</h1>
        <Container maxWidth="xs" >
      <Box className={classes.formStyle}>
        <h3>Change Password</h3>
        <TextField
          
          id="outlined-basic"
          label="Current password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e)=>setCurrentPass(e.target.value)}
        />
        <TextField
          
          id="outlined-basic"
          label="New password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e)=>setNewPass(e.target.value)}
        />
        <TextField
          
          id="outlined-basic"
          label="Confirm password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e)=>setConfirmNewPass(e.target.value)}
        />
        <Button
          sx={{ textTransform: "none", fontSize: "18px", marginBottom:"40px" }}
          
          variant="contained"
          fullWidth
          onClick={passwordChangeHandler}
        >
          Submit
        </Button>
        
      </Box>
      </Container>
      
    </Box>
  );
};

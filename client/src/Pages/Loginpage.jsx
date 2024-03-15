import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Link , Navigate, useNavigate} from "react-router-dom";
import Divider from '@mui/material/Divider';
import { axiosInstance } from "../utils/interceptor";
import { useState } from "react";

const useStyles = makeStyles({
  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding:"30px"
    
  },

  
  boxStyle: {
    width: "100%",
    height: "100vh",
    textAlign: "center",

    "& img": {
      width: "100%",
    },
  },
 
});

export const Loginpage =({setActiveUser}) => {

  const[loginUsername, setLoginUsername]=useState();
  const[loginPass, setLoginPass]=useState();
  const Navigate=useNavigate();
  

const loginHandler=async()=>{
  
  try {
    const response=await axiosInstance("/users/login", {
      method:"POST", 
      data:{
        loginUsername,
        loginPass
      }
    })
    // console.log(response.data);
    // setActiveUser(response.data);
    localStorage.setItem("AccessToken", response.data.AccessToken);
    // localStorage.setItem("username", response.data.username);
    // window.location.reload();

    setInterval(()=>{
      if(localStorage.getItem("AccessToken")){
        Navigate("/", {replace:true});
      }
    }, 5000)
    
   
    
  
  } catch (error) {
    alert(error.response.data.message);
  }

}


  const classes = useStyles();
  return (
    <Box className={classes.boxStyle} >
      <Container maxWidth="xs" sx={{border: "1px solid #D7D7D7"}}>
      <Box className={classes.formStyle} >
        <h1 style={{marginBottom:"40px"}}>Connect App</h1>

        <TextField
          fullWidth
          id="outlined-basic"
          label="Phone number, Username or Email"
          variant="outlined"
          onChange={(e)=>setLoginUsername(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e)=>setLoginPass(e.target.value)}
        />
        <Button
          sx={{ textTransform: "none", fontSize: "18px" }}
          fullWidth
          variant="contained"
          onClick={loginHandler}
        >
          Log in
        </Button>
        <h3>OR</h3>
        <p>Log in with Facebook</p>
        <Link to ="/verify-email"><h4 style={{ marginTop: "-10px", cursor:"pointer" }}>Forgot Password ?</h4></Link>
      </Box>
      </Container>
      <Container maxWidth="xs" sx={{marginTop:"10px",padding:"10px", border:"1px solid #D7D7D7"}}>
        <p>
          Don't have an account?
          <Link to="/register" style={{ color: "black" }}>
            Sign Up
          </Link>
        </p>
      </Container>
      <p>Get the app.</p>
      <img src="src/assets/image 19.png" />
    </Box>
  );
};

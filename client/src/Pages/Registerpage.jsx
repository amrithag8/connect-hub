import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { Link, Navigate } from 'react-router-dom';
import {Facebook} from '@mui/icons-material';
import { useState } from 'react';
import { axiosInstance } from '../utils/interceptor';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const useStyles=makeStyles({
    formStyle:{
        
        
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        gap:10, 
        
        padding: "0 20px",

        
    },


    boxStyle:{
width: "100%",
height: "100vh",
textAlign:"center",


"& img":{
width: "100%"
}

    },
    
})

export const Registerpage=()=>{

    const[email, setEmail]=useState();
    const[fullName, setFullName]=useState();
    const[username, setUsername]=useState();
    const[password, setPassword]=useState();
    const navigate = useNavigate();


    const signupHandler=async()=>{

try {
    const response=await axiosInstance("/users/register",{
        method:"POST",
        data:{
            email, fullName, username, password
        }
    });
    toast.success("Sign up successfull");
    
    navigate('/login');
} catch (error) {
    toast.error(error.response.data.message);
    
}
    }

    const classes=useStyles();
    return(
        <>
            <Box className={classes.boxStyle}>
                <Container maxWidth="xs" sx={{padding:"20px", border:"1px solid #D7D7D7"}}>
                    <Box className={classes.formStyle}>
                    <h1>Connect App</h1>
                    <h4 style={{ marginTop:"-10px", padding:"0 60px"}}> Sign up to see photos and videos from your friends</h4>
                    <Button sx={{textTransform: "none"}} startIcon= {<Facebook/>} fullWidth variant="contained">Log in with facebook</Button>
            <TextField fullWidth id="outlined-basic" label="Email or phone number" variant="filled" required onChange={(e)=>setEmail(e.target.value)} />
            <TextField fullWidth id="outlined-basic" label="Full Name" variant="filled" required onChange={(e)=>setFullName(e.target.value)}/>
            <TextField fullWidth id="outlined-basic" label="Username" variant="filled" required onChange={(e)=>setUsername(e.target.value)}/>
            <TextField fullWidth id="outlined-basic" label="Password" type="password" required variant="filled" onChange={(e)=>setPassword(e.target.value)}/>
            <p style={{ fontSize:"13px", color:"#6E6E6E"}}>People who use our service may have uploaded
your contact information to instagram.<span style={{color:"#005DAE"}}>Learn More</span></p>
<p style={{marginTop:"-10px", fontSize:"13px", color: "#6E6E6E", padding:"0 20px"}}>By signing up, you agree to out <span style={{color:"#005DAE"}}>Terms, Privacy
Policy</span> and <span style={{color:"#005DAE"}}> Cookies Policy</span>
</p>
            <Button sx={{textTransform: "none", fontSize:"18px"}} fullWidth variant="contained" onClick={signupHandler}>Sign up</Button>
            </Box>
            
            
            </Container>
            <Container maxWidth="xs" sx={{marginTop:"10px",padding:"10px", border:"1px solid #D7D7D7"}}><p>Have an account?<Link to="/login" style={{ color:"black" }}>Log in</Link></p></Container>
<p>Get the app.</p>
<img src="src/assets/image 19.png"/>
            
            </Box>
            </>
        
    )
}
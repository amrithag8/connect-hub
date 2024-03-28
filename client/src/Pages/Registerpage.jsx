import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Link, Navigate } from "react-router-dom";
import { Facebook } from "@mui/icons-material";
import { useState } from "react";
import { axiosInstance } from "../utils/interceptor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles({
  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    padding: "0 20px",
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

export const Registerpage = () => {
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const[validate, setValidate]=useState({
    email:true,
    fullName:true,
    username:true,
    password:true
  });
  const navigate = useNavigate();

  const signupHandler = async () => {
    try {
        if(validate.email && validate.fullName && validate.username && validate.password){

            console.log("email", email);
        console.log("username", username);
        console.log("fullname", fullName);
        console.log("password", password);
      const response = await axiosInstance("/users/register", {
        method: "POST",
        data: {
          email,
          fullName,
          username,
          password,
        },
      });
      
      alert(response.data.message);

      navigate("/login");
    }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handlesignup=async(event)=>{
    event.preventDefault();
    // console.log("event", event.target.validity.valid);
    try {
    if(validate.email && validate.fullName && validate.username && validate.password){
        console.log("email", email);
        console.log("username", username);
        console.log("fullname", fullName);
        console.log("password", password);

        const response = await axiosInstance("/users/register", {
            method: "POST",
            data: {
              email,
              fullName,
              username,
              password,
            },
          });
          
          alert(response.data.message);
    
          navigate("/login");
    }
    
  }
  catch(error){
    alert(error.response.data.message);
  }
}

  const classes = useStyles();
  return (
    <>
      <Box className={classes.boxStyle}>
        <Container
          maxWidth="xs"
          sx={{ padding: "20px", border: "1px solid #D7D7D7" }}
        >
          <Box className={classes.formStyle}>
            <h1>Connect App</h1>
            <h4 style={{ marginTop: "-10px", padding: "0 60px" }}>
              {" "}
              Sign up to see photos and videos from your friends
            </h4>
            <Button
              sx={{ textTransform: "none" }}
              startIcon={<Facebook />}
              fullWidth
              variant="contained"
            >
              Log in with facebook
            </Button>
            <form onSubmit={handlesignup}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email or username"
              type="email"
              variant="filled"
              value={email}
              name={email}
              InputProps={{
                inputProps: { pattern: "[^\\s@]+@[^\\s@]+\\.[^\\s@]+" },
              }}
              required
              onChange={(e) => {setEmail(e.target.value);
            console.log("event.target.validity.valid", e.target.validity.valid);
            setValidate((prev) => ({ ...prev, email: e.target.validity.valid }))
    }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Full Name"
              variant="filled"
              value={fullName}
              name={fullName}
              required
              inputProps={{ pattern: "^[A-Za-z]+(?: [A-Za-z]+)*$",
              title: 'This field needs to contain only alphabets',}}
              onChange={(e) => {setFullName(e.target.value);
                setValidate((prev) => ({ ...prev, fullName: e.target.validity.valid }))
            }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Username"
              variant="filled"
              value={username}
              name={username}
              required
              inputProps={{ pattern: '^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$',
              title: 'This field needs to be alphanumeric', }}
              onChange={(e) => {setUsername(e.target.value);
                setValidate((prev) => ({ ...prev, username: e.target.validity.valid }))
            }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              type="password"
              value={password}
              name={password}
              required
              variant="filled"
              onChange={(e) => {setPassword(e.target.value);
                setValidate((prev) => ({ ...prev, password: e.target.validity.valid }))
            }}
            />
            <p style={{ fontSize: "13px", color: "#6E6E6E" }}>
              People who use our service may have uploaded your contact
              information to instagram.
              <span style={{ color: "#005DAE" }}>Learn More</span>
            </p>
            <p
              style={{
                marginTop: "-10px",
                fontSize: "13px",
                color: "#6E6E6E",
                padding: "0 20px",
              }}
            >
              By signing up, you agree to out{" "}
              <span style={{ color: "#005DAE" }}>Terms, Privacy Policy</span>{" "}
              and <span style={{ color: "#005DAE" }}> Cookies Policy</span>
            </p>
            <Button
              sx={{ textTransform: "none", fontSize: "18px" }}
              fullWidth
              variant="contained"
              type="submit"
            //   onClick={signupHandler}
            >
              Sign up
            </Button>
            </form>
          </Box>
        </Container>
        <Container
          maxWidth="xs"
          sx={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #D7D7D7",
          }}
        >
          <p>
            Have an account?
            <Link to="/login" style={{ color: "black" }}>
              Log in
            </Link>
          </p>
        </Container>
        <p>Get the app.</p>
        <img src="http://localhost:3007/image 19.png" />
      </Box>
    </>
  );
};

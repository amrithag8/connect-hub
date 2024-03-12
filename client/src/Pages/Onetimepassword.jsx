import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useRef, useEffect, useState } from "react";
import { axiosInstance } from "../utils/interceptor";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    border: "1px solid #D7D7D7",
    padding: "30px",
    minHeight: "400px",
  },

  textboxStyle: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textStyle: {
    width: 40,
    height: 40,
  },
  boxStyle: {
    width: "100%",
    height: "100vh",
    textAlign: "center",
  },
}));

export const Onetimepass = () => {

  const navigate=useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const inputRefs = otp.map(() => useRef(null));

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const keyDownHandler = (index, e) => {
    if (e.key === "Backspace") {
      if (e.target.value === "") {
        if (index > 0) {
          inputRefs[index - 1].current.focus();
        }
      }
    }
  };

  const changeHandler = (index, e) => {
    let value = e.target.value;

    let newValue = [...otp];
    newValue[index] = value;
    setOtp(newValue);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const submitOtpHandler=async()=>{
    const otpNumber = parseInt(otp.join(''), 10);
    // console.log(otpNumber);
    try {
      const response=await axiosInstance("/users/otp", {
        method:"POST",
        data:{otpNumber}
      })
      navigate("/reset-pass");
      
    } catch (error) {
      alert(error.response.data.message);
    }

    
  }


  const classes = useStyles();
  return (
    <Container className={classes.boxStyle}>
      <h1 style={{ marginTop: "100px" }}>Connect App</h1>
      <Container maxWidth="xs" className={classes.formStyle}>
        <h4>Enter OTP</h4>
        <p>
          OTP has been sent to your registered email/phone debugmedia@gmail.com
        </p>
        <Box className={classes.textboxStyle}>
          {otp.map((item, index) => {
            return (
              <TextField
                key={index}
                className={classes.textStyle}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                }}
                inputRef={inputRefs[index]}
                onChange={(e) => changeHandler(index, e)}
                onKeyDown={(e) => keyDownHandler(index, e)}
              />
            );
          })}
        </Box>
        <Button
          className={classes.button}
          sx={{
            textTransform: "none",
            fontSize: "18px",
            marginTop: "30px",
            marginBottom: "40px",
          }}
          variant="contained"
          fullWidth
          onClick={submitOtpHandler}
        >
          Submit
        </Button>

        <Typography sx={{ textDecoration: "underline", cursor: "pointer" , fontSize:"14px"}}>
          Resend OTP
        </Typography>
      </Container>
    </Container>
  );
};

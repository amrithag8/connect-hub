import React, { useEffect } from 'react';
import { useNavigate , Outlet, Navigate} from 'react-router-dom';

const ProtectedRouteAfterLogged=({children})=> {

    const navigate=useNavigate();
    if(!localStorage.getItem("AccessToken")){
        // useEffect(()=>{
            return <Outlet/>
        // },[]);
        
    }

    return <Navigate to="/" replace={true}/>;

    // navigate("/");
    
    

    // useEffect(()=>{
    //     navigate("/");
    //   },[]);

  
}

export default ProtectedRouteAfterLogged;

import React, { useEffect } from 'react';
import { useNavigate , Outlet, Navigate} from 'react-router-dom';

const ProtectedRouteAfterLogged=({children})=> {

    const navigate=useNavigate();
    if(!localStorage.getItem("AccessToken")){
        // useEffect(()=>{
            return <Outlet/>
        // },[]);
        
    }

    else{
        navigate("/");
        return null;
    }

    // return <Navigate to="/"/>;

    // navigate("/");
    
    

    

  
}

export default ProtectedRouteAfterLogged;

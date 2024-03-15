import { Outlet, Navigate, useNavigate } from "react-router-dom";



function ProtectedRoute() {

  const navigate=useNavigate();

    if(localStorage.getItem("AccessToken")){
        return <Outlet/>
    }

    else{
      navigate("/login");
return null;
    }
  
}

export default ProtectedRoute

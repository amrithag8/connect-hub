import { Outlet, Navigate, useNavigate } from "react-router-dom";



function ProtectedRoute() {

  const navigate=useNavigate();

    if(localStorage.getItem("AccessToken")){
        return <Outlet/>
    }
  return (
    <Navigate to="/login" replace={true}/>
    // navigate("/login")
  )
}

export default ProtectedRoute

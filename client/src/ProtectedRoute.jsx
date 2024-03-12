import { Outlet, Navigate } from "react-router-dom";



function ProtectedRoute() {

    if(localStorage.getItem("AccessToken")){
        return <Outlet/>
    }
  return (
    <Navigate to="/login"/>
  )
}

export default ProtectedRoute

import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminPrivateRoute = () => {
  const {userInfo} = useSelector(state=>state.auth)
  return userInfo?.devGlowAccess.roles.includes("admin") ? <Outlet/> : <Navigate to={"/login"} />
}

export default AdminPrivateRoute

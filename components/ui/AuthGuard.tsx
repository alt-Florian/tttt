import {  Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {

  const token = localStorage.getItem("token");
  
  return token ? <Outlet /> : <Navigate to="/signin" />
}
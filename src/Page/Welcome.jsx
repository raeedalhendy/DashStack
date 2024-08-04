import { useEffect } from "react";
import WelcomePage from "../components/Home/Welcome/WelcomePage";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate()

  useEffect(()=>{
    if (localStorage.getItem('token') ) {
      navigate('/home/products')
    }
  })
  
  return (
    <WelcomePage img= "./assets/img/Login.png" weclome= "Welcome To DashStack" text = "Log In Or Sign Up To Continue" btn="Log In" btn2 = "Sign Up"/>
  )
}

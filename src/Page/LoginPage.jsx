import LogIn from "../components/LogIn/LogIn"

export default function LoginPage(){
    const ItemLog = [
        {title : "Login to Account"},
        {text : "Please enter your email and password to continue"},
        ]

    return(
        <LogIn LogInItem= {ItemLog} password1 = "password" email1="Email Address" btn= "LogIn" text1 ="Don’t have an account?" text2 ="Create Account"img = "./assets/img/Login.png"   />
    )
}
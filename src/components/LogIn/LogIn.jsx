import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogIn({LogInItem ,img ,password1,email1 ,btn ,text1,text2 }) {
    const navigate = useNavigate()
    const [email , setEmail] =useState('')
    const [password , setPassword] =useState('')
    useEffect(()=>{
        if (localStorage.getItem('token') ) {
            navigate('/home/products')
        }
    })
    const handleEmail = (e)=>{
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    const handlepassowrd = (e)=>{
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    const handleSubmit= (e) =>{
        e.preventDefault()
        console.log("submitted ")
        
        if (email === '' || email === null) {
            toast.warning('First Name Required')
        }
        if (password === '' || password === null) {
            toast.warning('First Name Required')
        }
        axios.post('https://vica.website/api/login',{
        email: email ,
        password: password 
        })
        .then((result) =>{
            toast.success("Log In successfully")
            console.log (result.data)
            localStorage.setItem('token' , result.data.token )
            localStorage.setItem('user', JSON.stringify(result.data.user))
            console.log(result.data.user)
            navigate('/home/products')
        })
        
        
        .catch((err)=>{
            console.log(err)
            toast.error("Please Check Email Or Password")
        })
    }

    

    const ChangUrlSignUp = ()=>{
        navigate("/SignUp")
    }
    return(
        <div className="relative flex justify-center items-center	">
            <ToastContainer/>
            <img className="bg-cover h-screen" src={img} alt="" />
                <form onSubmit={handleSubmit} className="absolute pt-6 pb-6 px-3 rounded-3xl  2xl:w-2/5 items-center sm:w-10/12   justify-center flex flex-col gap-y-6	bg-neutral-50 xl:h-4/5	 sm:3/5		">
                    {LogInItem.map((element =>{
                        return(
                            <div >
                                
                                <div>
                                    <h1 className="text-2xl	font-extrabold text-gray-950 ">{element.title}</h1>
                                    <p className="font-semibold	text-sm	text-gray-600 ">{element.text} </p>
                                </div>
                            </div>
                        )
                    }))}
                    <div className="items-start  w-full pl-5	">
                                    <div className="mb-5">
                                        <h2 className="font-semibold mb-2 text-gray-600	text-sm"> {email1}</h2>
                                        <input value={email} onChange={handleEmail} className="w-11/12 bg-slate-100 h-12 rounded-lg pl-3 " type="email" placeholder="example@gmail.com"/>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold mb-2 text-gray-600	text-sm"> {password1}</h2>
                                        <input value={password} onChange={handlepassowrd} className="w-11/12 bg-slate-100 h-12 rounded-lg pl-3 " type="password"  placeholder="********" />
                                    </div>
                    </div>
                    
                    <div className="mt-28">
                        <button  type= 'submit' value='Login' className="cursor-pointer w-64 flex justify-center items-center h-12 rounded-md mb-5	text-white	 bg-blue-500"  >{btn}</button>
                        <div className="flex gap-1">
                        <h2>{text1}</h2>
                        <button onClick={ChangUrlSignUp} className=" cursor-pointer underline text-blue-600" >{text2}</button>
                        </div>
                    </div>
                </form>
            
        </div>
    )
};

import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp({backimg , title , text , firstname , lastname , username , email , ConfirmationPass , pass ,Uimg , Profile , btnSign , Stext }) {
    const navigate = useNavigate()
    const ChangUrlLogIn = ()=>{
        navigate("/LogIn")
    }
    useEffect(()=>{
        if (localStorage.getItem('token') ) {
            navigate('/home/products')
        }
    })
        const [userData , setuserData] = useState({
            first_name : "",
            last_name : "", 
            user_name: "",
            email : "",
            password : "",
            password_confirmation : "",
            profile_image : ""
        })


    const handelSupmit = (e) =>{
        e.preventDefault()
        console.log(userData)
        if (userData.first_name === '' || userData.first_name === null) {
            toast.warning('First Name Required')
        }
        if (userData.last_name === '' || userData.last_name === null) {
            toast.warning ('Last Name Required')
        }
        if (userData.user_name === '' || userData.user_name === null) {
            toast.warning ('User Name Required')
        }   
        if (userData.email === '' || userData.email === null) {
            toast.warning('Email Required')
        }
        if (userData.password === '' || userData.password === null) {
            toast.warning ('Password Required')
        }
        if (userData.password.length < 6) {
            toast.warning('Password length at least 6 char')
        }
        if (userData.password_confirmation !== userData.password) {
            toast.warning('Password Is Not Match')
        }
        if (userData.profile_image === "") {
            toast.warning("Please Select Image")
        }
        
        
                axios.post('https://vica.website/api/register' , userData 
                    ,{
                        headers : {
                            "Accept" : "application/json",
                            "Content-Type" : "multipart/form-data"
                        }
                    }
                )
            .then(result =>{
                console.log(result)
                localStorage.setItem('token' , result.data.data.token )
                localStorage.setItem('user', JSON.stringify(result.data.data.user))
                toast.success("Craete Account Successfuly");
                navigate("/home/products")
            } )
            .catch(err =>{
                console.log(err)
                toast.error("something wrong")
            },[])
            
    }


    return(
        <div className="relative flex justify-center items-center">
            <ToastContainer/>
            <img className="bg-cover h-screen" src= {backimg}alt="" />
            <form onSubmit={handelSupmit} className="absolute  rounded-3xl   items-center 	   flex flex-col gap-y-6	bg-neutral-50 xl:h-4/5">
                    <div>
                        <h1 className="text-2xl	font-extrabold text-gray-950 mt-2">{title} </h1>
                        <p className="font-semibold	text-sm	text-gray-600 	mt-2">{text}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap px-2.5	">
                        <div>
                            <h1>{firstname} </h1>
                            <input onChange={(e) => setuserData({...userData,first_name : e.target.value})} className="w-52	 bg-slate-100 h-12 rounded-lg pl-3 mt-2" type="text"  placeholder="First Name"/>
                        </div>
                        <div>
                            <h1>{lastname} </h1>
                            <input onChange={(e) =>setuserData ({...userData,last_name : e.target.value})}  className="w-52  bg-slate-100 h-12 rounded-lg pl-3 mt-2" type="text"  placeholder="Last Name:"/>
                        </div>
                        <div>
                            <h1>{username} </h1>
                            <input onChange={(e) => setuserData({...userData,user_name : e.target.value})}  className="w-52  bg-slate-100 h-12 rounded-lg pl-3 mt-2" type="text"  placeholder="User Name"/>
                        </div>
                    </div>
                <div className=" w-full px-2.5">
                        <h1 >{email}</h1>
                        <input onChange={(e) =>setuserData ({...userData,email : e.target.value})}  className="w-full bg-slate-100 h-12 rounded-lg pl-3 mt-2" type="email"  placeholder="example@gmail.com"/>
                </div>
                <div  className="w-full flex px-2.5 gap-3">
                        <div className="w-full">
                            <h1>{pass} </h1>
                            <input onChange={(e) =>setuserData ({...userData,password : e.target.value})}  className="w-full bg-slate-100 h-12 rounded-lg pl-3 mt-2" type="password"  placeholder="********"/>
                        </div>
                        <div className="w-full">
                            <h1>{ConfirmationPass} </h1>
                            <input onChange={(e) =>setuserData ({...userData,password_confirmation : e.target.value})}  className="w-full	 bg-slate-100 h-12 rounded-lg pl-3 mt-2" type="password"  placeholder="********"/>
                        </div>
                </div>
                <div className="flex items-center justify-evenly w-full flex-wrap" >
                    <div className="relative flex flex-col	gap-3 ">
                        <div><h1>{Profile}</h1></div>
                        
                        <input onChange={(e) =>setuserData ({...userData,profile_image : e.target.files[0]})}   className=" relative w-20 overflow-hidden z-10 top-5 opacity-0 cursor-pointer" type="file" />
                        <img className=" relative z-0 bottom-12 right-2  " src={Uimg} alt="" />
                    </div>
                    <div className="">
                        <button  className="cursor-pointer flex items-center justify-center rounded-md mb-5	text-white w-64 h-12 bg-blue-500" > {btnSign}</button>
                        <div className="flex gap-1 ">
                        <h1>{Stext}</h1>
                        <button onClick={ChangUrlLogIn} className="cursor-pointer text-blue-600 underline">Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
    
}
import { useEffect, useState } from "react"
import {  Outlet, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css'


export default function HomePage({title , title2 ,Product ,Favo , Order ,logout}) {
    const navigate = useNavigate()
    const [activePage, setActivePage] = useState("products")
    const ChangUrlH = ()=>{
        setActivePage("products")
        navigate("/home/products")
        
    }
    const ChangUrl = ()=>{
        setActivePage("favorite")
        navigate("/home/favorite")
    }
    const ChangUrlOrder =()=>{
        setActivePage("orderlist")
        navigate("/home/orderlist")
    }
    useEffect(()=>{
    
        if (!localStorage.getItem('token')|| !localStorage.getItem('user')) {
            navigate('/login')
        }
        
    },[])
    // تسجيل الخروج
    function LogOut() {
        if (localStorage.getItem('token') && localStorage.getItem('user') ) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            toast.success('LogOut Successfuly')
            navigate('/login')
        }
    }
    // عرض معلومات المستخدم
    const [User, setUser] = useState({
        user_name : "",
        first_name: "",
        last_name : "",
        email : "" ,
        profile_image: ""
    });
    useEffect(() => {
        const UserData = localStorage.getItem('user')
        if (UserData) {
            const userInfo = JSON.parse(UserData)
            setUser(userInfo);
        } 
    }, []);

const [darkMode , setdarkMode] =useState(false)
const toggleDarkMode =()=>{
    setdarkMode(!darkMode)
}
return (
        <div className={`flex ${darkMode ? "dark" : "light"}`}>
            <ToastContainer />
            <nav className="nav justify-around items-center mb-5 pl-5 flex flex-col h-screen dark:bg-cyan-900 w-72">
                <div className="flex">
                    <h1 className="text-blue-500 text-3xl font-extrabold">{title}</h1>
                    <h1 className="text-3xl font-extrabold dark:text-white">{title2}</h1>
                </div>
                <nav className="dark:text-white">
                    <ul className="flex flex-col gap-6">
                        <li 
                            className={`flex gap-4 items-center font-semibold cursor-pointer text-lg hover:text-blue-500 ${activePage === "products" ? "border-solid  pl-9 rounded-l-xl rounded-r-3xl	transition-all	duration-300	  border-l-4	border-blue-500 text-blue-500" : ""}`} 
                            onClick={ChangUrlH}
                        >
                            <i className="fa-solid fa-border-all"></i>
                            {Product}
                        </li>
                        <li 
                            className={`flex gap-4 items-center font-semibold cursor-pointer text-lg hover:text-blue-500 ${activePage === "favorite" ? "border-solid  pl-9 rounded-l-xl rounded-r-3xl	transition-all duration-300	 	 border-l-4	border-blue-500 text-blue-500" : ""}`} 
                            onClick={ChangUrl}
                        >
                            <i className="fa-regular fa-heart"></i>
                            {Favo}
                        </li>
                        <li 
                            className={`flex gap-4 items-center font-semibold cursor-pointer text-lg hover:text-blue-500 ${activePage === "orderlist" ? "border-solid  pl-9 rounded-l-xl rounded-r-3xl 	transition-all duration-300	 border-l-4	border-blue-500 text-blue-500" : ""}`} 
                            onClick={ChangUrlOrder}
                        >
                            <i className="fa-solid fa-list-ul"></i>
                            {Order}
                        </li>
                    </ul>
                </nav>
                <button onClick={LogOut} className="cursor-pointer w-52 flex gap-3 justify-center items-center mr-5 h-12 rounded-md mb-5 text-white bg-blue-500  hover:animate-bounce	hover:bg-red-500 	">
                    <i className="fa-solid fa-power-off"></i>
                    {logout}
                </button>
            </nav>
            <div className="h-full w-full bg-slate-200 dark:bg-cyan-950">
                <nav className="w-full bg-white h-16 pl-8 flex gap-5 items-center px-3 dark:bg-cyan-900">
                    <div className="w-full"></div>
                    <div className="flex dark:text-white items-center gap-3">
                        <div>
                            <img className="w-24 h-14 rounded-full" src={User.profile_image_url} alt="" />
                        </div>
                        <div>
                            <div className="flex gap-1 font-extrabold">
                                <h1>{User.first_name}</h1>
                                <h1>{User.last_name}</h1>
                            </div>
                            <div className="font-extralight">
                                <h1>{User.user_name}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="border-solid border-l-2 border-black">
                        <h1 onClick={toggleDarkMode} className="pl-4 text-2xl dark:text-white ">
                            {darkMode ? <FontAwesomeIcon icon="fa-regular fa-sun" /> : <FontAwesomeIcon icon="fa-regular fa-moon" />}
                        </h1>
                    </div>
                </nav>
                <div className="dark:text-white h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
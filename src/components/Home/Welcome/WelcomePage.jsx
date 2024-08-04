import { useNavigate } from "react-router-dom"

export default function WelcomePage({img , weclome ,text , btn ,btn2}) {
    const navigate = useNavigate()
    const ChangUrl = ()=>{
        navigate("/login")
        
    }
    const ChangUrlSignUp = ()=>{
        navigate("/SignUp")
    }
return (
    <div className="relative ">
        <img className="z-0 " src={img}  />
        <div className="rounded-3xl flex flex-col gap-8 justify-center items-center absolute top-1/4 left-1/4    w-2/4 h-2/4 bg-white z-10">
            <div className="text-center">
                <h1 className="mb-4 text-blue-500 text-2xl	font-extrabold">{weclome}</h1>
                <h1 className=" text-blue-500 text-2xl	font-extrabold">{text}</h1>
            </div>
            <div>
                <div>
                <button  onClick={ChangUrl} className="cursor-pointer w-64 flex justify-center items-center h-12 rounded-md mb-5	text-white	 bg-blue-500"  >{btn}</button>
                <button  onClick={ChangUrlSignUp} className="cursor-pointer w-64 flex justify-center items-center h-12 rounded-md mb-5	text-white	 bg-blue-500"  >{btn2}</button>
                </div>          
            </div>
        </div>
    </div>
)
}

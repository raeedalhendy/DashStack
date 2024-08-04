import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";

export default function CreateProduct({title,Pname,Pprice,btncreate}) {
  const [product, setProduct] = useState({
    id : "",
    image: "",
    name: '',
    price: ''
  })

function handleSubmit (e) {
  console.log(product)
  const token  = localStorage.getItem("token")
  if (product.name === "") {
    toast.warning('Please Write Product Name ')
}
if (product.price ==="") {
    toast.warning('Please Write Product Price ')
}
if (product.image === "") {
  toast.warning("please select Image")

}
  e.preventDefault()
    axios.post('https://vica.website/api/items', product ,{
    headers : {
      "Accept" : "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type" : "multipart/form-data"
    }
  })
  .then(result => {
    console.log(result)
    toast.success("Created Successfly")
  })
  .catch(error => {
    console.log(error)
  })
}

  return (
    <form  className=" px-6 pt-8 flex justify-between">
        <div className="flex flex-col gap-5 w-2/4">
            <h1 className="dark:text-white text-2xl	font-extrabold text-gray-950 mt-2">{title}</h1>
            <h2 className="dark:text-white text-xl	font-semibold text-gray-950 ">{Pname}</h2>
            <input  onChange={(e) => setProduct({...product,name : e.target.value})} value={product.name} className="dark:placeholder:text-black dark:text-black	pl-4 h-10  rounded-xl bg-slate-200 border-solid border-slate-300	border-2" required placeholder="Enter Product Name"/>
            <h2 className="dark:text-white text-xl	font-semibold text-gray-950 ">{Pprice}</h2>
            <input  onChange={(e) => setProduct({...product,price : e.target.value})} value={product.price}  className="dark:placeholder:text-black dark:text-black pl-4 h-10  rounded-xl bg-slate-200 border-solid border-slate-300	border-2" type="number" placeholder="Enter Product Price"/>
            <button onClick={handleSubmit} className=" w-52 h-14 rounded-2xl text-lg font-bold text-white bg-blue-500 ">{btncreate}</button>
        </div>
        <div className="dark:text-black border-dashed border-2 w-80 h-80 bg-gray-100 border-blue-400 justify-center items-center flex	">
            <div className=" relative z-10">
                <h1 className="text-4xl relative ml-16 text-blue-500" >
                <i class=" fa-solid fa-arrow-up-from-bracket z-10"></i>
                </h1>
                
                <h1 className="">Upload Product Image</h1>
            </div>
            <input  onChange={(e) => setProduct({...product,image : e.target.files[0]})} className="right-0  absolute z-10 opacity-0 cursor-pointer" type="file" />
        </div>
    </form>
  )
}

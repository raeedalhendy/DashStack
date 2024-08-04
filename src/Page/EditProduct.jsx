import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProduct() {
    const token  = localStorage.getItem("token")
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState({
        id : "",
        image: "",
        name: '',
        price: ''
    })

    useEffect(() => {
        const ProductInfo = JSON.parse(localStorage.getItem('ProductsUpdate'));
        const productToEdit = ProductInfo.find(product => product.id === parseInt(id));
        if (productToEdit) {
            setProduct(productToEdit);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append("name", product.name)
        formData.append("price", product.price)
        formData.append("_method", "PUT") // إضافة _method إلى FormData
        if (product.image) {
            formData.append("image", product.image);
        }
        axios.post(`https://vica.website/api/items/${id}`,formData , {
            headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            
        }
        })
        .then(response => {
            toast.success("Product updated successfully")
            console.log( response.data)
            navigate("/home/products")

        })
        .catch(error => {
            console.log(error)
            toast.error("Failed to update product")
        })
    }


return (
    <form  onSubmit={handleSubmit} className="px-6 pt-8 flex justify-between">
        <div className="flex flex-col gap-5 w-2/4">
            <h1 className="dark:text-white text-2xl	font-extrabold text-gray-950 mt-2">Edite Product</h1>
            <h2 className="dark:text-white text-xl	font-semibold text-gray-950 ">Enter Name</h2>
            <input value={product.name} onChange={(e) => setProduct({...product,name : e.target.value})}
            className="dark:placeholder:text-black dark:text-black pl-4 h-10  rounded-xl bg-slate-200 border-solid border-slate-300	border-2" required placeholder="Enter Product Name"/>

            <h2 className="dark:text-white text-xl	font-semibold text-gray-950 ">Enter price</h2>
            <input value={product.price} onChange={(e) => setProduct({...product,price : e.target.value})} 
            className="dark:placeholder:text-black dark:text-black pl-4 h-10  rounded-xl bg-slate-200 border-solid border-slate-300	border-2" required type="number" placeholder="Enter Product Price"/>

            <button  className="w-52 h-14 rounded-2xl text-lg font-bold text-white bg-blue-500  ">Update</button>
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

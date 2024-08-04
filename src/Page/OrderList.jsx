    import { useEffect, useState } from "react";
    import { toast } from "react-toastify";

    export default function OrderList() {
        const [productorders, setproductorders] = useState([]);
        
    useEffect(()=>{
        const ProductOrder = localStorage.getItem('orderlist')
        if (ProductOrder) {
        const productInfo = JSON.parse(ProductOrder)
        setproductorders(productInfo);
    } 
    },[])
    
    const DeletItemFromOrderList = (id) => {
        const ProductOrder = productorders.filter(productorders => productorders.id !== id)
        setproductorders(ProductOrder);
        localStorage.setItem('orderlist', JSON.stringify(ProductOrder))
        toast.success("Product Deleted From OrderList")
    }

    return (
        <div>
            <div className="pl-7 pt-5 text-2xl font-extrabold">
                <h1>OrderList</h1>
            </div>
            <div className="flex flex-wrap">
        {productorders.map((item) => (
            <div key={item.id}
            className="dark:bg-cyan-900 mx-3 mt-2 rounded-2xl shadow-lg w-72 flex flex-col shadow-gray-400 gap-3 justify-center items-center bg-white text-center relative">
                
            <img className="w-2/4" src={item.image_url} alt={item.name} />
            <div className="flex flex-col items-start w-full pl-3 gap-2">
                <h1 className="font-bold text-xl">{item.name}</h1>
                <h1 className="font-semibold text-lg text-blue-600">$ {item.price}</h1>
            </div>
            <button onClick={() => DeletItemFromOrderList(item.id)} className="text-2xl "><i  class="fa-regular fa-trash-can"></i></button>
            </div>
        ))}
        </div>
        </div>
    )
    }

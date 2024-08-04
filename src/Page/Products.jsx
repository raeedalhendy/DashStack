import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate,  } from "react-router-dom"
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Products() {
  const navigate = useNavigate()
  
  const [data, setdata] = useState([]);
  const token  = localStorage.getItem("token")


  const ChangUrl = ()=>{
    navigate("/home/products/CreateProduct")
}

const [updatProduct , setupdateProduct]=useState()
const EditPage = (id)=>{
  axios.get(`https://vica.website/api/items/${id}` , {
    headers :{
      'Accept' : 'application/json' , 
      'Authorization': `Bearer ${token}`,
      
    }
  })
  .then(result => {
    console.log(result)
    setupdateProduct(result.data) 
    localStorage.setItem('ProductsUpdate', JSON.stringify([...data ,result.data]))

    navigate(`/home/products/EditProduct/${id}`)
  })
  .catch(err => console.log(err))
}
//==============عرض المنتجات==========//
useEffect(() => {

    axios.get("https://vica.website/api/items" ,{
        headers :{
          'Accept' : 'application/json' , 
          'Authorization': `Bearer ${token}`,
          
        }
      })
    .then(res =>{
      setdata(res.data)
      localStorage.setItem('Products', JSON.stringify([...data ,res.data]))
  } )
      .catch(error =>console.log(error))
  }, [token]);
  //==============حذف المنتجات==========//
  const deletItem = (id) => {
    axios.delete(`https://vica.website/api/items/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => {
      const ProductData = data.filter(data => data.id !== id)
      setdata(ProductData);
      localStorage.setItem('Products', JSON.stringify(ProductData))
      toast.success("Product Deleted")
    })
    .catch(error => {
      console.log(error)
      toast.error("Failed to delete product");
    })
  }
      //=============اضافة المنتج الى المفضلة==========//
      const [favorites, setFavorites] = useState([])

      const AddToFavorite = (id )=>{
        
          axios.get(`https://vica.website/api/items/${id}` , {
            headers :{
              'Accept' : 'application/json' , 
              'Authorization': `Bearer ${token}`
            }
          })
          .then(result => {
            console.log(result)
            setFavorites([...favorites ,result.data])
            toast.success("Added To Favorite")
            localStorage.setItem('favorites', JSON.stringify([...favorites ,result.data]));
          })
          .catch(err => console.log(err))
        
      }
      //=============اضافة المنتج الى لائحة الطلبات==========//
      const [orderlist, setorderlist] = useState([])

      const AddToOrderList = (id )=>{
        
          axios.get(`https://vica.website/api/items/${id}` , {
            headers :{
              'Accept' : 'application/json' , 
              'Authorization': `Bearer ${token}`
            }
          })
          .then(result => {
            console.log(result)
            setorderlist([...orderlist ,result.data])
            toast.success("Added To Orderlist")
            localStorage.setItem('orderlist', JSON.stringify([...orderlist ,result.data]));
          })
          .catch(err => console.log(err))
        
      }
      
      // تفعيل زر البحث 
      const [searchTerm, setSearchTerm] = useState("");
      const [filteredData, setFilteredData] = useState([]);
      useEffect(() => {
        if (searchTerm === "") {
          setFilteredData(data);
        } else {
          setFilteredData(
            data.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
      }, [searchTerm, data]);
  return (
      <div className="h-screen">
        <div className="px-5 pt-5">
          <div className="w-full">
            <input
              className=" dark:placeholder:text-black text-black rounded-xl border-solid border-2 w-2/5 pl-8 h-9 absolute top-4"
              type="text"
              placeholder="Search A Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full">
            <h1 className="text-2xl font-extrabold">All Products</h1>
            <button
              onClick={ChangUrl}
              className="cursor-pointer w-64 flex gap-4 justify-center items-center h-12 rounded-md mb-5 text-white bg-blue-500">
              <i className="fa-solid fa-plus"></i>
              Create Product
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 ">
          {filteredData.map((element) => {
            return (
              <div key={element.id}
                className="dark:bg-cyan-900 mx-3 mt-2 rounded-2xl shadow-lg w-72 flex flex-col shadow-gray-400 gap-3 justify-center items-center bg-white text-center relative  ">
                <img className="w-2/4" src={element.image_url} alt="" />
                <div className="flex flex-col items-start w-full pl-3 gap-2">
                  <h1 className="font-bold text-xl">{element.name}</h1>
                  <h1 className="font-semibold text-lg text-blue-600">$ {element.price}</h1>
                </div>
                <div className="flex justify-between w-full px-4 pb-2">
                  <button
                    onClick={() => EditPage(element.id)}
                    className="bg-gray-200 rounded-2xl w-32 h-9 text-base font-medium flex items-center justify-center gap-2 dark:bg-cyan-950 hover:bg-blue-500 hover:text-white">
                    <i className="fa-regular fa-pen-to-square"></i>
                    Edit Product
                  </button>
                  <button onClick={(e) => deletItem(element.id, e)} className="text-2xl hover:animate-bounce hover:text-red-500 ">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
                <div className="w-full flex justify-between absolute top-0 px-3 pt-3">
                  <button onClick={() => AddToFavorite(element.id)} className="text-2xl favorite hover:animate-bounce hover:text-blue-500">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                  <button onClick={() => AddToOrderList(element.id)} className="text-2xl hover:animate-bounce hover:text-blue-500">
                    <i className="fa-solid fa-list-ul"></i>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
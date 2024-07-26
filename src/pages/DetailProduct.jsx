/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { fetchProductById } from "../utils/API/Product"
import { Link, useParams } from "react-router-dom"
import Product from "./Product"


const DetailProduct = () => {
    const [product, setProduct] = useState(null)
    const [newProduct, setNewProduct] = useState([])

    const params = useParams()

    useEffect(() => {
        fetchProductById(params.id, setProduct)
    }, [params])

    useEffect(() => {
        if (product == null) return
        let newProduct = product
        if (newProduct.images !== null) {
            newProduct.images.forEach((element, index) => {
                element = element.replace("http://localhost:3000", import.meta.env.VITE_BACKEND_URL)
                newProduct.images[index] = element
            });
        }
        console.log(newProduct)
        setNewProduct(newProduct)
    }, [product])

    /* 
    {
                "id": "product-YgLywjzTpgL6z2gM",
                "name": "1721185958 - Product",
                "price": 10000,
                "description": "contoh deskripsi",
                "images": [
                    "http://localhost:3000/upload/images/17211558101333b07fea5-0143-479b-8bd9-fd2f103f8dea.jpg"
                ],
                "rating": "5.00"
    }
     */

    if (product !== null) return (
        <>
            {/* breadcumbs */}
            <div className="breadcrumbs text-md py-4">
                <ul>
                    <li>
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex"></i>Home
                        </Link>
                    </li>
                    <li><Link to={'/product'}>Produk</Link></li>
                    <li><span className="inline-flex items-center gap-2">{newProduct.name}</span></li>
                </ul>
            </div>
            <div className="flex">
                <div className="card lg:card-side">
                    <div className="card-body">
                        <h2 className="card-title">{newProduct.name}</h2>
                        <p>{newProduct.description}</p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-primary text-white">Beli</button>
                        </div>
                    </div>
                    <figure>
                        <img
                            src={'/src/assets/image/placeholder.png'}
                            alt="Album" />
                    </figure>
                </div>
            </div>
        </>
    )
}

export default DetailProduct
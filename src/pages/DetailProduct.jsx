/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { fetchProductById } from "../utils/API/Product"
import { Link, useParams } from "react-router-dom"
import { Carousel } from 'primereact/carousel';
import Product from "./Product"


const DetailProduct = () => {
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])

    const params = useParams()

    useEffect(() => {
        fetchProductById(params.id, setProduct)
    }, [params])

    useEffect(() => {
        console.log(product)
    }, [product])

    useEffect(() => {
        


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
                    <li><span className="inline-flex items-center gap-2">{product.name}</span></li>
                </ul>
            </div>
            <div className="flex bg-primary">
                <div className="flex-1">
                    {/* create image slider */}
                    <div className="slider">
                        <div className="slides">
                            {product.images.map((image, index) => (
                                <div key={index} className="slide">
                                    <img src={image} alt="product" onError={} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    cek
                </div>
            </div>
        </>
    )
}

export default DetailProduct
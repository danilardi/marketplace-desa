/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { fetchProduct } from "../utils/API/Product"
import { Link } from "react-router-dom"


const Product = () => {
    const [products, setProducts] = useState(null)
    const [newProducts, setNewProducts] = useState([])
    const [limit, setLimit] = useState(12)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        fetchProduct(limit, offset, setProducts)
    }, [offset])

    useEffect(() => {
        if (products == null) return
        // console.log(products)
        products.products.forEach((product, index) => {
            if (product.images !== null) {
                product.images.forEach((element, index) => {
                    element = element.replace("http://localhost:3000", import.meta.env.VITE_BACKEND_URL)
                    product.images[index] = element
                });
                products.products[index] = product
            }
        })
        setNewProducts(products.products)
    }, [products])

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

    if (products != null) return (
        <>
            {/* breadcumbs */}
            <div className="breadcrumbs text-md py-4">
                <ul>
                    <li>
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex"></i>Home
                        </Link>
                    </li>
                    <li><span className="inline-flex items-center gap-2">Produk</span></li>
                </ul>
            </div>
            <h1 className="text-3xl font-semibold">Produk</h1>
            <div className="flex flex-wrap">
                {newProducts.map((product) => (
                    <div key={product.id} className="basis-1/4">
                        <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl me-5 my-3" onClick={() => {
                            window.location.href = `/product/${product.id}`
                        }}>
                            <figure className="img-container bg-base">
                                {product.images === null &&
                                    <img src={`/src/assets/image/placeholder.png`} alt={product.name} className="no-img-list-product" />}
                                {product.images != null &&
                                    <img src={`${product.images}`} alt={product.name} className="img-list-product" />}
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p className="text-sm">Harga: {product.price}</p>
                                <p className="text-sm">Deskripsi: {product.description}</p>
                                <p className="text-sm">Rating: {product.rating}</p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            {/* pagination */}
            <div className="join flex justify-center">
                {offset > 0 && <button className="join-item btn" onClick={() => setOffset(offset - limit)}>«</button>}
                <button className="join-item btn bg-secondary "><p className="text-white">Page {Math.floor(offset / limit) + 1}</p></button>

                {products.count > offset && <button className="join-item btn" onClick={() => setOffset(offset + limit)}>»</button>}
            </div>
        </>
    )
}

export default Product
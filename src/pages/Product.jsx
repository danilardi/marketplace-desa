/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { fetchProduct } from "../utils/API/Product"
import { Link } from "react-router-dom"
import CardProduct from "../components/CardProduct"
import { getRoleId } from "../utils/AuthUtils"
import { Button } from "primereact/button"


const Product = () => {
    const [products, setProducts] = useState(null)
    const [limit, setLimit] = useState(12)
    const [offset, setOffset] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        console.log("role", getRoleId())
        if (getRoleId() == 1) {
            // console.log("masuk")
            setIsAdmin(true)
        } else {
            // console.log("gak masuk")
            setIsAdmin(false)
        }
    }, [])

    useEffect(() => {
        // console.log("cekk", isAdmin)
    }, [isAdmin])

    useEffect(() => {
        fetchProduct(limit, offset, setProducts)
    }, [offset])

    useEffect(() => {
        console.log(products)
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
                    <li className="text-primary">
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex mb-0.5"></i>Home
                        </Link>
                    </li>
                    <li><span className="inline-flex items-center gap-2">Produk</span></li>
                </ul>
            </div>
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Produk</h1>
                {isAdmin && <Button className="!px-2"><span className="text-sm">Tambah Produk</span></Button>}
            </div>
            <div className="flex flex-wrap">
                {products.products.map((product) => (
                    <div key={product.id} className="basis-1/4">
                        <CardProduct product={product} />
                    </div>

                ))}
            </div>
            {/* pagination */}
            <div className="join flex justify-center">
                {offset > 0 && <button className="join-item btn" onClick={() => setOffset(offset - limit)}>«</button>}
                <button className="join-item btn bg-secondary "><p className="text-white">Page {Math.floor(offset / limit) + 1}</p></button>
                {products.count > (offset + limit) && <button className="join-item btn" onClick={() => setOffset(offset + limit)}>»</button>}
            </div>
        </>
    )
}

export default Product
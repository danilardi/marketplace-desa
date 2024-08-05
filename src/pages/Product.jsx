/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { addProduct, deleteProduct, editProduct, fetchProduct } from "../utils/API/Product"
import { Link } from "react-router-dom"
import CardProduct from "../components/CardProduct"
import { getRoleId } from "../utils/AuthUtils"
import { Button } from "primereact/button"
import { AddProductModal, EditProductModal } from "../components/modal/ProductPage"
import { AddProductRequest } from "../model/ProductModel"
import { ToastSuccess } from "../utils/AlertNotification"


const Product = () => {
    const [products, setProducts] = useState(null)
    const [limit, setLimit] = useState(12)
    const [offset, setOffset] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [showAddProductModal, setShowAddProductModal] = useState(false)
    const [showEditProductModal, setShowEditProductModal] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null)

    useEffect(() => {
        // // console.log("role", getRoleId())
        if (getRoleId() == 1) {
            // // console.log("masuk")
            setIsAdmin(true)
        } else {
            // // console.log("gak masuk")
            setIsAdmin(false)
        }
    }, [])

    useEffect(() => {
        // // console.log("cekk", isAdmin)
    }, [isAdmin])

    useEffect(() => {
        fetchProduct(limit, offset, setProducts)
    }, [offset])

    useEffect(() => {
        // // console.log(products)
    }, [products])

    const handleAddProduct = (data) => {
        // console.log("add product", data)
        const addProductRequest = new AddProductRequest(
            data.name,
            data.price,
            data.description,
            data.images
        )
        addProduct(addProductRequest).then((res) => {
            if (res) {
                ToastSuccess("Berhasil menambahkan produk")
                fetchProduct(limit, offset, setProducts)
            }
        })
    }

    const handleEditProduct = (id) => {
        // console.log("edit product", id)
        setSelectedProductId(id)
        setShowEditProductModal(true)
    }

    const handlerEditProduct = (data) => {
        const addProductRequest = new AddProductRequest(
            data.name,
            data.price,
            data.description,
            data.images
        )
        editProduct(selectedProductId, addProductRequest).then((res) => {
            if (res) {
                ToastSuccess("Berhasil mengedit produk")
                fetchProduct(limit, offset, setProducts)
            }
        })
    }

    const handleDeleteProduct = (id) => {
        // console.log("delete product", id)
        deleteProduct(id).then((res) => {
            if (res) {
                ToastSuccess("Berhasil menghapus produk")
                fetchProduct(limit, offset, setProducts)
            }
        })
    }
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
                {isAdmin && <Button className="!px-2 !me-5" onClick={() => setShowAddProductModal(true)}><span className="text-sm ">Tambah Produk</span></Button>}
            </div>
            <div className="flex flex-wrap">
                {products.products.map((product) => (
                    <div key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <CardProduct product={product} handleDeleteProduct={handleDeleteProduct} handleEditProduct={handleEditProduct} />
                    </div>

                ))}
            </div>
            {/* pagination */}
            <div className="join flex justify-center">
                {offset > 0 && <button className="join-item btn" onClick={() => setOffset(offset - limit)}>«</button>}
                <button className="join-item btn bg-secondary "><p className="text-white">Page {Math.floor(offset / limit) + 1}</p></button>
                {products.count > (offset + limit) && <button className="join-item btn" onClick={() => setOffset(offset + limit)}>»</button>}
            </div>
            <AddProductModal
                show={showAddProductModal}
                setShow={setShowAddProductModal}
                handler={handleAddProduct}
            />
            <EditProductModal
                show={showEditProductModal}
                setShow={setShowEditProductModal}
                selectedProductId={selectedProductId}
                handler={handlerEditProduct}
            />
        </>
    )
}

export default Product
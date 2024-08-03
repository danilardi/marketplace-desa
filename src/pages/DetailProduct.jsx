/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { fetchProduct, fetchProductById } from "../utils/API/Product"
import { Link, useNavigate, useParams } from "react-router-dom"
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import StarRating from "../components/StarRating";
import { formatCurrency } from "../utils/FormatUtils";
import CardProduct from "../components/CardProduct";
import { getBaseURLWithPrefix } from "../utils/Helper";
import { addToCart } from "../utils/API/Cart";
import { useNavbar } from "../components/Navbar";
import { ToastWarning } from "../utils/AlertNotification";


const DetailProduct = () => {
    const navigate = useNavigate()
    const { badge, setBadge, isLogin } = useNavbar()

    const [product, setProduct] = useState(null)
    const [otherProduct, setOtherProduct] = useState(null)
    const [quantity, setQuantity] = useState(1);
    const [delayedImages, setDelayedImages] = useState([])

    const params = useParams()

    useEffect(() => {
        fetchProductById(params.id, setProduct)
        fetchProduct(4, 0, setOtherProduct)
    }, [params])

    useEffect(() => {
        // console.log("product", product)
        // console.log("otherProduct", otherProduct)
    }, [product, otherProduct])


    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleAnchorClick = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const handleAddToCart = () => {
        // console.log("add to cart")
        if (isLogin) {
            const addToCartRequest = {
                orderQuantity: quantity,
                productId: product.id
            }
            addToCart(addToCartRequest).then((res) => {
                if (res) {
                    setBadge(badge + 1)
                }
            })
        } else {
            ToastWarning("Silahkan login terlebih dahulu")
            navigate('/login')
        }
    }

    // replace image function
    const replaceImage = (error) => {
        //replacement of broken Image
        error.target.src = "/src/assets/image/placeholder.png";
        error.target.className = "absolute w-full h-full object-contain"
        // error.target.src = `https://picsum.photos/400/200?random=${Math.random()}`;
    }

    if (product !== null) return (
        <>
            {/* breadcumbs */}
            <div className="breadcrumbs text-md py-4">
                <ul>
                    <li className="text-primary">
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex mb-0.5"></i>Home
                        </Link>
                    </li>
                    <li className="text-primary"><Link to={'/product'}>Produk</Link></li>
                    <li><span className="inline-flex items-center gap-2">{product.name}</span></li>
                </ul>
            </div>
            {/* card product */}
            <div className="flex ">
                <div className="flex-1">
                    <div className="carousel w-full h-[420px] rounded-lg shadow-lg">
                        {product.images.map((image, index) => (
                            <div key={index} id={`item${index + 1}`} className="carousel-item w-full ">
                                <div className="relative w-full h-full">
                                    <img
                                        src={`${getBaseURLWithPrefix(image)}`}
                                        className="absolute w-full h-full object-fill filter blur-md"
                                        onError={replaceImage}
                                    />
                                    <img
                                        src={`${getBaseURLWithPrefix(image)}`}
                                        alt={product.name}
                                        className="absolute w-full h-full object-contain"
                                        onError={replaceImage}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-2 py-2">
                        {product.images.map((image, index) => (
                            <a
                                key={index}
                                // href={`#item${index + 1}`}
                                onClick={(e) => handleAnchorClick(e, `item${index + 1}`)}
                                className="w-24 h-16 bg-white rounded-md">
                                <div className="relative w-full h-full">
                                    <img
                                        src={`${getBaseURLWithPrefix(image)}`}
                                        className="absolute w-full h-full object-fill filter blur-sm"
                                        onError={replaceImage}
                                    />
                                    <img
                                        src={`${getBaseURLWithPrefix(image)}`}
                                        alt={product.name}
                                        className="absolute w-full h-full object-contain"
                                        onError={replaceImage}
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col ms-8 mt-2">
                        <h1 className="text-3xl font-semibold mb-8 text-slate-800">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <StarRating rating={[product.rating]} />
                            <label className="text-lg">Terjual 0</label>
                        </div>
                        <p className="text-2xl font-bold text-orange-400 mt-5">{formatCurrency(product.price)}</p>
                        <div className="flex items-center gap-8 mt-32">
                            {/* buat menentukan jumlah produk dengan button plus minus di kiri kanannya */}
                            <label className="text-lg">Jumlah</label>
                            <Button icon="pi pi-minus" rounded outlined aria-label="minus" onClick={decrement} />
                            <span>{quantity}</span>
                            <Button icon="pi pi-plus" rounded aria-label="plus" onClick={increment} />
                        </div>
                        <Button label="Tambahkan ke keranjang" className="btn btn-primary text-white !mt-6" onClick={handleAddToCart} />
                    </div>
                </div>
            </div >
            {/* card description */}
            <div className="card bg-base-100  shadow-xl" >
                <div className="card-body p-0">
                    <TabView className="">
                        <TabPanel header="Informasi Produk">
                            <h1 className="text-2xl font-semibold">{product.name}</h1>
                            <p className="m-0 mt-4">
                                {product.description}
                            </p>
                        </TabPanel>
                        <TabPanel header="Ulasan Produk" disabled></TabPanel>
                    </TabView>
                </div>
            </div>
            {/* card product lainnya */}
            <div className="flex flex-wrap mt-8" >
                {otherProduct !== null && otherProduct.products.map((product) => (
                    <div key={product.id} className="basis-1/4">
                        <CardProduct product={product} />
                    </div>
                ))}
            </div>

        </>
    )
}

export default DetailProduct
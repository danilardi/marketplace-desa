/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"
import { addProductReview, deleteProduct, editProduct, getProduct, getProductById, getProductReview } from "../utils/API/Product"
import { Link, useNavigate, useParams } from "react-router-dom"
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import StarRating from "../components/StarRating";
import { formatCurrency } from "../utils/FormatUtils";
import CardProduct from "../components/CardProduct";
import { getBaseURLWithPrefix } from "../utils/Helper";
import { addToCart } from "../utils/API/Cart";
import { useNavbar } from "../components/Navbar";
import { ToastError, ToastSuccess, ToastWarning } from "../utils/AlertNotification";
import { getRoleId } from "../utils/AuthUtils";
import { AddProductModal, EditProductModal } from "../components/modal/ProductPage";
import { AddProductRequest } from "../model/ProductModel";
import PlaceholderImage from "../assets/image/placeholder.png";
import ProfileImage from "../assets/image/profile.svg";


const DetailProduct = () => {
    const navigate = useNavigate()
    const { badge, setBadge, isLogin } = useNavbar()

    const [product, setProduct] = useState(null)
    const [productReview, setProductReview] = useState([])
    const [otherProduct, setOtherProduct] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [showEditProductModal, setShowEditProductModal] = useState(false)
    const [userReview, setUserReview] = useState("")
    const [userRating, setUserRating] = useState(0)

    const carouselRef = useRef(null);

    const params = useParams()

    useEffect(() => {
        getProductById(params.id, setProduct)
        getProduct(4, 0, setOtherProduct)
        getProductReview(params.id, setProductReview)
    }, [params])

    useEffect(() => {
        // // console.log("product", product)
        // // console.log("otherProduct", otherProduct)
    }, [product, otherProduct, userReview, userRating])


    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleCarouselChange = (index, behavior = 'smooth') => {
        console.log("index", index)
        const targetElement = document.getElementById(`item${index+1}`);
        const carousel = carouselRef.current;
        if (targetElement && carousel) {
            const targetPosition = targetElement.offsetLeft;
            carousel.scrollTo({ left: targetPosition, behavior: behavior });
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

    const handlerEditProduct = (data) => {
        const addProductRequest = new AddProductRequest(
            data.name,
            data.price,
            data.description,
            data.images
        )
        editProduct(params.id, addProductRequest).then((res) => {
            if (res) {
                ToastSuccess("Berhasil mengedit produk")
                getProductById(params.id, setProduct)
                getProduct(4, 0, setOtherProduct)
            }
        })
    }

    const handleDeleteProduct = (id) => {
        // console.log("delete product", id)
        deleteProduct(id).then((res) => {
            if (res) {
                ToastSuccess("Berhasil menghapus produk")
                navigate('/product')
            }
        })
    }

    const handleAddReview = () => {
        addProductReview(params.id, {
            comment: userReview,
            rating: userRating
        }).then((res) => {
            if (res) {
                ToastSuccess("Berhasil menambahkan review")
                setUserReview("")
                setUserRating(0)
                getProductById(params.id, setProduct)
                getProductReview(params.id, setProductReview)
            }
        })
    }

    // replace image function
    const replaceImage = (error) => {
        //replacement of broken Image
        error.target.src = PlaceholderImage;
        error.target.className = "absolute w-full h-full object-contain"
        // error.target.src = `https://picsum.photos/400/200?random=${Math.random()}`;
    }

    // const cek = () => {
    //     console.log("review", productReview)
    // }

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
            {/* <Button onClick={cek}>Cek</Button> */}
            {/* card product */}
            <div className="flex flex-col md:flex-row">
                <div className="basis-1/2 w-full md:max-w-[50%]">
                    <div className="carousel w-full h-[420px] rounded-lg shadow-lg" ref={carouselRef}>
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
                    <div className="carousel carousel-center w-full rounded-box space-x-4 p-4">
                        {product.images.map((image, index) => (
                            <a
                                key={index}
                                // href={`#item${index + 1}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    // console.log("index", index)
                                    handleCarouselChange(index)
                                }}
                                className="w-24 h-16 bg-white rounded-md carousel-item">
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
                <div className="basis-1/2 w-full md:max-w-[50%]">
                    <div className="flex flex-col md:ms-8 mt-2">
                        <div className="flex items-center gap-4 mb-8">
                            <h1 className="flex-1 text-3xl font-semibold text-slate-800">{product.name}</h1>
                            {Number(getRoleId()) === 1 && (<div className="flex gap-3">
                                <Button severity='danger' className="text-sm" onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteProduct(product.id)
                                }}>Hapus Produk</Button>
                                <Button severity='info' className="text-sm" onClick={(e) => {
                                    e.stopPropagation()
                                    setShowEditProductModal(true)
                                }}>Edit Produk</Button>
                            </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <StarRating rating={[product.rating]} />
                            <label className="text-sm text-gray-500">{product.rating} ({productReview.length} rating)</label>
                        </div>
                        <p className="text-2xl font-bold text-orange-400 mt-5">{formatCurrency(product.price)}</p>
                        {Number(getRoleId()) === 2 && (
                            <>
                                <div className="flex items-center gap-4 md:gap-8 mt-8 md:mt-32">
                                    {/* buat menentukan jumlah produk dengan button plus minus di kiri kanannya */}
                                    <label className="text-lg">Jumlah</label>
                                    <Button icon="pi pi-minus" rounded outlined aria-label="minus" onClick={decrement} />
                                    <span>{quantity}</span>
                                    <Button icon="pi pi-plus" rounded aria-label="plus" onClick={increment} />
                                </div>
                                <Button label="Tambahkan ke keranjang" className="btn btn-primary text-white !mt-6" onClick={handleAddToCart} />
                            </>)}
                    </div>
                </div>
            </div >
            {/* card description */}
            <div className="card bg-base-100 shadow-xl mt-4 md:mt-0 rounded-xl">
                <div className="card-body p-0 rounded-xl">
                    <TabView className="rounded-xl">
                        {/* Informasi Produk */}
                        <TabPanel header="Informasi Produk">
                            <h1 className="text-2xl font-semibold">{product.name}</h1>
                            <p className="m-0 mt-4">
                                {product.description}
                            </p>
                        </TabPanel>
                        {/* Ulasan Produk */}
                        <TabPanel header="Ulasan Produk" className="rounded-xl">
                            <div className="flex flex-col md:flex-row">
                                <h2 className="order-1 text-xl font-semibold md:hidden">Review {product.name}</h2>
                                {/* daftar review */}
                                <div className="order-3 md:order-1 mt-3 md:mt-0 basis-1/2 md:max-w-[50%] flex flex-col max-h-[400px] overflow-auto">
                                    <h2 className="text-xl font-semibold hidden md:flex">Review {product.name}</h2>
                                    <div className="flex flex-col gap-4 mt-4">
                                        {productReview.map((review, index) => (
                                            <div key={index} className="flex items-center" >
                                                <img src={ProfileImage} alt="profile" className="w-10 h-10 rounded-full self-start mt-3" />
                                                <div className="flex flex-col ms-4 text-ellipsis overflow-hidden">
                                                    <div className="flex gap-4 items-center">
                                                        <p className="text-md font-semibold text-nowrap text-ellipsis overflow-hidden max-w-[200px]">{review.owner}</p>
                                                        <StarRating rating={review.rating} size="4" />
                                                    </div>
                                                    <p className="text-sm text-gray-500">{review.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* input review */}
                                <div className="order-2 mt-3 md:mt-0 basis-1/2 md:max-w-[50%] flex flex-col md:px-24">
                                    <InputTextarea className="" id="review" placeholder="Bagikan pengalaman anda tentang produk ini" value={userReview} onChange={(e) => setUserReview(e.target.value)} rows={5} cols={50} />
                                    <div className="flex justify-between mt-2">
                                        <StarRating rating={userRating} setUserRating={setUserRating} onClick={true} size="8" />
                                        <Button className="h-8" onClick={() => {
                                            // console.log("submit review", userReview, userRating)
                                            if (isLogin) {
                                                handleAddReview()
                                            } else {
                                                ToastWarning("Silahkan login terlebih dahulu")
                                                navigate('/login')
                                            }
                                        }}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
            {/* card product lainnya */}
            <div className="flex flex-wrap mt-8" >
                {otherProduct !== null && otherProduct?.products?.map((product) => (
                    <div key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <CardProduct product={product} />
                    </div>
                ))}
            </div>
            <EditProductModal
                show={showEditProductModal}
                setShow={setShowEditProductModal}
                selectedProductId={params.id}
                handler={handlerEditProduct}
            />

        </>
    )
}

export default DetailProduct
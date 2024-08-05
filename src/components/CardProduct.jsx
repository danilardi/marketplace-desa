// card product
import StarRating from './StarRating'
import PropTypes from 'prop-types'
import { formatCurrency } from '../utils/FormatUtils'
import { getBaseURLWithPrefix } from '../utils/Helper'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { getRoleId } from '../utils/AuthUtils'
import { deleteProduct } from '../utils/API/Product'
import { ToastSuccess, ToastWarning } from '../utils/AlertNotification'
import { addToCart } from '../utils/API/Cart'
import { useNavbar } from './Navbar'
import Placeholder from '../assets/image/placeholder.png'

const CardProduct = ({ product, handleDeleteProduct, handleEditProduct }) => {
    const navigate = useNavigate();
    const {badge, setBadge, isLogin} = useNavbar()

    const replaceImage = (error) => {
        error.target.className = "w-full h-full absolute object-contain"
        error.target.src = Placeholder;
    }

    const handleAddToCart = () => {
        console.log("add to cart")
        if (isLogin) {
            const addToCartRequest = {
                orderQuantity: 1,
                productId: product.id
            }
            addToCart(addToCartRequest).then((res) => {
                if (res) {
                    setBadge(badge + 1)
                    ToastSuccess("Sukses Menambah Keranjang")
                }
            })
        } else {
            ToastWarning("Silahkan login terlebih dahulu")
            navigate('/login')
        }
    }

    return (
        <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl sm:me-5 my-3" onClick={() => {
            navigate(`/product/${product.id}`)
        }}>
            <figure className="relative h-[200px] bg-base">
                {!product.images &&
                    <img src={`/src/assets/image/placeholder.png`} alt={product.name} className="w-[100px] h-[100px]" />}
                {product.images && (
                    <>
                        <img src={`${getBaseURLWithPrefix(product.images[0])}`} alt={product.name} className="w-full h-full absolute object-fill filter blur-sm" onError={replaceImage} />
                        <img src={`${getBaseURLWithPrefix(product.images[0])}`} alt={product.name} className="w-full h-full absolute object-contain" onError={replaceImage} />
                    </>
                )}
            </figure>
            <div className="card-body">
                <div className='flex'>
                    <h2 className="flex-1 card-title text-lg line-clamp-1">{product.name}</h2>
                    {getRoleId() == 2 && (
                        <div className='flex justify-center gap-4'>
                            <Button icon="pi pi-cart-plus" className="text-sm" onClick={(e) => {
                                e.stopPropagation()
                                handleAddToCart()
                            }}></Button>
                        </div>
                    )}
                </div>
                <StarRating rating={product.rating} />
                <p className="text-xl font-bold text-orange-400 ">{formatCurrency(product.price)}</p>
                <p className="text-sm line-clamp-1">{product.description}</p>
                {getRoleId() == 1 && (
                    <div className='flex justify-center gap-4'>
                        <Button severity='danger' className="text-sm" onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteProduct(product.id)
                        }}>Hapus Produk</Button>
                        <Button severity='info' className="text-sm" onClick={(e) => {
                            e.stopPropagation()
                            handleEditProduct(product.id)
                        }}>Edit Produk</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

CardProduct.propTypes = {
    product: PropTypes.any.isRequired,
};

export default CardProduct
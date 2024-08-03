// card product
import StarRating from './StarRating'
import PropTypes from 'prop-types'
import { formatCurrency } from '../utils/FormatUtils'
import { getBaseURLWithPrefix } from '../utils/Helper'
import { useNavigate } from 'react-router-dom'

const CardProduct = ({ product }) => {
    const navigate = useNavigate();
    // const [imageReplace, setImageReplace] = useState("");

    const replaceImage = (error) => {
        //replacement of broken Image
        error.target.className = "w-full h-full absolute object-contain"
        error.target.src = "/src/assets/image/placeholder.png";
        // if (!imageReplace) {
        //     setImageReplace(`https://picsum.photos/400/200?random=${Math.random()}`);
        // }
        // error.target.src = imageReplace;
    }

    /* {
        "id": "product-k_kOWLydDzZIMzeu",
        "name": "1722487209 - Product 4",
        "price": 40000,
        "description": "contoh deskripsi 4",
        "images": [
            "/upload/images/1722486886605jeruk 2.jpg",
            "/upload/images/1722486997730jeruk 1.jpg",
            "/upload/images/1722487052463jeruk 3.png"
        ],
        "rating": "0"
    } */

    return (
        <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl me-5    my-3" onClick={() => {
            navigate(`/product/${product.id}`)
        }}>
            <figure className="relative h-[200px] bg-base">
                {product.images === null &&
                    <img src={`/src/assets/image/placeholder.png`} alt={product.name} className="w-[100px] h-[100px]" />}
                {product.images != null && (
                    <>
                        <img src={`${getBaseURLWithPrefix(product.images[0])}`} alt={product.name} className="w-full h-full absolute object-fill filter blur-sm" onError={replaceImage} />
                        <img src={`${getBaseURLWithPrefix(product.images[0])}`} alt={product.name} className="w-full h-full absolute object-contain" onError={replaceImage} />
                    </>
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg text-ellipsis overflow-hidden w-full  ">{product.name}</h2>
                <StarRating rating={product.rating} />
                <p className="text-xl font-bold text-orange-400 ">{formatCurrency(product.price)}</p>
                <p className="text-sm">{product.description}</p>
            </div>
        </div>
    )
}

CardProduct.propTypes = {
    product: PropTypes.any.isRequired,
};

export default CardProduct
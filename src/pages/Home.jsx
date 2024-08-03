import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchProduct } from "../utils/API/Product"
import CardProduct from "../components/CardProduct"
import { Button } from "primereact/button"

const Home = () => {
    const [otherProduct, setOtherProduct] = useState(null)
    const [indexBanner, setIndexBanner] = useState(0)
    const banner = [
        `https://picsum.photos/1700/360?random=${Math.random()}`,
        `https://picsum.photos/1700/360?random=${Math.random()}`,
        `https://picsum.photos/1700/360?random=${Math.random()}`,
        `https://picsum.photos/1700/360?random=${Math.random()}`
    ]

    const navigate = useNavigate()

    useEffect(() => {
        fetchProduct(4, 0, setOtherProduct)
    }, [])

    const handleAnchorClick = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const replaceImage = (error) => {
        //replacement of broken Image
        // error.target.src = "/src/assets/image/placeholder.png";
        // error.target.className = "absolute w-full h-full object-contain"
        error.target.src = `https://picsum.photos/1700/360?random=${Math.random()}`;
    }

    return (
        <>
            {/* breadcumbs */}
            <div className="breadcrumbs text-md py-4">
                <ul>
                    <li>
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex mb-0.5"></i>Home
                        </Link>
                    </li>
                </ul>
            </div>
            {/* banner */}
            <div className="flex w-full h-[360px] justify-center items-center shadow-md">
                <a className="btn btn-circle btn-secondary text-white z-20 -mx-6" onClick={(e) => {
                    let newIndex = indexBanner - 1
                    if (newIndex < 0) newIndex = banner.length - 1
                    setIndexBanner(newIndex)
                    handleAnchorClick(e, `slide${indexBanner}`)
                }}>❮</a>
                <div className="carousel w-full h-[360px] rounded-lg z-0">
                    {banner.map((image, index) => (
                        <div key={index} id={`slide${index}`} className="carousel-item w-full z-0">
                            <img
                                src={`${image}`}
                                className="w-full h-full object-fill"
                                onError={replaceImage} />
                        </div>
                    ))}
                </div>
                <a className="btn btn-circle btn-secondary text-white z-20 -mx-6" onClick={(e) => {
                    let newIndex = indexBanner + 1
                    if (newIndex >= banner.length) newIndex = 0
                    setIndexBanner(newIndex)
                    handleAnchorClick(e, `slide${indexBanner}`)
                }}>❯</a>
                {/* <div className="flex justify-between items-center absolute left-0 right-0 w-full h-[360px]">
                    
                </div> */}
            </div>
            {/* profile */}
            <div className="card card-compact shadow-xl rounded-xl mt-4">
                <div className="card-body bg-secondary rounded-t-xl">
                    <h2 className="card-title text-white">Profil Desa</h2>
                </div>
                <div className="card-body">
                    <div className="flex">
                        <div className="basis-1/2 flex flex-col pe-4">
                            <h2 className="card-title">Desa Pariaman</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi autem distinctio necessitatibus quis laboriosam velit vel magni, perferendis suscipit debitis maxime facilis nihil expedita magnam sed dolore voluptatem inventore.</p>
                            <Button className="btn btn-primary text-white mt-3 " onClick={() => navigate("/product")}>Lihat Produk</Button>
                        </div>
                        <figure className="basis-1/2">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsXZmtztoH5de1OhcI0qjEjNa6MJF_owcXvA&s"
                                alt="Album"
                                className="w-full h-full" />
                        </figure>
                    </div>

                </div>
            </div>

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

export default Home
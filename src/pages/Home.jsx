import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchProduct } from "../utils/API/Product"
import CardProduct from "../components/CardProduct"
import { Button } from "primereact/button"
import { set } from "lodash"

const Home = () => {
    const navigate = useNavigate()

    const [otherProduct, setOtherProduct] = useState(null)
    const [indexBanner, setIndexBanner] = useState(1)
    const banner = [
        `https://picsum.photos/1700/360?random=${3}`,
        `https://picsum.photos/1700/360?random=${0}`,
        `https://picsum.photos/1700/360?random=${1}`,
        `https://picsum.photos/1700/360?random=${2}`,
        `https://picsum.photos/1700/360?random=${3}`,
        `https://picsum.photos/1700/360?random=${0}`,
    ]

    const indexBannerRef = useRef(indexBanner);
    const carouselRef = useRef(null);

    useEffect(() => {
        fetchProduct(4, 0, setOtherProduct)
    }, [])

    useEffect(() => {
        handleCarouselChange(1, 'instant')
        const carousel = carouselRef.current;
        const handleScroll = () => {
            let newIndex = (carousel.scrollLeft / carousel.clientWidth);
            if (Number(newIndex.toFixed(2)) == newIndex.toFixed(0)) {
                setIndexBanner(Number(newIndex.toFixed(0)));
            }
        }
        carousel.addEventListener('scroll', handleScroll);
        return () => {
            carousel.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        // console.log("indexBanner", indexBanner)
        indexBannerRef.current = indexBanner;
        if (indexBanner == banner.length - 1) {
            setIndexBanner(1)
            handleCarouselChange(1, 'instant')
        } else if (indexBanner == 0) {
            setIndexBanner(banner.length - 2)
            handleCarouselChange(banner.length - 2, 'instant')
        }
        let autoRunBannerRef = setTimeout(() => {
            // console.log("runTimeout", indexBannerRef.current)
            handleCarouselChange(indexBannerRef.current + 1)
        }, 3000)
        return () => {
            clearTimeout(autoRunBannerRef);
        }
    }, [indexBanner]);

    const handleCarouselChange = (index, behavior = 'smooth') => {
        const targetElement = document.getElementById(`slide${index}`);
        const carousel = carouselRef.current;
        if (targetElement && carousel) {
            const targetPosition = targetElement.offsetLeft;
            carousel.scrollTo({ left: targetPosition, behavior: behavior });
        }
    }

    const replaceImage = (error) => {
        error.target.src = `https://picsum.photos/1700/360?random=${Math.random()}`;
    }

    const handleClick = () => {
        console.log("index", indexBanner)
    }

    return (
        <>
            {/* breadcrumbs */}
            <div className="breadcrumbs text-md py-4">
                <ul>
                    <li>
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex mb-0.5"></i>Home
                        </Link>
                    </li>
                </ul>
            </div>

            {/* <Button className="btn btn-primary text-white" onClick={handleClick}>Testing</Button> */}
            {/* banner */}
            <div className="flex w-full justify-center items-center shadow-md">
                <a className="btn btn-circle btn-secondary text-white z-20 -mx-10 md:-mx-6" onClick={() => {
                    let newIndex = indexBanner - 1
                    if (newIndex < 0) newIndex = banner.length - 1
                    handleCarouselChange(newIndex)
                }}>❮</a>
                <div className="carousel w-full h-[140px] md:h-[300px] lg:h-[360px] rounded-lg z-0" ref={carouselRef}>
                    {banner.map((image, index) => (
                        <div key={index} id={`slide${index}`} className="carousel-item w-full z-0">
                            <img
                                src={`${image}`}
                                className="w-full h-full object-fill"
                                alt={index}
                                onError={replaceImage} />
                        </div>
                    ))}
                </div>
                <a className="btn btn-circle btn-secondary text-white z-20 -mx-10 sm:-mx-6" onClick={() => {
                    let newIndex = indexBanner + 1
                    if (newIndex >= banner.length) newIndex = 0
                    handleCarouselChange(newIndex)
                }}>❯</a>
            </div>
            {/* profile */}
            <div className="card card-compact shadow-xl rounded-xl mt-4">
                <div className="card-body bg-secondary rounded-t-xl">
                    <h2 className="card-title text-white">Profil Desa</h2>
                </div>
                <div className="card-body">
                    <div className="flex flex-col sm:flex-row">
                        <figure className="basis-1/2">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsXZmtztoH5de1OhcI0qjEjNa6MJF_owcXvA&s"
                                alt="Album"
                                className="w-full h-full" />
                        </figure>
                        <div className="basis-1/2 flex flex-col mt-4 sm:mt-0 ms-0 sm:ms-4">
                            <h2 className="card-title">Desa Mekarsari</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi autem distinctio necessitatibus quis laboriosam velit vel magni, perferendis suscipit debitis maxime facilis nihil expedita magnam sed dolore voluptatem inventore.</p>
                            <Button className="btn btn-primary text-white mt-3 " onClick={() => navigate("/product")}>Lihat Produk</Button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-wrap mt-8" >
                {otherProduct !== null && otherProduct.products.map((product) => (
                    <div key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <CardProduct product={product} />
                    </div>
                ))}
            </div>

        </>
    )
}

export default Home

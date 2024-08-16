import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProduct } from "../utils/API/Product"
import CardProduct from "../components/CardProduct"
import { Button } from "primereact/button"
import fotoDesa1 from "../assets/image/foto-desa-1.jpg"
import fotoDesa2 from "../assets/image/foto-desa-2.jpg"
import fotoDesa3 from "../assets/image/foto-desa-3.jpg"
import fotoDesa4 from "../assets/image/foto-desa-4.jpg"
import fotoDesa5 from "../assets/image/foto-desa-5.jpg"
import fotoDesa6 from "../assets/image/foto-desa-6.jpg"
import banner1 from "../assets/image/banner1.png"
import banner2 from "../assets/image/banner2.png"
import banner3 from "../assets/image/banner3.png"

const Home = () => {
    const navigate = useNavigate()

    const [otherProduct, setOtherProduct] = useState(null)
    const [indexBanner, setIndexBanner] = useState(1)
    const banner = [
        banner3,
        banner1,
        banner2,
        banner3,
        banner1
    ]
    const fotoDesa = [
        fotoDesa1,
        fotoDesa2,
        fotoDesa3,
        fotoDesa4,
        fotoDesa5,
        fotoDesa6
    ]

    const indexBannerRef = useRef(indexBanner);
    const carouselBannerRef = useRef(null);
    const carouselFotoDesaRef = useRef(null);

    useEffect(() => {
        getProduct(4, 0, setOtherProduct)
    }, [])

    useEffect(() => {
        handleCarouselBannerChange(1, 'instant')
        const carouselBanner = carouselBannerRef.current;
        const handleScrollBanner = () => {
            let newIndex = (carouselBanner.scrollLeft / carouselBanner.clientWidth);
            if (Number(newIndex.toFixed(2)) == newIndex.toFixed(0)) {
                setIndexBanner(Number(newIndex.toFixed(0)));
            }
        }
        carouselBanner.addEventListener('scroll', handleScrollBanner);
        return () => {
            carouselBanner.removeEventListener('scroll', handleScrollBanner);
        }
    }, []);

    useEffect(() => {
        indexBannerRef.current = indexBanner;
        if (indexBanner == banner.length - 1) {
            setIndexBanner(1)
            handleCarouselBannerChange(1, 'instant')
        } else if (indexBanner == 0) {
            setIndexBanner(banner.length - 2)
            handleCarouselBannerChange(banner.length - 2, 'instant')
        }
        let autoRunBannerRef = setTimeout(() => {
            handleCarouselBannerChange(indexBannerRef.current + 1)
        }, 3000)
        return () => {
            clearTimeout(autoRunBannerRef);
        }
    }, [indexBanner]);

    const handleCarouselBannerChange = (index, behavior = 'smooth') => {
        const targetElement = document.getElementById(`slide${index}`);
        const carousel = carouselBannerRef.current;
        if (targetElement && carousel) {
            const targetPosition = targetElement.offsetLeft;
            carousel.scrollTo({ left: targetPosition, behavior: behavior });
        }
    }
    const handleCarouselFotoDesaChange = (index, behavior = 'smooth') => {
        // console.log("tess", index)
        const targetElement = document.getElementById(`foto-desa${index}`);
        // console.log("targetElement", targetElement)
        const carousel = carouselFotoDesaRef.current;
        if (targetElement && carousel) {
            const targetPosition = targetElement.offsetLeft;
            carousel.scrollTo({ left: targetPosition, behavior: behavior });
        }
    }


    const handleClick = () => {
        // console.log("index", indexBanner)
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
            <div className="flex w-full justify-center items-center shadow-md rounded-lg">
                <a className="btn btn-circle btn-accent hover:bg-accent bg-opacity-70 text-white z-20 -mx-10 md:-mx-6" onClick={() => {
                    let newIndex = indexBanner - 1
                    if (newIndex < 0) newIndex = banner.length - 1
                    handleCarouselBannerChange(newIndex)
                }}>❮</a>
                <div className="carousel w-full h-[140px] md:h-[300px] lg:h-[360px] rounded-lg z-0" ref={carouselBannerRef}>
                    {banner.map((image, index) => (
                        <div key={index} id={`slide${index}`} className="carousel-item w-full z-0">
                            <img
                                src={`${image}`}
                                className="w-full h-full object-fill"
                                alt={index} />
                        </div>
                    ))}
                </div>
                <a className="btn btn-circle btn-accent hover:bg-accent bg-opacity-70 text-white z-20 -mx-10 sm:-mx-6" onClick={() => {
                    let newIndex = indexBanner + 1
                    if (newIndex >= banner.length) newIndex = 0
                    handleCarouselBannerChange(newIndex)
                }}>❯</a>
            </div>
            {/* profile */}
            <div className="card card-compact shadow-xl rounded-sm mt-4">
                <div className="card-body !pt-2 !pb-2 bg-accent rounded-t-sm">
                    <h2 className="card-title !mb-0 text-white justify-center">~~~~ Profile Website ~~~~</h2>
                </div>
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row">
                        <div className="basis-1/2 w-full md:max-w-[50%]">
                            <div className="carousel w-full h-[240px] md:h-[360px] rounded-lg shadow-lg" ref={carouselFotoDesaRef}>
                                {fotoDesa.map((image, index) => (
                                    <div key={index} id={`foto-desa${index}`} className="carousel-item w-full">
                                        <div className="relative w-full h-full">
                                            <img
                                                src={image}
                                                className="absolute w-full h-full object-fill filter blur-md"
                                            />
                                            <img
                                                src={image}
                                                className="absolute w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="carousel carousel-center w-full rounded-box space-x-4 p-4">
                                {fotoDesa.map((image, index) => (
                                    <a
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleCarouselFotoDesaChange(index)
                                        }}
                                        className="w-24 h-16 bg-white rounded-md carousel-item">
                                        <img
                                            src={image}
                                            className="w-full h-full object-fill"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="basis-1/2 flex flex-col mt-4 sm:mt-0 ms-0 sm:ms-4">
                            <h2 className="card-title text-4xl font-bold mt-0 pt-0 h-auto text-[#503c34] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] justify-center sm:justify-normal">Mekarsari Mart</h2>
                            <p className="mt-4"><strong>Selamat datang di Mekarsari Mart</strong>, platform penjualan dan pemasaran yang didedikasikan untuk <strong>memajukan potensi lokal Desa Mekarsari</strong>, Kecamatan Rancabungur, Kabupaten Bogor, Jawa Barat.
                                <br /><br />
                                Di <strong>Mekarsari Mart</strong>, kami menghadirkan beragam produk inovatif hasil kreasi masyarakat desa yang mencerminkan <strong>keunikan dan kualitas terbaik dari daerah kami</strong>. <strong>Mekarsari Mart</strong> hadir sebagai <strong>jembatan antara masyarakat desa dan konsumen</strong> yang menghargai kualitas serta keaslian produk lokal. <strong>Kami berkomitmen untuk mendukung perekonomian desa</strong> melalui penjualan online yang mudah diakses, serta turut <strong>melestarikan tradisi dan budaya Mekarsari</strong>.
                                <br /><br />
                                Nikmati pengalaman berbelanja yang autentik dan berkelanjutan di <strong>Mekarsari Mart</strong>, dan dukunglah upaya kami dalam <strong>mengembangkan potensi lokal yang kaya dan beragam</strong>.</p>
                            <Button className="btn btn-accent text-white mt-6 mb-4" onClick={() => navigate("/product")}>Lihat Produk</Button>
                        </div>
                    </div>

                </div>
            </div >

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

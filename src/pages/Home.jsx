import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProduct } from "../utils/API/Product"
import CardProduct from "../components/CardProduct"
import { Button } from "primereact/button"
import fotoDesa1 from "../assets/image/foto-desa-1.jpg"
import fotoDesa2 from "../assets/image/foto-desa-2.jpg"

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
    const fotoDesa = [
        fotoDesa1,
        fotoDesa2,
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

    const replaceImage = (error) => {
        error.target.src = `https://picsum.photos/1700/360?random=${Math.random()}`;
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
                <a className="btn btn-circle btn-secondary text-white z-20 -mx-10 md:-mx-6" onClick={() => {
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
                                alt={index}
                                onError={replaceImage} />
                        </div>
                    ))}
                </div>
                <a className="btn btn-circle btn-secondary text-white z-20 -mx-10 sm:-mx-6" onClick={() => {
                    let newIndex = indexBanner + 1
                    if (newIndex >= banner.length) newIndex = 0
                    handleCarouselBannerChange(newIndex)
                }}>❯</a>
            </div>
            {/* profile */}
            <div className="card card-compact shadow-xl rounded-xl mt-4">
                <div className="card-body bg-secondary rounded-t-xl">
                    <h2 className="card-title text-white">Profil Desa</h2>
                </div>
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row">
                        <div className="basis-1/2">
                            <div className="carousel h-[240px] md:h-[360px] rounded-lg shadow-lg" ref={carouselFotoDesaRef}>
                                {fotoDesa.map((image, index) => (
                                    <div key={index} id={`foto-desa${index}`} className="carousel-item w-full">
                                        <div className="w-full h-full">
                                            <img
                                                src={image}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="carousel carousel-center w-full rounded-box space-x-4 p-4 justify-center">
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
                            <h2 className="card-title font-bold mt-0">Desa Mekarsari</h2>
                            <p>Desa Mekarsari adalah sebuah desa yang terletak di Kecamatan Rancabungur, Kabupaten Bogor, Jawa Barat. Desa ini memiliki kode pos 16310 dan kode Kemendagri 32.01.34.2005. Mekarsari merupakan salah satu dari tujuh desa yang ada di Kecamatan Rancabungur, bersama dengan desa-desa lain seperti Bantarjaya dan Cimulang.
                                <br /><br />Di desa Mekarsari, terdapat beberapa kegiatan pembangunan yang aktif dilaksanakan. Salah satu proyek yang menonjol adalah pembangunan akses jalan dan tembok penahan tanah (TPT) di Kampung Sukajadi, yang didanai oleh program Samisade. Proyek ini bertujuan untuk membuka akses jalan baru sepanjang 350 meter, dengan pengerjaan yang melibatkan banyak tenaga kerja lokal serta partisipasi swadaya dari masyarakat
                                <br /><br />Selain kegiatan pembangunan infrastruktur, Desa Mekarsari juga memiliki potensi dan kegiatan masyarakat yang aktif, seperti terlihat dari berbagai kegiatan yang dilaksanakan oleh warga</p>
                            <Button className="btn btn-primary text-white" onClick={() => navigate("/product")}>Lihat Produk</Button>
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

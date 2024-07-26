import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {

    }, [])
    return (
        <>
            {/* breadcumbs */}
            <div className="breadcrumbs text-md py-4">
                <ul>
                    <li>
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex"></i>Home
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="card card-compact shadow-xl rounded-xl">
                <div className="card-body bg-secondary rounded-t-xl">
                    <h2 className="card-title text-white">Profil Desa</h2>
                </div>
                <div className="card-body">
                    <div className="card lg:card-side">
                        <div className="card-body">
                            <h2 className="card-title">Desa Pariaman</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi autem distinctio necessitatibus quis laboriosam velit vel magni, perferendis suscipit debitis maxime facilis nihil expedita magnam sed dolore voluptatem inventore.</p>
                            <div className="card-actions justify-start">
                                <button className="btn btn-primary text-white" onClick={() => navigate("/product")}>Lihat Produk</button>
                            </div>
                        </div>
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                                alt="Album" />
                        </figure>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Home
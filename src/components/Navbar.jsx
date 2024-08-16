import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from "react"
import { getAccessToken, removeAuth } from "../utils/AuthUtils"
import { getUser } from "../utils/API/Auth"
import { fetchCart } from "../utils/API/Cart"
import { Badge } from 'primereact/badge'
import { Button } from "primereact/button"
import LogoWithTextHorizontal from '../assets/image/logo with text horizontal.png'
import LogoWithTextBlack from '../assets/image/logo with text black.png'
// import { useEffect, useState } from "react"

const NavbarContext = createContext({})

const Navbar = ({ children }) => {
    const location = useLocation()
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState({ fullname: '' })
    const [badge, setBadge] = useState(0)

    // Context value
    const contextValue = {
        badge,
        setBadge,
        isLogin,
        user,
    };

    const isActivePage = (currentRoute) => {
        return currentRoute === location.pathname
    }


    useEffect(() => {
        if (getAccessToken()) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [location])

    useEffect(() => {
        if (isLogin) {
            getUser().then((res) => {
                setUser(res?.data)
            }).catch((err) => {
                // // console.log(err)
            })
            fetchCart().then((res) => {
                // // console.log('cart', res)
                if (res?.wishlist?.length > 0) setBadge(res.wishlist.length)
            }).catch((err) => {
                // // console.log(err)
            })
        }
    }, [isLogin])

    useEffect(() => {
        // // console.log('user', user, badge)
    }, [user, badge])

    const handleLogout = () => {
        removeAuth()
        setIsLogin(false)
        window.location.reload()
    }

    const handleCall = () => {
        const message = `Halo Kak, saya pengguna website mekarsari perlu bantuan!`;
        const noHp = '6281387738101';
        const url = `https://wa.me/${noHp}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }


    return (
        <NavbarContext.Provider value={contextValue}>
            <div className="flex flex-col h-screen overflow-auto scrollbar-hide">
                {/* Navbar */}
                <div className="navbar bg-primary min-h-12 ps-4 md:px-12 xl:px-32 py-0 text-white fixed z-50">
                    <div className="flex-1 flex py-1">
                        <Link to='/' className="btn btn-ghost py-0 px-1">
                            <img src={LogoWithTextHorizontal} alt="logo" className="h-10" />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {/* Navbar menu content here */}
                        <Link to='/' className={isActivePage('/') ? 'btn btn-ghost bg-secondary h-auto min-h-fit py-2 px-4 rounded-md mx-1  hidden sm:flex' : 'btn btn-ghost py-2 px-4 h-auto min-h-fit mx-1 hidden sm:flex'}>
                            <i className="pi fi-rs-home text-lg"> </i>
                        </Link>
                        <Link to='/product' className={isActivePage('/product') ? 'btn btn-ghost bg-secondary h-auto min-h-fit py-2 px-4 rounded-md mx-1  hidden sm:flex' : 'btn btn-ghost py-2 px-4 h-auto min-h-fit mx-1 hidden sm:flex'}>
                            <i className="pi fi-tr-boxes text-lg"> </i>
                        </Link>
                        <Link to='/cart' className={isActivePage('/cart') ? 'btn btn-ghost bg-secondary h-auto min-h-fit py-2 px-4 rounded-md mx-1  hidden sm:flex' : 'btn btn-ghost py-2 px-4 h-auto min-h-fit mx-1 hidden sm:flex'}>
                            <i className="pi pi-shopping-cart text-lg"></i>
                            <Badge value={badge} severity="info" className="" />
                        </Link>
                        {!isLogin && <Link to='/login' className={isActivePage('/login') ? 'btn btn-ghost bg-secondary h-auto min-h-fit py-3 px-4 rounded-md mx-1 ' : 'btn btn-ghost py-2 px-4 h-auto min-h-fit mx-1 '}>Login</Link>
                        }
                        {isLogin && (
                            <div className="btn btn-ghost h-auto min-h-fit dropdown dropdown-end py-1 px-2 flex" role="button" tabIndex={0}>
                                <div className="avatar size-8 flex-center">
                                    <i className="fi fi-rr-circle-user text-2xl flex-center"></i>
                                </div>
                                <span className="">{user?.fullname}</span>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 shadow text-black top-8">
                                    {/* <li><a>Nama : {}</a></li> */}
                                    {/* <li><a>Profile</a></li> */}
                                    <li>
                                        {/* <a onClick={handleLogout} className="hover:bg-red-500" >Logout</a> */}
                                        <Button onClick={handleLogout} className="text-sm" severity="danger">Logout</Button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {/* Page content here */}
                <div className="grow xl:px-32 md:px-12 py-8 px-4 bg-slate-50 mt-8">
                    {children}
                </div>
                {/* footer */}
                <div className="divider mb-0 mt-0 h-0 divide-slate-400"></div>
                <footer className="footer bg-slate-100 shadow-xl text-neutral-content p-10 mb-8 md:mb-0 xl:px-32 md:px-12">
                    <aside>
                        <img src={LogoWithTextBlack} alt="logo" className="h-10" />
                        <p>
                            Desa Mekarsari Ltd.
                            <br />
                            Kecamatan Rancabungur, Kabupaten Bogor, Jawa Barat, Indonesia. 16310
                        </p>
                    </aside>
                    <nav className="flex w-full gap-5 justify-center">
                        <div>
                            <h6 className="footer-title">Social Media</h6>
                            <div className="grid grid-flow-col gap-4">
                                <a className="flex-center" onClick={() => {
                                    window.open('https://instagram.com/mekarsarimart', '_blank')
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 102 102" id="instagram"><defs><radialGradient id="a" cx="6.601" cy="99.766" r="129.502" gradientUnits="userSpaceOnUse"><stop offset=".09" stopColor="#fa8f21"></stop><stop offset=".78" stopColor="#d82d7e"></stop></radialGradient><radialGradient id="b" cx="70.652" cy="96.49" r="113.963" gradientUnits="userSpaceOnUse"><stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"></stop><stop offset="1" stopColor="#8c3aaa"></stop></radialGradient></defs><path fill="url(#a)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path><path fill="url(#b)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path><path fill="#fff" d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229" transform="translate(-422.637 -426.196)"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h6 className="footer-title">Hubungi Kami</h6>
                            <div className="grid grid-flow-col gap-4">
                                <a className="flex-center" onClick={handleCall}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px" clipRule="evenodd"><path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z" /><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z" /><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z" /><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z" /><path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd" /></svg>
                                </a>
                            </div>
                        </div>
                    </nav>
                </footer>
                {/* Bottom Navigation */}
                <div className="btm-nav sm:hidden">
                    <Link to='/' className={isActivePage('/') ? "text-primary active" : "text-primary"}>
                        <i className="pi fi-rs-home text-lg"> </i>
                        <span className="btm-nav-label">Home</span>
                    </Link>
                    <Link to='/product' className={isActivePage('/product') ? "text-primary active" : "text-primary"}>
                        <i className="pi fi-tr-boxes text-lg"> </i>
                        <span className="btm-nav-label">Produk</span>
                    </Link>
                    <Link to='/cart' className={isActivePage('/cart') ? "text-primary active" : "text-primary"}>
                        <i className="pi pi-shopping-cart text-lg mb-0.5"></i>
                        <span className="btm-nav-label">Keranjang</span>
                    </Link>
                </div>
            </div >
        </NavbarContext.Provider >
    )
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useNavbar = () => useContext(NavbarContext);

export default Navbar
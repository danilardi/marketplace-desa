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
                        <ul className="menu menu-horizontal px-1 items-center">
                            {/* Navbar menu content here */}
                            <li className={isActivePage('/') ? 'bg-secondary rounded-md mx-1 hidden sm:flex' : 'mx-1 hidden sm:flex'}>
                                <Link to='/'>
                                    <i className="pi fi-rs-home text-lg"> </i>
                                </Link>
                                {/* <NavLink to='/'>Home</NavLink> */}
                            </li>
                            <li className={isActivePage('/product') ? 'bg-secondary rounded-md mx-1 hidden sm:flex' : 'mx-1 hidden sm:flex'}>
                                <Link to='/product'>
                                    <i className="pi fi-tr-boxes text-lg"> </i>
                                </Link>
                            </li>
                            <li className={isActivePage('/cart') ? 'bg-secondary rounded-md mx-1 hidden sm:flex' : 'mx-1 hidden sm:flex'}>
                                <Link to='/cart'>
                                    <i className="pi pi-shopping-cart text-lg mb-0.5"></i>
                                    <Badge value={badge} severity="info" className="mb-0.5" />
                                </Link>
                            </li>
                            {!isLogin && <li className={isActivePage('/login') ? 'bg-secondary rounded-md mx-1' : 'mx-1'}>
                                <Link to='/login'>Login</Link>
                            </li>}
                            {isLogin && (
                                <li className='mx-1 flex-center'>
                                    <div className="btn-ghost dropdown dropdown-end p-0 py-1" role="button" tabIndex={0}>
                                        <div className="avatar size-8 flex-center">
                                            <i className="fi fi-rr-circle-user text-2xl flex-center"></i>
                                        </div>
                                        <span className="pe-1">{user.fullname}</span>
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
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className="grow xl:px-32 md:px-12 py-8 px-4 bg-slate-50 mt-8">
                    {children}
                </div>
                {/* footer */}
                <div className="divider mb-0 mt-0 h-0 divide-slate-400"></div>
                <footer className="footer bg-slate-100 shadow-xl text-neutral-content p-10 xl:px-32 md:px-12">
                    <aside>
                        <img src={LogoWithTextBlack} alt="logo" className="h-10" />
                        <p>
                            Desa Mekarsari Ltd.
                            <br />
                            Providing reliable tech since 1992
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Social Media</h6>
                        <div className="grid grid-flow-col gap-4">
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                </svg>
                            </a>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
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
        </NavbarContext.Provider>
    )
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useNavbar = () => useContext(NavbarContext);

export default Navbar
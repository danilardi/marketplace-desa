import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import { getAccessToken, removeAuth } from "../utils/AuthUtils"
import { getUser } from "../utils/API/Auth"
import { fetchCart } from "../utils/API/Cart"
import { Badge } from 'primereact/badge'
// import { useEffect, useState } from "react"

const Navbar = ({ children }) => {
    const location = useLocation()
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState({ fullname: '' })
    const [badge, setBadge] = useState(0)


    const isActivePage = (currentRoute) => {
        return currentRoute === location.pathname
    }

    useEffect(() => {
        // console.log('cek', getAccessToken())
        if (getAccessToken()) {
            // console.log('login')
            setIsLogin(true)
        } else {
            // console.log('not login')
            setIsLogin(false)
        }
    }, [location])

    useEffect(() => {
        if (isLogin) {
            getUser().then((res) => {
                setUser(res?.data)
            }).catch((err) => {
                console.log(err)
            })
            fetchCart().then((res) => {
                console.log('cart', res)
                if (res?.wishlist?.length > 0) setBadge(res.wishlist.length)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [isLogin])

    useEffect(() => {
        console.log('user', user, badge)
    }, [user, badge])

    const handleLogout = () => {
        removeAuth()
        setIsLogin(false)
        window.location.reload()
    }

    return (
        <>
            <div className="flex flex-col h-screen overflow-auto scrollbar-hide">
                {/* Navbar */}
                <div className="navbar bg-primary min-h-12 px-24 py-0 text-white fixed z-50">
                    <div className="navbar-start flex py-1">
                        <Link to='/' className="btn btn-ghost text-xl py-0 px-2 ">Mekarsari Mart</Link>
                    </div>
                    {/* <div className="navbar-center flex">
                        <input type="text" placeholder="Search" className="input input-bordered input-sm" />
                    </div> */}
                    <div className="navbar-end flex items-center">
                        <ul className="menu menu-horizontal px-1 items-center">
                            {/* Navbar menu content here */}
                            <li className={isActivePage('/') ? 'bg-secondary rounded-md mx-1' : 'mx-1'}>
                                <Link to='/'>Home</Link>
                                {/* <NavLink to='/'>Home</NavLink> */}
                            </li>
                            <li className={isActivePage('/product') ? 'bg-secondary rounded-md mx-1' : 'mx-1'}>
                                <Link to='/product'>Produk</Link>
                            </li>
                            <li className={isActivePage('/cart') ? 'bg-secondary rounded-md mx-1' : 'mx-1'}>
                                <Link to='/cart'>
                                    <i className="pi pi-shopping-cart text-lg"> </i>
                                    <Badge value={badge} severity="info" />
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
                                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black top-8">
                                            {/* <li><a>Nama : {}</a></li> */}
                                            {/* <li><a>Profile</a></li> */}
                                            <li><a onClick={handleLogout} className="hover:bg-red-500">Logout</a></li>
                                        </ul>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className="grow lg:px-24 py-8 px-4 bg-slate-50 mt-8">
                    {children}
                </div>
                {/* footer */}
                <div className="divider mb-0 mt-0 h-8 divide-slate-400"></div>
                <footer className="footer bg-slate-100 shadow-xl text-neutral-content p-10 lg:px-24 ">
                    <aside>
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-current">
                            <path
                                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <p>
                            ACME Industries Ltd.
                            <br />
                            Providing reliable tech since 1992
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Social</h6>
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
                {/* <div className="footer bg-primary text-white lg:px-24 px-6 py-3">
                    <p>Copyright &copy; 2024 Company</p>
                </div> */}
            </div >
        </>
    )
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Navbar
import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

const Navbar = ({ children }) => {
    const location = useLocation()

    const isActivePage = (currentRoute) => {
        return currentRoute === location.pathname
    }
    return (
        <>
            <div className="flex flex-col h-screen">
                {/* Navbar */}
                <div className="navbar bg-primary px-32 py-0 text-white">
                    <div className="navbar-start flex">
                        <a className="btn btn-ghost text-xl p-0 ">Marketplace</a>
                    </div>
                    <div className="navbar-center flex">
                        <input type="text" placeholder="Search" className="input input-bordered input-sm" />
                    </div>
                    <div className="navbar-end flex">
                        <ul className="menu menu-horizontal px-1">
                            {/* Navbar menu content here */}
                            <li className={isActivePage('/') ? 'bg-accent rounded-md mx-1' : 'mx-1'}>
                                <Link to='/'>Home</Link>
                            </li>
                            <li className={isActivePage('/product') ? 'bg-accent rounded-md mx-1' : 'mx-1'}>
                                <Link to='/product'>Produk</Link>
                            </li>
                            <li className={isActivePage('/cart') ? 'bg-accent rounded-md mx-1' : 'mx-1'}>
                                <Link to='/cart'>Keranjang</Link>
                            </li>
                            <li className={isActivePage('/login') ? 'bg-accent rounded-md mx-1' : 'mx-1'}>
                                <Link to='/login'>Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className="grow px-32 py-8 bg-base">
                    {children}
                </div>
                {/* footer */}
                <div className="footer bg-primary text-white px-32 py-4">
                    <p>Copyright &copy; 2024 Company</p>
                </div>
            </div >
        </>
    )
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Navbar
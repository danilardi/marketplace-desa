const Navbar = () => {
    return (
        <div className="flex flex-wrap items-center justify-between py-2 px-4">
            <div>
                <h1>LOGO</h1>
            </div>
            <div className="flex items-center justify-center !gap-4">
                <a href="#">Menu1</a>
                <a href="#">Menu2</a>
                <a href="#">Menu3</a>
            </div>
        </div>
    )
}

export default Navbar
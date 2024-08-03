import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "../pages/Home";
import Product from "../pages/Product";
import DetailProduct from "../pages/DetailProduct";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { IsLoggedIn, IsLoggedOut } from "../utils/AuthUtils";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/product" element={<PageWrapper><Product /></PageWrapper>} />
                <Route path="/product/:id" element={<PageWrapper><DetailProduct /></PageWrapper>} />
                <Route
                    path="/cart"
                    element={
                        <IsLoggedIn>
                            <PageWrapper><Cart /></PageWrapper>
                        </IsLoggedIn>
                    }
                />
                <Route path="/login" element={
                    <IsLoggedOut>
                        <PageWrapper><Login /></PageWrapper>
                    </IsLoggedOut>
                } />
                <Route path="/register" element={
                    <IsLoggedOut>
                        <PageWrapper><Register /></PageWrapper>
                    </IsLoggedOut>
                } />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </AnimatePresence>
    );
};

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

export default AnimatedRoutes;

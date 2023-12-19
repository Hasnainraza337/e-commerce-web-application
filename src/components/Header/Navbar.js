import React, { useState } from 'react'
import { Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import logo from "assets/images/logo.png"
import { FaBars } from "react-icons/fa"
import { useAuthContext } from 'contexts/AuthContext'

export default function Navbar() {

    const { isSuperAdmin } = useAuthContext()
    const [scrollNav, setScrollNav] = useState(false);
    const changeValueOnScroll = () => {
        const scrollValue = document.documentElement.scrollTop;
        if (scrollValue > 500) {
            setScrollNav(true)
        }
        else {
            setScrollNav(false)
        }
    }

    window.addEventListener("scroll", changeValueOnScroll)



    const items = [
        {
            key: 'login',
            label: <Link className='nav-link' to="/auth/login" style={{ textDecoration: "none" }}>Login</Link>
        },
        {
            key: 'cart',
            label: <Link className='nav-link' to="/cart" style={{ textDecoration: "none" }}>Cart</Link>,
        },
        // {
        //     key: 'checkout',
        //     label: <Link className='nav-link' to="/checkout" style={{ textDecoration: "none" }}>Checkout</Link>,
        // },
        // {
        //     key: 'bookdetails',
        //     label: <Link className='nav-link' to="/book-details/:id" style={{ textDecoration: "none" }}>Book Details</Link>,
        // },
    ];
    return (
        <>
            <header className={scrollNav ? "sticky-bar navbar1  d-none d-lg-block" : "navbar1  d-none d-lg-block"}>
                <div className="container d-flex justify-content-center py-3">
                    <div className="row">
                        <div className="col">
                            <div className='navbar-menu'>
                                <nav>
                                    <ul id='ul'>
                                        <li><Link to="/" className='nav-link' style={{ textDecoration: "none" }}>Home</Link></li>
                                        {isSuperAdmin && (
                                            <li><Link to="/dashboard" className='nav-link' style={{ textDecoration: "none" }}>Dashboard</Link></li>

                                        )}
                                        <li><Link to="/categories" className='nav-link' style={{ textDecoration: "none" }}>Categories</Link></li>
                                        <li><Link to="/about" className='nav-link' style={{ textDecoration: "none" }}>About</Link></li>
                                        <li>
                                            <Dropdown

                                                menu={{
                                                    items,
                                                }}

                                            >
                                                <Link className='nav-link' style={{ textDecoration: "none", color: "black" }}>Pages</Link>
                                            </Dropdown>
                                        </li>
                                        <li><Link to="/contact" className='nav-link' style={{ textDecoration: "none" }}>Contact</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
            </header >

            {/* mobile header */}
            <header className={scrollNav ? "sticky-bar mobile-nav d-lg-none d-block" : "mobile-nav  d-lg-none d-block"} >
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div>
                                <Link to="/"><img src={logo} alt="website Logo" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
            {/* mobile navbar */}
            <header className={scrollNav ? "sticky-bar mobile-container d-block d-lg-none" : 'mobile-container d-block d-lg-none'} id='mobileHeader' >
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button style={{ border: "none", outline: "none" }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <div className='menu-bar text-white bg-dark px-1 px-lg-1'
                                style={{ width: "100px", padding: "5px 6px" }}
                            >
                                <h4 className='mb-0'>Menu<FaBars style={{ marginLeft: "6px" }} /></h4>
                            </div>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="categories" className="nav-link">Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="about" className="nav-link">About</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >Pages</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/auth/login" className="dropdown-item" >Login</Link></li>
                                        <li><Link to="cart" className="dropdown-item" >Cart</Link></li>
                                        <li><Link to="checkout" className="dropdown-item" >Checkout</Link></li>
                                        <li><Link to="book-details" className="dropdown-item" >Book Details</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link to="contact" className="nav-link">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav >
            </header >

        </>
    )
}







// {/* <header className='sticky-nav mobile-container d-block d-lg-none'>
//                 <div className="container-fluid py-2">
//                     <div className="row">
//                         <div className="col">
//                             <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                                 <div className='menu-bar text-white bg-dark px-1 px-lg-1'
//                                     style={{ width: "100px", padding: "5px 6px" }}
//                                 >
//                                     <h4 className='mb-0'>Menu<FaBars style={{ marginLeft: "6px" }} /></h4>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header> */}
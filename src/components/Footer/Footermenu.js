import React from 'react'
import { Link } from 'react-router-dom'
import logo from "assets/images/logo.png"
import { BiLogoFacebookCircle, BiLogoInstagram } from "react-icons/bi"
import { TiSocialLinkedin } from "react-icons/ti"
import { AiFillYoutube } from "react-icons/ai"
import { Tooltip } from 'antd'


export default function Footermenu() {
    return (
        <>
            <footer>
                <div className="container py-5">
                    <div className="row d-flex justify-content-between">
                        <div className="col-xl-3 col-lg-5 col-md-4 col-sm-6">
                            <div className='mb-4'>
                                <Link to="/"><img src={logo} alt="website Logo" /></Link>
                            </div>
                            <p className='mb-4 text-black'>Get the breathing space now, and we’ll extend your term at the other end year for go.</p>
                            <div className='social-links'>
                                <Tooltip title="facebook">
                                    <Link to="/" className='nav-links' >< BiLogoFacebookCircle /></Link>
                                </Tooltip>
                                <Tooltip title="instagram">
                                    <Link to="/" className='nav-links' ><BiLogoInstagram /></Link>
                                </Tooltip>
                                <Tooltip title="linkedin">
                                    <Link to="/" className='nav-links' ><TiSocialLinkedin /></Link>
                                </Tooltip>
                                <Tooltip title="youtube">
                                    <Link to="/" className='nav-links' ><AiFillYoutube /></Link>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-5">
                            <h4 className='mt-3 mt-md-0 mt-lg-0'>Book Category</h4>
                            <ul>
                                <li><Link className='footer-link'>History</Link></li>
                                <li><Link className='footer-link'>Horror - Thriller</Link></li>
                                <li><Link className='footer-link'>Love Stories</Link></li>
                                <li><Link className='footer-link'>Science Fiction</Link></li>
                                <li><Link className='footer-link'>Business</Link></li>
                            </ul>

                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                            <h4>&nbsp;</h4>
                            <ul>
                                <li><Link className='footer-link'>Biography</Link></li>
                                <li><Link className='footer-link'>Astrology</Link></li>
                                <li><Link className='footer-link'>Digital Marketing</Link></li>
                                <li><Link className='footer-link'>Software Development</Link></li>
                                <li><Link className='footer-link'>Ecommerce</Link></li>
                            </ul>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                            <h4>Site Map</h4>
                            <ul>
                                <li><Link className='footer-link'>Home</Link></li>
                                <li><Link className='footer-link'>About us</Link></li>
                                <li><Link className='footer-link'>FAQs</Link></li>
                                <li><Link className='footer-link'>Pages</Link></li>
                                <li><Link className='footer-link'>Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer >
        </>
    )
}

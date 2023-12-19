import React from 'react'
import { Button, Input } from 'antd'
import { Link } from 'react-router-dom'

export default function NewsLetter() {
    return (
        <>
            <section className='subscribe-container'>
                <div className="container">
                    <div className='subscribe d-flex justify-content-center align-items-center'>
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-8 col-lg-6" style={{ padding: "0px 20px" }}>
                                <div className='subscribe-caption'>
                                    <h3 className='text-white text-center'>Join Newsletter</h3>
                                    <p className='text-center'>
                                        Lorem started its journey with cast iron (CI) products in 1980.
                                        The initial main objective was to ensure pure water and affordable
                                        irrigation.
                                    </p>
                                    <form>
                                        <div className='form'>
                                            <div id='input'>
                                                <Input
                                                    className='input'
                                                    placeholder="Enter your email"
                                                    style={{
                                                        borderRadius: "40px",
                                                        marginRight: "10px"

                                                    }}
                                                />
                                            </div>
                                            <Link to="/auth/login" style={{ textDecoration: "none", display: "flex", justifyContent: "center" }} ><Button type='primary' danger className='subscribe-btn' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", justifyContent: "center", }}>Subscribe</Button></Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

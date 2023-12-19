import React, { useEffect, useState } from 'react'
import { Button, Rate, Space } from 'antd'
import { Link } from 'react-router-dom'
import History from "assets/images/History.jpeg"
import CarouselCard from 'components/CarouselCard'
import CardProduct from 'components/CardPorduct'
import NewsLetter from 'components/NewsLetter'
import { useProductContext } from 'contexts/ProductContext'



export default function Hero() {

    const { products } = useProductContext()
    const [selectedType, setSelectedType] = useState("")
    const [filterProducts, setFilteredProducts] = useState([])
    const firstTwoProducts = products.slice(0, 2);

    useEffect(() => {
        if (selectedType) {
            const filteredData = products.filter((product) => product.type === selectedType)
            setFilteredProducts(filteredData)

        } else {
            setFilteredProducts(products)
        }
    }, [products, selectedType])
    // const filteredBooks = selectedType
    //     ? products.filter((product) => product.type === selectedType)
    //     : products;


    const handleTypeSelection = (type) => {
        setSelectedType(type);
    };

    console.log(filterProducts)


    return (
        <>
            <section className='main'>
                <div className="container main-slider">
                    <div className="row ">
                        <div className="col">
                            <div id="carouselExampleDark" className="carousel  slide carousel-fade" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active carousel-image bg-img-1" data-bs-interval="5000">
                                        <div className="carousel-caption">
                                            <h1 className='animate__animated animate__backInUp animate__delay-0.1s d-none d-lg-block'>The History<br /> of Pakistan</h1>
                                            <div className='d-flex justify-content-center'>
                                                <Link className=' animate__animated animate__bounceInUp animate__delay-2s d-none d-lg-block' to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", }}>Browser Store</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item carousel-image bg-img-2" data-bs-interval="5000">
                                        <div className="carousel-caption">
                                            <h1 className='animate__animated animate__backInUp animate__delay-0.1s d-none d-lg-block'>The History<br /> of Pakistan</h1>
                                            <div className='d-flex justify-content-center'>
                                                <Link className=' animate__animated animate__bounceInUp animate__delay-2s d-none d-lg-block' to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", }}>Browser Store</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item carousel-image bg-img-3" data-bs-interval="5000">
                                        <div className="carousel-caption">
                                            <h1 className='animate__animated animate__backInUp animate__delay-0.1s d-none d-lg-block'>The History<br /> of Pakistan</h1>
                                            <div className='d-flex justify-content-center'>
                                                <Link className=' animate__animated animate__bounceInUp animate__delay-2s d-none d-lg-block' to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", }}>Browser Store</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
                {/* card slider */}
                <div className="container card-slider">
                    <div className="row">
                        <div className="col">
                            <h2 className='text-center  selling-books'>Best Selling Books Ever</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <CarouselCard />
                        </div>
                    </div>
                </div>
            </section>


            {/* Featured container */}
            <section className='main-middle' style={{ paddingTop: "120px" }}>
                <div className="container featured-container">
                    <div className="row">
                        <div className="col-xl-9 col-lg-9 col-md-8">
                            <div className="row">
                                <div className="col">
                                    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: "40px" }}>
                                        <h2 style={{
                                            fontSize: "30px", fontWeight: "700", fontFamily: '"Playfair Display", serif',
                                            color: "#1a1a1a",
                                        }}>Feature This Week</h2>
                                        <div className='view'>
                                            <Link style={{ textDecoration: "none", color: "#1a1a1a", }}>View All</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-4">
                                    <div id="carouselExample" className="carousel slide featured-slider1 " data-bs-ride="carousel" style={{ backgroundColor: "#ff1616", }}  >
                                        <div className="carousel-inner">
                                            {firstTwoProducts.map((book, i) => {
                                                return (
                                                    <div key={i} className="carousel-item active" data-bs-interval="3000" style={{ padding: "90px 20px 90px 100px" }}>
                                                        <div className='featured-slider '>
                                                            <div className='feature-image' style={{ marginRight: "50px" }}>
                                                                <img src={book.file} alt="image" />
                                                            </div>
                                                            <div className='featiured-caption'>
                                                                <h3>{book.title}</h3>
                                                                <p>{book.author}</p>
                                                                <div className='price'>
                                                                    <span style={{ fontSize: '30px', fontWeight: "600", color: "white" }}>${book.price}</span>
                                                                </div>
                                                                <div className="review d-flex align-items-center">
                                                                    <div className='rating me-1'>
                                                                        <Rate style={{ fontSize: "20px" }} allowHalf defaultValue={4.5} />
                                                                    </div>
                                                                    <div className='rating-review'>
                                                                        <p className='mb-0'>(<span>120</span> Review)</p>
                                                                    </div>
                                                                </div>
                                                                <Link to={`/book-details/${book.id}`} style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ marginTop: "15px", border: "1px solid #f4f4f4", borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", marginRight: 0, }}>View Details</Button></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button> */}

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-9">
                            <img src={History} alt="image" className='w-100 img-fluid' style={{ height: "481" }} />
                        </div>
                    </div>
                </div>
            </section >

            {/* latest items */}

            <section className='main-middle2' style={{ paddingTop: "120px" }}>

                <div className="container">
                    <div className="row d-flex justify-content-center flex-wrap" style={{ marginBottom: "40px" }}>
                        <div className="col-xl-5 col-lg-5 col-md-12">
                            <h2 className='mb-4 mb-lg-0'>Latest Published items</h2>
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className='filter-link'>
                                <Space className='d-flex flex-wrap'>
                                    <Button size='large' onClick={() => handleTypeSelection('')} style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>All</Button>
                                    <Button size='large' onClick={() => handleTypeSelection('Horror')} style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>Horror</Button>
                                    <Button size='large' onClick={() => handleTypeSelection('Thriller')} style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>Thriller</Button>
                                    <Button size='large' onClick={() => handleTypeSelection('Science Fiction')} style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>Science Fiction</Button>
                                    <Button size='large' onClick={() => handleTypeSelection('History')} style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>History</Button>
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Card product import from Component */}
                <CardProduct filterProducts={filterProducts} />
            </section>

            {/* middle3 */}

            < section className='main-middle3' style={{ paddingTop: "70px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                            <div className='bg-history1'>
                                <div className='bg-caption w-100 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h2 className='text-white'>The History<br /> of Pakistan</h2>
                                    </div>
                                    <div>
                                        <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center" }}>View Details</Button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className='bg-history2'>
                                <div className='bg-caption w-100 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h2 className='text-white'>Wilma Mumduya</h2>
                                    </div>
                                    <div>
                                        <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center" }}>View Details</Button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* subscribe section */}
            < NewsLetter />

        </>
    )
}














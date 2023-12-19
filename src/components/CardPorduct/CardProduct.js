import React from 'react'
import { Button, Rate, } from 'antd'
import { Link } from 'react-router-dom'
import { useProductContext } from 'contexts/ProductContext'


export default function CardProduct(props) {
    console.log(props)
    const filteredBooks = props.filterProducts;

    const { products } = useProductContext()

    const displayedProducts = products.slice(0, 6);
    const productsToDisplay = filteredBooks && filteredBooks.length > 0 ? filteredBooks : displayedProducts;

    return (
        <>
            <div className="container card-product">
                <div className="row">
                    {productsToDisplay.map((product, i) => {
                        const { title, price, file, author } = product;
                        return (
                            <div key={i} className="col-12 col-md-6 col-lg-2">


                                <div className="card mb-4 mb-md-5 mb-lg-0">
                                    <img className="card-image" src={file} alt={title} />
                                    <div className="card-caption">
                                        <div>
                                            <h3>{title}</h3>
                                            <p>{author}</p>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="rating">
                                                <Rate style={{ fontSize: "15px" }} allowHalf defaultValue={4.5} />
                                                <p className="mb-0">(<span className="text-danger" style={{ fontSize: "12px" }}>120</span> Review)</p>
                                            </div>
                                            <div className="price">
                                                <span>${price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center mb-2'>
                                        <Link to={`/book-details/${product.id}`}>
                                            <Button>More Details</Button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row mt-5">
                    <div className="col d-flex  justify-content-center">
                        <Link style={{ textDecoration: "none" }} ><Button size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", }}>Browse More</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

import React from "react";
import Slider from "react-slick";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import { useProductContext } from "contexts/ProductContext";

function SampleNextArrow(props) {
    const { className, style, onClick, } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red", fontSize: "30px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick, } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green", fontSize: "30px" }}
            onClick={onClick}
        />
    );
}

export default function CarouselCard() {

    const { products } = useProductContext()

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    initialSlide: 0,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Slider {...settings}>
                        {products.map((product, i) => {
                            const { title, price, file, author } = product;
                            return (
                                <div key={i} className="card">

                                    <Link to={`/book-details/${product.id}`}><img className="card-image" src={file} alt={title} /></Link>
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
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );

}












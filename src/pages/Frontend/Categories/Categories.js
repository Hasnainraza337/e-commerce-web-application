import { Button, Radio, Rate } from 'antd'
import RangeSlider from 'react-range-slider-input';
import { Link } from 'react-router-dom';
import NewsLetter from 'components/NewsLetter';
import { useProductContext } from 'contexts/ProductContext';





export default function Categories() {

  const { products } = useProductContext()

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className='category-img d-flex justify-content-center align-items-center'>
              <div className='category-caption'>
                <h2>Book Category</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className='filter-lists'>
              {/* filter by geners */}
              <div className='filter-genres mb-4'>
                <h4>Filter by Geners</h4>
                <Radio>History</Radio>
                <Radio>Horror - Thriller</Radio>
                <Radio>Love Stories</Radio>
                <Radio>Science Fiction</Radio>
                <Radio>Biography</Radio>
              </div>
              {/* filter by price range */}
              <div className='Price-range mb-5'>
                <h4>Filter by Price</h4>
                <RangeSlider
                  id="range-slider-ab"
                  className="margin-lg"
                  step={"any"}
                  rangeSlideDisabled={true}
                />
              </div>
              {/* filter by rating start */}
              <div className='filter-rating mb-5'>

                <select class="form-select" aria-label="Default select example">
                  <option selected>Filter by Rating</option>
                  <option value="1">5 Star Rating</option>
                  <option value="2">4 Star Rating</option>
                  <option value="3">3 Star Rating</option>
                  <option value="4">2 Star Rating</option>
                  <option value="5">1 Star Rating</option>
                </select>
              </div>
              {/* filter by publisher */}
              <div className='Filter-publisher mb-4'>
                <h4>Filter by Publisher</h4>
                <Radio>Green Publications</Radio>
                <Radio>Anondo Publications</Radio>
                <Radio>Rinku Publications</Radio>
                <Radio>Sheba Publications</Radio>
                <Radio>Red Publications</Radio>
              </div>
              {/* filter by auther name */}
              <div className='filter-auther mb-4'>
                <h4>Filter by Auther Name</h4>
                <Radio>Buster Hyman</Radio>
                <Radio>Fill Harmonic</Radio>
                <Radio>Cam L.Toe</Radio>
                <Radio>Otto Matic</Radio>
                <Radio>Juan Annatoo</Radio>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-6">
            <div className="row d-flex justify-content-end">
              <div className="col-xl-4">
                <div className='popularity'>
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Browse by Popularity</option>
                    <option value="1">Name</option>
                    <option value="2">New</option>
                    <option value="3">Old</option>
                    <option value="4">Price</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-product">
              <div className="row mt-3">
                {/* 
                {products.map((product, i) => {
                  const { title, price, file, author } = product;
                  return (
                    <div key={i} className="col-xxl-3 col-xl-4 col-lg-4 col-md-12 col-sm-6">
                      <div className="card mb-4 mb-md-5 mb-lg-3">

                        <Link to={`/book-details/${product.id}`}></Link>
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
                      </div>
                    </div>
                  )
                })} */}

                <div className="row mt-5">
                  <div className="col d-flex  justify-content-center">
                    <Link style={{ textDecoration: "none" }} ><Button size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", }}>Browse More</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetter />

    </>
  )
}

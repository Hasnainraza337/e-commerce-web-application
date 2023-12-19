import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'contexts/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'config/firebase';
import CartCard from './CartCard';
import { Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


export default function Cart() {

  const { user } = useAuthContext()
  const [cartdata, setcartdata] = useState([])
  const navigate = useNavigate();


  const getcartdata = async () => {
    const cartArray = [];
    const path = `cart-${user.uid}`
    getDocs(collection(firestore, path)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cartArray.push({ ...doc.data(), id: doc.id })
      });
      setcartdata(cartArray)
    }).catch('Error error error')

  }
  useEffect(() => {
    getcartdata()
  }, [getcartdata])


  // Function to handle "Proceed to checkout" button click
  // const handleProceedToCheckout = () => {
  //   // Navigate to the checkout page and pass cartdata as a prop
  //   navigate('/checkout', { state: { cartdata } });
  // };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className='cart-img d-flex justify-content-center align-items-center'>
              <div className='cart-caption'>
                <h2>Cart</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="cart-product">
                <div className='cart-item'>
                  {cartdata.length > 0 ? (
                    <div className='allcartitems'>
                      {cartdata.map((product) => (
                        <CartCard
                          key={product.id}
                          itemdata={product}
                          userid={user.uid}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className='text-center'>You haven't added anything to your cart!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='checkout-shopping'>
            {cartdata.length > 0 ? (
              <>
                <Space>
                  {/* <Link to="/checkout" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' onClick={handleProceedToCheckout} style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", marginRight: 0, }}>Checkout Shoping</Button></Link> */}
                  {/* <Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", marginRight: 0, }} onClick={handleProceedToCheckout}>Proccees to checkout</Button> */}
                  <Link to={{ pathname: "/checkout", state: { cartdata: cartdata } }}>
                    <Button>Proceed to Checkout</Button>
                  </Link>
                </Space>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </section >







      {/* <div className="table-responsive">
                  <table class="table">
                   
                      <tr>
                        <td>
                          <div className='product-cart d-flex'>
                            <div className='p-img d-flex' style={{ paddingRight: "30px" }}>
                              <img src={dragon} alt="dragon" />
                            </div>
                            <div className="p-caption">
                              <p>
                                Minimalistic shop for multipurpose use
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5>$360.00</h5>
                        </td>
                        <td>
                          <div className='p-count'>
                            <span className='decremint'>-</span>
                            <input type="text"
                              style={{
                                width: "50px",
                                paddingLeft: "30px",
                                height: "50px",
                                outline: "none",
                                boxShadow: "none",
                                border: "1px solid #eeeeee",
                                borderRadius: "3px",
                              }}
                            />
                            <span className='increment'>+</span>
                          </div>
                        </td>
                        <td>
                          <h5>$720.00</h5>
                        </td>
                        <td>
                          <h5>Delet</h5>
                        </td>
                      </tr>
                      <tr className='bottom-button'>
                        <td>
                          <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center" }}>Update cart</Button></Link>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className='cupon-btn float-right'
                            style={{
                              marginLeft: "-446px",
                            }}
                          >
                            <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center" }}>Close Coupon</Button></Link>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>

                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td>
                          <h5>$2160.00</h5>
                        </td>
                      </tr>
                      <tr className='Shipping'>
                        <td></td>
                        <td></td>
                        <td style={{ verticalAlign: "top" }}>
                          <h5>Shipping</h5>
                        </td>
                        <td>
                          <div className='shipping-box' style={{
                            marginLeft: "-250px",
                            textAlign: "right"

                          }}>
                            <ul className='shipping-list'>
                              <li>
                                <span>Flat Rate: $5.00</span>
                                <input type="radio" style={{ marginLeft: "10px" }} />
                              </li>
                              <li>
                                <span>Free Shipping</span>
                                <input type="radio" style={{ marginLeft: "10px" }} />
                              </li>
                              <li>
                                <span>Flat Rate: $10.00</span>
                                <input type="radio" style={{ marginLeft: "10px" }} />
                              </li>
                              <li>
                                <span>Local Delivery: $2.00</span>
                                <input type="radio" style={{ marginLeft: "10px" }} />
                              </li>
                            </ul>
                            <h6>Calculate Shipping</h6>
                            <Row>
                              <Col span={24} className='mb-3'>
                                <Select
                                  size='large'
                                  placeholder="Country"
                                  // onChange={onCountryChange}
                                  allowClear
                                >
                                  <Option value="Pakistan">Pakistan</Option>
                                  <Option value="Bangladesh">Bangladesh</Option>
                                  <Option value="Afghanistan">Afghnaistan</Option>
                                </Select>
                              </Col>
                              <Col span={24} className='mb-3'>
                                <Select

                                  size='large'
                                  placeholder="Select a State"
                                  allowClear
                                >
                                  <Option value="1">state1</Option>
                                  <Option value="2">State2</Option>
                                  <Option value="3">State3</Option>
                                </Select>
                              </Col>
                              <Col span={24}>
                                <Input placeholder='PostCode/Zipcode' />
                              </Col>
                            </Row>

                            <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", marginRight: 0, }}>Update Drtails</Button></Link>
                          </div>
                        </td>
                      </tr>

                     
                  </table>
                </div> */}


    </>
  )
}

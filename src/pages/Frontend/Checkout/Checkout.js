import { Button, Checkbox, Col, Form, Input, Row, Select, Space, } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Checkout() {

  const location = useLocation();
  const [cartdata, setcartdata] = useState([]);
  const [form] = Form.useForm();
  const onCountryChange = (value) => {
    switch (value) {
      case 'Pakistan':
        form.setFieldsValue({
          note: 'Hi, Pakistani!',
        });
        break;
      case 'Saudia Arabia':
        form.setFieldsValue({
          note: 'Hi, Saudia Arabia!',
        });
        break;
      case 'Afghanistan':
        form.setFieldsValue({
          note: 'Hi Afghan!',
        });
        break;
      default:
    }
  };
  const onDistrictChange = (value) => {
    switch (value) {
      case 'Toba Tek Singh':
        form.setFieldsValue({
          note: 'Hi, T.T.Singh!',
        });
        break;
      case ' Faisalabad':
        form.setFieldsValue({
          note: 'Hi,  Faisalabad!',
        });
        break;
      case 'Jhang':
        form.setFieldsValue({
          note: 'Hi jhang!',
        });
        break;
      default:
    }
  };


  useEffect(() => {
    // Get the cartdata from the location state
    if (location.state && location.state.cartdata) {
      console.log(location.state.cartdata);
      setcartdata(location.state.cartdata);
    }
  }, [location.state]);


  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className='checkout-img d-flex justify-content-center align-items-center'>
                <div className='checkout-caption'>
                  <h2>Check Out</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className='customer'>
                <div className='check-customer'>
                  <h2>Returning Customer?<Link style={{ color: "red" }}>Click here to login</Link></h2>
                </div>
                <p>If you have shopped with us before, please enter your details in the boxes below. If you are a new customer, please proceed to the Billing & Shipping section.</p>
                <Form>
                  <Row gutter={16}>
                    <Col md={12}>
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Usernam Or Email"
                          },
                        ]}
                      >
                        <Input size='large' placeholder="UserName or Email" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Password"
                          },
                        ]}
                      >
                        <Input.Password size='large' placeholder="Password" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Space>
                        <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", marginRight: 0, }}>Sign in</Button></Link>
                        <div>
                          <Checkbox >Create an account?</Checkbox>
                        </div>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className='cupon mt-3'>
                <div className='check-cupon'>
                  <h2 style={{ marginBottom: "20px" }}>Have a Cupon?<Link style={{ color: "red" }}>Click here to enter you cupon</Link></h2>
                </div>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Item
                        name="cupon"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Cupon Code"
                          },
                        ]}
                      >
                        <Input size='large' placeholder="Enter cupon code" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Space>
                        <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center", marginRight: 0, }}>Apply Coupon</Button></Link>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className='billings mt-4'>
                <div className="row">
                  <div className="col-lg-8">
                    <div className='bills-title'>
                      <h3>Billings Details</h3>
                    </div>
                    <div className='form-details'>
                      <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                        <Row gutter={16}>
                          <Col span={24} xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                              name="firstname"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input size='large' placeholder="First Name" />
                            </Form.Item>
                          </Col>
                          <Col span={24} xs={24} sm={24} md={12} lg={12} >
                            <Form.Item
                              name="Last Name"
                              rules={[
                                {
                                  required: true,

                                },
                              ]}
                            >
                              <Input size='large' placeholder="Email" />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              name="companyname"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input size='large' placeholder="Company Name" />
                            </Form.Item>
                          </Col>
                          <Col span={24} xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                              name="phonenumber"
                              rules={[
                                {
                                  required: true,
                                  type: "number"
                                },
                              ]}
                            >
                              <Input size='large' placeholder="Phone Number" />
                            </Form.Item>
                          </Col>
                          <Col span={24} xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                              name="email"
                              rules={[
                                {
                                  required: true,
                                  type: "email"
                                },
                              ]}
                            >
                              <Input size='large' placeholder="Email Address" />
                            </Form.Item>
                          </Col>
                          <Col span={24} >
                            <Form.Item
                              name="country"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                size='large'
                                placeholder="Country"
                                onChange={onCountryChange}
                                allowClear
                              >
                                <Option value="Pakistan">Pakistan</Option>
                                <Option value="Saudia Arabia">Saudia Arabia</Option>
                                <Option value="Afghanistan">Afghnaistan</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              name="address1"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <TextArea placeholder="Address line 1" autoSize={{
                                minRows: 2,
                                maxRows: 6,
                              }} />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              name="address2"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <TextArea placeholder="Address line 2" autoSize={{
                                minRows: 2,
                                maxRows: 6,
                              }} />
                            </Form.Item>
                          </Col>
                          <Col span={24} >
                            <Form.Item
                              name="city"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input size='large' placeholder="Town/City" />
                            </Form.Item>
                          </Col>
                          <Col span={24} >
                            <Form.Item
                              name="district"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                size='large'
                                placeholder="District"
                                onChange={onDistrictChange}
                                allowClear
                              >
                                <Option value="Toba Tek Singh">Toba Tek Singh</Option>
                                <Option value="Faisalabad">Faisalabad</Option>
                                <Option value="Jhang">jhang</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={24} >
                            <Form.Item
                              name="postcode"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input size='large' placeholder="Postcode/Zip" />
                            </Form.Item>
                          </Col>
                          <Col span={24} >
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Checkbox>Create an account?</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <div className='shipping-details'>
                              <h3>Shipping Details</h3>
                              <Col span={24} >
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <Checkbox>Ship to different address?</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item
                                  name="note"
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <TextArea placeholder="Order Notes" autoSize={{
                                    minRows: 5,
                                    maxRows: 8,
                                  }} />
                                </Form.Item>
                              </Col>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className='order-box'>
                      <h2 style={{ fontFamily: "paylfair Display,serif", fontSize: "22px", paddingLeft: "0px" }}>Your Order</h2>
                      <ul id='list1'>
                        {cartdata.length > 0 ? (
                          cartdata.map((product) => (
                            <li key={product.id}>
                              <Link className='list-items'>
                                {product.title}
                                <span>Total: ${product.price}</span>
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li>Your cart is empty</li>
                        )}
                        {/* <li>
                          <Link className='list-items'>
                            Product
                            <span>Total</span>
                          </Link>
                        </li>

                        <li>
                          <Link className='list-items'>
                            Fresh Blackberry
                            <span className='middle-list'>x 02</span>
                            <span className='last-list'>$720.00</span>
                          </Link>
                        </li>

                        <li>
                          <Link className='list-items'>
                            Fresh Tomatoes
                            <span className='middle-list'>x 02</span>
                            <span className='last-list'>$720.00</span>
                          </Link>
                        </li>

                        <li>
                          <Link className='list-items'>
                            Fresh Brocoli
                            <span className='middle-list'>x 02</span>
                            <span className='last-list'>$720.00</span>
                          </Link>
                        </li> */}
                      </ul>

                      <ul id='list2'>
                        <li>
                          <Link className='list-items2'>
                            SUBTOTAL
                            <span>$2160.00</span>
                          </Link>
                        </li>

                        <li>
                          <Link className='list-items2'>
                            SHIPPING
                            <span>Flate Rate: $50.00</span>
                          </Link>
                        </li>

                        <li>
                          <Link className='list-items2'>
                            TOTAL
                            <span>$2210.00</span>
                          </Link>
                        </li>
                      </ul>
                      <div className='payment1'>
                        <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                          <Checkbox>Check Payment</Checkbox>
                        </div>
                        <div>
                          <p>
                            Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                          </p>
                        </div>
                      </div>
                      <div className='payment2'>
                        <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                          <Checkbox>Paypal</Checkbox>
                        </div>
                        <div>
                          <p>
                            Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                          </p>
                        </div>
                      </div>
                      <div className='term-condition'>
                        <Checkbox>I’ve read and accept the <span style={{ color: "red" }}>terms & conditions*</span></Checkbox>
                      </div>
                      <div className='Procceed'>
                        <Link to="/auth/login"><Button>Procede To Paypal</Button></Link>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

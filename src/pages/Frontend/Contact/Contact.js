import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AiOutlineHome } from 'react-icons/ai';
import { TfiEmail, TfiTablet } from 'react-icons/tfi';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from 'config/firebase';

const initialState = { message: "", name: "", email: "", subject: "" }

export default function Contact() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleSubmit = async () => {
    // e.preventDefault()

    let { message, name, email, subject } = state

    const messageData = {
      message, name, email, subject,
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2),

    }
    createMessagedata(messageData)
    setIsProcessing(true)
  }


  const createMessagedata = async (messageData) => {
    try {
      await setDoc(doc(firestore, "Messages", messageData.id), messageData);
      message.success("Your message sent successfully.")
      form.resetFields()
    } catch (e) {
      console.error("Error sent message: ", e);
    }
    setIsProcessing(false)
  }



  const [form] = Form.useForm();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className='contact-img d-flex justify-content-center align-items-center'>
              <div className='contact-caption'>
                <h2>Contact</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Map */}
      <div className="container" style={{ paddingTop: "130px", paddingBottom: "100px" }}>
        <div className="row mb-5">
          <div className="col">
            <div className='map' style={{ height: '480px', overflow: "hidden" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1704.1122043601922!2d72.73600995000001!3d31.325175050000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392252ea35e9f185%3A0xec12eaf8079d5cf3!2sNew%20Lahore%20City%2C%20Naya%20Lahore%2C%20Toba%20Tek%20Singh%20District%2C%20Punjab!5e0!3m2!1sen!2s!4v1685239036330!5m2!1sen!2s" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
        {/* form */}
        <div className="row d-flex message-form">
          <div className="col-12">
            <div className="contact-title">
              <h2>Get in Touch</h2>
            </div>
          </div>
          <div className="col-lg-8">
            <Form onFinish={handleSubmit} form={form} name="validateOnly" layout="vertical" autoComplete="off">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter Message" name='message'
                      autoSize={{
                        minRows: 8,
                        maxRows: 10,
                      }} rows={4} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24} xs={24} sm={24} md={12} lg={12}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size='large' placeholder="Name" name='name' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24} xs={24} sm={24} md={12} lg={12} >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                      },
                    ]}
                  >
                    <Input size='large' placeholder="Email" name='email' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="subject"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size='large' placeholder="Enter Subject" name='subject' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button htmlType="submit" loading={isProcessing}>Send</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="col-lg-3 offset-lg-1">
            <div className="details  d-flex" style={{ marginBottom: "20px" }}>
              <span style={{ marginRight: "20px" }}><AiOutlineHome style={{
                color: "rgb(143, 145, 149)", fontSize: "27px"
              }} /></span>
              <div className='details-caption'>
                <h3>Buttonwood, California.</h3>
                <p>Rosemead, CA 91770</p>
              </div>
            </div>
            <div className="details d-flex " style={{ marginBottom: "20px" }}>
              <span style={{ marginRight: "20px" }}><TfiTablet style={{
                color: "rgb(143, 145, 149)", fontSize: "27px"
              }} /></span>
              <div className='details-caption'>
                <h3>+92 300 426 2337</h3>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>
            <div className="details  d-flex " style={{ marginBottom: "20px" }}>
              <span style={{ marginRight: "20px" }}><TfiEmail style={{
                color: "rgb(143, 145, 149)", fontSize: "27px"
              }} /></span>
              <div className='details-caption '>
                <h3>hasnainraza@gmail.com</h3>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

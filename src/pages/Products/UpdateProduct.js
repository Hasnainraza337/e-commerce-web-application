import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'

const { Title } = Typography

const initialState = { title: "", type: "", date: "", price: "", author: "", description: "" }

export default function UpdateProduct() {
    const { user } = useAuthContext
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const params = useParams()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    const handleDate = (_, date) => setState(s => ({ ...s, date }))

    const getProduct = useCallback(async () => {

        const docRef = doc(firestore, "Books", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const product = docSnap.data()
            setState(product)
        } else {
            // docSnap.data() will be undefined in this case
            message.error("Product not found")
        }
    }, [params.id])

    useEffect(() => {
        getProduct()
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let { title, type, price, author, date, description } = state



        const product = {
            ...state,
            title, type, price, author, date, description,
            dateModified: new Date().getTime(),
        }

        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "Books", product.id), product);
            message.success("Product updated successfully")
            form.resetFields()
            navigate("/dashboard")
        } catch (e) {
            console.error("Error adding product: ", e);
        }
        setIsProcessing(false)
    }

    const [form] = Form.useForm();
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card p-3 p-md-4">
                            <Title level={2} className='m-0 text-center'>Update Product</Title>

                            <Divider />

                            <Form form={form} layout="vertical">
                                <Row gutter={16}>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Title">
                                            <Input placeholder='Product Title' value={state.title} name='title' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Type">
                                            <Input placeholder='Product category' value={state.type} name='type' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Price">
                                            <Input placeholder='Product Price' value={state.price} name='price' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Author Name">
                                            <Input placeholder='Author Name' value={state.author} name='author' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Add Date">
                                            <DatePicker className='w-100' value={state.date ? dayjs(state.date) : ""} onChange={handleDate} />
                                        </Form.Item>
                                    </Col>
                                    {/* <Col xs={12} lg={8}>
                                        <Form.Item label="Product Image">
                                            <Input className='w-100' type='file' placeholder='Upload picture'  onChange={e => { setFile(e.target.files[0]) }} />
                                        </Form.Item>
                                        {isProcessing && file && <Progress percent={progress} showInfo={false} />}
                                    </Col> */}

                                    <Col span={24}>
                                        <Form.Item label="Description">
                                            <Input.TextArea placeholder='Add Product Description' value={state.description} name='description' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                                        <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Update Product</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




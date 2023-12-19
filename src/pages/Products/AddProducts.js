import React, { useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Progress, Row, Typography, message } from 'antd'
import { useAuthContext } from 'contexts/AuthContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { firestore, storage } from 'config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const initialState = { title: "", type: "", price: "", author: "", date: "", description: "" }



export default function AddProducts() {


    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    // const handleDate = (_, date) => setState(s => ({ ...s, date }))
    const handleDate = (_, date) => {
        const formattedDate = date || new Date(); // Use current date if date is undefined
        setState(s => ({ ...s, date: formattedDate }));
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        let { title, type, price, author, date, description } = state



        const productdata = {
            title, type, price, author, date, description,
            dateCreated: new Date().getTime(),
            id: Math.random().toString(36).slice(2),
            file: "",

        }
        productdata.createdBy = {
            fullName: user.fullName,
            email: user.email,
            uid: user.uid,
        }
        setState(initialState)

        // console.log(productdata)
        setIsProcessing(true)

        if (file) {
            uploadFile(productdata)
        } else {
            createProductdata(productdata)
        }
    }


    const createProductdata = async (productdata) => {
        try {
            await setDoc(doc(firestore, "Books", productdata.id), productdata);
            message.success("A new product added successfully")
            form.resetFields()
            navigate("/dashboard")

        } catch (e) {
            console.error("Error adding product: ", e);
        }
        setIsProcessing(false)
    }

    const uploadFile = (productdata) => {

        const fileName = productdata.id
        var fileExtension = file.name.split('.').pop();

        const storageRef = ref(storage, `Book-Images/${fileName}.${fileExtension}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.floor(progress))
            },
            (error) => {
                message.error("Something went wrong while uploading file", error)
                // Handle unsuccessful uploads
                setIsProcessing(false)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    let data = { ...productdata, file: downloadURL }
                    createProductdata(data)
                });
            }
        );
    }

    const [form] = Form.useForm();

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {/* <Link to="/" className='btn btn-primary mb-5'>Go Home</Link> */}
                        <div className="card p-3 p-md-4">
                            <Title level={2} className='m-0 text-center'>Add Product</Title>

                            <Divider />

                            <Form form={form} layout="vertical">
                                <Row gutter={16}>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Title">
                                            <Input placeholder='Product Title' name='title' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Type">
                                            <Input placeholder='Product type' name='type' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Price">
                                            <Input placeholder='Product Price' name='price' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Author Name">
                                            <Input placeholder='Author Name' name='author' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Product Add Date">
                                            <DatePicker className='w-100' onChange={handleDate} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} lg={8}>
                                        <Form.Item label="Product Image">
                                            <Input className='w-100' type='file' placeholder='Upload picture' onChange={e => { setFile(e.target.files[0]) }} />
                                        </Form.Item>
                                        {isProcessing && file && <Progress percent={progress} showInfo={false} />}
                                    </Col>
                                    {/* <Col xs={12} lg={4}>
                                        <Form.Item label="Preview">
                                            {file && <Image src={URL.createObjectURL(file)} style={{ width: 50, height: 50 }} />}
                                        </Form.Item>
                                    </Col> */}
                                    <Col span={24}>
                                        <Form.Item label="Description">
                                            <Input.TextArea placeholder='Add Product Description' name='description' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                                        <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Add Product</Button>
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

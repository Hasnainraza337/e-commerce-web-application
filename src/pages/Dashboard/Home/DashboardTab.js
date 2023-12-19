import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import { BiSolidMessageAltError } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import { Avatar, Badge, Button, Image, Space, Tooltip, } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { useProductContext } from 'contexts/ProductContext';

export default function DashboardTab() {

    const { products, deletProduct, users, Messages, getTotalMessage } = useProductContext()
    const navigate = useNavigate()
    const { mode } = useAuthContext()
    const [totalMessages, setTotalMessages] = useState(0);


    useEffect(() => {
        getTotalMessage().then((count) => {
            setTotalMessages(count);
        });
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div>
                            <Tabs defaultIndex={0} >
                                <TabList className="d-flex justify-content-center">
                                    <Tab className="tab-button">
                                        <button className='btn btn-primary' >
                                            <div className="">
                                                <MdOutlineProductionQuantityLimits />Products
                                            </div>
                                        </button>
                                    </Tab>
                                    <Tab className="tab-button">
                                        <button className='btn btn-primary'>
                                            <div className="">
                                                <AiFillShopping /> Orders
                                            </div>
                                        </button>
                                    </Tab>
                                    <Tab className="tab-button">
                                        <button className='btn btn-primary' >
                                            <div className="">
                                                <FaUser /> Users
                                            </div>
                                        </button>
                                    </Tab>
                                    <Tab className="tab-button">
                                        <Badge count={totalMessages}>
                                            <button className='btn btn-primary' >
                                                <div className="">

                                                    <BiSolidMessageAltError /> Messages
                                                </div>
                                            </button>
                                        </Badge>
                                    </Tab>
                                </TabList>
                                {/* product  */}
                                <TabPanel>
                                    <div className=''>
                                        <h1 className=' text-center mb-5 ' style={{ color: mode === 'dark' ? 'white' : '' }}><u>Product Details</u></h1>
                                        <div className="d-flex justify-content-end mb-2">
                                            <Link to="/products/addproducts">
                                                <button
                                                    className="btn btn-info" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                    <div className="d-flex align-items-center">
                                                        Add Product <FaCartPlus size={20} />
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Image</th>
                                                        <th>Title</th>
                                                        <th>Price</th>
                                                        <th>Type</th>
                                                        <th>Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {products.map((product, i) => {
                                                    const { title, price, file, type, date, } = product;
                                                    return (

                                                        <tbody key={i}  >


                                                            <tr style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                                <td className="" style={{ color: mode === 'dark' ? 'white' : '', verticalAlign: "middle" }}>
                                                                    {i + 1}.
                                                                </td>
                                                                <td >
                                                                    {product.file ? <Image src={file} style={{ width: 50 }} /> : <Avatar size={50} icon={<UserOutlined />} />}
                                                                </td>
                                                                <td style={{ color: mode === 'dark' ? 'white' : '', verticalAlign: "middle" }}>
                                                                    {title}
                                                                </td>
                                                                <td style={{ color: mode === 'dark' ? 'white' : '', verticalAlign: "middle" }}>
                                                                    ${price}
                                                                </td>
                                                                <td style={{ color: mode === 'dark' ? 'white' : '', verticalAlign: "middle" }}>
                                                                    {type}
                                                                </td>
                                                                <td style={{ color: mode === 'dark' ? 'white' : '', verticalAlign: "middle" }}>
                                                                    {date}
                                                                </td>

                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    <div className=" d-flex">
                                                                        <div className="d-flex" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                            <Space>
                                                                                <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => deletProduct(product)} /></Tooltip>
                                                                                <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/products/products/${product.id}`) }} /></Tooltip>
                                                                            </Space>

                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    )
                                                })}

                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                                {/* Orders */}
                                <TabPanel>
                                    <h1 className='text-center mb-5' style={{ color: mode === 'dark' ? 'white' : '' }}><u>Order Details</u></h1>
                                    <div className="table-responsive">
                                        <table className="table" >
                                            <thead style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Payment Id
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Image
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Title
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Category
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Address
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Pincode
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Phone Number
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            {/* 
                                            <tbody>
                                                <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {allorder.paymentId}
                                                    </td>
                                                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                        <img className='w-16' src={imageUrl} alt="img" />
                                                    </th>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {title}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        ₹{price}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {category}
                                                    </td>

                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {allorder.addressInfo.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {allorder.addressInfo.address}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {allorder.addressInfo.pincode}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {allorder.addressInfo.phoneNumber}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {allorder.email}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {allorder.date}
                                                    </td>

                                                </tr>

                                            </tbody> */}
                                        </table>
                                    </div>
                                </TabPanel>
                                {/* Users */}
                                <TabPanel>
                                    <h1 className=' text-center mb-5' style={{ color: mode === 'dark' ? 'white' : '' }}><u>User Details</u></h1>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Uid</th>

                                                </tr>
                                            </thead>
                                            {users.map((user, i) => {
                                                const { fullName, uid, email } = user;
                                                return (
                                                    <tbody key={i}>
                                                        <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {i + 1}.
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {fullName}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {email}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {uid}
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </TabPanel>
                                {/* Messages */}
                                <TabPanel>
                                    <h1 className=' text-center mb-5' style={{ color: mode === 'dark' ? 'white' : '' }}><u>User Details</u></h1>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Subject</th>
                                                    <th>Message</th>

                                                </tr>
                                            </thead>
                                            {Messages.map((msg, i) => {
                                                const { name, email, subject, message } = msg;
                                                return (
                                                    <tbody key={i}>
                                                        <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {i + 1}.
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {name}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {email}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {subject}
                                                            </td>
                                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {message}
                                                            </td>


                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}






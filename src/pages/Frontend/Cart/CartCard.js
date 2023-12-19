
import { Button, Tooltip, message } from 'antd';
import { firestore } from 'config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { DeleteOutlined } from "@ant-design/icons"

export default function CartCard(props) {


    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);
    const [cartItem, setCartItem] = useState([]);



    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1)

        const itemref = doc(firestore, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref, {
            quantity: prodquantity + 1
        }).then(() => { console.log('changed quantity') })
        console.log(itemref)
    }
    const decreasequantity = async () => {
        if (prodquantity >= 2) {
            setProdQuantity(prodquantity - 1)

            const itemref = doc(firestore, `cart-${props.userid}`, `${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: prodquantity - 1
            }).then(() => { console.log('changed quantity') })
            console.log(itemref)
        }
    }



    const deletcartitem = async () => {

        try {

            await deleteDoc(doc(firestore, `cart-${props.userid}`, `${props.itemdata.id}`))

            const updatedCart = cartItem.filter(item => item.id !== props.itemdata.id);
            setCartItem(updatedCart);

            message.success("cart item delet successfulyy")
            console.log('doc deleted')
        } catch (err) {
            console.error(err)
            message.error("something went wrong while delting cartitem")
        }

    }

    return (

        <>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='product-cart d-flex'>
                                                <div className='p-img d-flex' style={{ paddingRight: "30px" }}>
                                                    <img src={props.itemdata.product.file} alt="dragon" />
                                                </div>
                                                <div className="p-caption">
                                                    <p>
                                                        {props.itemdata.product.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>${props.itemdata.product.price}.00</h5>
                                        </td>
                                        <td>
                                            <div className='prodquantity-div'>
                                                <button onClick={increasequantity}>+</button>
                                                <p>{prodquantity}</p>
                                                <button onClick={decreasequantity}>-</button>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>${props.itemdata.product.price * prodquantity}</h5>
                                        </td>
                                        <td>

                                            <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={deletcartitem} /></Tooltip>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

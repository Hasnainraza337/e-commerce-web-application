import { Button, Rate, Space, message } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HiShare } from "react-icons/hi"
import NewsLetter from 'components/NewsLetter'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'

export default function BookDetails() {

  const { user, isAuth } = useAuthContext()
  const [product, setproduct] = useState({})
  const params = useParams()
  // const [cart, setCart] = useState([]);

  const getproduct = useCallback(async () => {
    onSnapshot(doc(firestore, "Books", params.id), (doc) => {
      const data = doc.data()
      setproduct(data)
    })
  }, [params.id])

  useEffect(() => {
    getproduct()
  }, [user])


  const addtocart = () => {
    if (isAuth) {
      setDoc(doc(firestore, `cart-${user.uid}`, product.id), {
        product,
        quantity: 1,
      })
        .then(() => {
          message.success('Added to cart successfully');
        })
        .catch((error) => {
          message.error('Something went wrong', error);
        });
    } else {
      message.warning('Please login before adding to the cart.');
    }
  };

  return (
    <>
      <section className='main-middle'>
        <div className="container Book-Details">
          <div className="row">
            <div className="col">
              <div className='book-slider d-flex align-items-center '>

                {product && product.file ? (
                  <div className='bookdetails-image' style={{ marginRight: "50px" }}>
                    <img src={product.file} alt={product.title} />
                  </div>
                ) : (
                  <p>Loading...</p>
                )}



                <div className='Book-caption'>
                  <h3>{product.title}</h3>
                  <p>{product.author}</p>
                  <div className='price'>
                    <span style={{ fontSize: '30px', fontWeight: "600", color: "white" }}>${product.price}</span>
                  </div>
                  <div className="review d-flex align-items-center">
                    <div className='rating me-1'>
                      <Rate style={{ fontSize: "20px" }} allowHalf defaultValue={4.5} />
                    </div>
                    <div className='rating-review'>
                      <p className='mb-0'>(<span>120</span> Review)</p>
                    </div>
                  </div>
                  <Space>

                    <Button onClick={addtocart} type='primary' danger size='large' style={{ backgroundColor: "white", color: "black", marginTop: "15px", border: "1px solid #f4f4f4", borderRadius: "50px", padding: "25px 34px", display: "flex", alignItems: "center" }}>Add To Cart</Button>
                    <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ backgroundColor: "transparent", marginTop: "15px", border: "1px solid #f4f4f4", borderRadius: "50%", display: "flex", alignItems: "center" }}><HiShare /></Button></Link>

                  </Space>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section >

      <section style={{ paddingTop: "70px", paddingBottom: "70px" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <Space className='d-flex flex-wrap'>
                <Link style={{ textDecoration: "none" }} ><Button size='large' style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>Description</Button></Link>
                <Link style={{ textDecoration: "none" }} ><Button size='large' style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>Author</Button></Link>
                <Link style={{ textDecoration: "none" }} ><Button size='large' style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>Comments</Button></Link>
                <Link style={{ textDecoration: "none" }} ><Button size='large' style={{ borderRadius: "50px", padding: "15px 25px", display: "flex", alignItems: "center", }}>Review</Button></Link>
              </Space>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <p>
                Beryl Cook is one of Britain’s most talented and amusing artists .Beryl’s pictures feature women of all shapes and sizes enjoying themselves .Born between the two world wars, Beryl Cook eventually left Kendrick School in Reading at the age of 15, where she went to secretarial school and then into an insurance office. After moving to London and then Hampton, she eventually married her next door neighbour from Reading, John Cook. He was an officer in the Merchant Navy and after he left the sea in 1956, they bought a pub for a year before John took a job in Southern Rhodesia with a motor company. Beryl bought their young son a box of watercolours, and when showing him how to use it, she decided that she herself quite enjoyed painting. John subsequently bought her a child’s painting set for her birthday and it was with this that she produced her first significant work, a half-length portrait of a dark-skinned lady with a vacant expression and large drooping breasts.
              </p>
              <p>
                It is often frustrating to attempt to plan meals that are designed for one. Despite this fact, we are seeing more and more recipe books and Internet websites that are dedicated to the act of cooking for one. Divorce and the death of spouses or grown children leaving for college are all reasons that someone accustomed to cooking for more than one would suddenly need to learn how to adjust all the cooking practices utilized before into a streamlined plan of cooking that is more efficient for one person creating less.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section>
        <NewsLetter />
      </section>
    </>
  )
}

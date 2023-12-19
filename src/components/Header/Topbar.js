import React, { useEffect, useState } from 'react'
import logo from "assets/images/logo.png"
import { Badge, Button, Input, Tooltip, message } from 'antd'
import { TfiSearch } from "react-icons/tfi"
import { BsCart } from "react-icons/bs"
import { Link } from 'react-router-dom'
import { useAuthContext } from 'contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth, firestore } from 'config/firebase'
import { collection, getDocs } from 'firebase/firestore'



export default function Topbar() {

  const { isAuth, user, dispatch } = useAuthContext()
  // console.log(user)

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        message.success("Signout successful")
        dispatch({ type: "Logout" })
      })
      .catch(err => {
        message.error("Signout not successful")
      })
  }

  const [cartdata, setcartdata] = useState([]);
  // console.log(cartdata.length)

  const getcartdata = async () => {
    const cartArray = [];
    const path = `cart-${user.uid}`
    // console.log(path)
    getDocs(collection(firestore, path)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        cartArray.push({ ...doc.data(), id: doc.id })
      });
      setcartdata(cartArray)
    }).catch('Error error error')

  }

  useEffect(() => {
    getcartdata()
  }, [getcartdata])


  return (
    <header>
      <div className="container py-4">
        <div className="row d-flex flex-wrap">
          <div className="col">
            <div className='d-flex justify-content-between align-items-center flex-column flex-md-row flex-lg-row'>
              <div className='d-flex align-items-center mb-2 mb-sm-3 mb-md-3 mb-lg-0'>
                <div className='d-none d-lg-block'
                  style={{
                    marginRight: "40px",
                  }}>
                  <Link to="/"><img src={logo} alt="website Logo" /></Link>
                </div>
                <Input
                  id='topbar-input'
                  placeholder="Search book by author or publisher"
                  size='large'
                  suffix={<TfiSearch style={{ fontSize: "22px", color: "red", cursor: "pointer" }} />}

                  style={{
                    borderRadius: "40px",

                  }}
                />
              </div>
              <div className='d-flex align-items-center cart'>
                <ul>
                  <li><Link to="/" id='FAQ' style={{ textDecoration: "none", marginRight: "40px" }}>FAQ</Link></li>
                  <li><Link to="/cart" style={{ marginRight: "40px" }}><Tooltip title="cart"><Badge count={cartdata.length}><BsCart style={{ fontSize: "30px" }} /></Badge></Tooltip></Link></li>


                  <li>
                    {!isAuth
                      ? <>
                        <div className='d-none d-lg-block'>
                          <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 30px", display: "flex", alignItems: "center", marginRight: 0, }}>Sign in</Button></Link>
                        </div>
                        <div className='d-lg-none d-block'>
                          <Link to="/auth/login" style={{ textDecoration: "none" }} ><Button type='primary' danger size='small' style={{ borderRadius: "30px", padding: "20px 20px", display: "flex", alignItems: "center", marginRight: 0, }}>Sign in</Button></Link>
                        </div>
                      </>
                      : <>
                        <div className='d-none d-lg-block'>
                          <Button type='primary' danger size='large' style={{ borderRadius: "50px", padding: "25px 30px", display: "flex", alignItems: "center" }} onClick={handleLogout}>Sign out</Button>
                        </div>
                        <div className='d-lg-none d-block'>
                          <Button type='primary' danger size='small' style={{ borderRadius: "30px", padding: "20px 20px", display: "flex", alignItems: "center" }} onClick={handleLogout}>Sign out</Button>
                        </div>
                      </>
                    }
                  </li>

                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

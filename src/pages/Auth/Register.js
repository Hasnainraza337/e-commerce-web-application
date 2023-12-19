import React, { useState } from 'react'
import { Button, Checkbox, Divider, Form, Input, Space, Tooltip, Typography, message, } from 'antd'
import { useAuthContext } from 'contexts/AuthContext'
import { GoogleOutlined } from "@ant-design/icons"
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF } from 'react-icons/fa'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from 'config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'


const { Title } = Typography

export default function Register() {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext() || {}
  const [state, setState] = useState({ fullName: "", email: "", password: "", confirmPasword: "", cart: 0 })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleRegister = () => {

    let { email, password, confirmPasword } = state


    setIsProcessing(true)
    createUserWithEmailAndPassword(auth, email, password, confirmPasword)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserProfile(user)
        // verifiedEmail()

      })
      .catch(err => {
        message.error("Something went wrong while creating user")
        //   window.toastify("Email Not Valid", "error")
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })

  }

  const createUserProfile = async (user) => {
    let { fullName, cart } = state
    const { email, uid } = user

    const userData = {
      fullName, email, uid, cart,
      dateCreated: serverTimestamp(),
      status: "active",
      roles: ["customer"]
    }

    try {
      await setDoc(doc(firestore, "users", uid), userData);
      message.success("A new user has been created successfully")
      dispatch({ type: "Login", payload: { user: userData } })
      navigate("/")
      // window.toastify("Registration Successfully", "success")
    }
    catch (e) {
      message.error("Something went wrong while creating user profile")
      console.error("Error adding document: ", e);
      // window.toastify("something went wrong while add data in firestore", "error")
    }

  }

  // const verifiedEmail = () => {
  //   sendEmailVerification(auth.currentUser)
  //     .then(() => {
  //       window.toastify("Check Your Email for Verification")
  //     });
  // }

  // const handleGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const user = result.user;
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       addDocument(user)
  //       console.log(user)
  //     }).catch((error) => {
  //       window.toastify("something went wrong while SignIn with Google", "error")
  //     });
  // }





  return (

    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card p-3 p-md-4">
            <Title level={2} className='m-0 text-center mb-4'>Register</Title>

            <Form layout="vertical" autoComplete='off'

              onFinish={handleRegister}

            >
              <Form.Item label="Full Name" name='fullName'
                rules={[
                  {
                    required: true,
                    message: "Please type your name."
                  },
                  { whitespace: true },
                  { min: 3 }
                ]}
                hasFeedback
              >
                <Input placeholder='Full Name' name='fullName' onChange={handleChange} />
              </Form.Item>
              <Form.Item label="Email" name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please type your email correctly.'
                  },
                  { type: 'email', message: 'Please enter a valid email.' }

                ]}
                hasFeedback
              >
                <Input placeholder='Email' name='email' onChange={handleChange} />
              </Form.Item>
              <Form.Item label="Password" name='password'
                rules={[
                  {
                    required: true,
                  },
                  { min: 6 }
                ]}
                hasFeedback
              >
                <Input.Password placeholder='Password' name='password' onChange={handleChange} />
              </Form.Item>
              <Form.Item label="Confirm Password" name='confirmPassword'
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject("Passwod does not match with confirm Password.")
                    }
                  })
                ]}
                hasFeedback
              >
                <Input.Password placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} />
              </Form.Item>

              <Form.Item name='agreement' valuePropName='checked'
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("To proceed, you need to agree with our terms and conditions.")
                  }
                ]}
              >
                <Checkbox>Agree to our <a href='#'>Terms and Conditions</a></Checkbox>
              </Form.Item>

              <Button type='primary' htmlType='submit' className='w-100 mb-1' loading={isProcessing}   >Submit</Button>
              {/* <Divider plain>or register with social links</Divider> */}
              <div className="text-center mb-3">
                <Space >
                  {/* <Tooltip title='Google' className='d-flex align-items-center'><Button type='primary' icon={<GoogleOutlined />} onClick={handleGoogle} >Google</Button></Tooltip>  <Tooltip title="Facebook" className='d-flex align-items-center'><Button type='primary' icon={<FaFacebookF />} onClick={handleFacebook} >Facebook</Button></Tooltip> */}
                </Space>
              </div>
              <p className='text-center'>Already a user? <Link to="/auth/login">Login</Link></p>
            </Form>
          </div>
        </div>
      </div>
    </div >

  )
}

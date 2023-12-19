import React, { useState } from 'react'
import { Button, Form, Input, Space, Typography, message } from 'antd'
// import { GoogleOutlined } from "@ant-design/icons"
import { Link, useNavigate } from 'react-router-dom'
// import { FaFacebookF } from "react-icons/fa";
import { useAuthContext } from 'contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config/firebase';


const { Title } = Typography

export default function Login() {
  const navigate = useNavigate()
  const { readUserProfile } = useAuthContext()
  const [state, setState] = useState({ email: "", password: "", confirmPassword: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = () => {

    let { email, password, confirmPassword } = state
    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password, confirmPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
        navigate("/")
        // console.log("user Login")

      })
      .catch(err => {
        message.error("Something went wrong while signing user")
        //   window.toastify("Something went wrong while Login Account.", "error")
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })

  }



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
            <Title level={2} className='m-0 text-center mb-4'>Login</Title>


            <Form layout="vertical"
              onFinish={handleLogin}
            >

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

              <Form.Item label="Confirm Password" name='confirmpassword'
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
                <Input.Password placeholder='Confirm Password' name='confirmpassword' onChange={handleChange} />
              </Form.Item>

              <Button type='primary' htmlType='submit' className='w-100 mb-1 mt-3' loading={isProcessing} >Login</Button>
              <div className='mt-3 text-end'><Link to="/auth/forget-password">Forget Password?</Link></div>
              <div className="text-center mb-4">
                <Space className=''>
                  {/* <Tooltip title='Google' className='d-flex align-items-center'><Button type='primary' icon={<GoogleOutlined />} onClick={handleGoogle}  >Google</Button></Tooltip>  <Tooltip title="Facebook" className='d-flex align-items-center'><Button type='primary' icon={<FaFacebookF />} onClick={handleFacebook} >Facebook</Button></Tooltip> */}
                </Space>
                <p className='text-center mt-2'> Don't have an account? <Link to="/auth/register">Register</Link></p>
              </div>
            </Form>
          </div>
        </div>
      </div >
    </div >

  )
}

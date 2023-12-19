import React, { useState } from 'react'
import { Button, Form, Input, Typography, message, } from 'antd'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from 'config/firebase'



const { Title } = Typography

export default function ForgetPassword() {
    const navigate = useNavigate()
    const [state, setState] = useState({ email: "" })
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleResetPassword = e => {
        e.preventDefault()

        let { email } = state


        setIsProcessing(true)
        sendPasswordResetEmail(auth, email, { url: "http://localhost:3000/auth/login" })
            .then(() => {
                message.success("Please check your mail box")
                // window.toastify("Check your Email for  Reset Password.", "Success")
                // setIsProcessing(false)
                // navigate('/auth/login')
            })
            .catch(err => {
                message.error("Something went wrong while sending password reset email")
                //     window.toastify("SomeThing went wrong while reset password.", "error")
                console.error(err)
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }


    return (

        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card p-3 p-md-4">
                        <Title level={2} className='m-0 text-center mb-4'>Forget Password</Title>


                        <Form layout="vertical">

                            <Form.Item label="Email">
                                <Input placeholder='Email' name='email' onChange={handleChange} />
                            </Form.Item>

                            <Button type='primary' htmlType='submit' className='w-100 mb-2' loading={isProcessing} onClick={handleResetPassword}>Reset Password</Button>

                        </Form>

                    </div>
                </div>
            </div>
        </div>

    )
}



 

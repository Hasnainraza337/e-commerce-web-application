import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register';
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword'
import Nopage from 'pages/Frontend/Nopage';


export default function Index() {
    return (
        <>
            <main className='auth' >
                <Routes>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='forget-password' element={<ForgetPassword />} />
                    <Route path='reset-password' element={<ResetPassword />} />
                    <Route path='*' element={<Nopage />} />
                </Routes>
            </main>

        </>
    )
}

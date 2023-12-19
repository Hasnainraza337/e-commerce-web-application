import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"

// Pages
import Frontend from "./Frontend"
import Auth from "./Auth"
import Dashboard from "./Dashboard"
import Products from './Products'
import { useAuthContext } from 'contexts/AuthContext'
import PrivateRoute from 'components/PrivateRoutes'


export default function Index() {
    const { isAuth } = useAuthContext()
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
                <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} allowedRoles={["superAdmin"]} />} />
                <Route path='/products/*' element={<Products />} />
            </Routes>
        </>
    )
}

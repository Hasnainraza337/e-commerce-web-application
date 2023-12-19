import React from 'react'
import Home from "./Home"
import { Route, Routes } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Nopage from 'pages/Frontend/Nopage'
export default function index() {
    return (
        <>
            <Header />
            <main className='dashboard'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="*" element={<Nopage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

import React from 'react'
import AddProducts from './AddProducts'
import { Route, Routes } from 'react-router-dom'
import UpdateProduct from './UpdateProduct'
import Nopage from 'pages/Frontend/Nopage'

export default function index() {
    return (
        <>
            <main className='Products'>
                <Routes>
                    <Route path='addproducts' element={<AddProducts />} />
                    <Route path='/products/:id' element={<UpdateProduct />} />
                    <Route path='*' element={<Nopage />} />
                </Routes>
            </main>
        </>
    )
}

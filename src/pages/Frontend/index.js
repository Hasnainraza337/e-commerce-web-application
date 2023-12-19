import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import Header from 'components/Header'
import Footer from 'components/Footer'

// pages
import Home from './Home'
import About from './About'
import Categories from './Categories'
import Contact from './Contact'
import Cart from './Cart'
import Checkout from './Checkout'
import BookDetails from './BookDetails'
import Nopage from './Nopage'

export default function Index() {
    return (
        <>
            <Header />
            <main className="frontend">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/book-details/:id' element={<BookDetails />} />
                    <Route path='*' element={<Nopage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

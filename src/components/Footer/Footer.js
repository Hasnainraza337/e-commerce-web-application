import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()
    return (
        <footer>
            <div className="container py-1">
                <div className="row">
                    <div className="col">
                        <p className='text-center text-black mb-0'>copyright &copy; {year}.All Rights Reserved | Developed by Hasnain Raza</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { FaUserTie } from 'react-icons/fa';
import DashboardTab from './DashboardTab';
import { useAuthContext } from 'contexts/AuthContext';
import { useProductContext } from 'contexts/ProductContext';

function Dashboard() {

    const { mode } = useAuthContext()
    const { getTotalProducts, getTotalUsers, getTotalMessage } = useProductContext()
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);

    useEffect(() => {
        getTotalProducts().then((count) => {
            setTotalProducts(count);
        });
        getTotalUsers().then((count) => {
            setTotalUsers(count);
        });
        getTotalMessage().then((count) => {
            setTotalMessages(count);
        });
    }, []);

    return (
        <section className='mt-5' >
            <div className="container mb-5">
                <div className="row">
                    <div className="col">
                        <div className="card  dashboard-card text-center">
                            <div className=" border-2 px-4 py-3 rounded-xl"  >
                                <div className="mb-3">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalProducts}</h2>
                                <p className="text-center" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Products</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card  dashboard-card text-center">
                            <div className=" border-2 px-4 py-3 rounded-xl" >
                                <div className="mb-3">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="" style={{ color: mode === 'dark' ? 'white' : '' }}>10</h2>
                                <p className="text-center" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Orders</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card  dashboard-card text-center">
                            <div className=" border-2 px-4 py-3 rounded-xl"  >
                                <div className="mb-3">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalUsers}</h2>
                                <p className="text-center" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Users</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className=" border-2 px-4 py-3 rounded-xl" >
                                <div className="mb-3"  >
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalMessages}</h2>
                                <p className="text-center" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Messages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <DashboardTab />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard










// style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
// style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
// style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
// style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
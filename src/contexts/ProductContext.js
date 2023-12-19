import React, { createContext, useContext, useState, useEffect } from 'react';
import { firestore } from 'config/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useAuthContext } from './AuthContext';
import { message } from 'antd';

const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [Messages, setMessages] = useState([]);
    const [Productss, setProductss] = useState([])
    const { user } = useAuthContext()
    const [filteredProducts, setFilteredProducts] = useState([]);


    const filterProductsByType = (type) => {
        const filtered = products.filter((product) => product.type === type);
        setFilteredProducts(filtered);
    };


    // Function to fetch Users from Firebase
    const getUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'users'));
            const array = []
            const userData = querySnapshot.docs.map((doc) => doc.data());
            array.push(userData)
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    // get Total Users
    const getTotalUsers = async () => {

        try {
            const querySnapshot = await getDocs(collection(firestore, 'users'))
            const totalUsers = querySnapshot.size
            return totalUsers;
        } catch (error) {
            console.error('Error get total users:', error);
            return 0
        }
    };

    // Function to fetch products from Firebase
    const getProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'Books'));
            const array = []
            const productData = querySnapshot.docs.map((doc) => doc.data());
            array.push(productData)
            setProducts(productData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    // get total products
    const getTotalProducts = async () => {

        try {
            const querySnapshot = await getDocs(collection(firestore, 'Books'))
            const totalProducts = querySnapshot.size
            return totalProducts;
        } catch (error) {
            console.error('Error get total products:', error);
            return 0
        }
    };

    const deletProduct = async (productdata) => {

        try {
            await deleteDoc(doc(firestore, "Books", productdata.id));

            let productsAfterDelete = products.filter(prod => prod.id !== productdata.id)
            // setAllProducts(productsAfterDelete)
            setProducts(productsAfterDelete)

            message.success("Product deleted successfully")
        } catch (err) {
            console.error(err)
            message.error("something went wrong while delting product")
        }
    }


    // Function to fetch Orders from Firebase
    const getOrders = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'Orders'));
            const array = []
            const orderData = querySnapshot.docs.map((doc) => doc.data());
            array.push(orderData)
            setOrders(orderData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // get total Orders
    const getTotalOrders = async () => {

        try {
            const querySnapshot = await getDocs(collection(firestore, 'Orders'))
            const totalOrders = querySnapshot.size
            return totalOrders;
        } catch (error) {
            console.error('Error get total products:', error);
            return 0
        }
    };

    // get messages from firebase
    const getMessages = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'Messages'));
            const array = []
            const messages = querySnapshot.docs.map((doc) => doc.data());
            array.push(messages)
            setMessages(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // get total message
    const getTotalMessage = async () => {

        try {
            const querySnapshot = await getDocs(collection(firestore, 'Messages'))
            const totalMessages = querySnapshot.size
            return totalMessages;
        } catch (error) {
            console.error('Error get total message:', error);
            return 0
        }
    };

    useEffect(() => {
        getUsers()
        getProducts();
        getMessages()
        filterProductsByType("Horror");
    }, [user]);

    return (

        <ProductContext.Provider value={{ products, deletProduct, filteredProducts, orders, getTotalOrders, users, getTotalProducts, getTotalUsers, Messages, getTotalMessage }}>
            {children}
        </ProductContext.Provider>

    )
}


export const useProductContext = () => useContext(ProductContext)
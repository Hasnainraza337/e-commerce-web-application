import React, { useState, useEffect, createContext, useContext, useReducer } from 'react'
import { message } from 'antd'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firestore } from 'config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()
const initialState = { isAuth: false, isSuperAdmin: false, user: {} }


const reducer = (state, { type, payload }) => {
    switch (type) {
        case "Login":
            return { isAuth: true, isSuperAdmin: payload.isSuperAdmin, user: payload.user }
        case "Logout":
            return initialState
        default:
            return state
    }
}


export default function AuthContextProvider({ children }) {


    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                readUserProfile(user)
            } else {
                setIsAppLoading(false)
            }
        })
    }, [])

    // UserProfile
    const readUserProfile = async (user) => {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const user = docSnap.data()
            // console.log('user', user)

            const isSuperAdmin = user.roles.includes("superAdmin")
            dispatch({ type: "Login", payload: { isSuperAdmin, user } })
        } else {
            message.error("User data not found. Please try again or contact support team")
            // console.log("User data not found")
        }
        setIsAppLoading(false)
    }

    // Mode
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }


    return (
        <AuthContext.Provider value={{
            isAppLoading, ...state, dispatch, readUserProfile, mode, toggleMode,
        }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuthContext = () => useContext(AuthContext)
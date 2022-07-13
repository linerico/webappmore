import React, { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    // localStorage.setItem("auth", false)
    const [isAuthenticated, setAuth] = useState(false)
    const loginSuccess = () => setAuth(true)
    const loginFailed = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setAuth(false)
    }
    const logout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setAuth(false)
    }
    // const isAuthenticated = () => {
    //     return localStorage.getItem("auth")
    // }
    return(
        <AuthContext.Provider value={{isAuthenticated, loginSuccess, loginFailed, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}
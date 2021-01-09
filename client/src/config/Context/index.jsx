import React, {createContext, useReducer} from 'react'

export const AppContext = createContext()

const initialState = {
    isLogin: false,
    isLoading: true,
    carts: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOAD":
            return {
                ...state,
                isLogin: true,
                isLoading: false,
                user: action.payload
            }
        case "LOGIN":
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
            return {
                ...state,
                isLogin: true,
                isLoading: false,
            }
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token")
            localStorage.removeItem("userInfo")
            return {
                ...state,
                isLogin: false,
                isLoading: false
            }
        case "ADD_CART":
            return {
                ...state,
                carts: state.carts + 1
        }
        case "DELETE_CART":
            return {
                ...state,
                carts: state.carts - 1
        }
        default: throw new Error()
    }
}

export const Context = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}


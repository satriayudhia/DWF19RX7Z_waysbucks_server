import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {AppContext} from '../Context'

const NotFound = () => {
    const router = useHistory()

    const [state] = useContext(AppContext)

    useEffect(() => {
        if (state.isLogin) {
            router.push('/home')
        }
        else {
            router.push('/')}
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default NotFound

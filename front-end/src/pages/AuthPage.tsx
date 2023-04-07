import React from 'react'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
interface iPath {
  path: string
}
const AuthPage = ({path}: iPath) => {
  return (
    <div className='container'>
      {path === "login" ? <Login /> : <Register />}
    </div>
  )
}

export default AuthPage
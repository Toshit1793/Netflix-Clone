import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>Sign In</h1>
        <form action="">
          <input type="text" placeholder='Username' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button type="submit">Sign In</button>
        </form>

      </div>
    </div>
  )
}

export default Login

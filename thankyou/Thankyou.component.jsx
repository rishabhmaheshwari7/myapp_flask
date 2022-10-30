import React from 'react'
import './Thankyou.styles.css';
export default function Thankyou() {
  return (
    <>
    <div className="t-outer-container" role="thank-you">
      <img src="https://cdn.dribbble.com/users/1238709/screenshots/4069900/success_celebration_800x600.gif" alt="Thank you" className="gif-design"/>
      <div className='t-container'>
        <h2>Thank you for your Response!</h2><br/>
        <h2>Click <a href="/">here</a> for Home Page</h2>
      </div>
    </div>
    </>
  )
}
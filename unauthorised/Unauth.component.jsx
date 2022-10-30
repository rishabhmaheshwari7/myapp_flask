import React from 'react'
import './Unauth.styles.css';

export default function Unauth({obj}) {
    
  return (
    <>
    <div role="unauth" className="unauth-outer-container">
    <div className='unauth-container'>
        <h2>{obj.message}</h2> <br /> <br/>
        <h1>{obj.code}</h1> <br /> <br/>
        <p>{obj.details}</p>
        <h2>Click <a href="/">here</a> for Home Page</h2>
        </div>
    </div>
    </>
  )
}

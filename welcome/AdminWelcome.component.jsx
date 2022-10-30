import React from 'react'
import './AdminWelcome.styles.css';
export default function AdminWelcome() {
    
  return (
    <>
    <div className="welcome-outer-container" role="welcome">
        <img src="https://res.infoq.com/articles/agile-team-maturity-assessment/en/smallimage/1G_yz7zg-1624490275821.jpg" alt="Admin Welcome" className="welcome-image"></img>
        <div className='welcome-container'>
         <h2>Welcome to the Admin Dashboard</h2>
         <br />
            <h1>MAPLE</h1>
         <br/><br/>
         <p>Maturity Assessment Platform : Lowe's Engineering</p>
        </div>
    </div>
    </>
  )
}
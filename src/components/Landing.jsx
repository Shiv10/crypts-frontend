import React from 'react'
import Button from 'react-bootstrap/Button';

function Landing() {
  return (
    <div className='wrapper'>
        <div className='logo1'>
          <h1 className='logo2'>CRYPT</h1>
        </div>
        <div className='buttonConnectDiv'>
          <Button variant="primary" className='buttonConnect'>Connect Wallet</Button>
        </div>
    </div>
  )
}

export default Landing
import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../App';

function Signup() {
  const wallet = useContext(WalletContext);
  const navigate = useNavigate ();

  async function openPolygonFaucet() {
    window.open('https://faucet.polygon.technology/', '_blank', 'noreferrer');
  }

  useEffect(() => {
    if (!wallet.address) {
      navigate('/');
    }
  }, [navigate, wallet])

  return (
    <div className='signup'>
      <div className='welcome heading'>
        Welcome To CRYPT
      </div>
      <div className='welcome subheading'>
        Powered By CRP
      </div>
      {/* <br/> */}
      <br/>
      <div className='buttonSignupDiv'>
        <Button variant="primary" className='buttonSignup' onClick={openPolygonFaucet}><span className='buttonFont'>Start</span></Button>
      </div>
      <div className='buttonSignupDiv'>
        <Button variant="primary" className='buttonSignup' onClick={openPolygonFaucet}><span className='buttonFont'>Get Polygon Gas</span></Button>
      </div>
    </div>
  )
}

export default Signup;
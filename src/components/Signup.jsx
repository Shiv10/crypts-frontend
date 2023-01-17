import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../App';
import Game_abi from '../ABI/Game_abi.json';
import { ethers } from 'ethers';

const GAME_ADDRESS = '0x82eA9bF7690EaE34e75BA77A5Cd2330f12365f0A'

function Signup() {
  const wallet = useContext(WalletContext);
  const navigate = useNavigate ();

  async function openPolygonFaucet() {
    window.open('https://faucet.polygon.technology/', '_blank', 'noreferrer');
  }

  async function userSignup() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(GAME_ADDRESS, Game_abi, signer);
    await contract.signup();
    wallet.setBalance('1000 CRP');
  }

  useEffect(() => {
    if (!wallet.address) {
      navigate('/');
    } else {
      
    }
  })

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
        <Button variant="primary" className='buttonSignup' onClick={userSignup}><span className='buttonFont'>Start</span></Button>
      </div>
      <div className='buttonSignupDiv'>
        <Button variant="primary" className='buttonSignup' onClick={openPolygonFaucet}><span className='buttonFont'>Get Polygon Gas</span></Button>
      </div>
    </div>
  )
}

export default Signup;
import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WalletContext } from '../App';
import Game_abi from '../ABI/Game_abi.json';
import { ethers } from 'ethers';

const GAME_ADDRESS = '0x82eA9bF7690EaE34e75BA77A5Cd2330f12365f0A'
let provider;
let signer;
let contract;

function Signup() {
  const wallet = useContext(WalletContext);
  const navigate = useNavigate ();

  async function openPolygonFaucet() {
    window.open('https://faucet.polygon.technology/', '_blank', 'noreferrer');
  }

  async function userSignup() {
    await contract.signup();
    wallet.setBalance('1000 CRP');
  }

  useEffect(() => {
    async function checkUserSignup() {
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(GAME_ADDRESS, Game_abi, signer);
        const isSignedUp = await contract.players(wallet.address);
        localStorage.setItem('playing', true);
        if (isSignedUp) {
          navigate('/purchase');
        }
      } catch (e) {
        toast.error('Some error occurred');
      }
    }
    if (localStorage.getItem('playing')) {
      navigate('/purchase');
    }
    if (!wallet.address) {
      navigate('/');
    } else {
      checkUserSignup()
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
      <br/>
      <div className='buttonSignupDiv'>
        <Button variant="primary" className='buttonSignup' onClick={userSignup}><span className='buttonFont'>Start</span></Button>
      </div>
      <div className='buttonSignupDiv'>
        <Button variant="primary" className='buttonSignup' onClick={openPolygonFaucet}><span className='buttonFont'>Get Polygon Gas</span></Button>
      </div>
      <ToastContainer theme='dark'/>
    </div>
  )
}

export default Signup;
import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PurchaseEgg from '../assets/purchase.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WalletContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Game_abi from '../ABI/Game_abi.json';

const GAME_ADDRESS = '0x82eA9bF7690EaE34e75BA77A5Cd2330f12365f0A'
let provider;
let signer;
let contract;

function Pruchase() {
  const wallet = useContext(WalletContext);
  const navigate = useNavigate();
  
  async function purchaseEgg() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(GAME_ADDRESS, Game_abi, signer);
    try {
      const currentBalance = parseFloat(wallet.balance);
      if (currentBalance < 150) {
        toast.error('Insufficient funds');
        return;
      }

      await contract.purchase();
      toast.success('Successfully purchased');
      const playerBalance = await contract.bank(wallet.address);
      wallet.setBalance(`${parseInt(playerBalance.toString())/(Math.pow(10, 18))}`);
    } catch (e) {
      toast.error('Internal error');
    }
  }

  async function checkSignup () {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(GAME_ADDRESS, Game_abi, signer);
    const isSignedUp = await contract.players(wallet.address);
    if (!isSignedUp) {
      navigate('/signup');
    }
  }

  useEffect( () => {
    if (!window.ethereum) {
      navigate('/');
    }

    if (!wallet.address) {
      navigate('/');
    }

    if (!localStorage.getItem('playing')) {
      navigate('/signup');
    }

    checkSignup();
  })

  return (
    <div className='purchase'>
      <img src={PurchaseEgg} alt="Your SVG" className='eggs'/>
      <br/>
      <div className='welcome price'>
        Cost: 150 CRP
      </div>
      <div className='buttonSignupDiv'>
        <Button variant="primary" className='buttonSignup' onClick={purchaseEgg}><span className='buttonFont'>Purchase</span></Button>
      </div>
      <ToastContainer theme='dark'/>
    </div>
  )
}

export default Pruchase;
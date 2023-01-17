import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { WalletContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const wallet = useContext(WalletContext);
  const navigate = useNavigate();

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
        wallet.setAddress(result[0]);
        localStorage.setItem('address', result[0]);
        navigate('/signup');
      } catch (e) {
        toast.error('Internal Issue');
      }
    } else {
      toast('Please install metamask!');
    }
  }

  useEffect( () => {
    if (wallet.address) {
      navigate('/signup');
    }
  }, [wallet, navigate]);

  return (
    <div className='wrapper'>
        <div className='logo1'>
          <div className='logo2'>CRYPT</div>
        </div>
        <div className='buttonConnectDiv'>
          <Button variant="primary" className='buttonConnect' onClick={connectWallet}><span className='buttonFont'>Connect Wallet</span></Button>
        </div>
        <ToastContainer theme='dark'/>
    </div>
  )
}

export default Landing
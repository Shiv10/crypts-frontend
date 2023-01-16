import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { WalletContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Landing() {
  const wallet = useContext(WalletContext);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
        wallet.setAddress(result[0]);
      } catch (e) {
        toast.error('Internal Issue');
      }
    } else {
      toast('Please install metamask!');
    }
  }

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
import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { WalletContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
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
    <div className='singup'>
      <div className='welcome heading'>
        Welcome To CRYPT
      </div>
      <div className='welcome subheading'>
        Powered By CRP
      </div>
    </div>
  )
}

export default Signup;
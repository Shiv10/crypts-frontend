import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wave from 'react-wavify'
import NavbarComponent from './components/Navbar';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Pruchase from './components/Pruchase';
import Owned from './components/Owned';
import Element from './components/Element';


export const WalletContext = React.createContext();

function App() {

  const [ address, setAddress ] = useState(null);
  const [balance, setBalance] = useState('')

  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, [setAddress]);

  return (
    <div className="App">
      <WalletContext.Provider value={{address, setAddress, balance, setBalance}}>
        <NavbarComponent/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/purchase' element={<Pruchase/>}/>
            <Route path='/owned' element={<Owned/>}/>
            <Route path='/setElement' element={<Element/>} />
          </Routes>
        </BrowserRouter>
        <Wave
          fill="url(#gradient)"
          className='wave1'
          paused={false}
          options={{
            height: 200,
            amplitude: 40,
            speed: 0.4,
            points: 4
          }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%"  stopColor="#00609A" />
              <stop offset="100%" stopColor="#0C3770" />
            </linearGradient>
          </defs>
        </Wave>
        <Wave
          fill="#0C3770"
          className='wave2'
          paused={false}
          options={{
            height: 170,
            amplitude: 80,
            speed: 0.3,
            points: 2
          }}
        >
        </Wave>
      </WalletContext.Provider>
    </div>
  );
}

export default App;

import './App.css';
import React, { useState } from 'react'
import Wave from 'react-wavify'
import NavbarComponent from './components/Navbar';
import Landing from './components/Landing';


export const WalletContext = React.createContext();

function App() {

  const [ address, setAddress ] = useState(null);

  return (
    <div className="App">
      <WalletContext.Provider value={{address, setAddress}}>
        <NavbarComponent/>
        <Landing />
        <Wave
          fill="url(#gradient)"
          className='wave1'
          paused={false}
          options={{
            height: 50,
            amplitude: 35,
            speed: 0.5,
            points: 5
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
          fill="url(#gradient)"
          className='wave2'
          paused={false}
          options={{
            height: 5,
            amplitude: 80,
            speed: 0.2,
            points: 2
          }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%"  stopColor="#0C3770" />
              <stop offset="100%" stopColor="#0C3770" />
            </linearGradient>
          </defs>
        </Wave>
      </WalletContext.Provider>
    </div>
  );
}

export default App;

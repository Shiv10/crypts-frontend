import { ethers } from 'ethers';
import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { WalletContext } from '../App';
import Game_abi from '../ABI/Game_abi.json'


function NavbarComponent() {
  
  const wallet = useContext(WalletContext);
  const GAME_ADDRESS = '0x82eA9bF7690EaE34e75BA77A5Cd2330f12365f0A'
  
  useEffect( () => {

    async function getBalance() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(GAME_ADDRESS, Game_abi, signer);
      const playerBalance = await contract.bank(wallet.address);
      wallet.setBalance(`${parseInt(playerBalance.toString())/(Math.pow(10, 18))}`);
    }
    if (wallet.address) {
      getBalance();
    } else {
      wallet.setBalance('');
    }
  })

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
        <Container>
          {/* <Navbar.Brand><span className='textColor'><strong>Balance : </strong>{wallet.balance} CRP</span></Navbar.Brand> */}
          <Navbar.Brand><span className='textColor'><strong>Balance : { wallet.balance.length>0? (
            <>
              {wallet.balance} CRP
            </>
          ): (
            <>
              Wallet not connected
            </>
          )}</strong></span></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features"></Nav.Link>
              <Nav.Link href="#pricing"></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/owned"><span className='textColor'>Owned 🥚</span></Nav.Link>
              <Nav.Link href="#memes">
                <span className='textColor'>
                  Withdraw
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
};

export default NavbarComponent;
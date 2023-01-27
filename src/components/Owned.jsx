import React, { useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Owned1 from '../assets/owned/owned_1.png';
import Owned2 from '../assets/owned/owned_2.png'
import Owned3 from '../assets/owned/owned_3.png'
import Owned4 from '../assets/owned/owned_4.png'
import Owned5 from '../assets/owned/owned_5.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import Game_abi from '../ABI/Game_abi.json';


const GAME_ADDRESS = '0x82eA9bF7690EaE34e75BA77A5Cd2330f12365f0A'
let provider;
let signer;
let contract;

const pictures = {
  'Earth': Owned1,
  'Fire': Owned2,
  'Air': Owned3,
  'Water': Owned4,
  'Not Set': Owned5
}

function Owned() {

  const [people, setPeople] = useState([]);
  const [index, setIndex] = useState(0);

  async function getOwnedEggs() {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(GAME_ADDRESS, Game_abi, signer);
      const savedAddress = localStorage.getItem('address');
      const ownedEggs = await contract.getOwnedEggs(savedAddress);
      const eggs = ownedEggs.map(egg => {
        return egg.toNumber();
      });
      
      const promises = [];
      for (const egg of eggs) {
        promises.push(contract.eggs(egg));
      }

      Promise.all(promises).then( (results) => {
        const data = [];
        results.forEach((result, index) => {
          const str = result.toString();
          let element = str.substring(2,4);
          let persona = str.substring(4,6);
          let trait = str.substring(6,8);
          if (element === '00') {
            element = 'Not Set';
          } else if ( element === '31' ) {
            element = 'Fire';
          } else if ( element === '32' ) {
            element = 'Water';
          } else if ( element === '33' ) {
            element = 'Earth';
          } else if ( element === '34' ) {
            element = 'Air'
          }


          if (persona === '00') {
            persona = 'Not Set';
          } else if ( persona === '31' ) {
            persona = 'Honesty';
          } else if ( persona === '32' ) {
            persona = 'Cunning';
          } else if ( persona === '33' ) {
            persona = 'Hardworking';
          } else if ( persona === '34' ) {
            persona = 'Inspiring'
          }

          if (trait === '00') {
            trait = 'Not Set';
          } else if ( trait === '31' ) {
            trait = 'Bravery';
          } else if ( trait === '32' ) {
            trait = 'Ambition';
          } else if ( trait === '33' ) {
            trait = 'Empathy';
          }

          const eggData = {
            id: eggs[index],
            element,
            persona,
            trait
          };

          data.push(eggData);
        });
        setPeople(data)
      });

    } catch (e) {
      console.log(e);
      toast.error('Internal error')
    }
  }

  useEffect(() => {
    getOwnedEggs();
  }, []);


  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);


  return (
    <div className='purchase'>
      <section className='section'>
        <div className="title">
          <h2>
            Owned Eggs
          </h2>
        </div>
        {
          people.length > 0?

          <div className="section-center">
            {people.map((person, personIndex) => {
              const { id, element, persona, trait } = person;
              // more stuff
              let position = 'nextSlide';
              

              if (personIndex === (index-1) || (index === 0 && personIndex === people.length - 1) ) {
                position = 'lastSlide';
              }

              if (personIndex === index) {
                position = 'activeSlide';
              }
              return (
                <article className={position} key={id}>
                  <div className='person-img'>
                    <img src={ pictures[element] } alt='egg' className='eggScroll' />
                  </div>
                  <h4>Element: {element}</h4>
                  <h4>Personality: {persona}</h4>
                  <h4>Trait: {trait}</h4>
                  
                  <Container style={{ padding: '5%'}}>
                    <Row>
                      <Col><a href='/setElement'><Button variant="primary" className='ownedButton'><span className='buttonFont'>Set Element</span></Button></a></Col>
                      <Col><a href='/setPersona'><Button variant="primary" className='ownedButton'><span className='buttonFont'>Set Persona</span></Button></a></Col>
                      <Col><a href='/setTrait'><Button variant="primary" className='ownedButton'><span className='buttonFont'>Set Trait</span></Button></a></Col>
                    </Row>
                  </Container>
                </article>
              )
            })}

          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
         </div>:
         <>
            No Owned Eggs
         </>
        }
      </section>
      <ToastContainer theme='dark'/>
    </div>
  )
}

export default Owned
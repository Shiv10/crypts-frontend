import React, { useState, useRef, useEffect} from 'react'
import PurchaseEgg from '../assets/purchase.png'
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// const data = [
//   {
//     id: 1,
//     image:
//       'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg',
//     name: 'maria ferguson',
//     title: 'office manager',
//     quote:
//       'Fingerstache umami squid, kinfolk subway tile selvage tumblr man braid viral kombucha gentrify fanny pack raclette pok pok mustache.',
//   },
//   {
//     id: 2,
//     image:
//       'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
//     name: 'john doe',
//     title: 'regular guy',
//     quote:
//       'Gastropub sustainable tousled prism occupy. Viral XOXO roof party brunch actually, chambray listicle microdosing put a bird on it paleo subway tile squid umami.',
//   },
//   {
//     id: 3,
//     image:
//       'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg',
//     name: 'peter smith',
//     title: 'product designer',
//     quote:
//       'Drinking vinegar polaroid street art echo park, actually semiotics next level butcher master cleanse hammock flexitarian ethical paleo.',
//   },
//   {
//     id: 4,
//     image:
//       'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
//     name: 'susan andersen',
//     title: 'the boss',
//     quote:
//       'Marfa af yr 3 wolf moon kogi, readymade distillery asymmetrical seitan kale chips fingerstache cloud bread mustache twee messenger bag. ',
//   },
// ];

const data = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg',
    name: 'maria ferguson',
    title: 'office manager',
    quote:
      'Fingerstache umami squid, kinfolk subway tile selvage tumblr man braid viral kombucha gentrify fanny pack raclette pok pok mustache.',
  },
  // {
  //   id: 2,
  //   image:
  //     'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
  //   name: 'susan andersen',
  //   title: 'the boss',
  //   quote:
  //     'Marfa af yr 3 wolf moon kogi, readymade distillery asymmetrical seitan kale chips fingerstache cloud bread mustache twee messenger bag. ',
  // }
];


function Owned() {

  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);


  return (
    <div className='purchase'>
      <section className='section'>
        <div className="title">
          <h2>
            <span>/</span>reviews
          </h2>
        </div>
        <div className="section-center">
          {people.map((person, personIndex) => {
            console.log({personIndex, index});
            const { id, image, name, title, quote } = person;
            // more stuff
            let position = 'nextSlide';
            

            if (personIndex === (index-1) || (index === 0 && personIndex === people.length - 1) ) {
              position = 'lastSlide';
            }

            if (personIndex === index) {
              position = 'activeSlide';
            }
            return <article className={position} key={id}>
              <div className='person-img'>
                <img src={PurchaseEgg} alt='egg' className='eggScroll' />
              </div>
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          })}

        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
        </div>
      </section>
    </div>
  )
}

export default Owned
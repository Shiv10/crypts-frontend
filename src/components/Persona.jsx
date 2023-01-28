import React, { useState, useEffect } from "react";
import Honesty from "../assets/persona/Honesty.png";
import Cunning from "../assets/persona/Cunning.png";
import Hardworking from "../assets/persona/Hardworking.png";
import Inspiring from "../assets/persona/Inspiring.png";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const data = [
  {
    id: 1,
    image: Honesty,
    title: "Honesty",
    quote: "Honesty, the key that unlocks the doors of truth",
  },
  {
    id: 2,
    image: Cunning,
    title: "Cunning",
    quote: "Cunning, the shadow that hides the blade"
  },
  {
    id: 3,
    image: Hardworking,
    title: "Hardworking",
    quote: "Hard work, the forge that shapes the steel"
  },
  {
    id: 4,
    image: Inspiring,
    title: "Inspiring",
    quote: "Inspiration, the spark that lights the fire"
  },
];

function Persona() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  return (
    <div className="purchase">
      <section className="section">
        <div className="title">
          <h3>Select Element</h3>
        </div>
        <div className="section-center">
          {data.map((element, elemIndex) => {
            const { id, image, title, quote } = element;
            // more stuff
            let position = "nextSlide";

            if (
              elemIndex === index - 1 ||
              (index === 0 && elemIndex === data.length - 1)
            ) {
              position = "lastSlide";
            }

            if (elemIndex === index) {
              position = "activeSlide";
            }
            return (
              <article className={position} key={id}>
                <FaQuoteLeft className="icon-left" />
                <p className="text">Your choice echoes through eternity, choose carefully.</p>
                <FaQuoteRight className="icon" />
                <br />
                <br />
                <div className="person-img ">
                  <img src={image} alt="egg" className="eggScroll" />
                </div>
                <div className="title">
                  <h2>
                    <strong>{title}</strong>
                  </h2>
                </div>
                <p className="text-quote">{quote}</p>
              </article>
            );
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
  );
}

export default Persona;

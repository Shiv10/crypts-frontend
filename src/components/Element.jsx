import React, { useState, useEffect } from "react";
import Fire from "../assets/Fire.png";
import Water from "../assets/Water.png";
import Air from "../assets/Air.png";
import Earth from "../assets/Earth.png";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const data = [
  {
    id: 1,
    image: Fire,
    title: "Fire",
    quote: "Fire, the element of action and passion",
  },
  {
    id: 2,
    image: Water,
    title: "Water",
    quote: "Water, the element of emotions and intuition"
  },
  {
    id: 3,
    image: Earth,
    title: "Earth",
    quote: "Earth, the element of stability and practicality"
  },
  {
    id: 4,
    image: Air,
    title: "Air",
    quote: "Air, the element of intellect and communication"
  },
];

function Element() {
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
                <p className="text">Your choice holds great power, it will set the course for your journey and reveal the path you tread</p>
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

export default Element;

import "./Card.css";
import { useState, useEffect } from "react";

function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (props.flip) {
      setIsFlipped(true);

      // Reset flip state after 0.6 seconds (duration of CSS transition)
      setTimeout(() => {
        setIsFlipped(false);
      }, 600);
    }
  }, [props.flip]);
  return (
    <div className="card-container">
      <div
        className={`card ${isFlipped ? "flip" : ""}`}
        onClick={() => props.cardClicked()}
      >
        <div className="card-front">
          <img src={props.link}></img>
          <p>{props.title}</p>
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
}

export default Card;

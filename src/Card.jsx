import "./Card.css";

function Card(props) {
  return (
    <div className="card-container">
      <div
        className={`card ${props.flip ? "flip" : ""}`}
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

import "./Card.css";

function Card(props) {
  return (
    <div className="card" onClick={() => props.cardClicked()}>
      <img src={props.link}></img>
      <p>{props.title}</p>
    </div>
  );
}

export default Card;

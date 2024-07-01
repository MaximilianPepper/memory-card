import { useState, useEffect } from "react";

import "./App.css";
import Card from "./Card.jsx";

function App() {
  const [gifs, setGifs] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [userWin, setUserWin] = useState(false);

  useEffect(() => {
    if (currentScore > topScore) setTopScore(currentScore);
    if (currentScore === 5) {
      setCurrentScore(0);
      setUserWin(true);
      setTimeout(() => setUserWin(false), 5000);
    }
  }, [currentScore]); // linter gave an error with just current score

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      let id = 0;
      while (data.length < 5) {
        try {
          const response = await fetch(
            "https://api.giphy.com/v1/gifs/random?api_key=hRZnES7IsDsZW8tj11ij9aGi09ecEbjx",
            { mode: "cors" }
          );
          const result = await response.json();
          data.push({
            link: result.data.images.downsized.url,
            title: result.data.title,
            clicked: false,
            id: id,
          });
          id++;
        } catch {
          (e) => alert(`Failed to get data: ${e.message}`);
        }
      }

      setGifs(data);
    };

    fetchData();
  }, []);

  const cardClicked = (id) => {
    let reset = false;
    let updatedGifs = gifs.map((item) => {
      if (item.id === id) {
        if (item.clicked) {
          setCurrentScore(0);
          reset = true;
        } else {
          setCurrentScore((currentScore) => currentScore + 1);
          return { ...item, clicked: true };
        }
      }
      return item;
    });
    if (reset) {
      updatedGifs = updatedGifs.map((item) => ({ ...item, clicked: false }));
    }
    setGifs(shuffle(updatedGifs));
  };

  if (userWin)
    return (
      <>
        <p>You win TEMP</p>
      </>
    );
  return (
    <>
      <div>
        <h1>Gifs memory game</h1>
        <p>Top score: {topScore}</p>
      </div>
      <div>
        <h4>Make sure to not click the same card twice!</h4>
        <p>Current score: {currentScore}</p>
      </div>
      <div className="container">
        {gifs.map((gif) => (
          <Card
            key={gif.id}
            link={gif.link}
            title={gif.title}
            cardClicked={() => cardClicked(gif.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;

function shuffle(array) {
  let oldarr = array;
  let newarr = [];
  while (oldarr.length !== 0) {
    let index = Math.floor(Math.random() * oldarr.length);
    newarr = newarr.concat(oldarr.splice(index, 1));
  }
  return newarr;
}

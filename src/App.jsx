import { useState, useEffect } from "react";

import "./App.css";
import Card from "./Card.jsx";

const AMOUNT = 8;
function App() {
  const [gifs, setGifs] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [userWin, setUserWin] = useState(false);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (currentScore > topScore) setTopScore(currentScore);
    if (currentScore === AMOUNT) {
      setCurrentScore(0);
      setUserWin(true);
      setTimeout(() => setUserWin(false), 5000);
    }
  }, [currentScore]); // linter gave an error with just current score

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      let id = 0;
      const maxAttempts = 3;
      let attempts = 0;
      while (data.length < AMOUNT && attempts < maxAttempts) {
        try {
          const response = await fetch(
            "https://api.giphy.com/v1/gifs/random?api_key=QEDdCIiYSH8dqLkfGgff6M5b9ROjRJnb",
            { mode: "cors" }
          ); // free api key no point making .env file
          console.log("fetched");
          if (response.status === 429) {
            attempts++;
            throw new Error(
              "Too many requests, please wait and try again later."
            );
          }

          if (!response.ok) {
            attempts++;
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          data.push({
            link: result.data.images.downsized.url,
            title: result.data.title,
            clicked: false,
            id: id,
          });
          id++;
        } catch {
          (e) => {
            console.log(`Failed to get data: ${e.message}`);
          };
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
    setFlip(true); // Trigger flip animation
    setTimeout(() => {
      setFlip(false); // Reset flip animation after shuffling
      setGifs(shuffle(updatedGifs));
    }, 600); // Match the duration of the CSS transition
  };

  if (userWin)
    return (
      <>
        <p>Congratulations! You win!</p>
      </>
    );
  return (
    <>
      <div className="title">
        <h1>Gifs memory game</h1>
        <p>Top score: {topScore}</p>
      </div>
      <div className="title1">
        <h4>Make sure to not click the same card twice!</h4>
        <h4>Current score: {currentScore}</h4>
      </div>
      <div className="container">
        {gifs.map((gif) => (
          <Card
            key={gif.id}
            link={gif.link}
            title={gif.title}
            cardClicked={() => cardClicked(gif.id)}
            flip={flip}
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

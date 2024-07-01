import { useState, useEffect } from "react";

import "./App.css";

function Card(props) {
  return (
    <div>
      <img src={props.link}></img>
      <p>{props.title}</p>
    </div>
  );
}

function App() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = [];

      while (data.length < 5) {
        // Fetch 5 random gifs
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/random?api_key=D5f3N5Obu6naX4mStCZ9Kv7P51wDCrnA",
          { mode: "cors" }
        );
        const result = await response.json();
        const item = [result.data.images.downsized.url, result.data.title];
        data.push(item);
      }

      setGifs(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Gifs memory game</h1>
        <p>Top score: "temp"</p>
      </div>
      <div>
        <h4>Make sure to not click the same card twice!</h4>
        <p>Current score: "temp"</p>
      </div>
      {gifs.map((gif, i) => (
        <Card key={i} link={gif[0]} title={gif[1]} />
      ))}
    </>
  );
}

export default App;

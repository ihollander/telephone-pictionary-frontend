import React, { useState } from "react";
import { useSocketListener } from "../sockets/useSocketListener";

function Twitter() {
  const [tweets, setTweet] = useState([]);

  useSocketListener("tweet", newTweet => setTweet([newTweet, ...tweets]));

  return tweets.length ? (
    <ul>
      {tweets.map(tweet => (
        <li key={tweet.id}>{tweet.text}</li>
      ))}
    </ul>
  ) : (
    <p>Actually waiting for the websocket server...</p>
  );
}

export default Twitter;

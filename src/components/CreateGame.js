import React, { useState } from "react";
import gameAdapter from "../adapters/gameAdapter";

const CreateGame = ({ history }) => {
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // fetch and redirect
    gameAdapter
      .create()
      .then(game => {
        history.push(`/games/${game._id}`);
      })
      .catch(console.error);
  };

  const handleChange = ({ target: { value } }) => setName(value);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Enter name:
        <input value={name} onChange={handleChange} />
      </form>
    </div>
  );
};

export default CreateGame;

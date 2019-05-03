import React, { useState } from "react";

const JoinGame = ({ handleNameSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    handleNameSubmit(name);
    setName("");
  };

  const handleChange = ({ target: { value } }) => setName(value);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={handleChange} />
      </form>
    </div>
  );
};

export default JoinGame;

import React, { useState } from 'react';
import './styles.css'; // Import styles

function StreamList() {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInput);   

  };

  return (
    <div>
      <h1>Stream List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>   

      <p>Your input: {userInput}</p>
    </div>
  );
}

export default StreamList;

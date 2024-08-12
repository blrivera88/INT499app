import React, { useState } from "react";
import styles from "../Styles/SearchBox.module.css";

function SearchBox({ onSearch }) {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(input); 
    setInput(""); 
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.formControl}
        placeholder="Search Movie Title ..."
        value={input}
        onChange={handleInputChange}
      />
      <button className={styles.searchButton} type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBox;



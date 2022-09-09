import React from "react";
import styles from './SearchBar.module.css';
import {getByName} from "../../redux/actions/index";
import {useDispatch} from "react-redux";
import {useState} from 'react';
import {BiSearch} from 'react-icons/bi';



function SearchBar(){
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getByName(name));
    setName('')
  };

  return (
    
    <div  className={styles.searchContainer}>
    <form 
    className={styles.searchBox}
    onSubmit={(event) => handleClick(event)}>
      <input
        type="text"
        placeholder="Search country..."
        className={styles.searchInput}
        onChange = {(e) => handleInputChange(e)}   
      />
      <button className={styles.searchButton}>
      <BiSearch className={styles.btn}/>
      </button>
    </form>
    </div>
  );
};

export default SearchBar;

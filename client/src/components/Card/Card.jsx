import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const CountryCard = ({ imgflag, name, continent, population, id }) => {
  return (
    <div className={styles.containerCard} >
        <Link to={"/home/" +  id}>   
        <img src={imgflag} alt="Not Found" className={styles.imgFlag} />   
       <div className={styles.dataContent}>
        <div className={styles.nameCard}>
        <label>{name} </label>
          </div>
          <p> 
          <label>Continent: </label> 
           {continent} </p> 
           <p>
          <label>Population: </label> 
          {population} people.</p>
          </div>
        </Link>
        </div>
  );
};

export default CountryCard;

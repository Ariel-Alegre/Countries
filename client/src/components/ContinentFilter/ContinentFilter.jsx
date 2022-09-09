import React from "react";
import {filterByContinent} from "../../redux/actions/index";
import {useDispatch} from "react-redux";
import styles from "./ContinentFilter.module.css";

function ContinentFilter ({ setCurrentPage}){
  const dispatch = useDispatch();
  function handleFilterContinent(event){
    event.preventDefault();
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(1);
}

  return (
    <select
    className={styles.select}
    onChange={event => handleFilterContinent(event)}>
    <option value="All">All</option>
    <option value="Africa">Africa</option>
    <option value="Americas">Americas</option>
    <option value="Antarctica">Antartica</option>
    <option value="Asia">Asia</option>
    <option value="Europe">Europe</option>
    <option value="Oceania">Oceania</option>
</select>
  )
};
export default ContinentFilter;



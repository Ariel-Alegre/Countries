import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions/index";
import CountryActivities from "./CountryActivities/CountryActivities";
import styles from "./CountryDetail.module.css";
import {AiFillHome} from 'react-icons/ai';



const CountryDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const country = useSelector((state) => state.countryDetail);
 
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);
  
    return (
      <div className={styles.countryDetailBox}>
        <div className={styles.countryDetailTitleBox}>
          <Link to="/home">
            <button className={styles.btn}><AiFillHome/></button>
          </Link>
          <h1>{country.name}</h1>
        </div>
        <div className={styles.data}>       
           <div className={styles.imgContainer}>
            <img
              className={styles.imgFlag}
              src={country.imgflag}
              alt="Img not found"
            />
            </div>
         <span>Continente: {country.continent}.</span>
            <span>Subcontinente: {country.subregion}.</span>
            <span>Capital: {country.capital}.</span>
            <span>Población: {country.population}.</span>
            <span>Área: {country.area}.</span>
          </div>
        <div className={styles.contryDetailActivities}>
          <CountryActivities activities={country.activities} />
        </div>
      </div>
    );}


export default CountryDetail;


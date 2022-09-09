import React from "react";
import { useState, useEffect } from "react"; //me traigo los hooks de react
import { useDispatch, useSelector } from "react-redux"; //me traigo los hooks de react-redux para poder conectar con el front
import { getCountries, getActivitiesList, allFilters,} from "../../redux/actions";
import { Link } from "react-router-dom"; 
import styles from "./Home.module.css"; 
import CountriesCards from "../Cards/Cards";
import CountrySort from "../Sort/Sort";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import SearchBar from "../SearchBar/SearchBar";
import ActivityFilter from "../ActivityFilter/ActivityFilter";
import Paged from "../Paged/Paged"; 
import {BiExit} from 'react-icons/bi';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';



function Home() { 
  const dispatch = useDispatch(); 
  const allCountries = useSelector((state) => state.countries); 
  const [show, setShow] = useState(false); 
  useEffect(() => {   
    dispatch(getCountries()); 
    dispatch(getActivitiesList()); 
  }, [dispatch]);

  const [filterState, setFilterState] = useState({ 
    continent: [],
    sort: "Orden",
    activity: "All",
    countrySearch: "",
  });

  useEffect(() => { 
    dispatch(allFilters(filterState)); 
  }, [filterState, dispatch]); 

  const [currentPage, setCurrentPage] = useState(1); 
  const countriesPerPage = 12; 
  let indFirstCountry = 0; 
  let indLastCountry = 0; 

  if (currentPage === 1) {
    indFirstCountry = 0;
    indLastCountry = 0;
  } else {
    indFirstCountry = currentPage - 2;
    indLastCountry = currentPage - 1;
  }
  const indexOfLastCountry = currentPage * countriesPerPage; 
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; 

  const currentCountries = !allCountries.length >0
    ? []
    : allCountries.slice(
        indexOfFirstCountry + indFirstCountry,
        indexOfLastCountry + indLastCountry
      ); 
console.log('array current countries',currentCountries )


  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 


  const [loading, setLoading] = useState(false);
  console.log('show ', show)
  useEffect(() => {
    setShow((show)=>!show);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);



  return (
    <div>
          <div>
          <Link to = "/">
          <button className={styles.btn}>
            <BiExit className={styles.button}/>
            </button>
          </Link>
          <header className={styles.title}> 
            <h2>Countries of the world</h2>   
          </header>
         
          <div className={styles.orderSelect}>
             <div className={styles.searchCreateAct}>
          <SearchBar
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
          </div> 
           <ActivityFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          /> 
          {  <ContinentFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />}                
         { <CountrySort
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />}
           <div className={styles.containerBtnActivity}>
           <Link to="/activity">
            <button className={styles.btnCreateActivity}>Create tourist activity</button>
          </Link>
          </div> 
          </div> 
          </div>
       
       <div>
       { currentCountries.length === 0 && !show?
            <div >
            </div>:
          currentCountries.length > 0 
          ? <CountriesCards currentCountries={currentCountries} />
          :<div className={styles.postionLoading}> 
              <h4><AiOutlineLoading3Quarters  setLoading={setLoading} className={styles.loading}/></h4>
            </div> 
            }

          {<Paged
            countriesPerPage={countriesPerPage}
            allCountries={allCountries}
            paged={paged}
            key={"page" + currentPage}
            currentPage={currentPage}
          />}
        </div>   
      </div>
    
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom"; 
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.landingPage}>  
      <h1>Bienvenidos</h1>
      <Link to="/home">
        <button className={`${styles.btn} ${styles.op}`}>Ingresar</button>
      </Link>
    </div>
  );
};

export default LandingPage;




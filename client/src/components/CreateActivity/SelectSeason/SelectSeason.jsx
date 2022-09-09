import React from "react";
import styles from "./SelectSeason.module.css";

function SelectSeason({ handleCheckSeason }){
  const seasonsList = ["Fall", "Winter", "Spring", "Summer"];
 

  return (
    <div className={styles.activitySeason}>
      <label>Season: </label>
      {seasonsList.map((element) => {
        return (
          <label  key = {'selectSeasonLabel'+element}>
            <input
              key={'selectSeason'+element}
              type="checkbox"
              id={element}
              name="season"
              value={element}
              onChange={(e) => handleCheckSeason(e)}
            />
            {element}
          </label>
        );
      })}
    </div>
  );
};

export default SelectSeason;

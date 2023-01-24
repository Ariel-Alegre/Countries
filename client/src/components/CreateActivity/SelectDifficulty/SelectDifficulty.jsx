import React from "react";
import styles from "./SelectDifficulty.module.css";

function SelectDifficulty({ handleChangeIntegrated }) {
  const difficultyRange = [
    "Beginner",
    "Amateur",
    "Normal",
    "Professional",
    "Expert",
  ];

  return (
    <div className={styles.activityDifficulty}>
      <label>Difficulty: </label>
      {difficultyRange.map((element) => {
        return (
          <label key={"selectDiffLabel" + element}>
            <input
              key={"selectDiff" + element}
              type="radio"
              id={element}
              name="difficulty"
              value={element}
              onChange={(e) => handleChangeIntegrated(e)}
            />
            {element}
          </label>
        );
      })}
    </div>
  );
}

export default SelectDifficulty;

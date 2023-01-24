import React from "react";
import styles from "./Sort.module.css";

function CountrySort({ setCurrentPage, setFilterState, filterState }) {
  const sortedList = ["ascendName", "descendName", "ascendPob", "descendPob"];
  const sortedLabelName = [
    "Name Ascendant",
    "Name Descending",
    "Ascending Population ",
    "Descending Population",
  ];

  const handleOrder = (event) => {
    setFilterState({ ...filterState, sort: event.target.value });
    setCurrentPage(1);
  };

  return (
    <select className={styles.select} onChange={(event) => handleOrder(event)}>
      <option key={"sortContinent Orden"} value="Orden">
        Order...
      </option>
      {sortedList.map((element, index) => {
        return (
          <option key={"activityFilter" + element} value={element}>
            {sortedLabelName[index]}
          </option>
        );
      })}
    </select>
  );
}

export default CountrySort;

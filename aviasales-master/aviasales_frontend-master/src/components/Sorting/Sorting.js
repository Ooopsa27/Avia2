import React, { useState } from "react";
import classes from "./Sorting.module.scss";

export const Sorting = ({ sorts }) => {
  const [selectTub, setSelectTub] = useState("low price");

  const paramSorting = [
    { value: "Самый дешевый", id: "low price" },
    { value: "Самый быстрый", id: "fastest" }
  ];

  const checkTub = id => {
    if (id === selectTub) {
      return;
    }
    setSelectTub(id);
    sorts.sortTabs(id);
  };

  return (
    <div>
      <ul className={classes.SortingTabs}>
        {paramSorting.map(elem => (
          <li
            key={elem.id}
            className={
              selectTub === elem.id
                ? [classes.SortingTab, classes.SortingTab_active].join(" ")
                : classes.SortingTab
            }
            onClick={() => checkTub(elem.id)}
          >
            <span className={classes.SortingTitle}>{elem.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

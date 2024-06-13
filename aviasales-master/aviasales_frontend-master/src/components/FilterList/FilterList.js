import React, { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import classes from "./FilterList.module.scss";

export const FilterList = props => {
  const { hiddenTickets, sortNonStop, sortStops } = props.sortTickets;

  const [transfers, setTransfers] = useState([
    { value: "Все", id: "checkedAll", isChecked: true },
    { value: "Без пересадок", id: "nonStop", isChecked: true },
    { value: "1 пересадка", id: 1, isChecked: true },
    { value: "2 пересадки", id: 2, isChecked: true },
    { value: "3 пересадки", id: 3, isChecked: true }
  ]);

  /* универсальная функция которой будем переключать чекбоксы */
  const checkID = (id, isChecked) => {
    if (isChecked) {
      const newChecked = transfers.map(item =>
        item.id === id ? { ...item, isChecked: true } : { ...item }
      );
      setTransfers(newChecked);
    } else {
      const newChecked = transfers.map(item => {
        if (item.id === id || item.id === "checkedAll") {
          return { ...item, isChecked: false };
        } else {
          return { ...item };
        }
      });
      setTransfers(newChecked);
    }
  };

  const changeIsChecked = (id, isChecked) => {
    // если выбраны "все" билеты, меняем их isChecked
    if (id === "checkedAll") {
      if (isChecked === true) {
        const newChecked = transfers.map(item => ({
          ...item,
          isChecked: true
        }));
        setTransfers(newChecked);
      } else {
        const newChecked = transfers.map(item => ({
          ...item,
          isChecked: false
        }));
        setTransfers(newChecked);
      }
      hiddenTickets(isChecked);
    }

    // если выбрано 'Без пересадок'
    else if (id === "nonStop") {
      checkID(id, isChecked);
      sortNonStop(isChecked);
    }
    // все остальные варианты пересадок
    else {
      checkID(id, isChecked);
      sortStops(id, isChecked);
    }
  };

  return (
    <div className={classes.FilterList}>
      <h2 className={classes.Title}>Количество пересадок</h2>
      <ul>
        {transfers.map(item => {
          return (
            <li key={item.id}>
              <Checkbox item={item} checked={changeIsChecked} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

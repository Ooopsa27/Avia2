import React, { useState, useEffect } from "react";
import classes from "./Search.module.scss";
import { FilterList } from "../components/FilterList/FilterList";
import { TicketList } from "../components/TicketList/TicketList";
import { Sorting } from "../components/Sorting/Sorting";
import { Alert } from "../components/Alert/Alert";

import data from './testData.json' // тестовые данные

export const Search = () => {
  const [tickets, setTickets] = useState([]); // неотсортированный список билетов
  const [hasError, setHasError] = useState(false);
  const [cloneTickets, setCloneTickets] = useState(null); // массив билетов который будем сортировать по пересадкам
  const [selectTub, setSelectTub] = useState("low price"); // таб для автоматической сортировки билетов (цена/скорость)

  // отсортированные по всем параметрам билеты для отрисовки
  const [sortTickets, setSortTickets] = useState(null);

  useEffect(() => {
      //*** закомментировала сервер aviasales, использую сохраненный json ***/
    // fetch("https://front-test.beta.aviasales.ru/search")
    //   .then(res => res.json())
    //   .then(({ searchId }) =>
    //     fetch(
    //       `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
    //     )
    //   )
    //   .then(res => res.json())
    //   .then(({ tickets }) => {
    //     setTickets(tickets.slice(0, 5));
    //     setCloneTickets(tickets.slice(0, 5));
    //   })
    //   .catch(() => setHasError(true));
    const tickets = data
    setTickets(tickets);
    setCloneTickets(tickets);
  }, []);

  useEffect(() => {
    function setSortTabs() {
      if (!cloneTickets) return;
      if (selectTub === "low price") {
        const newArr = [...cloneTickets].sort((a, b) =>
          a.price > b.price ? 1 : -1
        );
        setSortTickets(newArr);
      }
      if (selectTub === "fastest") {
        const newArr = [...cloneTickets].sort((a, b) => {
          const firstTicket = a.segments.reduce(
            (acc, i) => i.duration + acc,
            0
          );
          const secondTicket = b.segments.reduce(
            (acc, i) => i.duration + acc,
            0
          );

          if (firstTicket > secondTicket) {
            return 1;
          } else if (firstTicket < secondTicket) {
            return -1;
          } else {
            return 0;
          }
        });
        setSortTickets(newArr);
      }
    }
    setSortTabs();
  }, [cloneTickets, selectTub]);

  // скрыть/показать все билеты
  const hiddenTickets = isChecked => {
    isChecked ? setCloneTickets(tickets) : setCloneTickets([]);
  };

  // билеты без пересадок
  const sortNonStop = isChecked => {
    if (isChecked) {
      const newArr = tickets.filter(item => {
        return item.segments.every(i => i.stops.length === 0); // every вернет true, если ВСЕ маршруты без пересадок
      });
      setCloneTickets([...cloneTickets, ...newArr]); // вернем в state новый массив с билетами без пересадок
    } else {
      const newArr = cloneTickets.filter(item => {
        return item.segments.some(i => i.stops.length > 0); // оставим только те билеты, у которых хотя бы один маршрут с пересадкой
      });
      setCloneTickets(newArr);
    }
  };

  /* универсальная функция которой будем сортировать билеты 
    в зависимости от количества пересадок */
  const sortStops = (numb, isChecked) => {
    if (isChecked) {
      const newArr = tickets.filter(item => {
        // вернет 'true' если хотя бы один маршрут в билете будет с заданным числом пересадок
        const sort1 = item.segments.some(i => i.stops.length === numb);
        // вернет 'true' если каждый маршрут меньше или равняется заданному числу пересадок
        const sort2 = item.segments.every(i => i.stops.length <= numb);
        return sort1 && sort2;
      });
      setCloneTickets([...cloneTickets, ...newArr]);
    } else {
      const newArr = cloneTickets.filter(item => {
        const sort1 = item.segments.some(i => i.stops.length > numb);
        const sort2 = item.segments.every(i => i.stops.length < numb);
        return sort1 || sort2;
      });
      setCloneTickets(newArr);
    }
  };

  // функция для изменения state 'selectTub' для сортировки по табам
  const sortTabs = id => {
    setSelectTub(id);
  };

  return (
    <div className={classes.appContentInner}>
      <div className={classes.appInformer}>
        <FilterList sortTickets={{ hiddenTickets, sortNonStop, sortStops }} />
      </div>
      <div className={classes.appContent}>
        <div className={classes.sorting}>
          <Sorting sorts={{ sortTabs }} />
        </div>
        {sortTickets ? (
          <TicketList tickets={sortTickets} />
        ) : hasError ? (
          <Alert />
        ) : null}
      </div>
    </div>
  );
};

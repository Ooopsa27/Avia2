/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import classes from "./Alert.module.scss";

export const Alert = () => {
  return (
    <div className={classes.Alert}>
      <span>😟 Что-то пошло не так</span>
      <button onClick={() => window.location.reload()}>
        Обновить страницу
      </button>
    </div>
  );
};

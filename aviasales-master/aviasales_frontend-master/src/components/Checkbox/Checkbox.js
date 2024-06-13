import React, { useState, useEffect } from "react";
import classes from "./Checkbox.module.scss";

export const Checkbox = props => {
  const { item, checked } = props;

  let [isChecked, setIsChecked] = useState(item.isChecked);

  // отслеживаем -- если изменился isChecked, то обновим состояние
  useEffect(() => {
    setIsChecked(props.item.isChecked);
  }, [props.item.isChecked]);

  const toggleIsChecked = () => {
    setIsChecked(!isChecked);
    checked(item.id, !isChecked);
  };

  return (
    <label className={classes.Item}>
      <input type="checkbox" checked={isChecked} onChange={toggleIsChecked} />
      <svg viewBox="0 0 100 100" className={classes.Checkbox}>
        <path
          className={classes.Checkbox__box}
          d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"
        />
        <polyline
          className={classes.Checkbox__check}
          points="25.5,53.5 39.5,67.5 72.5,34.5 "
        />
      </svg>
      <span className={classes.ItemText}>{item.value}</span>
    </label>
  );
};

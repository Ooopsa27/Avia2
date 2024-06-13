import React, { useContext } from "react";
import classes from "./ThemeSwitcher.module.scss";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

export const ThemeSwitcher = () => {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <div className={classes.Switcher}>
      <input
        type="checkbox"
        id="theme-switcher"
        className={classes.SwitcherInput}
        checked={dark}
        onChange={() => toggle()}
      />
      <label htmlFor="theme-switcher" className={classes.SwitcherLabel}>
        <span className={classes.SwitcherToggle}></span>
      </label>
    </div>
  );
};

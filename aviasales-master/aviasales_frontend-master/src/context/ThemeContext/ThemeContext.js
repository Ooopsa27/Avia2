import React, { useLayoutEffect, useState } from "react";
import { darkTheme, lightTheme } from "./ThemeColors";

export const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {}
});

export const ThemeProvider = ({ children }) => {
  // текущая тема
  const [dark, setDark] = useState(false);

  // устанавливаем стили css
  const applyTheme = theme => {
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = theme.join(";");
  };

  // обновляем стили синхронно
  useLayoutEffect(() => {
    // устанавливаем последнюю выбранную пользователем тему
    const lastTheme = window.localStorage.getItem("darkTheme");

    if (lastTheme === "true") {
      setDark(true);
      applyTheme(darkTheme);
    } else {
      setDark(false);
      applyTheme(lightTheme);
    }
  }, [dark]);

  const toggle = () => {
    setDark(!dark);
    window.localStorage.setItem("darkTheme", !dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

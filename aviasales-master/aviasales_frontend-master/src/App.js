import React from "react";
import { Search } from "./pages/Search";
import { Logo } from "./components/Logo/Logo";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";

function App() {
  return (
    <div className="app">
      <div className="app__inner">
        <div className="navbar">
          <Logo />
          <ThemeSwitcher />
        </div>
        <section className="app__section">
          <Search />
        </section>
      </div>
    </div>
  );
}

export default App;

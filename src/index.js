import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Home } from "./home";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Home store={store} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/";
import { HashRouter as Router, BrowserRouter } from "react-router-dom";
import axios from "axios";

//set axios base url
axios.defaults.baseURL = process.env.REACT_APP_PROXY_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const enviro = process.env.NODE_ENV;
root.render(
  <React.StrictMode>
    <Router basename="/">
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export {};

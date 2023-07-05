import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./index.css";
import { store } from "./app/store";
import { Counter } from "./features/counter/Counter.tsx";
import CharacterList from "./features/got/Character.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
      </Router>{" "}
    </Provider>
  </React.StrictMode>
);

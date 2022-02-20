import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
const App = lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={""}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

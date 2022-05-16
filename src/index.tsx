import React from "react";
import ReactDOM from "react-dom";
import App from "./pages";
import { bootAPI } from "./resources/api";
import strings from "./resources/strings";

bootAPI(strings);

ReactDOM.render(<App />, document.getElementById("app"));

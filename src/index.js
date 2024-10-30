import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Wrapper from "../src/components/Wrapper/Wrapper.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Wrapper />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

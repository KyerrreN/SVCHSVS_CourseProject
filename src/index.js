import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Wrapper from "../src/components/Wrapper/Wrapper.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import translation from "./i18n.js";
import { I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={translation}>
                <BrowserRouter>
                    <Wrapper />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    </React.StrictMode>
);

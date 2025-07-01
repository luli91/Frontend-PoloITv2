import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import  store from "./redux/store";
import { AuthProvider } from './context/AuthContext';
import App from "./App";
import './index.css'

import "primereact/resources/themes/lara-light-cyan/theme.css";  // tema
import "primereact/resources/primereact.min.css";               // core
import "primeicons/primeicons.css";                            // iconos
import "primeflex/primeflex.css";                              // primeflex



createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </Provider>
);
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import {Routing} from "./routing.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <Routing/>
        </Provider>
    </BrowserRouter>
)

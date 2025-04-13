import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import {Routing} from "./routing.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routing/>
    </BrowserRouter>
)

import {Route, Routes} from "react-router";
import App from "./App.tsx";
import {UserPage} from "./componets/UserPage.tsx";


export const Routing = () => {

    return (
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path={'/users/:id'} element={<UserPage/>}/>
            <Route path={'*'} element={<div>Не существует</div>}/>
        </Routes>
    );
};
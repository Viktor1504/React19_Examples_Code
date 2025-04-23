import {Route, Routes} from "react-router";
import App from "./App.tsx";
import {UserPage} from "./components/UserPage.tsx";


export const Routing = () => {

    return (
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path={'/users/:id'} element={<UserPage/>}/>
        </Routes>
    );
};
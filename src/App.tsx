import {AddUser} from './componets/AddUser.tsx';
import {Suspense, useState} from "react";
import {api} from "./api/api.ts";
import {UsersList} from "./componets/UsersList.tsx";

const defaultUsersPromise = api.getUsers()

export default function App() {
    const [usersPromise, setUsersPromise] = useState(defaultUsersPromise)
    const refetchUsers = () => setUsersPromise(api.getUsers())

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Список пользователей</h1>
            <AddUser refetchUsers={refetchUsers}/>
            <Suspense fallback={<p>Loading...</p>}>
                <UsersList usersPromise={usersPromise}/>
            </Suspense>
        </div>
    );
}
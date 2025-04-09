import {useEffect, useState} from "react";
import {api, User} from "./api/api.ts";
import {AxiosError} from "axios";
import {AddUser} from "./componets/AddUser.tsx";
import {Users} from "./componets/Users.tsx";
import {Pagination} from "./componets/Pagination.tsx";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number[]>([]);
    const usersPerPage = 3;

    useEffect(() => {
        api
            .getUsers(currentPage, usersPerPage)
            .then((response) => {
                const pages = [...Array(response.pages)].map((_, index) => index + 1);
                setTotalPages(pages);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, [currentPage]);

    const removeUser = (userId: string) => {
        api
            .deleteUser(userId)
            .then(() => {
                setUsers(users.filter((user) => user.id !== userId));
            })
            .catch((error) => {
                const axiosError = error as AxiosError | Error;
                console.error("Error deleting user:", axiosError);
            });
    };

    const addNewUser = (name: string, email: string) => {
        const newUser = {id: crypto.randomUUID(), name, email};
        api
            .createUser(newUser)
            .then(() => {
                setUsers((prevUsers) => [...prevUsers, newUser]);
            })
            .catch((error) => {
                const axiosError = error as AxiosError | Error;
                console.error("Error creating user:", axiosError);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">User List</h1>
            <AddUser createUser={addNewUser}/>
            <Users users={users} removeUser={removeUser}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
        </div>
    );
}
import {useEffect, useState} from "react";
import {api, User} from "./api/api.ts";
import {AxiosError} from "axios";
import {AddUser} from "./componets/AddUser.tsx";
import {UserCard} from "./componets/UserCard.tsx";

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
            {/* Список пользователей */}
            <div className="space-y-4">
                {users.length > 0 ? (
                    users.map((user) => <UserCard key={user.id} user={user} onRemove={removeUser}/>)
                ) : (
                    <p className="text-center text-gray-500">No users found on this page.</p>
                )}
            </div>

            {/* Навигация */}
            <div className="flex justify-center mt-6 space-x-2">
                {totalPages.length > 0 &&
                    totalPages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`p-2 rounded-lg transition duration-200 ${
                                currentPage === pageNumber
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 text-gray-700 hover:bg-blue-500"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
            </div>
        </div>
    );
}
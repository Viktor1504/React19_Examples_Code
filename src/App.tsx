import {useEffect, useState} from "react";
import {api, User} from "./api/api.ts";
import {AxiosError} from "axios";

// Компонент для отображения одного пользователя
const UserCard = ({user, onRemove}: { user: User; onRemove: (id: string) => void }) => (
    <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">

            <img src={`https://ui-avatars.com/api/?name=${user.name}&size=128`} alt={user.name}/>

        <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
        </div>
        <button
            onClick={() => onRemove(user.id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
            Remove
        </button>
    </section>
);

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const LIMIT = 3;

    // Загрузка пользователей с сервера
    useEffect(() => {
        api
            .getUsers(page, LIMIT)
            .then((res) => {
                setUsers(res.data.data)
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
            });
    }, [page]);

    // Удаление пользователя
    const handleRemove = (id: string) => {
        console.log(id)
        api
            .deleteUser(id)
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
            })
            .catch((err) => {
                const error = err as AxiosError | Error;
                console.error("Error deleting user:", error);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">User List</h1>

            {/* Список пользователей */}
            <div className="space-y-4">
                {users.length > 0 ? (
                    users.map((user) => <UserCard key={user.id} user={user} onRemove={handleRemove}/>)
                ) : (
                    <p className="text-center text-gray-500">No users found on this page.</p>
                )}
            </div>

            {/* Навигация */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                        page === 1
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    Previous
                </button>
                <span className="self-center text-gray-700">Page {page}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={users.length < LIMIT}
                    className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                        users.length < LIMIT
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
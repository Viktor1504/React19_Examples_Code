import {useEffect, useState, useTransition} from 'react';
import {api, User} from './api/api.ts';
import {AxiosError} from 'axios';
import {AddUser} from './componets/AddUser.tsx';
import {Users} from './componets/Users.tsx';
import {Pagination} from './componets/Pagination.tsx';

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPageCount, setTotalPageCount] = useState<number>(0)
    const USERS_PER_PAGE = 3;

    const [isPending, startTransition] = useTransition();

    const setPage = (page: number) => {
        startTransition(() => {
            setCurrentPage(page);
        });
    };

    useEffect(() => {
        api
            .getUsers(currentPage, USERS_PER_PAGE)
            .then((response) => {
                setTotalPageCount(response.data.pages)
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке пользователей:', error);
            });
    }, [currentPage]);

    const deleteUser = (userId: string) => {
        api
            .deleteUser(userId)
            .then(() => {
                setUsers(users.filter((user) => user.id !== userId));
            })
            .catch((error) => {
                const axiosError = error as AxiosError | Error;
                console.error('Ошибка при удалении пользователя:', axiosError);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Список пользователей</h1>
            <AddUser/>
            <Users users={users} removeUser={deleteUser}/>
            <Pagination currentPage={currentPage} totalPageCount={totalPageCount} setCurrentPage={setPage}/>
        </div>
    );
}
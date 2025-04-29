import {AddUser} from './componets/AddUser.tsx';
import {Suspense} from "react";
import {UsersList} from "./componets/UsersList.tsx";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import {useUsers} from "./hooks/useUsers.ts";

export default function App() {
    const {usersPromise, refetchUsers} = useUsers()

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Список пользователей</h1>
            <ErrorBoundary
                onReset={() => {
                    // При сбросе ошибки также обновляем список пользователей
                    refetchUsers();
                }}
                fallbackRender={({error, resetErrorBoundary}: FallbackProps) => (
                    <div className={'text-red-600'}>
                        Something went wrong: {error.message}
                        <button
                            onClick={resetErrorBoundary}
                            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                        >
                            Повторить
                        </button>
                    </div>
                )}
            >
                <AddUser refetchUsers={refetchUsers}/>
                <Suspense fallback={<p>Loading...</p>}>
                    <UsersList usersPromise={usersPromise} refetchUsers={refetchUsers}/>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}
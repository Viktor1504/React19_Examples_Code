import {AddUser} from './componets/AddUser.tsx';
import {Users} from './componets/Users.tsx';
import {Pagination} from './componets/Pagination.tsx';

export default function App() {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Список пользователей</h1>
            <AddUser/>
            <Users/>
            <Pagination/>
        </div>
    );
}
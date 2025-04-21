import {UserCard} from "./UserCard.tsx";
import {useAppSelector} from "../store/useAppSelector.ts";

export const Users = () => {

    const users = useAppSelector((state) => state.users.users);
    return (
        <div className="space-y-4">
            {users.length > 0 ? (
                users.map((user) => <UserCard key={user.id} user={user} onRemove={removeUser}/>)
            ) : (
                <p className="text-center text-gray-500">No users found on this page.</p>
            )}
        </div>
    )
}
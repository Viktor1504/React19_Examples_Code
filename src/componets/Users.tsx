import {UserCard} from "./UserCard.tsx";
import {User} from "../api/api.ts";

export const Users = ({users, removeUser}: { users: User[], removeUser: (id: string) => void }) => {
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
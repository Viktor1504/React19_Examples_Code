import {UserCard} from "./UserCard.tsx";
import {User} from "../api/api.ts";
import {use} from "react";

export const UsersList = ({usersPromise}: { usersPromise: Promise<User[]> }) => {
    const users = use(usersPromise)

    return (
        <div className="space-y-4">
            {users &&users.map((user) => <UserCard key={user.id} user={user}/>)}
        </div>
    )
}
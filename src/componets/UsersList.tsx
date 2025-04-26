import {UserCard} from "./UserCard.tsx";
import {use} from "react";
import {User} from "../api/api.ts";

export const UsersList = ({usersPromise, refetchUsers}: {
    usersPromise: Promise<User[]>,
    refetchUsers: () => void
}) => {
    const users = use(usersPromise)

    return (
        <div className="space-y-4">
            {users && users.map((user) => <UserCard key={user.id} user={user} refetchUsers={refetchUsers}/>)}
        </div>
    )
}
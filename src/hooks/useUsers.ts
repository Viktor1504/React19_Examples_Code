import {startTransition, useState} from "react";
import {api} from "../api/api.ts";

export const useUsers = () => {
    const [usersPromise, setUsersPromise] = useState(api.getUsers())
    const refetchUsers = () =>
        startTransition(() => setUsersPromise(api.getUsers()))
    return {usersPromise, refetchUsers} as const
}
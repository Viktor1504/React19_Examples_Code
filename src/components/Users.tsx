import {UserCard} from "./UserCard.tsx";
import {useAppSelector} from "../store/useAppSelector.ts";
import {useAppDispatch} from "../store/useAppDispatch.ts";
import {useEffect} from "react";
import {fetchUsers, selectCurrentPage, selectUsers} from "../store/usersSlice.ts";

export const Users = () => {
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(selectCurrentPage)
    const users = useAppSelector(selectUsers)

    useEffect(() => {
        dispatch(fetchUsers({page: currentPage}))
    }, [dispatch, currentPage])


    return (
        <div className="space-y-4">
            {users.length > 0 ? (
                users.map((user) => <UserCard key={user.id} user={user}/>)
            ) : (
                <p className="text-center text-gray-500">No users found on this page.</p>
            )}
        </div>
    )
}
import {useAppDispatch} from "../store/useAppDispatch.ts";
import {addUser} from "../store/usersSlice.ts";
import {FormEvent} from "react";

export const AddUser = () => {
    const dispatch = useAppDispatch()

    const handleAddUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const newUser = {id: crypto.randomUUID(), name, email}
        dispatch(addUser(newUser))
    }

    return (
        <form onSubmit={handleAddUser} className="flex items-center justify-between mb-4">
            <input
                type="text"
                name='name'
                placeholder="Name"
                className="p-2 rounded-lg border border-gray-300"
            />
            <input
                type="email"
                name='email'
                placeholder="Email"
                className="p-2 rounded-lg border border-gray-300"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Add User
            </button>
        </form>
    );
};

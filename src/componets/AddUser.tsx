import {api} from "../api/api.ts";
import {useTransition} from "react";

export const AddUser = ({refetchUsers}: { refetchUsers: () => void }) => {

    const [isPending, startTransition] = useTransition()

    const actionHandler = async (formData: FormData) => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;

        startTransition(async () => {
            await api.createUser({id: crypto.randomUUID(), name, email})
            refetchUsers()
        })
    }

    return (
        <form action={actionHandler} className="flex items-center justify-between mb-4">
            <input
                type="text"
                name='name'
                placeholder="Name"
                disabled={isPending}
                className="p-2 rounded-lg border border-gray-300"
            />
            <input
                type="email"
                name='email'
                placeholder="Email"
                disabled={isPending}
                className="p-2 rounded-lg border border-gray-300"
            />
            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Add User
            </button>
        </form>
    );
};

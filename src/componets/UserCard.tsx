import {api, User} from "../api/api.ts";
import {NavLink} from "react-router"
import {useTransition} from "react";

export const UserCard = ({user, refetchUsers}: { user: User, refetchUsers: () => void }) => {
    const [isPending, startTransition] = useTransition()

    const handleRemoveUser = (userId: string) => {
        startTransition(async () => {
            await api.deleteUser(userId)
            refetchUsers()
        })
    }

    return (
        <NavLink
            to={`/users/${user.id}`}
            className="no-underline"
        >
            <section
                className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center hover:bg-gray-100 transition duration-200 cursor-pointer"
            >
                <div className="flex items-center">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.name || "Unknown"}&size=128`}
                        alt={user.name || "Unknown"}
                        className="rounded-full"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{user.name || "No name"}</h3>
                        <p className="text-gray-600">{user.email || "No email"}</p>
                    </div>
                </div>
                <button
                    onClick={(event) => {
                        event.preventDefault(); // Предотвращаем стандартное поведение ссылки
                        handleRemoveUser(user.id)
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                    aria-label={`Remove ${user.name || "user"}`}
                    disabled={isPending}
                >
                    Remove
                </button>
            </section>
        </NavLink>
    )
}
import {useNavigate, useParams} from "react-router";
import {Suspense, use} from "react";
import {api, User} from "../api/api.ts";
import {deleteUser} from "../store/usersSlice.ts";
import {useAppDispatch} from "../store/useAppDispatch.ts";

export const UserPage = () => {
    const {id} = useParams() as { id: string };

    const userFetchPromise = api.getUser(id);

    return (
        <Suspense>
            <UserDetails userPromise={userFetchPromise}/>
        </Suspense>
    )
};

const UserDetails = ({userPromise}: { userPromise: Promise<User> }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = use(userPromise)

    const handleRemoveUser = (userId: string) => {
        dispatch(deleteUser(userId))
        navigate("/")
    };

    return (
        <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
            <img
                src={`https://ui-avatars.com/api/?name=${user.name}&size=128`}
                alt={user.name}
                className="rounded-full"
            />
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
            </div>
            <button
                onClick={() => handleRemoveUser(user.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                aria-label={`Remove ${user.name}`}
            >
                Remove
            </button>
        </section>
    );
};
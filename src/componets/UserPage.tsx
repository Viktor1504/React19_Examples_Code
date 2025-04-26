import {useNavigate, useParams} from "react-router";
import {api, User} from "../api/api.ts";
import {Suspense, use, useTransition} from "react";

export const UserInfo = ({userPromise}: { userPromise: Promise<User> }) => {
    const user = use(userPromise);
    const [isPending, startTransition] = useTransition()
    const navigate = useNavigate()

    const handleRemoveUser = (userId: string) => {
        startTransition(async () => {
            await api.deleteUser(userId)
            navigate('/')
        })
    }

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
                disabled={isPending}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                aria-label={`Remove ${user.name}`}
            >
                Remove
            </button>
        </section>
    );
};

export const UserPage = () => {
    const {id} = useParams<{ id: string }>();
    const userPromise = api.getUser(id!);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <UserInfo userPromise={userPromise}/>
        </Suspense>
    );
};
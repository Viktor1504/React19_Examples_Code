import {User} from "../api/api.ts";

export const UserCard = ({user, onRemove}: { user: User; onRemove: (id: string) => void }) => (
    <section className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center hover:bg-gray-100  transition duration-200 cursor-pointer">
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
            onClick={() => onRemove(user.id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
            aria-label={`Remove ${user.name}`}
        >
            Remove
        </button>
    </section>
);
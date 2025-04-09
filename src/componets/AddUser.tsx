import {useState} from "react";

export const AddUser = ({createUser}: { createUser: (name: string, email: string) => void }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleCreateUser = () => {
        if (name && email) {
            createUser(name, email);
            setName("");
            setEmail("");
        }
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.currentTarget.value)}
                className="p-2 rounded-lg border border-gray-300"
            />
            <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="p-2 rounded-lg border border-gray-300"
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={handleCreateUser}
            >
                Add User
            </button>
        </div>
    );
};
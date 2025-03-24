import { useState, ChangeEvent } from "react";

export default function App() {
    const [text, setText] = useState<string>("");
    const [shouldFocus, setShouldFocus] = useState<boolean>(true);

    // Функциональный реф с динамической логикой
    const inputRefCallback = (node: HTMLInputElement | null): void => {
        if (node && shouldFocus) {
            node.focus(); // Фокусируем только если shouldFocus === true
        }
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value);
    };

    const toggleFocus = (): void => {
        setShouldFocus((prev) => !prev);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col gap-6 p-4">
            <h1 className="text-3xl font-bold text-gray-800">Пример с функциональным ref</h1>
            <input
                ref={inputRefCallback}
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Введите текст"
                className="w-64 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
                onClick={toggleFocus}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
                {shouldFocus ? "Отключить автофокус" : "Включить автофокус"}
            </button>
            <p className="text-lg text-gray-700">
                Введённый текст: <span className="font-semibold">{text || "Ничего не введено"}</span>
            </p>
            <p className="text-lg text-gray-700">
                Автофокус: <span className="font-semibold">{shouldFocus ? "Включён" : "Выключен"}</span>
            </p>
        </div>
    );
}
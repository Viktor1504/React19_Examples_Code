import { useRef, useState, ChangeEvent } from "react";

// Главный компонент
export default function App() {
    // Типизация useRef для HTMLInputElement (или null, пока элемент не привязан)
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Типизация useRef для числа (счётчик кликов)
    const clickCounterRef = useRef<number>(0);
    // Типизация состояния для строки
    const [text, setText] = useState<string>("");

    // Функция для фокусировки на input
    const focusInput = (): void => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Функция для увеличения счётчика кликов
    const incrementClickCounter = (): void => {
        clickCounterRef.current += 1;
        console.log(`Количество кликов: ${clickCounterRef.current}`);
    };

    // Обработчик изменения input с типизацией события
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col gap-6 p-4">
            {/* Заголовок */}
            <h1 className="text-3xl font-bold text-gray-800">Пример с useRef и Tailwind</h1>

            {/* Input с ref */}
            <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Введите текст"
                className="w-64 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Кнопка для фокусировки */}
            <button
                onClick={focusInput}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
                Фокусироваться на input
            </button>

            {/* Кнопка для увеличения счётчика */}
            <button
                onClick={incrementClickCounter}
                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 active:bg-green-800 transition-colors"
            >
                Увеличить счётчик кликов
            </button>

            {/* Отображение текста */}
            <p className="text-lg text-gray-700">
                Введённый текст: <span className="font-semibold">{text || "Ничего не введено"}</span>
            </p>

            {/* Отображение счётчика кликов */}
            <p className="text-lg text-gray-700">
                Количество кликов (в консоли): <span className="font-semibold">{clickCounterRef.current}</span>
            </p>
        </div>
    );
}
import { memo, useState, useCallback } from "react";

const CounterDisplay = memo(({ count, onIncrement }: { count: number; onIncrement: () => void }) => {
    console.log("CounterDisplay перерисован!");
    return (
        <div className="p-4 bg-blue-100 rounded-lg shadow-md">
            <p className="text-blue-800 font-semibold">Текущее значение счётчика: {count}</p>
            <button
                className="bg-blue-900 text-white px-2 py-1 mt-2 rounded-lg"
                onClick={onIncrement}
            >
                Увеличить изнутри
            </button>
        </div>
    );
});

export default function App() {
    const [firstCounter, setFirstCounter] = useState(0);
    const [secondCounter, setSecondCounter] = useState(0);

    // Мемоизируем функцию
    const handleIncrement = useCallback(() => {
        setFirstCounter((prev) => prev + 1);
    }, []); // Пустой массив зависимостей, так как функция не зависит от внешних значений

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200 flex-col gap-4">
            <CounterDisplay count={firstCounter} onIncrement={handleIncrement} />
            <button
                className="bg-cyan-900 text-white px-4 py-2 hover:bg-cyan-800 active:bg-cyan-600 rounded-2xl transition-colors"
                onClick={handleIncrement}
            >
                Увеличить первый счётчик {firstCounter}
            </button>
            <button
                className="bg-cyan-900 text-white px-4 py-2 hover:bg-cyan-800 active:bg-cyan-600 rounded-2xl transition-colors"
                onClick={() => setSecondCounter(secondCounter + 1)}
            >
                Увеличить второй счётчик {secondCounter}
            </button>
            <div className="p-4 bg-green-100 rounded-lg shadow-md">
                <p className="text-green-800 font-semibold">Текущее значение второго счётчика: {secondCounter}</p>
            </div>
        </div>
    );
}
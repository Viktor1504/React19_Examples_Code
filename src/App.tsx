import {useState, ChangeEvent, ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";

// Компонент модального окна
const Modal = ({isOpen, onClose, children,}: { isOpen: boolean; onClose: () => void; children?: ReactNode }) => {
    // Закрытие модалки по клавише Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} // Закрытие при клике на фон
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модалки
            >
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Закрыть
                </button>
            </div>
        </div>,
        document.body
    );
};

// Главный компонент приложения
export default function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setText(e.currentTarget.value);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col gap-6 p-4">
            <h1 className="text-3xl font-bold text-gray-800">Пример с порталом</h1>

            {/* Основной контент */}
            <input
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Введите текст"
                className="w-64 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Открыть модальное окно
            </button>
            <p className="text-lg text-gray-700">
                Введённый текст: <span className="font-semibold">{text || "Ничего не введено"}</span>
            </p>

            {/* Модальное окно через портал */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Введённый текст: {text}</h2>
                <p className="text-gray-600 mb-6">
                    Это модальное окно рендерится через портал и показывает введённый текст.
                </p>
            </Modal>
        </div>
    );
}
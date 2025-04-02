import {createContext, ReactNode, useContext} from 'react';

// 1. Создаем контекст с типом
const NameContext = createContext<string>('');

// 2. Провайдер с именем
function NameProvider({children}: { children: ReactNode }) {
    return (
        <NameContext.Provider value="Алекс">
            {children}
        </NameContext.Provider>
    );
}

// 3. Компонент, который использует контекст
function Greeting() {
    const name = useContext(NameContext);
    return <h1>Привет, {name}!</h1>;
}

// 4. Главный компонент
export default function App() {
    return (
        <NameProvider>
            <Greeting/>
        </NameProvider>
    );
}
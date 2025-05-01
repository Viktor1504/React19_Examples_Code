import {memo, useDeferredValue, useState} from "react"

const List = memo(({filter}: { filter: string }) => {
    const items = Array.from({length: 10000}, (_, i) => `Элемент ${i} ${filter}`).filter(item =>
        item.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
})


export default function App() {
    const [input, setInput] = useState('')
    const deferredFilter = useDeferredValue(input)

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите фильтр..."
            />
            <List filter={deferredFilter}/>
        </div>
    )
}
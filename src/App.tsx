import { startTransition, useOptimistic, useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  const [optimisticCount, addOptimistic] = useOptimistic(count)

  const handleClick = () => {
    startTransition(async () => {
      try {
        addOptimistic((prevValue) => prevValue + 1)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000))
        setCount((prevCount) => prevCount + 1)
      } catch (e) {
        const error = e as Error
        console.log(error)
      }
    })
  }

  return (
    <div>
      <p>Оптимистичное значение: {optimisticCount}</p>
      <p>Фактическое значение: {count}</p>

      <button onClick={handleClick}>Увеличить</button>
    </div>
  )
}

const App = () => {
  return <Counter />
}

export default App

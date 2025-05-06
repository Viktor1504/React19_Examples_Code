import { useState } from 'react'

// Тип для возвращаемого значения хука
type UseToggleReturn = {
  isOn: boolean
  toggle: () => void
}

// Кастомный хук
const useToggle = (initialState: boolean = false): UseToggleReturn => {
  const [isOn, setIsOn] = useState(initialState)

  const toggle = () => {
    setIsOn((prev) => !prev)
  }

  return {
    isOn,
    toggle,
  }
}

// Пример использования в компоненте
function ToggleComponent() {
  const { isOn, toggle } = useToggle()

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      <p
        className={`text-lg font-semibold ${isOn ? 'text-green-600' : 'text-red-600'}`}
      >
        Toggle is {isOn ? 'ON' : 'OFF'}
      </p>
      <button
        className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
          isOn
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-green-500 hover:bg-green-600'
        }`}
        onClick={toggle}
      >
        Toggle
      </button>
    </div>
  )
}

const App = () => <ToggleComponent />

export default App

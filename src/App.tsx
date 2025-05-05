import { ComponentType, MouseEvent } from 'react'

// Определяем интерфейс для компонентов с onClick
interface WithClickHandler {
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

// HOC для логирования событий
const withLogger = <P extends WithClickHandler>(
  Component: ComponentType<P>,
) => {
  return (props: P) => {
    const handleClick = (event: MouseEvent<HTMLElement>) => {
      console.log(`Клик по компоненту ${Component.name}`)

      // Вызываем оригинальный обработчик, если он был передан
      if (props.onClick) {
        props.onClick(event)
      }
    }

    // Рендерим оригинальный компонент с дополнительным обработчиком клика
    return <Component {...props} onClick={handleClick} />
  }
}

// Обычная кнопка с правильной типизацией
const Button = ({
  label,
  onClick,
}: {
  label: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
}) => {
  return <button onClick={onClick}>{label}</button>
}

const LoggedButton = withLogger(Button)

function App() {
  const handleButtonClick = () => {
    alert('Кнопка была нажата!')
  }

  return (
    <div>
      <h1>Пример использования HOC</h1>

      <h2>Обычная кнопка:</h2>
      <Button label="Нажми меня" onClick={handleButtonClick} />

      <h2>Кнопка с логированием:</h2>
      <LoggedButton
        label="Нажми меня с логированием"
        onClick={handleButtonClick}
      />

      <p>Проверьте консоль разработчика, чтобы увидеть логи!</p>
    </div>
  )
}

export default App

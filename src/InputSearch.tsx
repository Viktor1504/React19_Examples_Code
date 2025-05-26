import { ChangeEvent } from 'react'

const InputSearch = ({
  setSearchParams,
  searchParams,
}: {
  setSearchParams: (params: { criteria?: string }) => void
  searchParams: URLSearchParams
}) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    // Обновляем параметры поиска в зависимости от значения
    if (value) {
      setSearchParams({ criteria: value }) // Устанавливаем параметр 'name'
    } else {
      // Удаляем параметр 'name', если строка поиска пуста
      setSearchParams({})
    }
  }

  const name = searchParams.get('criteria') || ''

  return (
    <input
      type="text"
      name="search"
      value={name}
      placeholder="Поиск"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      onChange={handleSearch}
    />
  )
}

export default InputSearch

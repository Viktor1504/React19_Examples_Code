const InputSearch = ({
  handleSearch,
}: {
  handleSearch: (value: string) => void
}) => {
  return (
    <input
      type="text"
      name="search"
      placeholder="Поиск"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      onChange={(e) => handleSearch(e.currentTarget.value)}
    />
  )
}

export default InputSearch

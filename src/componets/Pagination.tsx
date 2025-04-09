export const Pagination = ({totalPages, currentPage, setCurrentPage}: {
    totalPages: number[],
    currentPage: number,
    setCurrentPage: (page: number) => void
}) => {
    return (
        <div className="flex justify-center mt-6 space-x-2">
            {totalPages.length > 0 &&
                totalPages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`p-2 rounded-lg transition duration-200 ${
                            currentPage === pageNumber
                                ? "bg-blue-600 text-white"
                                : "bg-gray-300 text-gray-700 hover:bg-blue-500"
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
        </div>
    )
}
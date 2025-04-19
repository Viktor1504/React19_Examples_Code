export const Pagination = ({
                               totalPageCount, // Было totalPages, теперь число
                               currentPage,
                               setCurrentPage,
                           }: {
    totalPageCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) => {
    const pageNumbers = Array.from({length: totalPageCount}, (_, index) => index + 1);

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {pageNumbers.length > 0 &&
                pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`p-2 rounded-lg transition duration-200 ${
                            currentPage === pageNumber
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-700 hover:bg-blue-500'
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
        </div>
    );
};
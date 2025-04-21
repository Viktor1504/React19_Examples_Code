export const Pagination = ({
                               totalPageCount,
                               currentPage,
                               setCurrentPage,
                           }: {
    totalPageCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) => {
    const pageNumbers = Array.from({ length: totalPageCount }, (_, index) => index + 1);

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {pageNumbers.length > 0 &&
                pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-200 hover: cursor-pointer ${
                            currentPage === pageNumber
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
        </div>
    );
};
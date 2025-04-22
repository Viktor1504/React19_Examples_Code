import {useAppSelector} from "../store/useAppSelector.ts";
import {setCurrentPage} from "../store/usersSlice.ts";
import {useAppDispatch} from "../store/useAppDispatch.ts";

export const Pagination = () => {
    const dispatch = useAppDispatch()

    const {currentPage, totalPageCount} = useAppSelector((state) => state.users)

    const pageNumbers = Array.from({length: totalPageCount}, (_, index) => index + 1);

    const handlerSetPage = (page: number) => {
        dispatch(setCurrentPage({currentPage: page}))
    }

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {pageNumbers.length > 0 &&
                pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlerSetPage(pageNumber)}
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
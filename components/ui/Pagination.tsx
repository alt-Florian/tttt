import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function Pagination({
  count,
  skip,
  take,
  onPaginationChange,
}: {
  count: number;
  skip: number;
  take: number;
  onPaginationChange: (skip: number) => void;
}) {
  const currentPage = Math.floor(skip / take) + 1;
  const totalPages: number = Math.ceil(count / take);
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const changePage = (page: number) => {
    const newSkip = (page - 1) * take;
    onPaginationChange(newSkip);
  };

  const isCurrentPage = (page: number): boolean => {
    return page === currentPage;
  };
  const isPageVisible = (page: number): boolean => {
    return (
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2
    );
  };

  const isDots = (page: number): boolean => {
    return (
      Math.abs(page - currentPage) === 3 && page !== 1 && page !== totalPages
    );
  };

  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-0 ${
        pages.length > 1 && "pb-4 border-t border-gray-200 "
      }`}
    >
      {pages.length > 1 ? (
        <>
          <div className="-mt-px flex w-0 flex-1 group">
            <button
              onClick={() => changePage(currentPage - 1)}
              className={` ${
                currentPage === 1 && "hidden"
              } inline-flex items-center border-t-2 border-transparent group-hover:border-indigo-600 group-hover:text-indigo-600 pr-1 pt-4 text-sm font-medium text-gray-900`}
            >
              <ArrowLongLeftIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-900 group-hover:text-indigo-600"
              />
              Précédent
            </button>
          </div>
          <div className="hidden md:-mt-px md:flex">
            {pages.map((page, index) => (
              <div key={index}>
                {isCurrentPage(page) && (
                  <button
                    aria-current="page"
                    className="inline-flex items-center border-t-2 border-indigo-600 px-4 pt-4 text-sm font-medium text-indigo-600"
                  >
                    {page}
                  </button>
                )}
                {isPageVisible(page) && !isCurrentPage(page) && (
                  <button
                    onClick={() => changePage(page)}
                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    {page}
                  </button>
                )}
                {isDots(page) && (
                  <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                    ...
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end group">
            <button
              onClick={() => changePage(currentPage + 1)}
              className={` ${
                currentPage === totalPages && "hidden"
              } inline-flex items-center border-t-2 border-transparent hover:border-gray-900 group-hover:border-indigo-600 group-hover:text-indigo-600 pr-1 pt-4 text-sm font-medium text-gray-900`}
            >
              Suivant
              <ArrowLongRightIcon
                aria-hidden="true"
                className="ml-3 size-5 text-gray-900 group-hover:text-indigo-600"
              />
            </button>
          </div>
        </>
      ) : null}
    </nav>
  );
}

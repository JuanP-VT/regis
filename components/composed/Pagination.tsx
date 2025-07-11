import Link from "next/link";
import { Button } from "../ui/button";
type Props = {
  numberOfPages: number;
  currentPage: number;
  categoryID: string;
  subCategoryID: string;
};
function Pagination({
  numberOfPages,
  currentPage,
  categoryID,
  subCategoryID,
}: Props) {
  type ButtonProps = {
    page: number;
    isCurrent?: boolean;
  };
  function PaginationButton({ page, isCurrent }: ButtonProps) {
    if (isCurrent === true) {
      return (
        <Button
          size="sm"
          className="ml-1 h-9  w-9 rounded-full bg-rose-400   text-xs text-white transition-all duration-500 hover:bg-rose-500"
        >
          {page}
        </Button>
      );
    }
    return (
      <Link
        href={{
          pathname: "/catalog",
          query: {
            category: categoryID,
            subCategory: subCategoryID,
            page: page,
          },
        }}
        as={`/catalog/category=${categoryID}&subCategory=${subCategoryID}&page=${page}`}
      >
        <Button
          size="sm"
          className="ml-1  h-9 w-9 rounded-full  bg-rose-300  text-xs text-white transition-all duration-500 hover:bg-rose-500"
        >
          {page}
        </Button>
      </Link>
    );
  }
  function PaginationFillerDots() {
    return (
      <button
        data-testid="dots"
        className="ml-1 h-9  w-9 rounded-full bg-rose-300  text-center text-xs text-white hover:bg-rose-500"
      >
        ..
      </button>
    );
  }
  //When CurrentPage is below 7
  if (currentPage < 7) {
    const renderButtons = () => {
      const items = [];
      const limit = numberOfPages < 7 ? numberOfPages : 7;
      for (let index = 0; index < limit; index++) {
        const element = (
          <PaginationButton
            page={index + 1}
            key={`pgnBtn${index + 1}`}
            isCurrent={index + 1 === currentPage}
          />
        );
        items.push(element);
      }
      return items;
    };
    return (
      <div className="flex  w-full p-2" data-testid="pagination-container">
        {renderButtons()}
      </div>
    );
  }
  const dynamicRenderButton = () => {
    // Items below current page always exist
    const firstPage = <PaginationButton page={1} key={`pgnBtn${1}`} />;
    const itemsBelow = [
      <PaginationButton
        page={currentPage - 2}
        key={`pgnBtn${currentPage - 2}`}
      />,
      <PaginationButton
        page={currentPage - 1}
        key={`pgnBtn${currentPage - 1}`}
      />,
    ];
    // I want to include next two buttons, but return nothing if next page is above max page
    let itemsAbove = [];

    for (let index = currentPage; index < numberOfPages; index++) {
      const element = (
        <PaginationButton page={index + 1} key={`pgnBtn${index + 1}`} />
      );
      itemsAbove.push(element);
    }

    const layout = [
      firstPage,
      <PaginationFillerDots key="rel" />,
      ...itemsBelow,
      <PaginationButton
        page={currentPage}
        key={`main${currentPage}`}
        isCurrent={true}
      />,
      ...itemsAbove.slice(0, 2),
    ];
    return layout;
  };
  return <div className="flex w-full  p-2">{dynamicRenderButton()}</div>;
}

export default Pagination;

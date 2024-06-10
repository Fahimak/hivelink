import React from "react";
import ReactPaginate from "react-paginate";

interface Props {
  totalPages: number;
  initialPage: number;
  handleChange: any;
}

const PageNumbers = ({ totalPages, initialPage, handleChange }: Props) => {
  return (
    <>
      {totalPages > 1 && (
        <ReactPaginate
          nextLabel=">"
          onPageChange={async (pageNo) => {
            await handleChange(pageNo.selected);
          }}
          disableInitialCallback={true}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          initialPage={initialPage}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="navigationLink"
          previousLinkClassName="navigationLink"
          nextClassName="navigationLink"
          nextLinkClassName="navigationLink"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeLinkClassName="activeLink"
        />
      )}
    </>
  );
};

export default PageNumbers;

import Pagination from "../pagination";
import Select from "../select";
import classNames from "./pagination.module.scss";
import { type Table as TableInstance } from "@tanstack/react-table";

const pageSizeOptions = [5, 10, 25, 50, 100];

interface Props<T> {
  tableInstance: TableInstance<T>;
}

const TablePagination = <T,>(props: Props<T>) => {
  const { tableInstance } = props;
  const pageIndex = tableInstance.getState().pagination.pageIndex;
  const pageCount = tableInstance.getPageCount();
  return (
    <div className={classNames.main}>
      <div className={classNames["select-container"]}>
        <Select
          getKey={(v) => v.toString()}
          getLabel={(v) => v.toString()}
          options={pageSizeOptions}
          value={tableInstance.getState().pagination.pageSize.toString()}
          onChange={(v) => tableInstance.setPageSize(Number(v))}
          className={classNames.select}
        />
        <p className={classNames.text}>
          Halaman {pageIndex + 1} dari {pageCount}
        </p>
      </div>
      <Pagination
        onChange={(page) => tableInstance.setPageIndex(page - 1)}
        page={pageIndex + 1}
        totalPages={pageCount}
      />
    </div>
  );
};

export default TablePagination;

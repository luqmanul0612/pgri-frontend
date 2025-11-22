import classNames from "./table.module.scss";
import { flexRender, type Table as TableInstance } from "@tanstack/react-table";

interface Props<T = unknown> {
  tableInstance: TableInstance<T>;
  emptyContent?: React.ReactNode;
  isLoading?: boolean;
}

const Table = <T,>(props: Props<T>) => {
  const { tableInstance, isLoading } = props;
  return (
    <div className={classNames.main}>
      <table className={classNames.table}>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td
                colSpan={tableInstance.getAllColumns().length}
                className={classNames["loading"]}
              >
                <div className={classNames["loading-content"]}>
                  <div className={classNames.loader} />
                </div>
              </td>
            </tr>
          )}
          {!isLoading && !tableInstance.getRowModel().rows.length && (
            <tr>
              <td
                colSpan={tableInstance.getAllColumns().length}
                className={classNames["no-data"]}
              >
                {props.emptyContent || (
                  <div className={classNames["no-data-content"]}>No data</div>
                )}
              </td>
            </tr>
          )}
          {!isLoading &&
            tableInstance.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      typeof cell.column.columnDef.meta?.className ===
                      "function"
                        ? cell.column.columnDef.meta?.className(cell.row)
                        : cell.column.columnDef.meta?.className
                    }
                    style={
                      typeof cell.column.columnDef.meta?.style === "function"
                        ? cell.column.columnDef.meta?.style(cell.row)
                        : cell.column.columnDef.meta?.style
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
        <tfoot>
          {tableInstance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Table;

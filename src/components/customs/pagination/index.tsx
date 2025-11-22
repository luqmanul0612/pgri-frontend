import { useRef } from "react";
import classNames from "./pagination.module.scss";
import { useControllableState } from "@/utils/hooks/use-controllable-state";
import clsx from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  middleCount?: number;
}

export default function Pagination({
  page: value,
  totalPages,
  onChange,
  middleCount = 5,
}: PaginationProps) {
  const [page, setPage] = useControllableState<number>({
    value,
    defaultValue: 1,
    onChange,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const getPages = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(middleCount / 2);

    pages.push(1);

    let start = Math.max(2, page! - half);
    let end = Math.min(totalPages - 1, page! + half);

    if (page! <= half + 1) {
      start = 2;
      end = Math.min(1 + middleCount, totalPages - 1);
    }

    if (page! >= totalPages - half) {
      start = Math.max(totalPages - middleCount, 2);
      end = totalPages - 1;
    }

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div ref={containerRef} className={classNames["pagination-root"]}>
      <button
        type="button"
        className={clsx(classNames["pagination-item"], classNames.navigation)}
        onClick={() => setPage(page! - 1)}
        disabled={page === 1}
      >
        Sebelumnya
      </button>
      {getPages().map((p, i) => {
        if (p === "...") {
          return (
            <button
              key={i}
              type="button"
              className={clsx(
                classNames["pagination-item"],
                classNames.divider,
              )}
            >
              …
            </button>
          );
        }
        return (
          <button
            type="button"
            key={i}
            onClick={() => setPage(p as number)}
            className={clsx(classNames["pagination-item"], {
              [classNames.active]: page === p,
            })}
          >
            {p}
          </button>
        );
      })}
      <button
        type="button"
        className={clsx(classNames["pagination-item"], classNames.navigation)}
        onClick={() => setPage(page! + 1)}
        disabled={page === totalPages}
      >
        Selanjutnya
      </button>
    </div>
  );
}

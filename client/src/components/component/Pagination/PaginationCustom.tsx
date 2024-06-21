import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
export default function PaginationCustom({
  totalPages,
  curPage,
  setCurPage,
}: {
  totalPages: number;
  curPage: number;
  setCurPage: Dispatch<SetStateAction<number>>;
}) {
  const range = 3;
  const [viewPage, setViewPage] = useState<any[]>([]);
  useEffect(() => {
    if (totalPages <= 3) {
      const newArr = [];
      for (let i = 1; i <= totalPages; i++) {
        newArr.push(i);
      }
      setViewPage(newArr);
    } else {
      if (curPage === 1) {
        setViewPage([1, 2, 3]);
        return;
      } else if (curPage === totalPages) {
        const newArr = [];
        for (let i = totalPages - 2; i <= totalPages; i++) {
          newArr.push(i);
        }
        setViewPage(newArr);
        return;
      } else {
        setViewPage([curPage - 1, curPage, curPage + 1]);
        return;
      }
    }
  }, [curPage, totalPages]);
  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (curPage - 1 === 0) return;
                setCurPage((prev) => prev - 1);
              }}
              className="font-bold select-none cursor-pointer"
            />
          </PaginationItem>
          {totalPages > 3 &&
            (curPage === totalPages - 1 || curPage === totalPages) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          {viewPage.map((el, idx) => {
            return (
              <PaginationItem key={idx}>
                <PaginationLink
                  onClick={() => {
                    setCurPage(el);
                  }}
                  className={`${
                    el === curPage &&
                    "bg-primary-color text-white hover:bg-primary-color hover:text-white"
                  } font-bold select-none cursor-pointer`}
                >
                  {el}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {totalPages > 3 && curPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (curPage + 1 > totalPages) return;
                setCurPage((prev) => prev + 1);
              }}
              className="font-bold select-none cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

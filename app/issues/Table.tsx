"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToLocal } from "@/lib/utils";
import { Issue, Status, User } from "@prisma/client";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import queryString from "query-string";
import React, { useEffect } from "react";
import IssueStatusBadge from "./IssueStatusBadge";
import { DataTablePagination } from "@/components/custom/pagination";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ResponseData } from "@/lib/http";
import IssueLoading from "./loading";

interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  status?: Status;
}

export const columns: ColumnDef<Issue, any>[] = [
  {
    accessorKey: "title",
    header: "Issue",
    cell: ({ row }) => {
      const issue = row.original;
      return (
        <Link href={`/issues/${issue.id}`}>
          <Button variant="link">{issue.title}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <IssueStatusBadge status={row.getValue("status")} />;
    },
  },
  {
    accessorKey: "createTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreateTime
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatDateToLocal(row.getValue("createTime"))}</div>;
    },
  },
];

export function DataTable({ columns, status }: DataTableProps<Issue, any>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
  const router = useRouter();
  useEffect(() => {
    console.log(pageIndex);
    console.log(pageSize);
  }, [pageIndex, pageSize]);
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    status,
    sorter: sorting?.[0]?.id,
    sortBy: sorting?.[0]?.desc ? "desc" : "asc",
  };
  const queryKey = queryString.stringify(fetchDataOptions);
  const { data, isLoading } = useQuery<
    ResponseData<{
      dataList: Issue[];
      count: number;
      totalPage: number;
    }>
  >({
    queryKey: ["issues", queryKey],
    queryFn: async () =>
      (
        await fetch("/api/issues" + "?" + queryKey, {
          method: "GET",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        })
      ).json(),
    retry: 3,
  });

  const table = useReactTable({
    data: data?.data.dataList ?? [],
    pageCount: data?.data.totalPage || 0,
    columns,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    enableMultiSort: false,
    // getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });
  if (isLoading) return <IssueLoading />;
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </>
  );
}

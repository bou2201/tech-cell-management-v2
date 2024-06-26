'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTablePagination from './DataTablePagination';
import DataTableColumnVis from './DataTableColumnVis';
import DataTableLoading from './DataTableLoading';
import { useTheme } from 'next-themes';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page?: number;
  limit?: number;
  hasNextPage?: boolean;
};

type TableHelperProps = {
  titleNoResult?: string;
  isLoading?: boolean;
  rowCountLoading?: number;
  isShowColumnVis?: boolean;
  isShowPagination?: boolean;
  className?: string;
};

export const DataTable = <TData, TValue>({
  columns,
  data,
  page,
  limit,
  hasNextPage,
  titleNoResult = 'Không tìm thấy kết quả nào.',
  isLoading,
  rowCountLoading = 3,
  isShowColumnVis = false,
  isShowPagination = true,
  className,
}: DataTableProps<TData, TValue> & TableHelperProps) => {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: limit,
  });

  const { theme } = useTheme();

  return (
    <>
      {/* Column visibility */}
      {isShowColumnVis && (
        <div className="w-full flex justify-end">
          <DataTableColumnVis table={table} />
        </div>
      )}

      {/* Table */}
      <div className={`rounded-md border ${theme === 'light' && 'bg-white'} ${className}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <DataTableLoading table={table} rowCountLoading={rowCountLoading} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}px` }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {titleNoResult}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Pagination  */}
      {isShowPagination && (
        <DataTablePagination
          page={page as number}
          limit={limit as number}
          hasNextPage={hasNextPage as boolean}
        />
      )}
    </>
  );
};

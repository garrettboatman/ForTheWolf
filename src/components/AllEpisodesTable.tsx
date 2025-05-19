"use client"

import {
  Column,
  ColumnDef,
  ColumnFiltersState, flexRender,
  getCoreRowModel, getFilteredRowModel, getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {useCallback, useMemo, useState} from "react";
import Link from "next/link";
import {SanityEpisode} from "@/utils/sanity.types";

function defaultSortColumn(column: Column<SanityEpisode, string>, title: string) {
  return (
    <button
      className="flex items-center space-x-1"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <span>{title}</span>
      <ArrowUpDown className="h-4 w-4"/>
    </button>
  )
}

function defaultPlainColumn(column: Column<SanityEpisode, string>, title: string) {
  return (
    <div>
      <span>{title}</span>
    </div>
  )
}

export default function AllEpisodesTable({episodes}: {episodes: SanityEpisode[]}) {
  // column definition
  // MARK: most changes to the data/display model should be made here rather than in the table html below
  const columns = useMemo<ColumnDef<SanityEpisode, string>[]>(() => [
    {
      accessorKey: 'episode_number',
      header: ({column}) => defaultPlainColumn(column, "#"),
      enableColumnFilter: false
    },
    {
      accessorKey: 'title',
      header: ({column}) => defaultSortColumn(column, "Title"),
      cell: ({row, getValue}) => (
        <strong><Link href={`/episodes/${row.original.slug?.current}`} target="_blank">{getValue()}</Link></strong>
      )
    },
    {
      accessorKey: 'air_date',
      header: ({column}) => defaultSortColumn(column, "Air Date"),
      sortingFn: "datetime"
    },
    {
      accessorKey: 'duration',
      header: ({column}) => defaultSortColumn(column, "Duration"),
      sortingFn: "datetime"
    },
    {
      accessorKey: 'scribe',
      header: ({column}) => defaultSortColumn(column, "Scribe"),
    },
  ], []);

  // state for filters and sorting with memoized defaults
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {id: 'air_date', desc: false} // Default sort by air_date
  ]);

  const handleColumnFilterChange = useCallback((id: string, value: string) => {
    setColumnFilters(prev => {
      const existing = prev.find(filter => filter.id === id);
      if (existing) {
        return prev.map(filter =>
          filter.id === id ? {id, value} : filter
        );
      }
      return [...prev, {id, value}];
    });
  }, []);

  const table = useReactTable<SanityEpisode>({
    data: episodes,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnFilters: true,
    filterFns: {
      fuzzy: (row, columnId, value) => {
        const rowValue = String(row.getValue(columnId)).toLowerCase();
        return rowValue.includes(String(value).toLowerCase());
      }
    },
    globalFilterFn: 'auto',
  });

  return (
    <div>
      <h2 className="text-2xl mb-2">Displaying <b>{table.getRowModel().rows.length}</b> results (of {episodes.length} total)</h2>
      <p className="italic mb-2">Click an episode title to see more details in a new tab</p>
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-left font-medium text-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                  {header.column.getCanFilter() ? (
                    <div className="mt-2">
                      <input
                        placeholder={`Filter ${header.column.id}...`}
                        value={(header.column.getFilterValue() as string) ?? ''}
                        onChange={(e) => handleColumnFilterChange(header.column.id, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
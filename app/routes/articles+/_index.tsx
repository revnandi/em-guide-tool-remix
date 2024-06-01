import type { MetaFunction } from "@remix-run/node";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/dropdown";
import { Button } from "~/components/button";
import { Icon } from "~/components/icon";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type Article = {
  id: string;
  title: string;
  magazine: string;
  language: string;
  timesShared: number;
  translationRequests: number;
  publishedAt: string;
  state: string;
};

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
    size: "100",
    // cell: ({ row }) => <div className="truncate">{row.original.title}</div>
  },
  {
    accessorKey: "magazine",
    header: "Magazine",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "timesShared",
    header: "Times shared",
  },
  {
    accessorKey: "translationRequests",
    header: "Translation Requests",
  },
  {
    accessorKey: "publishedAt",
    header: "Published at",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <Icon name="dots-vertical" className=""/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Articles" },
    { name: "description", content: "EM GUIDE - Articles" },
  ];
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-md border-zinc-700">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
      timesShared: 3,
      magazine: "Easterndaze",
      language: "English",
      translationRequests: 1,
      publishedAt: "2021-09-01",
      state: "Published",
    },
    {
      id: "728ed52f",
      title: "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
      timesShared: 3,
      magazine: "Easterndaze",
      language: "English",
      translationRequests: 1,
      publishedAt: "2021-09-01",
      state: "Published",
    },
    {
      id: "728ed52f",
      title: "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
      timesShared: 3,
      magazine: "Easterndaze",
      language: "English",
      translationRequests: 1,
      publishedAt: "2021-09-01",
      state: "Published",
    },
    {
      id: "728ed52f",
      title: "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
      timesShared: 3,
      magazine: "Easterndaze",
      language: "English",
      translationRequests: 1,
      publishedAt: "2021-09-01",
      state: "Published",
    },
    // ...
  ];
}
export default function Articles() {
  const data = getData();

  return (
    <div className="w-full p-4">
      <div className="mt-8 mb-4 text-3xl font-medium text-white">
        <h1>Articles List</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

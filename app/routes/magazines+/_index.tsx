import { db } from "~/drizzle/config.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
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
import { NavLink, json, useLoaderData, useNavigate } from "@remix-run/react";
import { format } from '~/utils/date';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 100,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    size: 100,
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => format(new Date(row.original.createdAt), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <Icon name="dots-vertical" className="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log("Copy payment ID")}>
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
    { title: "Magazines" },
    { name: "description", content: "EM GUIDE - Magazines" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const magazines = await db.query.magazines.findMany();

  return json({
    magazines,
  });
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const navigate = useNavigate();

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
                className="transition-colors cursor-pointer hover:dark:bg-zinc-800"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  navigate(`/magazines/${row.original.id}`);
                }}
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
export default function Magazines() {
  const { magazines } = useLoaderData<typeof loader>();

  console.log(magazines);

  return (
    <div className="w-full px-12 py-16">
      <NavLink to="/" className="flex gap-1">
        <Icon name="arrow-left" size="lg" className="text-indigo-600" />
        <span className="text-indigo-600">Back</span>
      </NavLink>
      <div className="flex justify-between mt-4 mb-4">
        <div className="text-3xl font-medium text-white">
          <h1>Magazines</h1>
        </div>
        <NavLink
          to="/magazines/add"
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors ease-in-out bg-indigo-600 rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-indigo-500 h-9"
        >
          <Icon name="plus" size="sm" className="text-white" />
          <span>Add new magazine</span>
        </NavLink>
      </div>
      <DataTable columns={columns} data={magazines} />
    </div>
  );
}

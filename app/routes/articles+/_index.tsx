import { type MetaFunction, json } from "@remix-run/node";
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
import { NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { db } from "~/drizzle/config.server";
// import { articles } from "~/drizzle/schema.server";
import { getCurrentFormattedDateTime, toZonedTime } from "~/utils/date";

export const loader = async () => {
  const articles = await db.query.articles.findMany();

  return json({ articles });
};
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
    accessorKey: "slug",
    header: "Slug",
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
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return (
        <div>
          {getCurrentFormattedDateTime(
            toZonedTime(
              new Date(row.original.createdAt),
              Intl.DateTimeFormat().resolvedOptions().timeZone
            ).toString()
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      return (
        <div>
          {getCurrentFormattedDateTime(
            toZonedTime(
              new Date(row.original.createdAt),
              Intl.DateTimeFormat().resolvedOptions().timeZone
            ).toString()
          )}
        </div>
      );
    },
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
              <Icon name="dots-vertical" className="" />
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
                  navigate(`/articles/${row.original.id}`);
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

function getData() {
  // Fetch data from your API here.

  return [
    {
      id: "728ed52f",
      title:
        "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
      timesShared: 3,
      magazine: "Easterndaze",
      language: "English",
      translationRequests: 1,
      publishedAt: "2021-09-01",
      state: "Published",
    },
    {
      id: "728ed52f",
      title:
        "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
      timesShared: 3,
      magazine: "Easterndaze",
      language: "English",
      translationRequests: 1,
      publishedAt: "2021-09-01",
      state: "Published",
    },
    {
      id: "728ed52f",
      title:
        "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
      timesShared: 3,
      magazine: "Easterndaze",
      language: "English",
      translationRequests: 1,
      publishedAt: "2021-09-01",
      state: "Published",
    },
    {
      id: "728ed52f",
      title:
        "KAROLINDA: “I think the Polish electronic music scene has a lot to offer.",
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
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="w-full px-12 py-16">
      <NavLink to="/" className="flex gap-1">
        <Icon name="arrow-left" size="lg" className="text-indigo-600" />
        <span className="text-indigo-600">Back</span>
      </NavLink>
      <div className="flex justify-between mt-4 mb-4">
        <div className="text-3xl font-medium text-white lg:text-4xl">
          <h1>Articles</h1>
        </div>
        <NavLink
          to="/articles/add"
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors ease-in-out bg-indigo-600 rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-indigo-500 h-9"
        >
          <Icon name="plus" size="sm" className="text-white" />
          <span>Create new</span>
        </NavLink>
      </div>
      <DataTable columns={columns} data={articles} />
    </div>
  );
}

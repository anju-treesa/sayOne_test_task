import React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Stack,
  Skeleton,
  Tfoot,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { capitalize } from "lodash";
import Pagination from "./Pagination";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("title", {
    cell: (info) => info.getValue() && capitalize(info.getValue()),
    header: "Event Title",
  }),
  columnHelper.accessor("category", {
    cell: (info) => info.getValue() && capitalize(info.getValue()),
    header: "Category",
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: "Date",
  }),
  columnHelper.accessor("price", {
    cell: (info) => {
      if (!info.getValue()) {
        return null;
      }
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(info.getValue());
    },
    header: "Price",
    meta: {
      isNumeric: true,
    },
  }),
];

const TableLoading = () => (
  <Tr p="10">
    <Td>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Td>
    <Td>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Td>
    <Td>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Td>
    <Td>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Td>
  </Tr>
);

const DataTable = ({ data = [], tableLoading = false }) => {
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      <Table mt="10" bg="white" shadow="md" variant="striped">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                    p="6"
                    color="black"
                    fontWeight="semibold"
                    fontSize="sm"
                    textAlign="center"
                    borderBottom="1px"
                    borderColor="gray.400"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {tableLoading ? (
            <TableLoading />
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                _hover={{
                  backgroundColor: "gray.100",
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta;
                  return (
                    <Td
                      textAlign="center"
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Pagination table={table} />
    </>
  );
};

export default DataTable;

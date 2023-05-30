import React from "react";
import { Box, Button, HStack, Select } from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const Pagination = ({ table }) => {
  return (
    <HStack
      py="3"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
      w="full"
      spacing="4"
      shadow="md"
      borderTop="1px"
      borderColor="gray.200"
    >
      <Button
        colorScheme="gray"
        onClick={() => table.setPageIndex(0)}
        isDisabled={!table.getCanPreviousPage()}
      >
        <ArrowLeftIcon boxSize="3" />
      </Button>
      <Button
        colorScheme="gray"
        onClick={() => table.previousPage()}
        isDisabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon boxSize="5" />
      </Button>
      <Button
        onClick={() => table.nextPage()}
        isDisabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon boxSize="5" />
      </Button>
      <Button
        colorScheme="gray"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        isDisabled={!table.getCanNextPage()}
      >
        <ArrowRightIcon boxSize="3" />
      </Button>
      <Box>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </Box>
      <Box>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Box>
    </HStack>
  );
};

export default Pagination;

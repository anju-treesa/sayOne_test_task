import React from "react";

import { Button, Stack } from "@chakra-ui/react";

export default function ButtonComponenet({ onSubmit, isLoading }) {
  return (
    <div>
      <Stack direction="row" spacing={4}>
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          colorScheme="teal"
          borderRadius={0}
          type="submit"
          variant="solid"
          width="full"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Stack>
    </div>
  );
}

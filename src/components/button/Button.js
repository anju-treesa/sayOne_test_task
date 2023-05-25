import React from "react";

import { Button, Stack, ButtonProps } from "@chakra-ui/react";

export default function ButtonComponent({
  onSubmit,
  isLoading,
  title,
  ...props
}) {
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
          {...props}
        >
          {title}
        </Button>
      </Stack>
    </div>
  );
}

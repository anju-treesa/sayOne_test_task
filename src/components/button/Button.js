import React from "react";

import { Button, Stack, ButtonProps } from "@chakra-ui/react";

export default function ButtonComponent({
  onSubmit,
  isLoading,
  title,
  ...props
}) {
  return (
    <Button
      isLoading={isLoading}
      loadingText="Submitting"
      colorScheme="teal"
      borderRadius={0}
      variant="solid"
      onClick={onSubmit}
      {...props}
    >
      {title}
    </Button>
  );
}

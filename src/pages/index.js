import React from "react";

import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import Head from "next/head";

function HomePage() {
  return (
    <>
      <Head>
        <title>Events - Re-Events | Favourite events near you!</title>
      </Head>
      <h1>HomePage</h1>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Enable email alerts?
        </FormLabel>
        <Switch id="email-alerts" />
      </FormControl>
    </>
  );
}

export default HomePage;

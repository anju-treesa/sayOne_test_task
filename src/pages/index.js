import React from 'react'

import {
    FormControl,
    FormLabel,
    Switch
  } from '@chakra-ui/react'

function HomePage() {
  return (
    <div>
  <h1>HomePage</h1>
    <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='email-alerts' mb='0'>
    Enable email alerts?
  </FormLabel>
  <Switch id='email-alerts' />
</FormControl>
    </div>
  

  )
}

export default HomePage
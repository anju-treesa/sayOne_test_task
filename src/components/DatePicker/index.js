import { Input } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

const DatePicker = ({ selectedDate = new Date(), onChange, ...props }) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Input value={value} onClick={onClick} ref={ref} onChange={onChange} />
  ));

  return (
    <ReactDatePicker
      showTimeSelect
      dateFormat="dd / MM / yyyy h:mm aa"
      selected={selectedDate}
      onChange={onChange}
      customInput={<ExampleCustomInput />}
      minDate={new Date()}
      {...props}
    />
  );
};

export default DatePicker;

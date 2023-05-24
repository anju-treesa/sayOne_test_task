import { Input } from "@chakra-ui/react";

const CustomInput = ({
  label,
  value,
  onChange,
  type,
  labelname,
  placeholder,
  id,
  ...props
}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      type={type}
      name={labelname}
      id={id}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default CustomInput;

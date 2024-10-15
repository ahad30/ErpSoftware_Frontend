/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";




const ZSelect = ({ name, label, mode, options, isLoading, value , placeholder , required}) => {
  const { control, setValue, resetField } = useFormContext();

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  const onChange = (value) => {
    // Custom onChange logic if needed
  //  console.log(value)
  };

  const onSearch = (_value) => {
    // Custom onSearch logic if needed
    // console.log(_value)
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...(required && { required:` This ${label} field is required` })
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Select
            {...field}
            virtual={true}
            allowClear={true}
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={(value) => {
              field.onChange(value);
              onChange(value);
            }}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options || []}
            mode={mode ? mode : undefined}
            loading={isLoading ? isLoading : false}
            disabled={isLoading ? isLoading : false}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZSelect;

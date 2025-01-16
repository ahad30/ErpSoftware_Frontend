"use client";
import { useAppSelector } from "@/redux/Hook/Hook";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ZInputTwo = ({
  name,
  type,
  label,
  defaultKey,
  value,
  placeholder,
  required,
  reset,
  onChange,
  readOnly,
}) => {
  const { control, setValue, resetField } = useFormContext();
  const { isEditModalOpen } = useAppSelector((state) => state.modal);

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue, name]);

  useEffect(() => {
    if (reset === true) {
      if (!isEditModalOpen) {
        resetField(name);
      }
    }
  }, [reset, isEditModalOpen, resetField, name]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...(required && { required: `This ${label} field is required` }),
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input
            disabled={readOnly}
            readOnly={readOnly}
            className={defaultKey ? `${defaultKey}` : ``}
            {...field}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              // Merge custom onChange with field's default onChange
              field.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZInputTwo;

/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const numberRegex = /^[0-9]+$/;
const fractionRegex = /^[0-9]*\.?[0-9]*$/;

const ZNumber = ({
  name,
  label,
  value,
  setPriceQuantityImage,
  defaultKey,
  refresh,
}) => {
  const { control, setValue, resetField } = useFormContext();


  // by default reset
  useEffect(() => {
    if (name === "price" && defaultKey === "product") {
      resetField(name, { defaultValue: "" });
    }
    if (name === "quantity" && defaultKey === "product")
      resetField(name, { defaultValue: "" });

    if (name === "singlePrice" && defaultKey === "singleProduct") {
      resetField(name, { defaultValue: "" });
    }
    if (name === "singleQuantity" && defaultKey === "singleProduct") {
      resetField(name, { defaultValue: "" });
    }
  }, [resetField]);
  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  // when refresh the value will be reset
  useEffect(() => {
    if (defaultKey === "product") {
      resetField("price");
      resetField("quantity");
    }
  }, [refresh]);

  const handleKeyPress = (event) => {
    const regex =
      name === "price" || name === "singlePrice" ? fractionRegex : numberRegex;

    // Prevent multiple decimal points
    if (
      (event.key === "." || event.key === ",") &&
      event.currentTarget.value.includes(".")
    ) {
      event.preventDefault();
      return;
    }

    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  // by default value will empty
  useEffect(() => {
    if (defaultKey === "singleProduct" && setPriceQuantityImage) {
      setPriceQuantityImage((_prev) => ({
        images: "",
        singleQuantity: "",
        singlePrice: "",
      }));
    }
    if (defaultKey === "product" && setPriceQuantityImage) {
      setPriceQuantityImage((_prev) => ({
        image: "",
        price: "",
        quantity: "",
      }));
    }
  }, []);

  const handleChange = (val) => {
    if (defaultKey === "product" && setPriceQuantityImage) {
      setPriceQuantityImage((prev) => ({
        ...prev,
        [name]: Number(val),
      }));
    }
    if (defaultKey === "singleProduct" && setPriceQuantityImage) {
      setPriceQuantityImage((prev) => ({
        ...prev,
        [name]: Number(val),
      }));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: `${label} is required`,
        pattern: {
          value:
            name === "price" || name === "singlePrice"
              ? fractionRegex
              : numberRegex,
          message:
            name === "price" || name === "singlePrice"
              ? "Please enter a valid number, including fractions"
              : "Only digits 1 to 9 are allowed",
        },
        maxLength: {
          value: name === "price" || name === "singlePrice" ? 10 : 5,
          message: `Maximum length is ${name === "price" ? 10 : 5} digits`,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input
            {...field}
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleChange(e.target.value);
            }}
            placeholder={label}
            onKeyPress={handleKeyPress}
            maxLength={name === "price" || name === "singlePrice" ? 10 : 5}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZNumber;

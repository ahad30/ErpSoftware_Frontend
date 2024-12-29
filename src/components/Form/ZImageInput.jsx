/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Upload } from "antd";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/redux/Hook/Hook";

const ZImageInput = ({
  name,
  label,
  defaultKey,
  setPriceQuantityImage,
  refresh,
}) => {
  const [imageList, setImageList] = useState([]);
  const { control, resetField } = useFormContext();
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state) => state.modal
  );

  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen) {
      setImageList([]);
      resetField(name);
    }
  }, [isAddModalOpen, isEditModalOpen]);

  useEffect(() => {
    if (defaultKey === "product") {
      setImageList([]);
    }
  }, [refresh]);

  const handleChange = (info) => {
    const file = info.file;
    console.log(info);
    if (
      setPriceQuantityImage &&
      defaultKey === "product" &&
      info?.fileList?.length > 0
    ) {
      setPriceQuantityImage((prev) => ({
        ...prev,
        image: file,
      }));
    } else if (setPriceQuantityImage) {
      setPriceQuantityImage((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Upload
            name="image"
            listType="picture"
            fileList={imageList}
            onPreview={(file) => {
              const url = URL.createObjectURL(file.originFileObj);
              window.open(url, "_blank");
            }}
            beforeUpload={(file) => {
              const newFileList = [
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  url: URL.createObjectURL(file),
                },
              ];
              setImageList(newFileList);
              onChange(file);
              return false; // Prevent automatic upload
            }}
            onRemove={() => {
              setImageList([]);
              onChange(null);
            }}
            maxCount={1}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZImageInput;

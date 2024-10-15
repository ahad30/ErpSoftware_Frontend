"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Image, Space, Tooltip } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import ButtonWithModal from '@/components/Button/ButtonWithModal';
import AddModal from '@/components/Modal/AddModal';
import AddAddons from '../../Addons/AddAddons/page';
import EditModal from '@/components/Modal/EditModal';
import EditAddons from '../../Addons/EditAddons/EditAddons';
import DeleteModal from '@/components/Modal/DeleteModal';
import DashboardTable from '@/components/Table/DashboardTable';
import { useDeleteAddonsMutation, useGetAddonsQuery } from '@/redux/Feature/Admin/addons/addons';
import { useGetModuleByIdQuery } from '@/redux/Feature/Admin/module/module';
import { useAppDispatch, useAppSelector } from '@/redux/Hook/Hook';
import { useState } from 'react';
import { setIsDeleteModalOpen, setIsEditModalOpen } from '@/redux/Modal/ModalSlice';

const ModuleDetails = () => {
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [selectedCategory, setSelectedCategory] = useState({});

  const {
    data: moduleData,
    error: moduleError,
    isLoading: moduleLoading,
  } = useGetModuleByIdQuery(id); 

  const {
    data: addonsData,
    error: addonsError,
    isLoading: addonsLoading,
    isSuccess: addonsSuccess,
  } = useGetAddonsQuery();

  const [
    deleteAddons,
    {
      isLoading: dCIsloading,
      isError,
      isSuccess: erpAddonSuccess,
      data: addonData,
      error: dError,
    },
  ] = useDeleteAddonsMutation();

  const AddonData =
  addonsSuccess &&
  addonsData?.data?.map((addon, index) => {
    // Parse the addonPage JSON string and format the output
    const pages = addon.addonPage
      ? JSON.parse(addon.addonPage)
          .map((page) => `PageName: ${page.pageName}, PageRoute: ${page.pageRoute}`)
          .join(' | ')
      : 'No Pages'; // Handle case where there are no pages or addonPage is invalid

    return {
      key: index,
      id: addon.addonID,
      name: addon.addonName,
      image: addon.addonImage,
      desc: addon.addonIcon,
      pages: pages, // Include formatted pages here
    };
  });

const AddonColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Icon",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Pages",
    dataIndex: "pages",
    key: "pages", // Ensure this matches the data key in AddonData
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text, record) => (
      <Image alt="" height={50} width={50} src={record.image} />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEditModule(record)}>
          <Tooltip title="Edit" placement="top">
            <CiEdit size={20} />
          </Tooltip>
        </a>
        <a onClick={() => handledl(record)}>
          <Tooltip title="Delete" placement="top">
            <AiOutlineDelete size={20} />
          </Tooltip>
        </a>
      </Space>
    ),
  },
];


  const handledl = (AddonData) => {
    setSelectedCategory(AddonData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteAddon = () => {
    deleteAddons(selectedCategory?.id);
  };

  const handleEditModule = (AddonData) => {
    setSelectedCategory(AddonData);
    dispatch(setIsEditModalOpen());
  };



  if (moduleError || addonsError)
    return <p>Error loading module or addons details</p>;

  return (
    <div>
      <BreadCrumb />
      <h1 className="text-xl p-4">{moduleData?.data?.moduleName}</h1>

      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Create Addon" />
      </div>

      <DashboardTable columns={AddonColumns} data={AddonData} loading={addonsLoading}/>
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Addon">
        <AddAddons />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Addons">
        <EditAddons selectedCategory={selectedCategory} />
      </EditModal>

      {/* delete category */}
      <DeleteModal
        data={addonData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={erpAddonSuccess}
        title="Delete Addons"
        onDelete={handleDeleteAddon}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Under the addons corresponding data will be removed "}
      ></DeleteModal>

    </div>
  );
};

export default ModuleDetails;

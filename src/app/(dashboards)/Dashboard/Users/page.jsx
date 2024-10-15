"use client";

import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Space, Tooltip } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from '@/components/Button/ButtonWithModal';
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/Feature/Admin/usersmanagement/userApi";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import EditModal from "@/components/Modal/EditModal";
import AddModal from "@/components/Modal/AddModal";
import AddUser from "./AddUser/page";
import EditUser from "./EditUser/page";


const Users = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, error, isLoading: uLoading, isSuccess } = useGetUsersQuery();
  const [deleteUser, { isLoading: dCIsloading, isError, isSuccess: uIsSuccess, data: dUdata, error: dError }] = useDeleteUserMutation();

const userData = data?.data?.map((user, index) => ({
  id: user.erpUserID,
  key: index,
  username: user.erpUsername,
  email: user.erpUserEmail,
  phone: user.erpUserPhone,
  fullName: user.erpUserFullName,
  password: user.erpUserPassword,
  role: user.erpUserRole
}));

// console.log(userData)

  const handleEditUser = (userData) => {
    setSelectedUser(userData);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (userData) => {
    setSelectedUser(userData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteUser = () => {
    deleteUser(selectedUser?.id);
  };


const columns = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => handleEditUser(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <BreadCrumb />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add User" />
      </div>

      <DashboardTable columns={columns} data={userData} loading={uLoading} />

      <AddModal isAddModalOpen={isAddModalOpen} title="Create User">
        <AddUser />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit User">
        <EditUser selectedUser={selectedUser} />
      </EditModal>

      {/* Delete User Modal */}
      <DeleteModal
        data={dUdata}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={uIsSuccess}
        title="Delete User"
        onDelete={handleDeleteUser}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this user will remove all associated data."}
      />
    </>
  );
};

export default Users;

import React from "react";
import { UserForm, UserTables } from "./components";

const AddUser = () => {
  return (
    <div className="w-full h-fit flex flex-col">
      <div className="mt-3 mx-3 rounded-md">
        <h1 className="text-md text-left text-red-500 ">
          <span className="bg-red-100 p-1 rounded-md">Add User</span>
        </h1>
      </div>
      <div className="flex flex-row  justify-between px-6">

      <UserTables />
      <UserForm/>
      </div>
    </div>
  );
};

export default AddUser;

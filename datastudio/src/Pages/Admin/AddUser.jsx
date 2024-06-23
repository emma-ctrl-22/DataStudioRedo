import React from "react";
import { UserForm, UserTables } from "./components";
import {Toaster} from 'react-hot-toast';
const AddUser = () => {
  return (
    <div style={{fontFamily:"Montserrat"}} className="w-full h-fit flex flex-col bg-gray-900">
      <div className="mt-3 mx-6 rounded-md">
        <h1 className="text-md text-left text-blue-500 ">
          <span className="bg-blue-100 p-1 rounded-md">Add User</span>
        </h1>
      </div>
      <div className="flex flex-col  justify-between px-6">
      <UserForm/>
      <UserTables />
      </div>
      <Toaster/>
    </div>
  );
};

export default AddUser;

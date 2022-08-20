import React from "react";
import { Header } from "../components";
import { FiSettings } from "react-icons/fi";

const Admin = () => {
  return (
    <>
      <div className="m-2 mt-24 p-2 md:m-10 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="관리자 관리" />
      </div>
      <div className="ml-[1400px] bg-red-300 w-[50px] h-[340px] rounded-3xl grid grid-cols-1 divide-y divide-solid justify-center text-center">
        <div className="">01</div>
        <div className="">01</div>
        <div className="">01</div>
        <div className="">01</div>
        <div className="">01</div>
      </div>
    </>
  );
};

export default Admin;

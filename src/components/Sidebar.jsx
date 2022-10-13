import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  let { isclick, setIsclick } = useStateContext();
  // const activeMenu = true;

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-red text-md m-2";

  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-red-600 m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              {/* <SiShopware /> <span>스마트 캠퍼스</span> */}
              {/* <img src="https://raw.githubusercontent.com/dltlaos11/smart-campus-platform/master/src/img/logo.png"></img> */}
              <div className="font-extrabold font-Mulish text-red-800 text-center text-[50px] mb-1 p-3">
                <div className="text-5xl">
                  <div className="text-black">SMART </div>CAMPUS
                </div>
                <div className="gap-5 items-center mt-6 border-color border-b-1 pb-6">
                  <img
                    src="https://raw.githubusercontent.com/dltlaos11/smart-campus-platform/master/src/data/dummy.png"
                    alt="user-profile"
                  />
                  <div>
                    <p className="font-semibold text-xl dark:text-gray-200">
                      {isclick?.group_name}
                      {/* 주용준{console.log(owndata[0]?.group_name, "22")} 옵셔널체이닝*/}
                      {/* {isclick === owndata ? "2222gg" : isclick?.group_name} */}
                    </p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                      {" "}
                    </p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                      {" "}
                      {isclick?.intro}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent> "X" 아이콘*/}
          </div>
          <div className="mt-1">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-red-600 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.link}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

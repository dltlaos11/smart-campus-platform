import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.png";

import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import AuthService from "../api/auth.service";
import GroupService from "../api/group.service";

const UserProfile = () => {
  let { currentColor } = useStateContext();
  let { owndata, setOwndata } = useStateContext();
  let { isclick, setIsclick } = useStateContext();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(isclick, "141414", owndata.length);
  useEffect(() => {
    // hooks 최상위 선언부
    const getuserprofile = async () => {
      // setLoading(false);
      await GroupService.getGroupOwn()
        .then((res) => res.data.response)
        .then((body) => {
          console.log(body);
          setOwndata([...owndata, ...body]);
          setIsclick(body[0]);
        });
    };
    // console.log(isclick, "333");
    if (owndata.length === 0) {
      getuserprofile();
    }
  }, []);
  console.log(owndata, "OWNDATA");

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {isclick?.group_name}
            {/* 주용준{console.log(owndata[0]?.group_name, "22")} 옵셔널체이닝*/}
            {/* {isclick === owndata ? "2222gg" : isclick?.group_name} */}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {isclick?.intro}
          </p>
        </div>
      </div>
      <div>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={owndata.length}
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
                active
              />
            }
            endMessage={<Divider plain>더 이상의 부서는 없어요 !🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              // itemLayout="horizontal"
              dataSource={owndata}
              renderItem={(item) => (
                <List.Item key={item.title}>
                  <List.Item.Meta
                    avatar={<Avatar src="" />}
                    title={
                      <a onClick={() => setIsclick(item)}>{item.group_name}</a>
                    }
                    description={item.intro}
                  />
                  {/* {console.log(data)} */}
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      <div className="mt-5">
        <div onClick={()=>{
          window.localStorage.removeItem("user")
          window.location.replace("/");
          }}>
        <Button
          color="white"
          bgColor={currentColor}
          text="로그아웃"
          borderRadius="10px"
          width="full"
        />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

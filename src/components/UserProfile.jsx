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
  const { currentColor } = useStateContext();
  const [data1, setData] = useState([]);

  const [data, setData1] = useState([]);
  // let data = [
  //   {
  //     title: "Ant Design Title 1",
  //   },
  // ];

  const getuserprofile = async () => {
    try {
      await GroupService.getGroupAll().then(
        (res) => {
          console.log(res);
          setData1(res.data.response);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getuserprofile();
  }, []);

  // const [loading, setLoading] = useState(false);

  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }

  //   setLoading(true);
  //   fetch(
  //     "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
  //   )
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results]);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);

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
          <p className="font-semibold text-xl dark:text-gray-200"> 주용준 </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> 관리자 </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            info@shop.com{" "}
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
            dataLength={data.length}
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
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.title}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">dwssd{item.data}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="로그아웃"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;

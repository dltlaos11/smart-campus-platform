import React, { useState, useEffect } from "react";
import { Table, Avatar, List, Space, Input } from "antd";
import { Header } from "../components";
import Notice from "./Notice";
import Survey from "./Survey";
import Admin from "./Admin";
import { useStateContext } from "../contexts/ContextProvider";
import GroupService from "../api/group.service";

const Dashboard = () => {
  let { isclick, setIsclick } = useStateContext();
  let { owndata, setOwndata } = useStateContext();

  useEffect(() => {
    // hooks 최상위 선언부
    const setGroupid = async () => {
      // setLoading(false);
      await GroupService.getGroupOwn()
        .then((res) => res.data.response)
        .then((body) => {
          console.log(body);
          setIsclick(body[0]);
        });
    };

    const GroupAdmin = async () => {
      await GroupService.getGroupOwn()
        .then((res) => res.data.response)
        .then((body) => {
          console.log(body);
          setOwndata([...owndata, ...body]);
        });
    };

    if (isclick.length === 0) {
      // 처음 한번만 실행
      setGroupid();
      GroupAdmin();
    }
  }, []);
  console.log(isclick, "333333");
  console.log(owndata);
  console.log(owndata[0]?.group_id, "DASHBOARD");

  const data1 = Array.from({
    length: owndata.length, // 값 받으면 _ 부분 처리 가능할지도?
  }).map((_, i) => ({
    group_id: owndata[i]?.group_id,
    group_name: `${owndata[i]?.group_name}`,
    group_image: `${owndata[i]?.group_image}`,
    // description: " ",
    intro: `${owndata[i]?.intro}`,
  }));

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl bg-slate-600">
        <Header category="Dashboard" />

        <div className="grid grid-cols-2  gap-4">
          <div className=" basis-40 shrink grow">
            <Notice />
          </div>
          <div className=" basis-40 shrink grow">
            <Survey />
          </div>
        </div>
        <div className="grid grid-cols-1  gap-4  bg-white rounded-3xl md:m-10">
          <div className="m-2 md:m-10 mt-24  md:p-10 bg-white rounded-3xl ">
            <Header title="부서관리" />

            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={data1}
              renderItem={(item) => (
                <List.Item
                  key={item.group_name}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="../../public/logo192.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.group_image} />}
                    title={
                      <a onClick={() => setIsclick(item)}>{item.group_name}</a>
                    }
                    description={item.description}
                  />
                  {item.intro}
                </List.Item>
              )}
            />
            {/* <button
              onClick={() => {
                // navigate("/NoticeWrite");
              }}
              className="bg-red-800 shadow-lg mt-8 text-center rounded-2xl text-white p-3 w-32 ml-[1050px]"
            >
              부서 추가, modal 파일 완성 후
            </button> */}
          </div>
        </div>
        <div className="grid grid-cols-1  gap-4">
          <div className=" basis-40 shrink grow">
            <Admin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

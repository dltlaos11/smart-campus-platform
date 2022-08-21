import React, { useState } from "react";
import { Table, Avatar, List, Space, Input } from "antd";
import { Header } from "../components";
import Notice from "./Notice";
import Survey from "./Survey";

const Dashboard = () => {
  const columns = [
    { title: "titl4s1", dataIndex: "a", key: "a", width: 100 },
    { title: "title2", dataIndex: "b", key: "b", width: 100 },
    { title: "title3", dataIndex: "c", key: "c", width: 100 },
    { title: "title4", dataIndex: "b", key: "d", width: 100 },
    { title: "title5", dataIndex: "b", key: "e", width: 100 },
  ];

  const data = [
    { a: "123", b: "xxxxxxxx xxxxxxxx", d: 3, key: "1" },
    { a: "cdd", b: "edd12221 edd12221", d: 3, key: "2" },
    { a: "133", c: "edd12221 edd12221", d: 2, key: "3" },
    { a: "133", c: "edd12221 edd12221", d: 2, key: "4" },
    { a: "123", b: "xxxxxxxx xxxxxxxx", d: 3, key: "1" },
    { a: "cdd", b: "edd12221 edd12221", d: 3, key: "2" },
  ];
  const data1 = Array.from({
    length: 5, // 값 받으면 _ 부분 처리 가능할지도?
  }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl bg-slate-600">
        <Header category="Dashboard" title="Home" />

        <div className="grid grid-cols-1  gap-4 p-2">
          <div className="grid grid-cols-2  gap-4 p-2">
            <div className=" basis-40 shrink grow">
              <Notice />
            </div>
            <div className=" basis-40 shrink grow">
              <Survey />
            </div>
          </div>
          <div className="grid grid-cols-1  gap-4 p-2 bg-white rounded-3xl">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
              <Header category="Dashboard" title="부서관리" />

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
                    key={item.title}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    dwdw
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
              <button
                onClick={() => {
                  // navigate("/NoticeWrite");
                }}
                className="bg-red-800 shadow-lg mt-8 text-center rounded-2xl text-white p-3 w-32 ml-[1150px]"
              >
                글 등록
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2  gap-4 p-2">
            <div className=" basis-40 shrink grow">
              <Survey />
            </div>
            <div className=" basis-40 shrink grow">
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ y: true, x: true }}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

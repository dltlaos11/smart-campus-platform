import React from "react";
import { Table } from "antd";
import { Header } from "../components";

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

  return (
    <>
      {/* <div className="mx-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl h-96">
        Dashboardds
      </div>
      md:m-10 p-2 md:p-10 bg-white rounded-3xl w-1/2 
      */}

      <div className="flex-wrap basis-auto grow shrink bg-white rounded-3xl">
        <Header category="Dashboard" title="Home" />
        <div
          className="flex flex-wrap gap-7 p-2 
        "
        >
          <div className="min-h-150 basis-60 shrink grow">
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ y: 300, x: true }}
              size="small"
            />
          </div>
          <div className="min-h-150 basis-60 shrink grow">
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ y: 300, x: true }}
              size="small"
            />
          </div>
          <div className="min-h-150 basis-60 shrink grow">
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ y: 300, x: true }}
              size="small"
            />
          </div>
          <div className="min-h-150 basis-60 shrink grow">
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ y: 300, x: true }}
              size="small"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

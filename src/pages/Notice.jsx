import React, { useRef, useState, useEffect } from "react";
import { Header } from "../components";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import NoticeDetail from "./NoticeDetail";
import { useStateContext } from "../contexts/ContextProvider";

import NoticeService from "../api/notice.service";

import { useStateNoticeContext } from "../contexts/NoticeProvider";
import authHeader from "../api/auth-header";
import api from "../api/axios";

const Notice = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  let { isclick, setIsclick } = useStateContext();
  let { noticedata, setNoticedata } = useStateContext();

  let { noticeDetailId, setNoticeDetailId } = useStateNoticeContext();
  // const data = [
  //   {
  //     key: 1,
  //     index: 1,
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //     date: "2022-12-31",
  //     file_content: 0,
  //   },
  //   {
  //     key: 2,
  //     index: 2,
  //     name: "감사머",
  //     title: "2번 글입니다.세요 이버",
  //     date: "2022-12-30",
  //     file_content: 0,
  //   },
  // ];

  const getNoticeAllWeb = () => {
    console.log(isclick?.group_id);
    return api.get(`api/api/notice/all-web?group_id=${isclick?.group_id}`, {
      headers: authHeader(),
    });
  };
  // console.log(isclick?.group_id);
  useEffect(() => {
    const getAllNotice = async () => {
      await getNoticeAllWeb()
        .then((res) => res.data.response)
        .then(
          (body) => {
            console.log(body.length, "확이해보자~~");
            if (body.length === 0) {
              setNoticedata([]);
            }
            body.forEach((e) => {
              if (!e["key"]) {
                e["key"] = e.notice_id;
                e["create_time"] = e["create_time"].slice(0, 10);
                e["name"] = "관리자"; // name 없어서 예비
                setNoticedata([...body]); //🟢
              }
            });
            console.log(body);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getAllNotice();
  }, [isclick?.group_id]);

  // console.log(data, "22222");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Index",
      dataIndex: "notice_id",
      key: "notice_id",
      width: "15%",
    },
    {
      title: "작성자",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "날짜",
      dataIndex: "create_time",
      key: "create_time",
      ...getColumnSearchProps("date"),
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="m-2 md:m-10 h-[700px] mt-24 p-2 md:p-10 bg-white rounded-3xl ">
        <Header category="Pages" title="공지사항" />
        <Table
          columns={columns}
          dataSource={noticedata}
          scroll={{ y: 300 }}
          onRow={(record, recordIndex) => ({
            // onClick: event => { console.log(event.target, event.target.className, record, recordIndex) }
            onClick: (event) => {
              navigate(`/notice/noticeDetail/${record.key}`);
              setNoticeDetailId(record.key);
              console.log(record.key);
            },
          })}
        />
        <div className="h-24 flex justify-end w-full">
          <button
            onClick={() => {
              navigate("/noticeWrite");
            }}
            className="bg-red-600 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32 mr-7"
          >
            글 등록
          </button>
        </div>
      </div>
    </>
  );
};

export default Notice;

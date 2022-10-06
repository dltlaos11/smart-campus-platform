import React, { useRef, useState, useEffect } from "react";
import { Header } from "../components";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link, useNavigate } from "react-router-dom";
import surveyDetail from "./NoticeDetail";
import { useStateContext } from "../contexts/ContextProvider";

import authHeader from "../api/auth-header";
import api from "../api/axios";

const Survey = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  let { isclick, setIsclick } = useStateContext();
  let { surveydata, setSurveydata } = useStateContext();

  const getSurveyAllWeb = () => {
    console.log(isclick?.group_id);
    return api.get(`api/api/survey/all-web?group_id=${isclick?.group_id}`, {
      headers: authHeader(),
    });
  };

  useEffect(() => {
    const getAllSurvey = async () => {
      await getSurveyAllWeb()
        .then((res) => res.data.response)
        .then(
          (body) => {
            if (body.length === 0) {
              setSurveydata([]);
            }
            body.forEach((e) => {
              if (!e["key"]) {
                e["key"] = e.survey_id;
                e["create_time"] = e["create_time"].slice(0, 10);
                e["end_time"] = e["end_time"].slice(0, 10);
                setSurveydata([...body]); //🟢
              }
            });
            console.log(body);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getAllSurvey();
  }, [isclick?.group_id]);

  // const data = [
  //   {
  //     key: "1",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //     date: "2022-12-31",
  //   },
  //   {
  //     key: "2",
  //     index: "2",
  //     name: "감사머",
  //     title: "2번 글입니다.세요 이버",
  //     date: "2022-12-30",
  //   },
  //   {
  //     key: "3",
  //     index: "3",
  //     name: "오이지",
  //     title: "3번 글임. 세요 이버버이니니다",
  //     date: "2022-12-12",
  //   },
  //   {
  //     key: "4",
  //     index: "4",
  //     name: "안영사",
  //     title: "4번 글입니다.세요 이버",
  //     date: "2022-12-15",
  //   },
  //   {
  //     key: "5",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //     date: "2022-12-31",
  //   },
  //   {
  //     key: "6",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //     date: "2022-12-31",
  //   },
  //   {
  //     key: "7",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //     date: "2022-12-31",
  //   },
  // ];

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
      dataIndex: "survey_id",
      key: "survey_id",
      width: "15%",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "시작 날짜",
      dataIndex: "create_time",
      key: "create_time",
      ...getColumnSearchProps("create_time"),
      sorter: (a, b) => a.create_time.length - b.create_time.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "종료 날짜",
      dataIndex: "end_time",
      key: "end_time",
      ...getColumnSearchProps("end_time"),
      sorter: (a, b) => a.end_time.length - b.end_time.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="m-2 md:m-10 mt-24 h-[700px] p-2 md:p-10 bg-white rounded-3xl ">
        <Header category="Pages" title="설문" />
        <Table
          columns={columns}
          dataSource={surveydata}
          scroll={{ y: 300 }}
          onRow={(record, recordIndex) => ({
            // onClick: event => { console.log(event.target, event.target.className, record, recordIndex) }
            onClick: (event) => {
              navigate(`/surveyDetail/${record.key}`);
              console.log(record.key);
            },
          })}
        />
        <div className="h-24 flex justify-end w-full">
          <button
            onClick={() => {
              navigate("/surveyWrite");
            }}
            className="bg-red-600 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32 mr-7"
          >
            설문 등록
          </button>
        </div>
      </div>
    </>
  );
};

export default Survey;

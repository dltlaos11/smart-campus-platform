import React, { useRef, useState } from "react";
import { Header } from "../components";
import { Button, Input, Space, Table, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link, useNavigate } from "react-router-dom";
import NoticeDetail from "./NoticeDetail";

const Survey = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [visible, setVisible] = useState(false);

  const data = [
    {
      key: "1",
      index: "1",
      name: "김석삼",
      title: "안녕하세요 이버",
    },
    {
      key: "2",
      index: "2",
      name: "감사머",
      title: "2번 글입니다.세요 이버",
    },
    {
      key: "3",
      index: "3",
      name: "오이지",
      title: "3번 글임. 세요 이버버이니니다",
    },
    {
      key: "4",
      index: "4",
      name: "안영사",
      title: "4번 글입니다.세요 이버",
    },
    {
      key: "5",
      index: "1",
      name: "김석삼",
      title: "안녕하세요 이버",
    },
    {
      key: "6",
      index: "1",
      name: "김석삼",
      title: "안녕하세요 이버",
    },
    {
      key: "7",
      index: "1",
      name: "김석삼",
      title: "안녕하세요 이버",
    },
  ];

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
      dataIndex: "index",
      key: "index",
      width: "15%",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "admin_group_id",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
        <Header category="Pages" title="관리자 관리" />
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 300, x: true }}
          onRow={(record, recordIndex) => ({
            // onClick: event => { console.log(event.target, event.target.className, record, recordIndex) }
            onClick: () => {
              setVisible(true);
            },
          })}
        />
      </div>
      <Modal
        title="선택하신 부서에 대한 요청이 성공되었습니다 !"
        centered
        visible={visible}
        onOk={() => setVisible(false)} // 📗
        onCancel={() => setVisible(false)}
        width={700}
      >
        <p>선택하신 부서에 대한 신청이 요청되었습니다.</p>
        <p>관리자 승인을 받을 떄 까지 기다려주세요🙂</p>
      </Modal>
    </>
  );
};

export default Survey;

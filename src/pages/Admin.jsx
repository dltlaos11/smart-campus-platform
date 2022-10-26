import React, { useRef, useState, useEffect } from "react";
import { Header } from "../components";
import { Button, Input, Space, Table, Modal, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link, useNavigate } from "react-router-dom";
import NoticeDetail from "./NoticeDetail";
import AdminLevel from "../components/AdminLevel";
import groupService from "../api/group.service";
import authService from "../api/auth.service";

const Admin = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  let [visible, setVisible] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  let [adminGroupdata, setAdminGroupdata] = useState("");
  let [clickCell, setClickCell] = useState("");
  let [userId, setUserId] = useState("");
  console.log(user.response.level, "LEVELCHECK");

  const openNotification = () => {
    notification.open({
      message: "승인이 성공되었습니다 !",
      description: "해당 관리자에게 요청된 승인을 허가하였습니다🙂",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  useEffect(() => {
    const getGroupCall = async () => {
      await groupService
        .getAdminGroupCallList()
        .then((res) => res.data.response)
        .then((body) => {
          body.forEach((e) => {
            if (!e["key"]) {
              e["key"] = e.admin_group_id;
            }
            // console.log(body, "GOOD!~");
            setAdminGroupdata([...body]);
          });
        });
    };
    getGroupCall();
    console.log("다시해보자~~~~~~~~~~~~~~~~", adminGroupdata);
  }, [visible + adminGroupdata.length]);

  const handleAdminGroupAccept = async () => {
    try {
      await groupService.putAdminGroupAccept(clickCell).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  // const data = [
  //   {
  //     key: "1",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //   },
  //   {
  //     key: "2",
  //     index: "2",
  //     name: "감사머",
  //     title: "2번 글입니다.세요 이버",
  //   },
  //   {
  //     key: "3",
  //     index: "3",
  //     name: "오이지",
  //     title: "3번 글임. 세요 이버버이니니다",
  //   },
  //   {
  //     key: "4",
  //     index: "4",
  //     name: "안영사",
  //     title: "4번 글입니다.세요 이버",
  //   },
  //   {
  //     key: "5",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //   },
  //   {
  //     key: "6",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
  //   },
  //   {
  //     key: "7",
  //     index: "1",
  //     name: "김석삼",
  //     title: "안녕하세요 이버",
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
      dataIndex: "admin_group_id",
      key: "admin_group_id",
      width: "10%",
      ...getColumnSearchProps("admin_group_id"),
    },
    {
      title: "교번",
      dataIndex: "user_id",
      key: "user_id",
      width: "10%",
      ...getColumnSearchProps("user_id"),
    },
    {
      title: "그룹",
      dataIndex: "group_name",
      key: "group_name",
      width: "15%",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
        <Header category="Pages" title="그룹 관리" />
        <Table
          columns={columns}
          dataSource={adminGroupdata}
          scroll={{ y: 300, x: true }}
          onRow={(record, recordIndex) => ({
            // onClick: event => { console.log(event.target, event.target.className, record, recordIndex) }
            onClick: (event) => {
              setVisible(true);
              console.log(record.user_id, adminGroupdata.length);
              setUserId(record.user_id);
              setClickCell(record.admin_group_id);
            },
          })}
        />
      </div>
      {/* <AdminLevel /> */}
      {user.response.level === 0 ? <AdminLevel /> : <></>}
      <Modal
        title="그룹 승인하시겠습니까?"
        centered
        visible={visible}
        // onOk={() => {
        //   setVisible(false);
        //   console.log(clickCell, "@@@@@");
        //   handleAdminGroupAccept();
        // }} // 📗
        // onCancel={() => setVisible(false)}
        closable={false}
        footer={null}
        width={700}
      >
        <p>{userId}에게 해당 그룹을 승인하시려면 OK를 클릭해주세요🙂</p>

        <div className=" absolute bottom-[10px] right-[10px]">
          <Button
            style={{ background: "red" }}
            type="ghost"
            onClick={() => {
              setVisible(false);
              console.log(clickCell, "@@@@@");
              handleAdminGroupAccept();
              authService.updateLevel(userId, 1);

              openNotification();
            }}
          >
            네
          </Button>{" "}
          &nbsp;
          <Button
            style={{ background: "red" }}
            type="ghost"
            onClick={() => {
              setVisible(false);
            }}
          >
            아니요
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Admin;

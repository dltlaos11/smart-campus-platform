import React, { useState, useEffect } from "react";
import { Header } from "./index";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import authHeader from "../api/auth-header";
import authService from "../api/auth.service";

const AdminLevel = () => {
  let originData = [];
  let [admindata, setAdmindata] = useState([]);

  useEffect(() => {
    const getAdmin = async () => {
      await authService
        .getAdminList()
        .then((res) => res.data.response)
        .then((body) => {
          body.forEach((e) => {
            if (!e["key"]) {
              e["key"] = e.user_id;
              setAdmindata([...body]); //🟢
            }
          });
          console.log(body);
          //   setAdmindata(body);
        });
    };
    getAdmin();
  }, []);

  //   const handleUpdateLevel = async (e) => {
  //     try {
  //       await authService.updateLevel("admin", "7").then(
  //         (res) => {
  //           console.log(res);
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  for (let i = 0; i < admindata.length; i++) {
    const handleUpdateLevel = async (e) => {
      try {
        await authService
          .updateLevel(admindata[i]?.user_id, admindata[i]?.level)
          .then(
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
    handleUpdateLevel();
  }

  //   let originData = Array.from({
  //     length: 2, // 값 받으면 _ 부분 처리 가능할지도?
  //   }).map((_, i) => ({
  //     key: `${admindata[i]?.user_id}`,
  //     user_id: `${admindata[i]?.user_id}`,
  //     level: admindata[i]?.level,
  //     name: `${admindata[i]?.name}`,
  //     department: `${admindata[i]?.department}`,
  //   }));

  //   console.log(originData);
  //   for (let i = 0; i < 2; i++) {
  //     originData.push({
  //       key: i.toString(),
  //       user_id: i,
  //       level: 8,
  //       name: "주용준",
  //       department: "컴퓨터공학부",
  //     });
  //   }

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const [form] = Form.useForm();
  //   let [data, setData] = useState(admindata);
  const [editingKey, setEditingKey] = useState("");

  //   console.log(data, "@@@@@@@");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      user_id: "",
      level: "",
      name: "",
      department: "",
      ...record,
    });
    console.log(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...admindata];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setAdmindata(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setAdmindata(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "user_id",
      dataIndex: "user_id",
      width: "15%",
      editable: false,
    },
    {
      title: "레벨",
      dataIndex: "level",
      width: "15%",
      editable: true,
    },
    {
      title: "관리자",
      dataIndex: "name",
      width: "20%",
      editable: false,
    },
    {
      title: "부서",
      dataIndex: "department",
      width: "40%",
      editable: false,
    },
    {
      title: "레벨 수정",
      dataIndex: "operation",
      width: "20%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                save(record.key);
                console.log(record.user_id, record.level);
                // handleUpdateLevel();
              }}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="취소하시겠어요?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "level" ? "number" : "text", // "age" => "level"
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <div className="m-2 mt-24 p-2 md:m-10 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="관리자 관리" />
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={admindata}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default AdminLevel;

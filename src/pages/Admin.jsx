import React, { useState } from "react";
import { Header } from "../components";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
const originData = [];

for (let i = 0; i < 50; i++) {
  originData.push({
    key: i.toString(),
    user_id: i,
    level: 8,
    name: "주용준",
    department: "컴퓨터공학부",
  });
}

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

const Admin = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      user_id: "",
      level: "",
      name: "",
      department: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "순번",
      dataIndex: "user_id",
      width: "15%",
      editable: true,
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
      width: "40%",
      editable: true,
    },
    {
      title: "부서",
      dataIndex: "department",
      width: "40%",
      editable: true,
    },
    {
      title: "레벨 수정",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
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
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
      {/* <div className="ml-[1400px] bg-red-300 w-[50px] h-[340px] rounded-3xl grid grid-cols-1 divide-y divide-solid justify-center text-center">
        <div className="">01</div>
        <div className="">01</div>
        <div className="">01</div>
        <div className="">01</div>
        <div className="">01</div>
      </div> */}
    </>
  );
};

export default Admin;

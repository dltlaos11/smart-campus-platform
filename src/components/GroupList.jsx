import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { Select, Table, Avatar, List } from "antd";
import { Modal } from "antd";
import { useStateContext } from "../contexts/ContextProvider";
import groupService from "../api/group.service";

const GroupList = () => {
  let { isclick, setIsclick } = useStateContext();
  let { owndata, setOwndata } = useStateContext();

  const [visible, setVisible] = useState(false);
  const [selectGroup, setSelectGroup] = useState([]);
  useEffect(() => {
    const GroupAdmin = async () => {
      await groupService
        .getGroupOwn()
        .then((res) => res.data.response)
        .then((body) => {
          console.log(body);
          setOwndata([...owndata, ...body]);
        });
    };

    if (isclick.length === 0) {
      // 처음 한번만 실행
      GroupAdmin();
    }
  }, []);

  const data1 = Array.from({
    length: owndata.length, // 값 받으면 _ 부분 처리 가능할지도?
  }).map((_, i) => ({
    group_id: owndata[i]?.group_id,
    group_name: `${owndata[i]?.group_name}`,
    group_image: `${owndata[i]?.group_image}`,
    // description: " ",
    intro: `${owndata[i]?.intro}`,
  }));

  const { Option } = Select;
  const children = [];

  for (let i = 0; i < data1?.length; i++) {
    children.push(
      <Option key={data1[i]?.group_id}>{data1[i]?.group_name}</Option>
    );
  }
  const handleChange = (value) => {
    // console.log(value);
    setSelectGroup(value);
    console.log(selectGroup);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-slate-50 rounded-3xl ">
      <Header title="전체 부서목록" />

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
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.group_image} />}
              title={
                <a
                  onClick={() => {
                    setIsclick(item);
                    console.log(selectGroup);
                  }}
                >
                  {item.group_name}
                </a>
              }
              description={item.description}
            />
            {item.intro}
          </List.Item>
        )}
      />
      <br />
      <Select
        mode="multiple"
        allowClear
        style={{
          width: "100%",
        }}
        placeholder="부서를 선택해주세요😀"
        onChange={handleChange}
      >
        {children}
      </Select>

      <Modal
        title="선택하신 부서에 대한 요청이 성공되었습니다 !"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={700}
      >
        <p>선택하신 부서에 대한 신청이 요청되었습니다.</p>
        <p>관리자 승인을 받을 떄 까지 기다려주세요🙂</p>
      </Modal>
      <div className="h-24 flex justify-end w-full">
        <button
          onClick={() => {
            // navigate("/NoticeWrite");
            setVisible(true);
          }}
          className="bg-red-800 shadow-lg mt-8 text-center rounded-2xl text-white p-3 w-32 md:ml-[1600px]"
        >
          부서 신청하기
        </button>
      </div>
    </div>
  );
};

export default GroupList;

import React, {useState} from 'react'
import { Header } from "../components";
import { Select,Table, Avatar, List } from 'antd';
import {Modal } from 'antd';
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const handleChange = (value) => {
  console.log(value);
};
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



const GroupList = () => {
  const [visible, setVisible] = useState(false);

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
    <br/>
         <Select
    mode="multiple"
    allowClear
    style={{
      width: '100%',
    }}
    placeholder="부서를 선택해주세요😀"
    onChange={handleChange}
  >
    {children}
  </Select>
    <button
      onClick={() => {
        // navigate("/NoticeWrite");
        setVisible(true);
      }}
      className="bg-red-800 shadow-lg mt-8 text-center rounded-2xl text-white p-3 w-32 md:ml-[1550px]"
    >
      부서 추가, modal 파일 완성 후
    </button>
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
  </div>
  )
}

export default GroupList
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Input, Button, Dropdown, Menu, message, Space, Tooltip } from "antd";
import {
  DownOutlined,
  PlusCircleOutlined,
  LineOutlined,
  MenuOutlined,
  DownSquareOutlined,
} from "@ant-design/icons";

import SurveyTextarea from "./SurveyTextarea";
import SurveyRadio from "./SurveyRadio";
import SurveyCheckBox from "./SurveyCheckBox";
import SurveyInput from "./SurveyInput";

const SurveyAll = () => {
  let [buttonText, setButtonText] = useState("질문 종류");

  console.log("재실행 Surtvey_input", buttonText);

  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
    // console.log(e);
    setButtonText(e.key);
  };

  const selectComponent = {
    단답형: <SurveyInput />,
    서술형: <SurveyTextarea />,
    객관식: <SurveyRadio />,
    체크박스: <SurveyCheckBox />,
  };

  let menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "단답형",
          key: "단답형",
          icon: <LineOutlined />,
        },
        {
          label: "서술형",
          key: "서술형",
          icon: <MenuOutlined />,
        },
        {
          label: "객관식",
          key: "객관식",
          icon: <PlusCircleOutlined />,
        },
        {
          label: "체크박스",
          key: "체크박스",
          icon: <DownSquareOutlined />,
        },
      ]}
    />
  );

  return (
    <>
      <div class="p-2 border-[0.75px] border-gray-800 rounded">
        <Space wrap>
          <Dropdown overlay={menu}>
            <Button>
              <Space>
                {buttonText}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
        {selectComponent[buttonText]}
        {/* 
        <div>
          <Input showCount maxLength={20} />
        </div> */}
      </div>
    </>
  );
};
export default React.memo(SurveyAll);

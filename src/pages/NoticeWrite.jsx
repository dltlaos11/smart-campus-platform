import React, { useState } from "react";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
  FileManager,
} from "@syncfusion/ej2-react-richtexteditor";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
} from "antd";
const NoticeWrite = () => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
      ["link", "image"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "image",
  ];
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [priority, setPriorty] = useState(false);
  const [containProgram, setContainProgram] = useState(false);
  const openPopup = () => {
    window.open(
      "programpopup",
      "new",
      "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=700, height=700, left=0, top=0"
    );
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <div className="min-h-screen md:px-10 pt-40">
      <div className=" bg-white rounded px-6 py-10 w-full mx-auto mb-10">
        <h1 className="text-2xl font-bold">공지사항 작성</h1>
        <div className=" h-16 flex">
          <div className="flex flex-row my-auto w-full text-center border border-gray-400">
            <div className="flex basis-2/12 bg-gray-200">
              <div className="m-auto border-l">제목</div>
            </div>
            <form className="basis-10/12 border-gray-400 border-l">
              <input
                className="w-full outline-none h-10 ml-3"
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
              />
            </form>
          </div>
        </div>
        <div className="text-xl font-bold mb-2">내용</div>
        <div className=" h-good">
          <RichTextEditorComponent>
            <Inject
              services={[
                HtmlEditor,
                Toolbar,
                Image,
                Link,
                QuickToolbar,
                FileManager,
              ]}
            />
          </RichTextEditorComponent>
        </div>
        <div className="">
          {" "}
          <form className="my-auto border-y border-gray-400 w-full py-1">
            <input type="file" multiple></input>
          </form>
        </div>
        {/* <div className=" my-3">
          <input
            className=" mr-2"
            type="checkbox"
            onClick={() => {
              setContainProgram(!containProgram);
            }}
          />{" "}
          프로그램{" "}
          <button
            className="bg-red-800 rounded py-1 px-3 mx-5 text-white"
            onClick={openPopup}
          >
            프로그램목록
          </button>
        </div>
        <div className="py-1">선택할 프로그램 이름이 들어갈 자리</div> */}
        <div className=" my-2 flex justify-end">
          <button
            className="w-28 p-2 text-white bg-red-800 shadow-lg rounded"
            // onClick={() => {
            //   console.log(
            //     "제목, 중요도, 프로그램 유무, 본문: ",
            //     title,
            //     priority,
            //     containProgram,
            //     content
            //   );
            // }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeWrite;

import React, { useState } from "react";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NoticeWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setContent({
                ...content,
                content: data,
              });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
        {/* <div dangerouslySetInnerHTML={ {__html:codes}}></div> */}
        <div className="">
          {" "}
          <Upload.Dragger
            action={"http://localhost:3001/NoticeWrite"}
            multiple
            listType="picture"
            showUploadList={{ showRemoveIcon: true }}
            accept=".png, .jpg, .doc, .hwp, .pdf"
            beforeUpload={(file) => {
              console.log({ file });
              return false;
            }}
          >
            Drag files here OR
            <br />
            <Button>Click Upload</Button>
          </Upload.Dragger>
        </div>

        <div className=" my-2 flex justify-end">
          <button className="w-28 p-2 text-white bg-red-800 shadow-lg rounded">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeWrite;

import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
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
  Input,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import noticeService from "../api/notice.service";

import { useNavigate } from "react-router-dom";
import { useStateNoticeContext } from "../contexts/NoticeProvider";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import pushService from "../api/push.service";
const NoticeEdit = () => {
  const { TextArea } = Input;
  let { isclick, setIsclick } = useStateContext();
  let { noticeTitle, setNoticeTitle } = useStateNoticeContext();
  let { noticeContent, setNoticeContent } = useStateNoticeContext();

  let { noticedata, setNoticedata } = useStateContext();

  let { noticeDetailId, setNoticeDetailId } = useStateNoticeContext();

  const [pushTitle, setPushTitle] = useState("");
  const [pushContent, setPushContent] = useState("");

  //   const [title, setTitle] = useState(s);
  const [content, setContent] = useState("");
  let [files, setFiles] = useState([]);

  //   console.log(noticeDetailId, "NoticeEdit 36");
  //   console.log(isclick?.group_id, "NoticeEdit 37");

  //   console.log(noticeTitle);
  useEffect(() => {
    console.log(files);
  }, [files]);

  const handlePost = async (e) => {
    // e.preventDefault();

    try {
      await noticeService
        .noticeEdit(
          noticeDetailId,
          isclick?.group_id,
          noticeTitle,
          content.content
        )
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

  const handlePushPost = async (e) => {
    try {
      await pushService
        .pushPost(isclick?.group_id, pushTitle, pushContent)
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

  const navigate = useNavigate();

  const editorRef = useRef();

  const onChange = (e) => {
    console.log("Change:", e.target.value);
    setPushContent(e.target.value);
  };

  return (
    <div className="min-h-screen md:px-10 pt-40">
      <div className=" bg-white rounded px-6 py-10 w-full mx-auto mb-10">
        <h1 className="text-2xl font-bold">공지사항 수정</h1>
        <div className=" h-16 flex">
          <div className="flex flex-row my-auto w-full text-center border border-gray-400">
            <div className="flex basis-2/12 bg-gray-200">
              <div className="m-auto border-l">제목</div>
            </div>
            <div className="basis-10/12 border-gray-400 border-l">
              <input
                value={noticeTitle}
                className="w-full outline-none h-10 ml-3"
                onChange={(e) => {
                  setNoticeTitle(e.currentTarget.value);
                  //   setTitle(e.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="text-xl font-bold mb-2">내용</div>
        <div className=" h-good">
          {/* <CKEditor
            editor={ClassicEditor}
            data={noticeContent}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              console.log({ data });
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
          /> */}
          <Editor
            initialValue={noticeContent}
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            hideModeSwitch={true}
            plugins={[colorSyntax]}
            language="ko-KR"
            onChange={() => {
              const data = editorRef.current.getInstance().getHTML();
              console.log(data);
              setContent({
                ...content,
                content: data,
              });
            }}
            ref={editorRef}
          />
        </div>
        {/* <div dangerouslySetInnerHTML={ {__html:codes}}></div> */}
        <div className="">
          {" "}
          {/* <Upload.Dragger
            action={"http://localhost:3000/noticeEdit/"}
            multiple
            listType="picture"
            showUploadList={{ showRemoveIcon: true }}
            accept=".png, .jpg, .doc, .hwp, .pdf"
            beforeUpload={(file) => {
              setFiles([...files, ...file]);
            }}
          >
            Drag files here OR
            <br />
            <Button>Click Upload</Button>
          </Upload.Dragger> */}
        </div>
        <br />
        <h1 className="text-2xl font-bold">알림 작성</h1>
        <div className=" h-16 flex">
          <div className="flex flex-row my-auto w-full text-center border border-gray-400">
            <div className="flex basis-2/12 bg-gray-200">
              <div className="m-auto border-l">제목</div>
            </div>
            <div className="basis-10/12 border-gray-400 border-l">
              <input
                className="w-full outline-none h-10 ml-3"
                onChange={(e) => {
                  setPushTitle(e.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="text-xl font-bold mb-2">내용</div>
        <div className=" h-good">
          <TextArea
            showCount
            maxLength={100}
            style={{
              height: 120,
            }}
            onChange={onChange}
          />
        </div>
        <br />
        <div className=" my-2 flex justify-end">
          <button
            className="w-28 p-2 text-white bg-red-600 shadow-lg rounded-2xl"
            onClick={() => {
              // console.log(
              //   noticeDetailId,
              //   isclick?.group_id,
              //   noticeTitle,
              //   content.content
              // );
              handlePost();
              navigate("/");
              handlePushPost();
            }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeEdit;

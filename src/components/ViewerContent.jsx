import React, { useState, useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useStateNoticeContext } from "../contexts/NoticeProvider";
import authHeader from "../api/auth-header";
import api from "../api/axios";
const ViewerContent = (props) => {
  // let { noticeContent, setNoticeContent } = useStateNoticeContext();
  // let { noticeDetailId, setNoticeDetailId } = useStateNoticeContext();
  // const noticeDetailContent = async () => {
  //   // navigate("/"); // 😨
  //   return api.get(`/api/api/notice/detail-web?notice_id=${noticeDetailId}`, {
  //     headers: authHeader(),
  //   });
  // };

  // useEffect(() => {
  //   const getNoticeDetail = async () => {
  //     await noticeDetailContent()
  //       .then((res) => res.data.response)
  //       .then(
  //         (body) => {
  //           setNoticeContent(body.content);
  //           console.log(body.content);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   };
  //   getNoticeDetail();
  // }, []);
  return (
    <>
      <Viewer initialValue={props.content || ""} />
    </>
  );
};

export default ViewerContent;

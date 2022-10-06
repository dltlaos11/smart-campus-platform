import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import noticeService from "../api/notice.service";

import authHeader from "../api/auth-header";
import { useStateContext } from "../contexts/ContextProvider";

import api from "../api/axios";
import { BsCalendar3 } from "react-icons/bs";

import { useStateNoticeContext } from "../contexts/NoticeProvider";

const NoticeDetail = () => {
  let { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  let { isclick, setIsclick } = useStateContext();

  let { noticeTitle, setNoticeTitle } = useStateNoticeContext();
  let { noticeContent, setNoticeContent } = useStateNoticeContext();
  let { noticeDetailId, setNoticeDetailId } = useStateNoticeContext();

  const navigate = useNavigate();
  const noticeDetail = async () => {
    navigate("/"); // 😨
    return api.get(`api/api/notice/detail-web?notice_id=${id}`, {
      headers: authHeader(),
    });
  };

  const deleteNotice = async (group_id, notice_id) => {
    // navigate("/"); // 🤔

    return api
      .delete(
        "/api/api/notice/delete",
        {
          headers: authHeader(),
          data: {
            group_id: group_id,
            notice_id: notice_id,
          },
        }
        // {
        //   group_id,
        //   notice_id,
        // },
        // {
        //   headers: authHeader(),
        //   Authorization: authHeader(),
        // }
      )
      .then(
        (res) => {
          console.log(res.data);
        },
        (error) => console.log(error.response.data.error)
      );
    // await noticeService.noticeDelete(isclick?.group_id, noticeDetailId).then(
    //   (res) => console.log(res, "@@@@@@@@@@@@@@@"),
    // );
  };

  useEffect(() => {
    const getNoticeDetail = async () => {
      await noticeDetail()
        .then((res) => res.data.response)
        .then(
          (body) => {
            // console.log(body.create_time);
            setDate(body.create_time);
            // console.log(body.title);
            setTitle(body.title);
            setNoticeTitle(body.title);
            setContent(body.content);
            setNoticeContent(body.content);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getNoticeDetail();
    navigate(`/noticeDetail/${id}`); // 😨
    setNoticeDetailId(id);
  }, []);

  return (
    <div>
      {" "}
      <div className="min-h-screen md:m-10 mt-24 p-2 md:p-10pt-20">
        <div className="bg-white rounded px-6 py-10 w-full mx-auto mb-10">
          <div className=" w-full h-[120px] grid place-items-center">
            <div className="my-auto text-4xl pb-96 font-extrabold ">
              {isclick?.group_name} 공지사항
            </div>
            <br />
          </div>
          <hr className="border-gray-400" />
          <hr className="border-gray-400" />
          <hr className="border-gray-400" />
          <div className=" w-full h-20 flex justify-between">
            <div className="my-auto text-3xl pl-4">{title}</div>
            <div className="my-auto text-xl flex justify-end">
              <div className="my-auto mx-1">
                <BsCalendar3 />
              </div>
              <div className="mx-1">{date}</div>
            </div>
          </div>
          <hr className="border-gray-400" />
          {/* {router.query.create_time} */}

          <div className="min-h-wow">
            <div className="p-5">
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
          </div>
          <hr className="border-gray-400" />
          <div className="h-24 flex justify-end w-full">
            <button
              className="bg-red-600 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32 mr-7"
              onClick={() => {
                navigate("/noticeEdit");
              }}
            >
              수정
            </button>
            <button
              className="bg-red-600 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32"
              onClick={() => {
                deleteNotice(isclick?.group_id, noticeDetailId);
                navigate("/");
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;

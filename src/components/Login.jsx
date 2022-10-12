import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import App from "../App";
import LevelCheck from "./LevelCheck";
import { Modal } from "antd";

import AuthService from "../api/auth.service";
import NoticeService from "../api/notice.service";

const Login = () => {
  const [user_id, setId] = useState("");
  const [password, setPw] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useStateContext();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.response.level)

  useEffect(() => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    setIsLoggedIn(true);
  }
  // else if (user === null){
    // window.location.replace("/");
  // }
  
  },[window.localStorage.length])
  const handleLogin = async () => {
    try {
      await AuthService.login(user_id, password).then(
        (res) => {
          // window.location.reload();
          if (res && res.response.jwt_token) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
          console.log(res);
        },
        (err) => {
          console.log(err.response.data.error.message);
          setError(err.response.data.error.message);
          setVisible(true);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* user.response.level===1 && */}
      {isLoggedIn ? (
        <LevelCheck />
      ) : (
        <>
          <div my-3>
            <title>소중대 공지사항</title>
          </div>
          <main>
            <section className="relative w-full h-full py-60 min-h-screen">
              <div className="absolute top-0 w-full h-full bg-slate-50"></div>
              <div className="container mx-auto px-4 h-56">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-1/2 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="font-poppins text-gray-600 body-font font-medium  text-center text-[50px] mb-3">
                          Smart Campus
                          {/* <img
                        className="m-auto"
                        src="../img/v2hoseo-icon.png"
                        alt="Hoseo Notice"
                      /> */}
                        </div>
                        <hr className="mt-6 border-b-1 border-red-800" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg">
                        <form>
                          <div className="relative w-full mb-3">
                            <label
                              className="block text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              교번
                            </label>
                            <input
                              type="text"
                              className="focus:border-red-800 focus:placeholder-red-800 hover:border-red-800 hover:placeholder-red-800 border-2 border-slate-300 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                              placeholder="교번"
                              onChange={(e) => {
                                setId(e.target.value);
                              }}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              비밀번호
                            </label>
                            <input
                              type="password"
                              className="focus:border-red-800 focus:placeholder-red-800 hover:border-red-800 hover:placeholder-red-800 border-2 border-slate-300 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                              placeholder="비밀번호"
                              onChange={(e) => {
                                setPw(e.target.value);
                              }}
                            />
                          </div>
                          <div className="text-center mt-6">
                            <button
                              className="bg-red-800  hover:font-extrabold hover:bg-red-900 hover:text-base text-white active:bg-red-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="button"
                              onClick={handleLogin}
                            >
                              로그인
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-6 relative">
                      <div className="w-1/3 ">
                        <a
                          target="_blank"
                          href="https://portal.hoseo.edu/huis/FindIdPage.do"
                          rel="noreferrer"
                          className="text-slate-700"
                        >
                          <small className=" hover:text-red-700 hover:text-base hover:font-extrabold transition-all duration-150">
                            교번 찾기
                          </small>
                        </a>
                      </div>
                      <div className="w-1/3 text-center">
                        {/* <a
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-700"
                          onClick={() => {
                            setVisible(true);
                          }}
                        >
                          <small className=" hover:text-red-700 hover:text-base hover:font-extrabold transition-all duration-150">
                            신규 관리자 그룹 신청
                          </small>
                        </a> */}
                        <Modal
                          title="로그인 실패"
                          centered
                          visible={visible}
                          onOk={() => setVisible(false)}
                          onCancel={() => setVisible(false)}
                          width={1000}
                        >
                          {error}
                        </Modal>
                      </div>
                      <div className="w-1/3 text-right">
                        <a
                          target="_blank"
                          href="https://portal.hoseo.edu/huis/InitPwdPage.do"
                          rel="noreferrer"
                          className="text-slate-700"
                        >
                          <small className=" hover:text-red-700 hover:text-base hover:font-extrabold transition-all duration-150">
                            비밀번호 초기화
                          </small>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Login;

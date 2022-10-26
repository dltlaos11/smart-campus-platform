import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import { useStateSurveyContext } from "../contexts/SurveyProvider";
import { Button, Input, Space, Table, Modal, Radio, Checkbox } from "antd";

import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";

import { BsCalendar3 } from "react-icons/bs";

import surveyService from "../api/survey.service";

import authHeader from "../api/auth-header";
import api from "../api/axios";

const SurveyDetail = () => {
  let { id } = useParams();
  let { surveyTitle, setSurveyTitle } = useStateSurveyContext();
  let { surveyContent, setSurveyContent } = useStateSurveyContext();

  let { surveydata, setSurveydata } = useStateContext();
  let { surveyDetailId, setSurveyDetailId } = useStateSurveyContext();
  let { isclick, setIsclick } = useStateContext();

  let [persondata, setPersonData] = useState([]);

  let [answer_id, setAnswer_id] = useState("");

  let [personAnswer, setPersonAnswer] = useState([]);

  let [checkAnswer, setCheckAnswer] = useState("");

  const [user_id, setUser_id] = useState("");
  const navigate = useNavigate();
  // console.log(id);

  const getDetailSurvey = () => {
    // navigate("/");
    console.log(isclick?.group_id);
    return api.get(`/api/api/survey/detail?survey_id=${id}`, {
      headers: authHeader(),
    });
  };

  // const surveyPeople = async () => {
  //   try {
  //     await surveyService.surveySubmitter(id).then(
  //       (res) => console.log(res.data.response),
  //       (err) => console.log(err)
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  let result = surveydata.find(({ survey_id }) => survey_id === Number(id));
  // console.log(surveydata, id);
  console.log(result);

  useEffect(() => {
    const getSurveyDetail = async () => {
      await getDetailSurvey().then(
        (res) => console.log(res.data.response),
        (err) => console.log(err)
      );
    };

    const surveyPeople = async () => {
      try {
        await surveyService
          .surveySubmitter(id)
          .then((res) => res.data.response)
          .then(
            (body) => {
              if (body.length === 0) {
                setPersonData([]);
              }
              body.forEach((e) => {
                if (!e["key"]) {
                  e["key"] = e.answer_id;
                  setPersonData([...body]);
                }
              });
              console.log(body);
            },
            (err) => console.log(err)
          );
      } catch (err) {
        console.log(err);
      }
    };

    getSurveyDetail();
    // navigate(`survey/surveyDetail/${id}`); // 😨
    // <Link to={`/surveyDetail/${id}`}></Link>;
    setSurveyDetailId(id);
    surveyPeople();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Index",
      dataIndex: "answer_id",
      key: "answer_id",
      width: "15%",
    },
    {
      title: "교번",
      dataIndex: "user_id",
      key: "user_id",
      width: "30%",
      ...getColumnSearchProps("user_id"),
    },
    {
      title: "작성 날짜",
      dataIndex: "create_time",
      key: "create_time",
      sorter: (a, b) => a.create_time.length - b.create_time.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  let workDayColumns = [
    {
      title: "",
      dataIndex: "type",
      key: "type",
    },

    {
      title: personAnswer[0]?.question,
      dataIndex: "tuesday",
      key: "tuesday",
      width: "75%",
      render: (text, record) => (
        <Input
          style={{ width: 100, marginLeft: 10 }}
          value={personAnswer[0]?.answer}
          disabled
        />
      ),
    },
  ];

  let workDayData = [
    {
      key: "1",
      type: "답변",
      day: "Mon-Fri",
    },
  ];

  let workDayColumns1 = [
    {
      title: "",
      dataIndex: "type",
      key: "type",
    },

    {
      title: personAnswer[1]?.question,
      dataIndex: "tuesday",
      key: "tuesday",
      width: "75%",
      render: (text, record) => (
        <Input
          style={{ width: 300, marginLeft: 10 }}
          value={personAnswer[1]?.answer}
          disabled
        />
      ),
    },
  ];

  let workDayData1 = [
    {
      key: "1",
      type: "답변",
      day: "Mon-Fri",
    },
  ];

  let [state, setState] = useState({
    tuesdayRadioValue: "고양이",
    //personAnswer[2]?.answer
  });

  const onRadioChange = ({ checked, type, weekday }) => {
    setState({ [`${weekday}RadioValue`]: type });
  };

  let workDayColumns2 = [
    {
      title: "",
      dataIndex: "type",
      key: "type",
    },

    {
      title: personAnswer[2]?.question,
      dataIndex: "tuesday",
      key: "tuesday",
      width: "75%",
      render: (text, record) => (
        <Radio
          disabled={true}
          checked={state.tuesdayRadioValue === record.type}
          onChange={(e) => {
            onRadioChange({
              checked: e.target.checked,
              type: record.type,
              weekday: "tuesday",
            });
            console.log(personAnswer[2]?.answer, "확인바람");
            // console.log(record.type, `${personAnswer[2]?.answer}`, state);
          }}
        />
      ),
    },
  ];

  let workDayData2 = [
    {
      key: "1",
      type: personAnswer[2]?.choice_content[0],
      day: "Mon-Fri",
    },
    {
      key: "2",
      type: personAnswer[2]?.choice_content[1],
      day: "Mon-Fri",
    },
    {
      key: "3",
      type: personAnswer[2]?.choice_content[2],
      day: "Mon-Fri",
    },
  ];

  return (
    <div>
      {" "}
      <div className="min-h-screen md:m-10 mt-24 p-2 md:p-10 pt-20">
        <div className="bg-white rounded-3xl px-6 py-10 w-full mx-auto mb-10">
          <div className=" w-full h-[120px] grid place-items-center">
            <div className="my-auto text-4xl pb-96 font-extrabold ">
              {isclick?.group_name} 설문
            </div>
            <br />
          </div>
          <hr className="border-gray-400" />
          <hr className="border-gray-400" />
          <hr className="border-gray-400" />
          <div className=" w-full h-20 flex justify-between">
            <div className="my-auto text-3xl pl-4">{result.title}</div>
            <div className="my-auto text-xl flex justify-end">
              <div className="my-auto mx-1">
                <BsCalendar3 />
              </div>
              <div className="mx-1">
                {result.create_time}~{result.end_time}
              </div>
            </div>
          </div>
          <hr className="border-gray-400" />
          <div className="min-h-wow">
            <Table
              columns={columns}
              dataSource={persondata}
              pagination={false}
              scroll={{ y: 300 }}
              onRow={(record, recordIndex) => ({
                // onClick: event => { console.log(event.target, event.target.className, record, recordIndex) }
                onClick: (event) => {
                  // navigate(`/survey/surveyDetail/${record.key}`);
                  // console.log(record.user_id);
                  setUser_id(record.user_id);
                  setAnswer_id(record.key);

                  // console.log(id, record.key, "확인바람");
                  // console.log(id, "@@@@@@@@@@@@@@@@@@");
                  const getSubmitterAnswer = async () => {
                    const submitterAnswer = () => {
                      return api.get(
                        `/api/api/survey/result?survey_id=${id}&answer_id=${record.key}`,
                        {
                          headers: authHeader(),
                        }
                      );
                    };
                    await submitterAnswer().then(
                      (res) => {
                        console.log(res.data.response);
                        console.log(res.data.response[2].answer);
                        setCheckAnswer(res.data.response[2]?.answer);
                        setPersonAnswer(res.data.response);
                      },
                      (err) => console.log(err)
                    );
                  };

                  getSubmitterAnswer();
                },
              })}
            />
          </div>
          {/* <ViewerContent />
          {content ? <ViewerContent content={content} /> : "Loading"} */}
          <hr className="border-gray-400" />

          {user_id === "" ? null : (
            <div className="grid grid-cols-1  gap-4 p-15 bg-white rounded-3xl md:m-10">
              <div className="m-2 md:m-10 mt-19 p-10 md:p-12 bg-gray-200 rounded-3xl ">
                <Header title={user_id} />
                <Table
                  columns={workDayColumns}
                  dataSource={workDayData}
                  size="large"
                  pagination={false}
                />
                <Table
                  columns={workDayColumns1}
                  dataSource={workDayData1}
                  size="large"
                  pagination={false}
                />
                <Table
                  columns={workDayColumns2}
                  dataSource={workDayData2}
                  size="large"
                  pagination={false}
                />
              </div>
            </div>
          )}

          <div className="h-24 flex justify-end w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetail;

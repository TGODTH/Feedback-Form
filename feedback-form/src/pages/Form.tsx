import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import Context from "../Context";

const Form = () => {
  const { Questions, password } = useContext(Context);
  const [feedback, setFeedback] = useState<
    {
      QG: number;
      QId: number;
      L1: number;
      L2: number;
      L3: number;
      L4: number;
      L5: number;
    }[]
  >([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    qg: number,
    qId: number
  ) => {
    const { value } = event.target;
    setFeedback((prevFeedback) => {
      const newFeedback = prevFeedback.filter(
        (fb) => fb.QG !== qg || fb.QId !== qId
      );
      const valueInt: number = parseInt(value);
      newFeedback.push({
        QG: qg,
        QId: qId,
        L1: valueInt === 1 ? 1 : 0,
        L2: valueInt === 2 ? 1 : 0,
        L3: valueInt === 3 ? 1 : 0,
        L4: valueInt === 4 ? 1 : 0,
        L5: valueInt === 5 ? 1 : 0,
      });

      return newFeedback;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError("กำลังส่งแบบประเมิน");
      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/feedback?password=${password}&secretKey=${secretKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedback),
        }
      );

      if (response.ok) {
        setError("");
        navigate("/succeed");
      } else if (response.status === 401) {
        const errorText = await response.text();
        if (errorText === "Invalid secret key") {
          setError("Unauthorized: Invalid secret key");
        } else if (errorText === "Invalid password") {
          setError("Unauthorized: Invalid password");
        } else {
          setError(`Unauthorized: ${errorText}`);
        }
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      setError(
        !(err as Error)
          ? "Something error please refresh page and try again"
          : `${(err as Error).name} : ${(err as Error).message}`
      );
    }
  };

  useEffect(() => {
    if (password === undefined) {
      navigate("/");
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="box-content w-[90%] max-w-[1000px] m-auto mt-8 mb-8 p-4 border-4 grid grid-cols-1 gap-4"
    >
      <h2 className="text-center text-3xl mt-8 font-extrabold">
        แบบประเมินจิตวิญญาณเซนต์หลุยส์
        <br />
        ความเสียสละ (Sacrifice)
      </h2>

      <p className="text-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">{`แผนก ${Questions?.department} ${Questions?.departmentName}`}</p>
      <h3 className="text-left text-2xl mb-3 mt-8 font-semibold ">
        ความหมายของระดับคะแนน
      </h3>
      <p className="text-[18px] sm:text-[22px]">
        <input
          className="w-5 h-5 sm:w-6 sm:h-6 mr-1 text-pink-600 bg-gray-100 border-pink-600 focus:ring-transparent relative guide-input1"
          type="radio" disabled
        />
        ระดับ 0 หมายถึง ไม่เคยมีการปฏิบัติหรือแสดงพฤติกรรมดังกล่าวให้เห็น
      </p>
      <p className="text-[18px] sm:text-[22px]">
        <input
          className="w-4 h-4 sm:w-4 sm:h-4 sm:ml-1 mr-2 text-pink-600 bg-gray-100 border-pink-600 focus:ring-transparent relative guide-input2"
          type="radio" disabled
        />
        ระดับ 1 หมายถึง มีการปฏิบัติหรือแสดงพฤติกรรมดังกล่าวให้เห็นบ้างนานๆครั้ง
      </p>
      <p className="text-[18px] sm:text-[22px]">
        <input
          className="w-4 h-4 sm:w-4 sm:h-4 sm:ml-1 mr-2 text-neutral-400 bg-gray-100 border-neutral-400 focus:ring-transparent relative guide-input3"
          type="radio" disabled
        />
        ระดับ 2 หมายถึง มีการปฏิบัติหรือแสดงพฤติกรรมดังกล่าวให้เห็นบางครั้ง
      </p>
      <p className="text-[18px] sm:text-[22px]">
        <input
          className="w-4 h-4 sm:w-4 sm:h-4 sm:ml-1 mr-2 text-green-400 bg-gray-100 border-green-400 focus:ring-transparent relative guide-input4"
          type="radio" disabled
        />
        ระดับ 3 หมายถึง มีการปฏิบัติหรือแสดงพฤติกรรมดังกล่าวให้เห็นบ่อย
      </p>
      <p className="text-[18px] sm:text-[22px]">
        <input
          className="w-5 h-5 sm:w-6 sm:h-6 mr-1 text-green-400 bg-gray-100 border-green-400 focus:ring-transparent relative guide-input5"
          type="radio" disabled
        />
        ระดับ 4 หมายถึง มีการปฏิบัติหรือแสดงพฤติกรรมดังกล่าวให้เห็นทุกครั้ง
        สม่ำเสมอ
      </p>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {Questions
        ? Questions.questions.map((question, index) => (
            <div key={index}>
              <h3 className="text-center text-2xl mb-4 mt font-semibold ">
                {`${index + 1}. ${question.questionGroupName}`}
              </h3>
              {question.allQuestions.map((q, i) => (
                <Question
                  key={i}
                  question={q}
                  qg={question.questionGroup}
                  qId={i + 1}
                  handleChange={handleChange}
                />
              ))}
              {index !== Object.keys(Questions.questions).length - 1 ? (
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              ) : null}
            </div>
          ))
        : null}
      <button
        className="mt-8 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="submit"
      >
        Submit
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Form;

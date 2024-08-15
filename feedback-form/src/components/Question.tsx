interface Props {
  question: string;
  qg: number;
  qId: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    qg: number,
    qId: number
  ) => void;
}

const Question: React.FC<Props> = ({ question, qg, qId, handleChange }) => {
  return (
    <div className="">
      <p className="text-center text-[18px] sm:text-[22px] mb-6 mt-4 ">{`${qg}.${qId} ${question}`}</p>
      <div className="flex justify-around w-4/5 items-center m-auto">
        <input
          className="w-12 h-12 sm:w-16 sm:h-16 text-pink-600 bg-gray-100 border-pink-600 focus:ring-transparent relative input1"
          type="radio"
          id={`${question}1`}
          name={question}
          value="1"
          onChange={(event) => handleChange(event, qg, qId)}
          required
        />
        {/* <label htmlFor={`${question}1`}>1</label> */}
        <input
          className="w-8 h-8 sm:w-12 sm:h-12 text-pink-600 bg-gray-100 border-pink-600 focus:ring-transparent relative input2"
          type="radio"
          id={`${question}2`}
          name={question}
          value="2"
          onChange={(event) => handleChange(event, qg, qId)}
        />
        {/* <label htmlFor={`${question}2`}>2</label> */}
        <input
          className="w-8 h-8 sm:w-12 sm:h-12 text-neutral-400 bg-gray-100 border-neutral-400 focus:ring-transparent relative input3"
          type="radio"
          id={`${question}3`}
          name={question}
          value="3"
          onChange={(event) => handleChange(event, qg, qId)}
        />
        {/* <label htmlFor={`${question}3`}>3</label> */}
        <input
          className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 bg-gray-100 border-green-400 focus:ring-transparent relative input4"
          type="radio"
          id={`${question}4`}
          name={question}
          value="4"
          onChange={(event) => handleChange(event, qg, qId)}
        />
        {/* <label htmlFor={`${question}4`}>4</label> */}
        <input
          className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 bg-gray-100 border-green-400 focus:ring-transparent relative input5"
          type="radio"
          id={`${question}5`}
          name={question}
          value="5"
          onChange={(event) => handleChange(event, qg, qId)}
        />
        {/* <label htmlFor={`${question}5`}>5</label> */}
      </div>
    </div>
  );
};

export default Question;

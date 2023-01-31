import { useContext, useEffect } from "react";
import Context from "../Context";
import { useNavigate } from "react-router-dom";

function Succeed() {
  const {password, setData, setPassword } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    setData(undefined);
    setPassword(undefined);
    navigate("/");
  };
  useEffect(() => {
    if (password === undefined) {
      navigate("/");
    }
  }, [password]);
  return (
    <div className="mt-[20vh] max-mt-24 h-full flex justify-center">
      <form
        onSubmit={(event) => logout}
        className="block w-96 max-w-[80%] p-6 bg-white border border-gray-200 rounded-lg shadow "
      >
        <h2 className="text-center text-3xl mb-8 font-extrabold dark:text-white">
          ส่งแบบประเมินสำเร็จ
        </h2>
        <button
          type="submit"
          className=" w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Log out
        </button>
      </form>
    </div>
  );
}

export default Succeed;

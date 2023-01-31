import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
function Login() {
  const { password, setData, setPassword } = useContext(Context);
  const [error, setError] = useState<string[] | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    password: string | undefined
  ) => {
    event.preventDefault();
    setError(["กำลังเข้าสู่ระบบ", ""]);
    try {
      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/login?password=${password}&secretKey=${secretKey}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/form");
        setData(data);
        setPassword(password);
      } else if (response.status === 401) {
        const errorText = await response.text();
        if (errorText === "Invalid secret key") {
          setError(["Unauthorized", "Invalid secret key"]);
        } else if (errorText === "Invalid password") {
          setError(["Unauthorized", "`รหัสผ่านไม่ถูกต้อง"]);
        } else {
          setError(["Unauthorized", `${errorText}`]);
        }
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      setError(
        !(err as Error)
          ? ["Something error", "please refresh page and try again"]
          : [`${(err as Error).name}`, `${(err as Error).message}`]
      );
    }
  };
  return (
    <div>
      <h2 className="text-center text-2xl mt-8 font-extrabold">
        แบบประเมินจิตวิญญาณเซนต์หลุยส์
        <br />
        ความเสียสละ (Sacrifice)
      </h2>
      <div className="mt-[5vh] max-mt-24 h-full flex justify-center">
          <form onSubmit={(event) => handleSubmit(event, password)} className="block w-96 max-w-[80%] p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <h2 className="text-center text-3xl mb-8 font-extrabold dark:text-white">Log in</h2>
            <label
              htmlFor="password"
              className="ml-0.5 block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1"
              placeholder="•••••••••"
              required
            ></input>
            {error && (
              <div
                className="p-2 pl-0.5 text-sm text-red-800 rounded-l"
                role="alert"
              >
                <span className="font-medium">{error[0]}</span> {error[1]}
              </div>
            )}
            <button
              type="submit"
              className="mt-3 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Login
            </button>
          </form>
      </div>
    </div>
  );
}

export default Login;

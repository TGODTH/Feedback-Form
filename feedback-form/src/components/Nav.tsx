import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/SLSHLogo.png";
import Context from "../Context";

const Nav = () => {
  const { setData, setPassword } = useContext(Context);
  const location = useLocation();
  const logout = () => {
    setData(undefined);
    setPassword(undefined);
  };
  return (
    <nav className="bg-white border-b border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <img className=" mr-3 h-12" src={logo} alt="Logo" />
        {location.pathname != "/" && location.pathname != "/succeed" ? (
          <Link to="/">
            <p
              className="block py-2 pl-3 pr-4 text-white bg-red-700 rounded"
              onClick={logout}
            >
              Log Out
            </p>
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;

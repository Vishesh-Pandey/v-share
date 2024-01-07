import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="border-b-2">
        <ul className="md:flex">
          <li className="md:py-1 my-1 font-bold hover:-translate-y-3 duration-500">
            <Link
              className="p-4 font-bold hover:-translate-y-3 duration-500 block"
              to="/"
            >
              v-share
            </Link>
          </li>
          <li className="md:py-1 my-1">
            <Link
              className={`p-4 mx-1 rounded-md duration-500 block ${
                location.pathname === "/"
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white bg-gray-300"
              } `}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="md:py-1 my-1 relative">
            <Link
              className={`p-4 mx-1 rounded-md duration-500 block ${
                location.pathname === "/liveroom"
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white bg-gray-300"
              } `}
              to="/liveroom"
            >
              Live Room
            </Link>
          </li>
          <li className="md:py-1 my-1">
            <Link
              className={`p-4 mx-1 rounded-md duration-500 block ${
                location.pathname === "/about"
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white bg-gray-300"
              } `}
              to="about"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

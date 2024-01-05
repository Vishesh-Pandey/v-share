import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul className="flex">
        <li className="py-4 my-1 font-bold hover:-translate-y-3 duration-500">
          <Link
            className="p-4 font-bold hover:-translate-y-3 duration-500"
            to="/"
          >
            v-share
          </Link>
        </li>
        <li className="py-4 my-1">
          <Link
            className="bg-gray-300 p-4 mx-1 rounded-md hover:bg-black hover:text-white duration-500 "
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="py-4 my-1 relative">
          <Link
            className="bg-gray-300 p-4 mx-1 rounded-md hover:bg-black hover:text-white duration-500 "
            to="/liveroom"
          >
            Live Room
          </Link>
          <span className="absolute top-0 right-0 bg-yellow-300 rounded-lg px-1">
            Beta
          </span>
        </li>
        <li className="py-4 my-1 mx-1">
          <Link
            className="bg-gray-300 p-4 rounded-md hover:bg-black hover:text-white duration-500 "
            to="about"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

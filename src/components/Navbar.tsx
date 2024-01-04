import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul className="flex">
        <li className="py-4 m-4 font-bold hover:-translate-y-3 duration-500">
          <Link
            className="p-4 m-4 font-bold hover:-translate-y-3 duration-500"
            to="/"
          >
            v-share
          </Link>
        </li>
        <li className="py-4 m-4">
          <Link
            className="bg-gray-300 p-4 m-4 rounded-md hover:bg-black hover:text-white duration-500 "
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="py-4 m-4">
          <Link
            className="bg-gray-300 p-4 m-4 rounded-md hover:bg-black hover:text-white duration-500 "
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

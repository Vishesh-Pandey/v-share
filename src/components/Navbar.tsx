import { Link } from "react-router-dom";
import History from "./History";
import CustomLink from "./CustomLink";

function Navbar() {
  return (
    <nav className="md:h-screen md:overflow-auto md:w-72 bg-yellow-200">
      <ul className="flex sticky top-0 w-full bg-yellow-200 md:block">
        <li className="md:py-1 my-1 font-bold hover:-translate-y-3 duration-500">
          <Link
            className="p-4 font-bold hover:-translate-y-3 duration-500 block"
            to="/"
          >
            v-share
          </Link>
        </li>
        <li className="md:py-1 my-1">
          <CustomLink path="/" text="Home" />
        </li>
        <li className="md:py-1 my-1 relative">
          <CustomLink text="Live Room" path="/liveroom" />
        </li>
        <li className="md:py-1 my-1">
          <CustomLink text="About" path="/about" />
        </li>
      </ul>

      <History />
    </nav>
  );
}

export default Navbar;

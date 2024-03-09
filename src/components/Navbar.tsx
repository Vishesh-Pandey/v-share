import { Link } from "react-router-dom";
import History from "./History";
import CustomLink from "./CustomLink";
import { useRecoilState } from "recoil";
import { themeAtom } from "../atoms";

function Navbar() {
  const [theme, setTheme] = useRecoilState(themeAtom);

  return (
    <nav className="md:h-screen md:overflow-auto md:w-80 bg-skin-fill">
      <ul className="flex sticky top-0 w-full bg-black-200 md:block">
        <li className="md:py-1 my-1 font-bold duration-500 flex align-middle">
          <Link
            className="p-4 font-bold hover:-translate-y-5 duration-500 block text-skin-inverted"
            to="/"
          >
            v-share
          </Link>
          {theme === "dark" ? (
            <i
              onClick={() => setTheme("light")}
              className="transition bi bi-sun-fill p-3 hover:scale-125 text-skin-base"
            ></i>
          ) : (
            <i
              onClick={() => setTheme("dark")}
              className="transition bi bi-moon-stars-fill p-3 hover:scale-125"
            ></i>
          )}
        </li>
        <li className="md:py-1 my-1">
          <CustomLink path="/" text="Home" />
        </li>
        <li className="md:py-1 my-1">
          <CustomLink path="/shareFile" text="Share Files" />
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

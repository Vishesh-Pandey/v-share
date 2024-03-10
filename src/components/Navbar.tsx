import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";
import { useRecoilState } from "recoil";
import { themeAtom, toggleSidebarAtom } from "../atoms";
import Button from "./Button";

function Navbar() {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [toggleSidebar, setToggleSidebar] = useRecoilState(toggleSidebarAtom);

  return (
    <nav className="md:overflow-auto overflow-x-hidden md:w-80 bg-skin-fill">
      <ul className="flex justify-between sticky top-0">
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
        <li className="md:hidden">
          <Button
            text="Menu"
            onClick={() => {
              setToggleSidebar((toggleSidebar: boolean) => !toggleSidebar);
            }}
          />
        </li>
      </ul>

      <ul
        className={`absolute md:relative bg-yellow-200' ${
          toggleSidebar ? "translate-x-full md:translate-x-0" : ""
        }  w-full md:block duration-300 bg-skin-fill h-full md:h-auto z-50`}
        onClick={() =>
          setToggleSidebar((toggleSidebar: boolean) => !toggleSidebar)
        }
      >
        <li className="md:py-1 my-1">
          <CustomLink path="/" text="Home" />
        </li>
        <li className="md:py-1 my-1">
          <CustomLink path="/shareFile" text="Share Files" />
        </li>
        <li className="md:py-1 my-1 relative">
          <CustomLink text="Live Room" path="/liveroom" />
        </li>
        <li className="md:py-1 my-1 relative">
          <CustomLink text="History" path="/history" />
        </li>
        <li className="md:py-1 my-1">
          <CustomLink text="About" path="/about" />
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default Navbar;

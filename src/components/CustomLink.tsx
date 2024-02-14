import { Link, useLocation } from "react-router-dom";

interface propType {
  path: string;
  text: string;
}

function CustomLink(prop: propType) {
  const location = useLocation();

  return (
    <Link
      to={prop.path}
      className={`p-4 mx-1 rounded-md duration-500 block ${
        location.pathname === prop.path
          ? "bg-black text-white"
          : "hover:bg-black hover:text-white bg-gray-300"
      } `}
    >
      {prop.text}
    </Link>
  );
}

export default CustomLink;

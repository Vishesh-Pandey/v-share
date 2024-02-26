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
          ? "bg-skin-button-accent-hover text-skin-inverted"
          : "bg-skin-button-accent text-skin-inverted hover:bg-skin-button-accent-hovere"
      } `}
    >
      {prop.text}
    </Link>
  );
}

export default CustomLink;

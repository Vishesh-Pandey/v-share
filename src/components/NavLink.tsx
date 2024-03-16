import { Link, useLocation } from "react-router-dom";

interface propType {
  path: string;
  text: string;
}

function NavLink(prop: propType) {
  const location = useLocation();

  return (
    <Link
      to={prop.path}
      className={`p-4 mx-1 rounded-md duration-500 block ${
        location.pathname === prop.path
          ? "bg-primary text-primary-foreground"
          : "text-secondary-foreground hover:bg-primary"
      } `}
    >
      {prop.text}
    </Link>
  );
}

export default NavLink;

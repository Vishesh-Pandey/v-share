function Navbar() {
  return (
    <div>
      <ul className="flex">
        <li className="p-4 m-4 font-bold hover:-translate-y-3 duration-500">
          <a href="">v-share</a>
        </li>
        <li className="bg-gray-300 p-4 m-4 rounded-md hover:bg-black hover:text-white duration-500 ">
          <a href="">Home</a>
        </li>
        <li className="bg-gray-300 p-4 m-4 rounded-md hover:bg-black hover:text-white duration-500 ">
          <a href="">About</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

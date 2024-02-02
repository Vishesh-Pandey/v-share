interface propType {
  onClick: () => void;
  text: string;
}

function Button(prop: propType) {
  return (
    <button
      onClick={prop.onClick}
      className="bg-green-300 p-4 rounded-md hover:bg-green-400 duration-500 mx-2"
    >
      {prop.text}
    </button>
  );
}

export default Button;

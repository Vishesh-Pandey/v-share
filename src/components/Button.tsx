interface propType {
  onClick: () => void;
  text: string;
}

function Button(prop: propType) {
  return (
    <button
      onClick={prop.onClick}
      className="bg-skin-button-accent hover:bg-skin-button-accent-hover text-skin-inverted p-4 rounded-md duration-500 mx-2"
    >
      {prop.text}
    </button>
  );
}

export default Button;

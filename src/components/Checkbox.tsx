function Checkbox(props: {
  text: string;
  value: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      className="bg-skin-button-accent text-skin-inverted rounded-md hover:bg-skin-button-accent-hover duration-500 p-2 m-2 cursor-pointer"
    >
      <input type="checkbox" checked={props.value} className="mx-2" />
      {props.text}
    </button>
  );
}

export default Checkbox;

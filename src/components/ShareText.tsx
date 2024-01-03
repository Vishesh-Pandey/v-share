function ShareText() {
  return (
    <div className="text-center">
      <div className="textarea">
        <textarea
          className="w-11/12 border-black border-2 p-2 rounded-md"
          name=""
          id=""
          cols={30}
          rows={10}
        ></textarea>
      </div>
      <div className="buttons">
        <button className="bg-gray-300 p-4 m-4 rounded-md hover:bg-black duration-500 hover:text-white">
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default ShareText;

import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ShareText() {
  const [text, setText] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [publishing, setPublishing] = useState<boolean>(false);

  const navigate = useNavigate();

  const generateUrl = async () => {
    if (text.length === 0) {
      setAlert("Empty text can't be published");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    setPublishing(true);
    const generatedId =
      new Date().getTime().toString() + Math.random().toString();
    await setDoc(doc(db, "sharedText", generatedId), {
      text: text,
      id: generatedId,
    });
    setUrl(
      "https://vishesh-pandey.github.io/v-share/#/published/" + generatedId
    );
    setText("");
    setAlert("");
    navigate("/published/" + generatedId);
  };

  return (
    <>
      <div className="bg-gray-200 w-11/12 m-auto my-2 rounded-md p-2">
        <div className="buttons py-1 flex justify-between ">
          <span className="text-red-600 font-bold animate-pulse">{alert}</span>
          <button
            onClick={generateUrl}
            className="bg-gray-300 p-4 rounded-md hover:bg-black duration-500 hover:text-white lg:w-1/12 md:w-2/12"
          >
            {publishing ? (
              <button className="animate-spin ">
                <i className="bi bi-arrow-repeat"></i>
              </button>
            ) : (
              <span>Publish</span>
            )}
          </button>
        </div>
        <div className="textarea text-center">
          <textarea
            className="w-full border-black border-0 p-2 rounded-md outline-none resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            name=""
            id=""
            cols={30}
            rows={20}
            placeholder="start typing here... or paste your text using ctrl + v"
          ></textarea>
        </div>
        <div className="warning"></div>
        <div className="url">
          <a
            href={url}
            target="_blank"
            className="text-green-400 font-bold hover:text-green-600 duration-500"
          >
            {url}
          </a>
        </div>
      </div>
    </>
  );
}

export default ShareText;
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

function ShareText() {
  const [url, setUrl] = useState("");
  const generateUrl = async () => {
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
  };

  const [text, setText] = useState<string>("");
  return (
    <div className="text-center">
      <div className="textarea">
        <textarea
          className="w-11/12 border-black border-2 p-2 rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="start typing here... or paste your text using ctrl + v"
        ></textarea>
      </div>
      <div className="buttons">
        <button
          onClick={generateUrl}
          className="bg-gray-300 p-4 m-4 rounded-md hover:bg-black duration-500 hover:text-white"
          disabled={text.length === 0}
        >
          Publish
        </button>
      </div>
      <div className="warning">
        <span className="text-red-400" hidden={text.length !== 0}>
          text can not be empty
        </span>
      </div>
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
  );
}

export default ShareText;

import { doc, getDoc } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function PublishedText() {
  const { id } = useParams();
  const [text, setText] = useState<string>("Loading...");
  const [textCopied, setTextCopied] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [canCopy, setCanCopy] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    const loadSharedText = async () => {
      const docRef = doc(db, "sharedText", id ? id : "notfound");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setText(docSnap.data().text);
        setCanCopy(docSnap.data().canCopy);
      } else {
        // docSnap.data() will be undefined in this case
        setText(
          "v-share WARNING: This is invalid page or it doesn't exist anymore."
        );
      }
    };

    loadSharedText();
  }, [id]);

  const copyText = () => {
    if (canCopy == false) {
      alert("Publisher didn't allowed to Copy given text.");
      return false;
    }
    navigator.clipboard.writeText(text);
    setTextCopied(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      "https://share.visheshpandey.com/#" + location.pathname
    );
    setLinkCopied(true);
  };

  return (
    <>
      <div className="w-11/12 m-auto bg-gray-200">
        <div className="controls p-5">
          <button
            onClick={copyText}
            className="bg-gray-300 p-3 rounded-md hover:bg-yellow-100"
          >
            {textCopied ? "Text Copied" : "Copy Text"}
          </button>
          <button
            onClick={copyLink}
            className="bg-gray-300 p-3 rounded-md mx-3 hover:bg-yellow-100"
          >
            {linkCopied ? "Link Copied" : "Copy Link"}
          </button>
        </div>

        <pre
          onCopy={copyText}
          onCut={copyText}
          className="w-full p-5 bg-yellow-100 overflow-auto h-auto whitespace-break-spaces "
          style={!canCopy ? { userSelect: "none" } : {}}
        >
          {text}
        </pre>
      </div>
    </>
  );
}

export default PublishedText;

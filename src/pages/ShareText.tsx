import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";

import { useRecoilState } from "recoil";
import { mainContentAtom, publishHistoryAtom } from "../atoms";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { SharedTextType } from "../types";

function ShareText() {
  const [publishing, setPublishing] = useState<boolean>(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const [mainContent, setMainContent] = useRecoilState(mainContentAtom);
  const [publishHistory, setPublishHistory] =
    useRecoilState(publishHistoryAtom);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const generateUrl = async () => {
    try {
      if (mainContentRef.current?.innerHTML.length === 0) {
        toast("Empty text can't be published");
        return;
      }
      setMainContent({
        ...mainContent,
        text: mainContentRef.current?.innerText || "",
      });
      setPublishing(true);

      const generatedId = v4();

      const textToPublish: SharedTextType = {
        id: generatedId,
        content: document.getElementById("main-content")?.innerHTML || (
          <span>something went wrong while publishing text</span>
        ),
        text: document.getElementById("main-content")?.innerText,
        createdOn: new Date().toISOString(),
        user:
          authContext.currentUser === null
            ? "anonymous"
            : authContext.currentUser.uid,
        canCopy: mainContent.canCopy,
        viewOnce: mainContent.viewOnce,
        views: 1,
      };
      // saving information to firebase
      await setDoc(doc(db, "sharedText", generatedId), textToPublish);

      // save history to localStorage
      setPublishHistory([
        {
          id: generatedId,
          title:
            mainContentRef.current?.innerText.substring(0, 20) || "Untitled",
        },
        ...publishHistory,
      ]);

      navigate("/published/" + generatedId);
    } catch (error) {
      setPublishing(false);
      toast("Something went wrong");
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    mainContentRef.current?.focus();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="buttons flex justify-between ">
          <div className="settings flex">
            <Checkbox
              text="Allow viewers to copy text?"
              value={mainContent.canCopy}
              onClick={() =>
                setMainContent({
                  ...mainContent,
                  canCopy: !mainContent.canCopy,
                })
              }
            />
            <Checkbox
              text="View Once?"
              value={mainContent.viewOnce}
              onClick={() =>
                setMainContent({
                  ...mainContent,
                  viewOnce: !mainContent.viewOnce,
                })
              }
            />
          </div>

          <Button
            onClick={generateUrl}
            text={publishing ? `Publishing...` : "Publish"}
          />
        </div>

        <div className="Editor relative">
          <div
            ref={mainContentRef}
            className="w-full p-2 rounded-md outline-none resize-none min-h-96 whitespace-pre-wrap overflow-x-auto text-skin-base"
            contentEditable
            id="main-content"
            onInput={() => {
              setMainContent({
                ...mainContent,
                text: mainContentRef.current?.innerHTML,
              });
            }}
          ></div>
          <div
            className={`absolute top-0 left-0 text-gray-400 p-2 ${
              mainContent.text == "" ? "" : "hidden"
            }`}
          >
            Start typing anything here and share easily by clicking on
            publishing. You can paste images/screenshots too.
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default ShareText;

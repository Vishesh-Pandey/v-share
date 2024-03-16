import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRecoilState } from "recoil";
import { mainContentAtom, publishHistoryAtom } from "../atoms";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

function ShareText() {
  const [publishing, setPublishing] = useState<boolean>(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const [mainContent, setMainContent] = useRecoilState(mainContentAtom);
  const [publishHistory, setPublishHistory] =
    useRecoilState(publishHistoryAtom);
  const navigate = useNavigate();

  const generateUrl = async () => {
    if (mainContentRef.current?.innerHTML.length === 0) {
      toast("Empty text can't be published");
      return;
    }
    setMainContent({
      ...mainContent,
      text: mainContentRef.current?.innerText || "",
    });
    setPublishing(true);
    const generatedId =
      new Date().getTime().toString() + Math.random().toString();
    await setDoc(doc(db, "sharedText", generatedId), {
      content:
        document.getElementById("main-content")?.innerHTML ||
        "something went wrong while publishing text",
      text: document.getElementById("main-content")?.innerText,
      canCopy: mainContent.canCopy,
      createdOn: new Date().toISOString(),
      id: generatedId,
      views: 1,
      viewOnce: mainContent.viewOnce,
    });
    setPublishHistory([
      {
        id: generatedId,
        title: mainContentRef.current?.innerText.substring(0, 20) || "Untitled",
      },
      ...publishHistory,
    ]);

    navigate("/published/" + generatedId);
  };

  useEffect(() => {
    mainContentRef.current?.focus();
  }, []);

  return (
    <>
      <div className="w-full rounded-md">
        <div className="buttons p-1 flex justify-between bg-skin-fill">
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
      </div>

      <ToastContainer />
    </>
  );
}

export default ShareText;

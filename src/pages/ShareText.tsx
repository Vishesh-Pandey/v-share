import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRecoilState } from "recoil";
import { mainContentAtom, publishHistoryAtom } from "../atoms";

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
      text:
        document.getElementById("main-content")?.innerHTML ||
        "something went wrong while publishing text",
      canCopy: mainContent.canCopy,
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
        <div className="buttons p-1 flex justify-between bg-yellow-200">
          <div className="settings flex">
            <div className="bg-gray-300 p-2 m-2 rounded-md hover:bg-black hover:text-white duration-500">
              <input
                type="checkbox"
                name=""
                id="allow-copy"
                checked={mainContent.canCopy}
                onChange={() =>
                  setMainContent({
                    ...mainContent,
                    canCopy: !mainContent.canCopy,
                  })
                }
                className="mx-2"
              />
              <label htmlFor="allow-copy">Allow Viewers to Copy Text? </label>
            </div>
            <div className="bg-gray-300 p-2 m-2 rounded-md hover:bg-black hover:text-white duration-500">
              <input
                type="checkbox"
                name=""
                id="view-once"
                checked={mainContent.viewOnce}
                onChange={() =>
                  setMainContent({
                    ...mainContent,
                    viewOnce: !mainContent.viewOnce,
                  })
                }
                className="mx-2"
              />
              <label htmlFor="view-once">View Once? </label>
            </div>
          </div>

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

        <div
          ref={mainContentRef}
          className="w-full p-2 rounded-md outline-none resize-none min-h-96 whitespace-pre-wrap overflow-x-auto"
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

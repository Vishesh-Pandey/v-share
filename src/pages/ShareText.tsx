import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShareText() {
  const [publishing, setPublishing] = useState<boolean>(false);
  const [canCopy, setCanCopy] = useState<boolean>(true);
  const [viewOnce, setViewOnce] = useState<boolean>(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const generateUrl = async () => {
    if (mainContentRef.current?.innerHTML.length === 0) {
      toast("Empty text can't be published");
      return;
    }
    setPublishing(true);
    const generatedId =
      new Date().getTime().toString() + Math.random().toString();
    await setDoc(doc(db, "sharedText", generatedId), {
      text:
        document.getElementById("main-content")?.innerHTML ||
        "something went wrong",
      canCopy: canCopy,
      id: generatedId,
      views: 1,
      viewOnce: viewOnce,
    });
    navigate("/published/" + generatedId);
  };

  useEffect(() => {
    mainContentRef.current?.focus();
  }, []);

  return (
    <>
      <div className=" w-11/12 m-auto my-2 rounded-md p-2">
        <div className="buttons py-1 flex justify-between ">
          <div className="settings flex">
            <div className="bg-gray-300 p-2 m-2 rounded-md hover:bg-black hover:text-white duration-500">
              <input
                type="checkbox"
                name=""
                id="allow-copy"
                checked={canCopy}
                onChange={() => setCanCopy(!canCopy)}
                className="mx-2"
              />
              <label htmlFor="allow-copy">Allow Viewers to Copy Text? </label>
            </div>
            <div className="bg-gray-300 p-2 m-2 rounded-md hover:bg-black hover:text-white duration-500">
              <input
                type="checkbox"
                name=""
                id="view-once"
                checked={viewOnce}
                onChange={() => setViewOnce(!viewOnce)}
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
        <div className="textarea">
          <div
            ref={mainContentRef}
            className="w-full border-black border-2 p-2 rounded-md outline-none resize-none min-h-96"
            contentEditable
            id="main-content"
          ></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ShareText;

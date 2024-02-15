import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../components/Button";

function PublishedText() {
  const { id } = useParams();
  const [text, setText] = useState<string>("Loading...");
  const [canCopy, setCanCopy] = useState<boolean>(true);
  const [views, setViews] = useState(0);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  useEffect(() => {
    if (mainContentRef.current !== null)
      mainContentRef.current.innerHTML = "v-share : Loading...";
    let currentViews = 0;
    const loadSharedText = async () => {
      let viewOnce = false;
      const docRef = doc(db, "sharedText", id ? id : "notfound");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (mainContentRef.current !== null) {
          mainContentRef.current.innerHTML = docSnap.data().text;
        }
        setText(docSnap.data().text);
        setCanCopy(docSnap.data().canCopy);
        setViews(docSnap.data().views);
        currentViews = docSnap.data().views;
        viewOnce = docSnap.data().viewOnce;
      } else {
        // docSnap.data() will be undefined in this case
        setText(
          "v-share WARNING: This is invalid page or it doesn't exist anymore."
        );
      }

      if (viewOnce && currentViews >= 2) {
        await updateDoc(doc(db, "sharedText", id ? id : "notfound"), {
          views: currentViews + 1,
          text: "v-share : This was a view once document and hence information has been removed. Request publisher again to get the information.",
        });
      }

      await updateDoc(doc(db, "sharedText", id ? id : "notfound"), {
        views: currentViews + 1,
      });

      setViews(currentViews);
    };

    loadSharedText();
  }, [id]);

  const copyText = () => {
    if (canCopy == false) {
      toast("Publisher didn't allowed to Copy given text");
      return false;
    }
    navigator.clipboard.writeText(
      mainContentRef.current ? mainContentRef.current.innerText : text
    );
    toast("Text copied to clipboard");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      "https://share.visheshpandey.com/#" + location.pathname
    );
    toast("Link Copied to clipboard");
  };

  return (
    <>
      <div className="w-full">
        <div className="controls p-5 sticky top-0 bg-gray-200">
          <Button onClick={copyText} text={"Copy Text"} />
          <Button onClick={copyLink} text={"Copy Link"} />
          <span className="p-3 rounded-md mx-3">{views} Views</span>
        </div>

        <div
          className="p-3 bg-yellow-100 md:h-auto overflow-auto "
          ref={mainContentRef}
          id="main-content"
          style={!canCopy ? { userSelect: "none" } : {}}
        ></div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PublishedText;

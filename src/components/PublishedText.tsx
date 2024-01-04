import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function PublishedText() {
  const { id } = useParams();
  const [text, setText] = useState("");

  useEffect(() => {
    const loadSharedText = async () => {
      const docRef = doc(db, "sharedText", id ? id : "notfound");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setText(docSnap.data().text);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    loadSharedText();
  }, [id]);

  return (
    <div className="p-5">
      <pre>{text}</pre>
    </div>
  );
}

export default PublishedText;

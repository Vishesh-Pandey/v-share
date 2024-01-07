import { onValue, ref, set } from "@firebase/database";
import { useEffect, useState } from "react";
import { realtimedb } from "../firebase";

type TextData = {
  text: string;
};

function LiveRoom() {
  const updateFirebaseDatabase = async (currentText: string) => {
    set(ref(realtimedb, "users/" + "testing"), {
      text: currentText,
    });
  };

  const [text, setText] = useState<string>("");

  useEffect(() => {
    // Set up Firebase event listener
    const databaseRef = ref(realtimedb, "users/testing"); // Replace with your actual path

    const onDataChange = (snapshot: { val(): TextData }) => {
      const data = snapshot.val();
      if (data !== null) {
        setText(data.text);
      } else {
        // Handle the case where there is no data
        setText("No data available");
      }
    };

    // Attach the event listener
    const unsubscribe = onValue(databaseRef, onDataChange, {
      onlyOnce: false, // Default value, you can omit this line
    });

    // Clean up the event listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <>
        <div className="bg-gray-200 w-11/12 m-auto my-2 rounded-md p-2">
          <div className="textarea  text-center">
            <textarea
              className="w-full border-black border-0 p-2 rounded-md outline-none resize-none"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                updateFirebaseDatabase(e.target.value);
              }}
              name=""
              id=""
              cols={30}
              rows={20}
              placeholder="start typing here... or paste your text using ctrl + v"
            ></textarea>
          </div>
        </div>
      </>
      <div className="details w-11/12 m-auto my-2">
        <p className="text-white bg-gray-400 p-2 rounded-lg font-bold">
          Text here will get updated in realtime due to other collaborators
        </p>
        <p className="text-red-200">
          LiveRoom on v-share is still under development. You might get
          unexpected errors while using it.
        </p>
      </div>
    </>
  );
}

export default LiveRoom;

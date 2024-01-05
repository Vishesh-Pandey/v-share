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
      console.log(data);
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
      console.log("exiting");
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="text-center">
        <textarea
          className="w-11/12 border-black border-2 p-2 rounded-md"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            updateFirebaseDatabase(e.target.value);
          }}
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="start typing here... or paste your text using ctrl + v"
        ></textarea>
      </div>
      <div className="details w-11/12 m-auto my-2">
        <p className="text-yellow-300 bg-black p-2 rounded-lg font-bold">
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

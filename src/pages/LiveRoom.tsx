import { onValue, ref, set } from "@firebase/database";
import { useEffect, useState } from "react";
import { realtimedb } from "../firebase";
import { useParams } from "react-router-dom";

type TextData = {
  text: string;
  collaborators: [];
};

function LiveRoom() {
  const { id } = useParams();

  const [text, setText] = useState<string>("");
  const [roomIdCopied, setRoomIdCopied] = useState<boolean>(false);

  const updateFirebaseDatabase = async (currentText: string) => {
    set(ref(realtimedb, "liveroom/" + `${id}`), {
      text: currentText,
    });
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(
      `https://share.visheshpandey.com/#liveroom/${id}`
    );
    setRoomIdCopied(true);
    setTimeout(() => {
      setRoomIdCopied(false);
    }, 3000);
  };

  useEffect(() => {
    // Set up Firebase event listener
    setText("Loading...");
    const databaseRef = ref(realtimedb, `liveroom/${id}`); // Replace with your actual path

    const onDataChange = (snapshot: { val(): TextData }) => {
      const data = snapshot.val();
      if (data !== null) {
        setText(data.text);
      } else {
        // Handle the case where there is no data
        setText("");
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
  }, [id]);

  return (
    <>
      <div className="bg-gray-200 w-11/12 m-auto my-2 rounded-md p-2">
        <div className="buttons py-1 flex justify-between ">
          <span className="text-red-600 font-bold animate-pulse"></span>

          <button
            onClick={copyRoomId}
            className="bg-gray-300 p-4 rounded-md hover:bg-black duration-500 hover:text-white lg:w-1/12 md:w-2/12"
          >
            {roomIdCopied ? (
              <span>
                Copied <i className="bi bi-clipboard2-check"></i>
              </span>
            ) : (
              <span>
                Invite <i className="bi bi-clipboard-plus"></i>
              </span>
            )}
          </button>
        </div>
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

      <div className="details w-11/12 m-auto my-2">
        <p className="text-white bg-gray-400 p-2 rounded-lg font-bold">
          Text here will get updated in realtime due to other collaborators
        </p>
      </div>
    </>
  );
}

export default LiveRoom;

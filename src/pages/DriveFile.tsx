import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function DriveFile() {
  const storage = getStorage();
  const { user, id } = useParams();
  console.log(id);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeFile = async () => {
      setLoading(true);
      getDownloadURL(ref(storage, user === undefined ? "" : user + "/" + id))
        .then((url) => {
          setFileUrl(url);
        })
        .catch((error) => {
          console.log("Error occure :" + error);
          // Handle any errors
        });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    initializeFile();
  }, [user, id, storage]);

  return (
    <div className="w-full">
      {loading ? (
        <h1 className="text-5xl text-secondary-foreground">
          Loading File Please Wait!
        </h1>
      ) : (
        <div>
          <iframe
            className="w-full h-screen scroll-auto"
            src={fileUrl}
          ></iframe>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default DriveFile;

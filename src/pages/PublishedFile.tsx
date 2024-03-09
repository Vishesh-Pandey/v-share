import { getDownloadURL, getMetadata, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";

function PublishedFile() {
  const storage = getStorage();
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    const initializeFile = async () => {
      getDownloadURL(ref(storage, id))
        .then((url) => {
          setFileUrl(url);
        })
        .catch((error) => {
          console.log("Error occure :" + error);
          // Handle any errors
        });

      // Fetch file metadata

      const metadata = await getMetadata(ref(storage, id));
      let metaDataString = "";
      if (metadata.contentType !== undefined) {
        metaDataString = metadata.contentType.toString();
      }
      setFileType(metaDataString);
    };

    initializeFile();
  }, [id, storage]);

  return (
    <div>
      <div className="flex py-2">
        <Button
          text="Download"
          onClick={() => {
            toast(
              "The file is either downloaded or it can be accessed in browser"
            );
          }}
        />
        <Button
          text="Share"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://share.visheshpandey.com/#/sharedFile/${id}`
            );
            toast("File link copied to Clipboard");
          }}
        />
      </div>

      <div className="w-full">
        {fileType.startsWith("image/") ? (
          <img src={fileUrl} alt="Preview" />
        ) : fileType.startsWith("video/") ? (
          <video src={fileUrl} controls />
        ) : fileType.startsWith("application/pdf") ? (
          <iframe className="w-full h-96 scroll-auto" src={fileUrl}></iframe>
        ) : (
          <div>
            <iframe className="w-full h-96 scroll-auto" src={fileUrl}></iframe>
            <h2 className="bg-skin-base text-skin-base">
              Downloading File to your system - {id}
            </h2>
            <h2 className="bg-skin-base text-skin-base">
              If can't find the shared file then please check if link is valid
            </h2>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default PublishedFile;

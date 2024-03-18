import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { publishedFilesLinkAtom } from "../atoms";

function ShareFile() {
  const [file, setFile] = useState<Blob | null>(null);
  const [description, setDescription] = useState<string>("");
  const [publishing, setPublishing] = useState<boolean>(false);

  const [publishedFilesLink, setPublishedFilesLink] = useRecoilState(
    publishedFilesLinkAtom
  );

  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const uploadFileToFirebase = async () => {
    if (file === null) {
      toast("Choose a file first");
      return;
    }
    setPublishing(true);

    const fileId = description + v4();

    const storage = getStorage();
    const storageRef = ref(storage, fileId);

    // 'file' comes from the Blob or File API
    if (file !== null) {
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot);
        console.log("Uploaded a blob or file!");
      });

      setPublishedFilesLink([fileId, ...publishedFilesLink]);

      navigate(`/sharedFile/${fileId}`);
    }
    setPublishing(false);
  };

  return (
    <div>
      <div className="flex justify-end py-1">
        <Button
          onClick={uploadFileToFirebase}
          text={publishing ? "Publishing..." : "Publish"}
        />
      </div>
      <div className="text-center">
        <label
          className="text-primary-foreground block w-full text-center"
          htmlFor="file-upload"
        >
          Choose or drag and drop a file below
        </label>

        <input
          id="file-upload"
          className={`p-5 text-primary-foreground bg-secondary rounded h-60 w-1/2 border-2 cursor-pointer hover:bg-primary ${
            file === null ? "" : "bg-green-700"
          }`}
          onChange={handleFileChange}
          type="file"
        />
      </div>
      <div className="flex justify-center">
        <input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value.replace(" ", "-"));
          }}
          maxLength={20}
          className="p-2 w-full md:w-1/2 my-2 rounded bg-secondary text-primary"
          type="text"
          placeholder="enter description for the file"
        />
      </div>

      <h2 className="bg-skin-base text-skin-base text-xl font-semibold text-center py-2">
        {publishedFilesLink.length === 0
          ? "You haven't published any file yet"
          : "Previously Uploaded Files"}
      </h2>
      <ul className="">
        {publishedFilesLink.map((id: string) => {
          return (
            <li
              className="p-2 border-t border-b text-primary-foreground flex justify-between align-middle hover:bg-secondary"
              key={id}
            >
              <p className="flex flex-col justify-center">{id}</p>
              <Button
                text="Open"
                onClick={() => {
                  navigate(`/sharedFile/${id}`);
                }}
              />
            </li>
          );
        })}
      </ul>

      <ToastContainer />
    </div>
  );
}

export default ShareFile;

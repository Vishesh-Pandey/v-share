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
      <div className="flex justify-center">
        <input
          className="p-2 text-skin-base"
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
          className="p-2 w-full md:w-1/2 my-2 rounded"
          type="text"
          placeholder="enter description for the file"
        />
      </div>

      <h2 className="bg-skin-base text-skin-base text-xl font-semibold text-center py-2">
        Previously Uploaded Files{" "}
      </h2>
      <div className="flex flex-wrap">
        {publishedFilesLink.map((id: string) => {
          return (
            <div className="p-2" key={id}>
              <Button
                text={id}
                onClick={() => {
                  navigate(`/sharedFile/${id}`);
                }}
              />
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
}

export default ShareFile;

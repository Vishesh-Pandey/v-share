import {
  useContext,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  FullMetadata,
  getMetadata,
  getStorage,
  listAll,
  uploadBytes,
} from "firebase/storage";
import { ref } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { v4 } from "uuid";

function MiniDrive() {
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState<Blob | null>(null);
  const [description, setDescription] = useState<string>("");
  const [publishing, setPublishing] = useState<boolean>(false);
  const [filesMetaData, setFilesMetaData] = useState<FullMetadata[]>([]);
  const [loadingFiles, setloadingFiles] = useState(false);

  const navigate = useNavigate();

  const uploadToMiniDrive = async () => {
    if (authContext.currentUser === null) {
      alert("You need to login to use Mini Drive");
      return;
    }
    if (file === null) {
      toast("Choose a file first");
      return;
    }

    setPublishing(true);

    const fileId = description + v4();

    const storage = getStorage();
    const storageRef = ref(
      storage,
      `${authContext.currentUser?.uid}/${fileId}`
    );

    // 'file' comes from the Blob or File API
    if (file !== null) {
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot);
        console.log("Uploaded a blob or file!");
      });

      navigate(`/DriveFile/${authContext.currentUser?.uid}/${fileId}`);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const getUploadedFiles = useCallback(async () => {
    setloadingFiles(true);
    const storage = getStorage();
    const folderRef = ref(storage, authContext.currentUser?.uid);

    const res = await listAll(folderRef);

    const filesMetaDataArray: FullMetadata[] = [];

    res.items.forEach((element) => {
      getMetadata(element).then((metaData) => {
        filesMetaDataArray.push(metaData);
      });
    });

    setTimeout(() => {
      setFilesMetaData(filesMetaDataArray);
      setloadingFiles(false);
    }, 1000);
  }, [authContext.currentUser]);

  useEffect(() => {
    getUploadedFiles();
  }, [getUploadedFiles]);

  return authContext.currentUser === null ? (
    <div>
      <p className="text-primary-foreground">Login to use mini drive</p>
    </div>
  ) : (
    <div>
      <div className="flex justify-end py-1">
        <Button
          onClick={uploadToMiniDrive}
          text={publishing ? "Publishing..." : "Upload"}
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

      <div>
        {authContext.currentUser === null ? null : loadingFiles ? (
          <p className="text-primary-foreground">Loading Your Files</p>
        ) : filesMetaData.length === 0 ? (
          <p className="text-primary-foreground">
            No files found in your account
          </p>
        ) : (
          filesMetaData.map(function (metadata) {
            return (
              <div
                className="flex justify-between text-primary-foreground bg-primary border rounded p-2"
                key={metadata.name}
              >
                <div>
                  <span>name: {metadata.name} </span>
                  <span className="bg-secondary p-2 rounded">
                    {metadata.contentType} {metadata.size / 1000} KB
                  </span>

                  <p>Uploaded On: {metadata.timeCreated},</p>
                </div>
                <Button
                  text="Open"
                  onClick={() => {
                    navigate(
                      `/DriveFile/${authContext.currentUser?.uid}/${metadata.name}`
                    );
                  }}
                />
              </div>
            );
          })
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MiniDrive;

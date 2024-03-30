import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ShareText from "./pages/ShareText";
import PublishedText from "./pages/PublishedText";
import About from "./pages/About";
import LiveRoom from "./pages/LiveRoom";
import CreateRoom from "./pages/CreateRoom";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./atoms";
import ShareFile from "./pages/ShareFile";
import PublishedFile from "./pages/PublishedFile";
import History from "./pages/History";
import Account from "./pages/Account";
import MiniDrive from "./pages/MiniDrive";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { AuthContext } from "./context/AuthContext";
import DriveFile from "./pages/DriveFile";

function App() {
  const theme = useRecoilValue(themeAtom);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authContext.setCurrentUser(user);
      } else {
        authContext.setCurrentUser(null);
      }
    });
  }, [authContext]);

  return (
    <>
      <div
        className={`relative overflow-x-hidden md:flex h-screen bg-skin-fill ${
          theme === "dark" ? "dark" : "light"
        } `}
      >
        <Navbar />
        <div className="bg-skin-fill w-full max-h-screen overflow-auto">
          <Routes>
            <Route path="/" element={<ShareText />} />
            <Route path="published/:id" element={<PublishedText />} />
            <Route path="shareFile" element={<ShareFile />} />
            <Route path="sharedFile/:id" element={<PublishedFile />} />
            <Route path="liveroom" element={<CreateRoom />} />
            <Route path="liveroom/:id" element={<LiveRoom />} />
            <Route path="history" element={<History />} />

            <Route path="about" element={<About />} />
            <Route path="account" element={<Account />} />
            <Route path="drive" element={<MiniDrive />} />
            <Route path="DriveFile/:user/:id" element={<DriveFile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

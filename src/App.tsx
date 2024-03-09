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

function App() {
  const theme = useRecoilValue(themeAtom);
  return (
    <>
      <div
        className={`md:flex h-screen ${theme === "dark" ? "dark" : "light"} `}
      >
        <Navbar />
        <div className="bg-skin-fill w-full max-h-screen overflow-auto">
          <Routes>
            <Route path="/" element={<ShareText />} />
            <Route path="about" element={<About />} />
            <Route path="published/:id" element={<PublishedText />} />
            <Route path="liveroom" element={<CreateRoom />} />
            <Route path="liveroom/:id" element={<LiveRoom />} />
            <Route path="shareFile" element={<ShareFile />} />
            <Route path="sharedFile/:id" element={<PublishedFile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

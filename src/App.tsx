import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ShareText from "./components/ShareText";
import PublishedText from "./components/PublishedText";
import About from "./components/About";
import LiveRoom from "./components/LiveRoom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShareText />} />
        <Route path="about" element={<About />} />
        <Route path="published/:id" element={<PublishedText />} />
        <Route path="liveroom" element={<LiveRoom />} />
      </Routes>
    </>
  );
}

export default App;
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function CreateRoom() {
  const navigate = useNavigate();

  const createLiveRoom = () => {
    const roomId = Math.floor(Math.random() * 1000);
    navigate(`${roomId}`);
  };

  return (
    <div className="text-center py-5">
      <Button onClick={createLiveRoom} text={"Create Room"} />
    </div>
  );
}

export default CreateRoom;

import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const navigate = useNavigate();

  const createLiveRoom = () => {
    const roomId = Math.floor(Math.random() * 1000);
    navigate(`${roomId}`);
  };

  return (
    <div className="text-center py-5">
      <button
        onClick={createLiveRoom}
        className="bg-green-300 p-4 rounded-md hover:bg-green-400 duration-500"
      >
        Create Room
      </button>
    </div>
  );
}

export default CreateRoom;

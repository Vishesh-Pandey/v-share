import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { generateId } from "../utils";
import { useRecoilState } from "recoil";
import { userLiveRoomIdAtom } from "../atoms";

function CreateRoom() {
  const navigate = useNavigate();
  const [userLiveRoomId, setUserLiveRoomId] =
    useRecoilState(userLiveRoomIdAtom);

  const createLiveRoom = () => {
    const roomId = generateId(4);
    setUserLiveRoomId([roomId, ...userLiveRoomId]);
    navigate(`${roomId}`);
  };

  return (
    <>
      <div className="text-center py-5">
        <Button onClick={createLiveRoom} text={"Create Room"} />
      </div>

      <h2 className="bg-skin-base text-skin-base text-xl font-semibold text-center py-2">
        {userLiveRoomId.length === 0
          ? "You haven't created any live room yet"
          : "Live Rooms Created By You"}
      </h2>

      <div className="flex flex-wrap">
        {userLiveRoomId.map((id: string, index: number) => {
          return (
            <div className="p-2" key={id}>
              <Button
                text={`Room ${index + 1} : ${id}`}
                onClick={() => {
                  navigate(`/liveroom/${id}`);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CreateRoom;

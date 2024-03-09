import { useRecoilValue } from "recoil";
import { publishHistoryAtom } from "../atoms";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const publishHistory = useRecoilValue(publishHistoryAtom);
  return (
    <div>
      <h2 className="bg-skin-base text-skin-base text-xl font-semibold text-center py-2">
        {publishHistory.length === 0
          ? "You haven't published anything Yet"
          : "Published Pages"}
      </h2>
      <div className="bg-skin-fill text-skin-base flex flex-wrap">
        {publishHistory?.map(
          (element: { id: string; title: string }, index: number) => {
            return (
              <div className="p-2" key={element.title}>
                <Button
                  text={index + " - " + element.title}
                  onClick={() => {
                    navigate(`/published/${element.id}`);
                  }}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default History;

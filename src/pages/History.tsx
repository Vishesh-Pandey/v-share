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

      <ul className="">
        {publishHistory.map(
          (element: { id: string; title: string }, index: number) => {
            return (
              <li
                className="p-2 border-t border-b text-primary-foreground flex justify-between align-middle hover:bg-secondary"
                key={element.id}
              >
                <p className="flex flex-col justify-center">
                  {index + 1} - {element.title} - {element.id}
                </p>
                <Button
                  text="Open"
                  onClick={() => {
                    navigate(`/published/${element.id}`);
                  }}
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default History;

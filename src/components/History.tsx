import { useEffect } from "react";
import CustomLink from "./CustomLink";
import { useRecoilValue } from "recoil";
import { publishHistoryAtom } from "../atoms";

function History() {
  const publishHistory = useRecoilValue(publishHistoryAtom);

  useEffect(() => {}, []);

  return (
    <div className="bg-red-300 max-h-96 md:h-1/2 overflow-auto">
      <h2 className="text-center font-bold">Published Pages</h2>
      {publishHistory?.map(
        (element: { id: string; title: string }, index: number) => {
          return (
            <CustomLink
              key={element.id}
              path={`published/${element.id}`}
              text={`${index + 1}: ${element.title}`}
            />
          );
        }
      )}
    </div>
  );
}

export default History;

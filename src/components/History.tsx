import { useEffect, useState } from "react";
import CustomLink from "./CustomLink";
import Button from "./Button";

interface publishedTextType {
  title: string;
  id: string;
}

function History() {
  const [publishedText, setpublishedText] = useState<publishedTextType[]>([]);

  useEffect(() => {
    const publishHistoryString: string | null =
      localStorage?.getItem("publishedText");

    if (publishHistoryString != null) {
      const publishHistoryArray: publishedTextType[] =
        JSON.parse(publishHistoryString);

      setpublishedText(publishHistoryArray);
    }
  }, []);

  const loadHistory = () => {
    const publishHistoryString: string | null =
      localStorage?.getItem("publishedText");

    if (publishHistoryString != null) {
      const publishHistoryArray: publishedTextType[] =
        JSON.parse(publishHistoryString);

      setpublishedText(publishHistoryArray);
    }
  };

  const clearHistory = () => {
    localStorage.setItem("publishedText", "[]");
    loadHistory();
  };

  return (
    <div>
      <h2 className="text-center font-bold">Published Pages</h2>
      <Button text="Load Recent History" onClick={loadHistory} />
      <Button text="Clear" onClick={clearHistory} />
      {publishedText?.map((element, index) => {
        if (index < 5)
          return (
            <CustomLink
              path={`published/${element.id}`}
              text={`Published - ${index + 1}`}
            />
          );
      })}
    </div>
  );
}

export default History;

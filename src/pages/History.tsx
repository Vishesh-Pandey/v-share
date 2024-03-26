import { useRecoilValue } from "recoil";
import { publishHistoryAtom } from "../atoms";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { SharedTextType } from "../types";

function History() {
  const navigate = useNavigate();
  const publishHistoryLocal = useRecoilValue(publishHistoryAtom);

  const [publishHistoryOnAccount, setpublishHistoryOnAccount] = useState<
    SharedTextType[]
  >([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getPublishHistory = async () => {
      if (authContext.currentUser !== null) {
        const q = query(
          collection(db, "sharedText"),
          where("user", "==", authContext.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const publishHistoryOnFirebase: SharedTextType[] = [];
        querySnapshot.forEach((doc) => {
          const value: SharedTextType = doc.data() as SharedTextType;
          publishHistoryOnFirebase.push(value);
        });

        setpublishHistoryOnAccount(publishHistoryOnFirebase);
      }
    };
    getPublishHistory();
  }, [authContext]);

  return (
    <div>
      <h2 className="bg-skin-base text-skin-base text-xl font-semibold text-center py-2">
        {publishHistoryLocal.length === 0 ? (
          <p className="text-primary-foreground">
            You haven't published anything Yet
          </p>
        ) : (
          <p className="text-primary-foreground">Published Pages</p>
        )}
      </h2>

      {authContext.currentUser === null ? (
        <p className="text-primary-foreground">
          Login to get publish history on your account
        </p>
      ) : (
        <ul className="bg-primary">
          {publishHistoryOnAccount.map(
            (element: SharedTextType, index: number) => {
              return (
                <li
                  className="p-2 border-t border-b text-primary-foreground flex justify-between align-middle hover:bg-secondary"
                  key={element.id}
                >
                  <p className="flex flex-col justify-center">
                    {index + 1} - {element.id} - ( Saved online )
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
      )}

      <ul className="">
        {publishHistoryLocal.map(
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

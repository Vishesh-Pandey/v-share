import { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Login from "../components/Login";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

function Account() {
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    console.log("Current Auth is :", auth);

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        authContext.setCurrentUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log("Error : " + error);
        alert("OOPS! Something went wrong ");
      });
  };

  return (
    <div>
      {authContext === null || authContext.currentUser === null ? (
        <Login />
      ) : (
        <div>
          <h2>Hello {authContext.currentUser.email}</h2>
          <Button onClick={handleLogout} text="Logout" />
        </div>
      )}
    </div>
  );
}

export default Account;

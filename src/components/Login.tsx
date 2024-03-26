import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";

function Login() {
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authContext = useContext(AuthContext);

  const handleSignup = async () => {
    // await createUserWithEmailAndPassword(auth, emailId, password);

    createUserWithEmailAndPassword(auth, emailId, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        authContext.setCurrentUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error code ", errorCode);
        console.log("Error message : ", errorMessage);
      });
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, emailId, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        authContext.setCurrentUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error code ", errorCode);
        console.log("Error message : ", errorMessage);
      });
  };

  return (
    <div className="p-2">
      <p className="text-primary-foreground p-2">
        Login/Signup to v-share ( Save publish history to your account ){" "}
      </p>
      <div>
        <input
          className="p-2 m-2 rounded"
          value={emailId}
          onChange={function (e) {
            setEmailId(e.target.value);
          }}
          type="text"
          placeholder="Enter your email"
        />
        <input
          className="p-2 m-2 rounded"
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter you password"
        />
        <div className="flex">
          <Button text="Login ( Already have account )" onClick={handleLogin} />
          <Button
            text="Signup ( Create new account ) "
            onClick={handleSignup}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

export function generateId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function createAnonymousAccount() {
  await signInAnonymously(auth);
  console.log("New anonymous account has been created");
}

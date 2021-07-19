import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";

export default function SignIn() {
  const { user, checkSignIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/member");
    } catch (error) {
      console.log("error :>> ", error);
      setError(error.message);
    }
  };
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (checkSignIn && user !== undefined) router.push("/member");
    console.log("user :>> ", user);

    console.log("checkSignIn :>> ", checkSignIn);
  }, [checkSignIn]);

  if (checkSignIn) {
    return (
      <div>
        <h1>ログイン </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>メールアドレス</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={(e) => handleOnChangeEmail(e)}
            />
          </div>
          <div>
            <label>パスワード</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => handleOnChangePassword(e)}
            />
          </div>
          <div>
            <button>ログイン</button>
          </div>
          <div>
            登録は<Link href="/signup">こちら</Link>
          </div>
        </form>
        <div>{error}</div>
      </div>
    );
  } else {
    return <>loading</>;
  }
}

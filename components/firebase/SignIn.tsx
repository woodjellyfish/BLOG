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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password);
  };
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (checkSignIn) {
      if (user !== undefined) router.push("/member");
    }
  }, [checkSignIn]);

  if (!checkSignIn && user !== undefined) {
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
            登録は<Link href="/signUp">こちら</Link>
          </div>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}

import React, { useState } from "react";
import { auth } from "../../firebase/clientApp";
import { useAuthContext } from "../../context/AuthContext";
import router from "next/router";

export default function SignUp() {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push("/member");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <h1>ユーザー登録 </h1>
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
          <button>登録</button>
        </div>
      </form>
    </div>
  );
}

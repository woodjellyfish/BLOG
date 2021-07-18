import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useAuthContext } from "../../context/AuthContext";

export default function SignUp() {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password);
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

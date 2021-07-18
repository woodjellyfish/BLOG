import Link from "next/link";
import router from "next/router";
import { type } from "os";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";

export default function Member() {
  const { user, checkSignIn } = useAuthContext();

  const handleLogout = () => {
    auth.signOut();
    router.push("/signIn");
  };

  useEffect(() => {
    console.log("isSignIn :>> ", checkSignIn);
    console.log("user :>> ", user);
    if (checkSignIn) {
      if (user === undefined) router.push("/signIn");
    }
  });

  if (!checkSignIn) {
    return <h1>loading...</h1>;
  } else {
    return (
      <div>
        <h1>会員用ページ</h1>
        <div>{user && user.email}様</div>
        <button onClick={handleLogout}>ログアウト</button>
        <Link href="/signIn">サインイン</Link>
      </div>
    );
  }
}

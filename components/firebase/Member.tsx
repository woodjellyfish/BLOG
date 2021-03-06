import Link from "next/link";
import router from "next/router";
import { type } from "os";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/clientApp";

export default function Member() {
  const { user, checkSignIn } = useAuthContext();

  const handleLogout = () => {
    auth.signOut();
    router.push("/signin");
  };

  useEffect(() => {
    console.log("isSignIn :>> ", checkSignIn);
    console.log("user :>> ", user);
    if (checkSignIn) {
      if (user === undefined) router.push("/signin");
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
        <Link href="/signin">サインイン</Link>
      </div>
    );
  }
}

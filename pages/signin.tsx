import React from "react";
import SignIn from "../components/firebase/SignIn";
import { AuthProvider } from "../context/AuthContext";

export default function SignInPage() {
  return (
    <div>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </div>
  );
}

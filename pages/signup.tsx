import React from "react";
import SignUp from "../components/firebase/SignUp";
import { AuthProvider } from "../context/AuthContext";

export default function SignUpPage() {
  return (
    <div>
      <AuthProvider>
        <div style={{ margin: "2em" }}>
          <SignUp />
        </div>
      </AuthProvider>
    </div>
  );
}

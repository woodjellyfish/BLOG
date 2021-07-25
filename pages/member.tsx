import React from "react";
import { AuthProvider, useAuthContext } from "../context/AuthContext";
import Member from "../components/firebase/Member";

export default function memberPage() {
  return (
    <div>
      <AuthProvider>
        <Member />
      </AuthProvider>
    </div>
  );
}

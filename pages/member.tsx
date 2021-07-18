import Router from "next/router";
import React from "react";
import { auth } from "../firebase/firebase";
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

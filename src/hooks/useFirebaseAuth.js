import { useState, useEffect } from "react";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push, pathname } = useRouter();

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);

      if (pathname === "/events") {
        push("/");
      } else {
        push(pathname);
      }
      return;
    }

    if (pathname === "/login" || pathname === "/signup") {
      push("/events");
    } else if (pathname === "/") {
      push("/");
    } else {
      push(pathname);
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
  };
}

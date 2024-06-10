"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loading from "app/loading";
import { Suspense, useEffect, useState } from "react";
import Login from "views/Login";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <GoogleOAuthProvider clientId="694412510666-u7onv1nnc1lki6bscl2tt1k25e2bdoq4.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    </Suspense>
  );
}

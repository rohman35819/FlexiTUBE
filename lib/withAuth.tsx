// lib/withAuth.tsx
import React from "react";
import { useRouter } from "next/router";

const withAuth = (Component: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();

    React.useEffect(() => {
      const loggedIn = localStorage.getItem("loggedIn");
      if (!loggedIn) {
        router.push("/login-basic"); // redirect kalau belum login
      }
    }, [router]);

    // Sementara render kosong dulu supaya tidak render komponen sebelum cek login
    if (typeof window !== "undefined" && !localStorage.getItem("loggedIn")) {
      return null;
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`;

  return AuthenticatedComponent;
};

export default withAuth;

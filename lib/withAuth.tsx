import { useRouter } from "next/router";
import { useEffect } from "react";

type AuthMethod = "basic" | "token" | "oauth";

const withAuth = (WrappedComponent: any, authMethod: AuthMethod) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      let loggedIn = false;
      if (authMethod === "basic") {
        loggedIn = !!localStorage.getItem("basic_logged_in");
        if (!loggedIn) router.push("/login-basic");
      } else if (authMethod === "token") {
        loggedIn = !!localStorage.getItem("token");
        if (!loggedIn) router.push("/login-token");
      } else if (authMethod === "oauth") {
        loggedIn = !!localStorage.getItem("oauth_logged_in");
        if (!loggedIn) router.push("/login-oauth");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

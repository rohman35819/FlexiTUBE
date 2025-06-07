"use client";
import { useRouter } from "next/navigation";


type LogoutButtonProps = {
  authMethod?: string;
};

export default function LogoutButton({ authMethod }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");

    if (authMethod === "basic") {
      router.push("/login-basic");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#e53e3e",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "1rem",
      }}
    >
      Logout
    </button>
  );
}

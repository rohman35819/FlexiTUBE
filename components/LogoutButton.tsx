import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");  // hapus status login
    router.push("/login-basic");           // redirect ke halaman login
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

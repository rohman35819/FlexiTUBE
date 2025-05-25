import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginToken() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Contoh token pentest sederhana: token harus 'abcdef'
    if (token.toLowerCase().includes("<script>")) {
      setError("Payload mencurigakan terdeteksi!");
      return;
    }

    if (token === "abcdef") {
      localStorage.setItem("token", "abcdef");
      router.push("/notes/note2");
    } else {
      setError("Token tidak valid");
    }
  };

  return (
    <div>
      <h1>Login Token</h1>
      <input
        placeholder="Masukkan token"
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

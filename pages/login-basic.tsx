import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Note1() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("note1_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setError(""); // Reset error

    if (captcha !== "7") {
      setError("Captcha salah!");
      return;
    }

    if (user === "admin" && pass === "1234") {
      localStorage.setItem("note1_logged_in", "true");
      setIsLoggedIn(true);
    } else {
      setError("Username atau password salah!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("note1_logged_in");
    setIsLoggedIn(false);
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
        <h2>Login ke Note 1</h2>

        <input
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Berapa 3 + 4? (Captcha)</label>
        <input
          placeholder="Jawaban Captcha"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button onClick={handleLogin} style={{ padding: "8px 20px", marginTop: "10px" }}>
          Login
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <button onClick={handleBackToDashboard} style={{ marginTop: "20px" }}>
          ← Kembali ke Dashboard
        </button>
      </div>
    );
  }

  // Jika sudah login, tampilkan konten
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Note 1</h1>
      <p>Ini adalah konten Note 1 yang hanya bisa diakses setelah login.</p>

      <button onClick={handleLogout} style={{ marginTop: "20px", background: "red", color: "white", padding: "8px 20px" }}>
        Logout
      </button>
    </div>
  );
}

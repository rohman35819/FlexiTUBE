'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const Login = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const rand = Math.random().toString(36).substring(2, 8);
    setCaptcha(rand);
  };

  const handleLogin = () => {
    if (locked) {
      setError("Akun terkunci. Silakan coba lagi nanti.");
      return;
    }

    if (inputCaptcha !== captcha) {
      setError("Captcha salah");
      generateCaptcha();
      return;
    }

    if (userId === "admin" && password === "123456") {
      localStorage.setItem("securebank_logged_in", "true");
      router.push("/securebank/otp");
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 3) {
        setLocked(true);
        setError("Terlalu banyak percobaan. Akun dikunci sementara.");
      } else {
        setError("User ID atau Password salah");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Login SecureBank</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">{captcha}</span>
          <button
            className="text-blue-500 text-sm"
            onClick={generateCaptcha}
          >
            Ganti Captcha
          </button>
        </div>
        <input
          type="text"
          placeholder="Masukkan Captcha"
          value={inputCaptcha}
          onChange={(e) => setInputCaptcha(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
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

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login SecureBank</h2>

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between mb-4">
          <span className="font-mono bg-gray-200 px-3 py-2 rounded text-lg select-none tracking-widest">{captcha}</span>
          <button
            onClick={generateCaptcha}
            className="text-blue-600 hover:underline text-sm"
            type="button"
          >
            Ganti Captcha
          </button>
        </div>

        <input
          type="text"
          placeholder="Masukkan Captcha"
          value={inputCaptcha}
          onChange={(e) => setInputCaptcha(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold transition"
          type="button"
        >
          Login
        </button>

        <button
          onClick={handleBack}
          className="mt-6 w-full border border-gray-400 text-gray-700 py-3 rounded hover:bg-gray-100 transition"
          type="button"
        > 
          ← Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}

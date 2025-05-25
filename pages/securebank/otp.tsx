import { useState } from "react";
import { useRouter } from "next/router";

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // OTP statis untuk simulasi
  const correctOtp = "123456";

  const handleSubmit = () => {
    if (otp === correctOtp) {
      localStorage.setItem("securebank_otp_verified", "true");
      router.push("/securebank/dashboard");
    } else {
      setError("Kode OTP salah");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Masukkan Kode OTP</h2>
        <input
          type="text"
          maxLength={6}
          placeholder="Kode OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3 text-center tracking-widest"
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Verifikasi OTP
        </button>
      </div>
    </div>
  );
}

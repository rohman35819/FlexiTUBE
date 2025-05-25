import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("securebank_logged_in");
    const otpVerified = localStorage.getItem("securebank_otp_verified");
    if (!loggedIn || !otpVerified) {
      router.replace("/securebank/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("securebank_logged_in");
    localStorage.removeItem("securebank_otp_verified");
    router.push("/securebank/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Selamat datang di SecureBank Dashboard</h1>
        <p className="mb-6">Ini adalah halaman dashboard setelah login dan verifikasi OTP sukses.</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

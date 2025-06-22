'use client';

import { useState } from 'react';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setResult('');
    setResponseTime(null);

    const start = performance.now();
    const res = await fetch('/api/login', 
{
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const end = performance.now();

    const data = await res.json();
    setLoading(false);
    setResult(data.message);
    setResponseTime(end - start);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">🕒 Web Timing Attack Simulation</h1>
      <input
        className="border p-2 mb-2 w-64 rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-64 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
  onClick={handleLogin}
  className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  disabled={loading}
>
  {loading
    ? `Checking... ${responseTime !== null ? `(${(responseTime / 1000).toFixed(2)}s)` : ''}`
    : 'Login'}
</button>

      {result && (
        <div className="mt-4 text-center">
          <p className="text-lg">{result}</p>
          <p className="text-sm text-gray-600">
            Response time: {responseTime?.toFixed(2)} ms
          </p>
        </div>
      )}
    </main>
  );
}

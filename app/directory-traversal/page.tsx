'use client';

import React, { useState } from 'react';

const DirectoryTraversalPage: React.FC = () => {
  const [filePath, setFilePath] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const fetchFile = async () => {
    try {
      const res = await fetch(`/api/readfile?file=${encodeURIComponent(filePath)}`);
      const data = await res.json();
      setResponse(data.content || data.error || 'Unknown response');
    } catch (err) {
      setResponse('Failed to fetch');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Simulasi Directory Traversal</h1>

      <input
        type="text"
        placeholder="Contoh: log.txt atau ../../etc/passwd"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={fetchFile} className="bg-blue-600 text-white px-4 py-2 rounded">
        Baca File
      </button>

      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default DirectoryTraversalPage;

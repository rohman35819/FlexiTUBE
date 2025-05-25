import React, { useState } from 'react';

export default function FileSharing() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <section aria-label="File Sharing">
      <h2>File Sharing</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <ul>
        {files.map((file, i) => <li key={i}>{file.name}</li>)}
      </ul>
    </section>
  );
}

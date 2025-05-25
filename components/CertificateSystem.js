import React, { useState, useEffect } from 'react';
import { getCertificates, issueCertificate } from '../services/blockchainService';
import '../styles/certificate.css';

export default function CertificateSystem({ userId }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const data = await getCertificates(userId);
        setCertificates(data);
      } catch (err) {
        setError('Failed to load certificates.');
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, [userId]);

  const handleIssue = async () => {
    try {
      setLoading(true);
      const newCert = await issueCertificate(userId);
      setCertificates(prev => [newCert, ...prev]);
    } catch {
      setError('Issue certificate failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="certificate-system">Loading certificates...</div>;
  if (error) return <div className="certificate-system error">{error}</div>;

  return (
    <div className="certificate-system">
      <h2>Your Certificates</h2>
      <button onClick={handleIssue} className="issue-btn">Issue New Certificate</button>
      <ul className="cert-list">
        {certificates.map(cert => (
          <li key={cert.id} className="cert-item">
            <h3>{cert.title}</h3>
            <p>Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
            <a href={cert.tokenUri} target="_blank" rel="noopener noreferrer">View on blockchain explorer</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

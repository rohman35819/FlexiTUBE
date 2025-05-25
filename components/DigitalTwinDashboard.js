import React, { useEffect, useState } from 'react';

export default function DigitalTwinDashboard() {
  const [machineData, setMachineData] = useState(null);

  useEffect(() => {
    // Contoh polling data digital twin realtime
    const interval = setInterval(() => {
      // Simulasi data realtime
      setMachineData({
        temperature: (Math.random() * 100).toFixed(1),
        pressure: (Math.random() * 50).toFixed(1),
        status: 'Running',
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!machineData) return <p>Loading digital twin data...</p>;

  return (
    <section aria-label="Digital Twin Dashboard">
      <h2>Digital Twin Dashboard</h2>
      <ul>
        <li>Temperature: {machineData.temperature} °C</li>
        <li>Pressure: {machineData.pressure} bar</li>
        <li>Status: {machineData.status}</li>
      </ul>
    </section>
  );
}

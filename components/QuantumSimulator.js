import React, { useState, useEffect } from 'react';

export default function QuantumSimulator() {
  const [simulationResult, setSimulationResult] = useState(null);
  const [running, setRunning] = useState(false);

  const runSimulation = () => {
    setRunning(true);
    // Simulasi sederhana dummy, nanti ganti dengan logika quantum sebenarnya
    setTimeout(() => {
      setSimulationResult('Optimized injection parameters found!');
      setRunning(false);
    }, 2000);
  };

  return (
    <section aria-label="Quantum Simulator for Injection Process Optimization">
      <h2>Quantum Simulator</h2>
      <button onClick={runSimulation} disabled={running}>
        {running ? 'Running simulation...' : 'Start Simulation'}
      </button>
      {simulationResult && <p>Result: {simulationResult}</p>}
    </section>
  );
}

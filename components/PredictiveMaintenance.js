import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Fungsi mock sensor data random (getaran, suhu, tekanan)
function generateSensorReading(prev) {
  return {
    vibration: Math.max(0, (prev?.vibration ?? 1) + (Math.random() - 0.5) * 0.2),
    temperature: Math.max(20, (prev?.temperature ?? 30) + (Math.random() - 0.5) * 1),
    pressure: Math.max(1, (prev?.pressure ?? 5) + (Math.random() - 0.5) * 0.3),
  };
}

// Fungsi sederhana deteksi anomali (threshold + statistik moving average)
function detectAnomaly(readings) {
  if (readings.length < 5) return false;
  const last = readings[readings.length - 1];
  const avgVib =
    readings.slice(-5).reduce((sum, r) => sum + r.vibration, 0) / 5;
  return last.vibration > avgVib * 1.4 || last.temperature > 50 || last.pressure > 7;
}

// Fungsi prediksi RUL (mock regresi sederhana)
function predictRUL(readings) {
  // Ambil tren getaran untuk prediksi linear (semakin besar getaran, semakin pendek RUL)
  const n = readings.length;
  if (n < 5) return 100; // default 100 jam

  // Hitung slope sederhana antara getaran vs waktu
  let xSum = 0,
    ySum = 0,
    xySum = 0,
    x2Sum = 0;
  for (let i = 0; i < 5; i++) {
    const x = i;
    const y = readings[n - 5 + i].vibration;
    xSum += x;
    ySum += y;
    xySum += x * y;
    x2Sum += x * x;
  }
  const slope = (5 * xySum - xSum * ySum) / (5 * x2Sum - xSum * xSum);
  // Semakin slope naik, RUL turun
  let rul = 100 - slope * 50;
  if (rul < 0) rul = 0;
  if (rul > 100) rul = 100;
  return Math.round(rul);
}

function PredictiveMaintenance() {
  const [sensorData, setSensorData] = useState([]);
  const [anomaly, setAnomaly] = useState(false);
  const [rul, setRUL] = useState(100);
  const [recommendation, setRecommendation] = useState("Monitoring...");

  // Update sensor data setiap detik (simulasi real-time)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => {
        const newReading = generateSensorReading(prev[prev.length - 1]);
        const newData = [...prev, newReading].slice(-50);
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Analisa data sensor tiap update
  useEffect(() => {
    if (sensorData.length === 0) return;
    const detected = detectAnomaly(sensorData);
    setAnomaly(detected);

    const predictedRUL = predictRUL(sensorData);
    setRUL(predictedRUL);

    if (detected) {
      if (predictedRUL < 20) {
        setRecommendation(
          "🔥 CRITICAL: Segera lakukan perawatan menyeluruh dan ganti parts utama!"
        );
      } else if (predictedRUL < 50) {
        setRecommendation(
          "⚠️ Warning: Jadwalkan inspeksi dan perawatan rutin dalam 1-2 hari ke depan."
        );
      } else {
        setRecommendation(
          "⚡ Anomali terdeteksi, pantau kondisi mesin secara intensif."
        );
      }
    } else {
      setRecommendation("✅ Mesin dalam kondisi normal.");
    }
  }, [sensorData]);

  // Data untuk chart.js
  const chartData = {
    labels: sensorData.map((_, i) => i),
    datasets: [
      {
        label: "Getaran (vibration)",
        data: sensorData.map((d) => d.vibration),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.3,
      },
      {
        label: "Suhu (temperature °C)",
        data: sensorData.map((d) => d.temperature),
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.3,
      },
      {
        label: "Tekanan (pressure bar)",
        data: sensorData.map((d) => d.pressure),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "20px auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        backgroundColor: "#fefefe",
        borderRadius: 12,
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        🤖 Predictive Maintenance System
      </h2>

      <div
        style={{
          marginTop: 10,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color: anomaly ? "#c0392b" : "#27ae60",
        }}
      >
        Status: {anomaly ? "⚠️ Anomali Terdeteksi!" : "✅ Normal"}
      </div>

      <div
        style={{
          marginTop: 5,
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center",
          color: anomaly ? "#e74c3c" : "#27ae60",
        }}
      >
        Remaining Useful Life (RUL):{" "}
        <span style={{ fontSize: 24 }}>
          {rul} jam
        </span>
      </div>

      <div
        style={{
          marginTop: 15,
          padding: 15,
          backgroundColor: anomaly ? "#fceaea" : "#eafaf1",
          borderRadius: 10,
          border: `2px solid ${anomaly ? "#e74c3c" : "#27ae60"}`,
          fontSize: 16,
          lineHeight: 1.5,
          textAlign: "center",
        }}
      >
        {recommendation}
      </div>

      <div style={{ marginTop: 30 }}>
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, height: 300 }} />
      </div>
    </div>
  );
}

export default PredictiveMaintenance;

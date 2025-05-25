import React, { useState, useEffect } from "react";

// Mock data parts dengan stok dan rata-rata penggunaan harian
const partsData = [
  { id: "p1", name: "Nozzle", stock: 10, dailyUsage: 2 },
  { id: "p2", name: "Screw Barrel", stock: 5, dailyUsage: 0.5 },
  { id: "p3", name: "O-Ring Seal", stock: 20, dailyUsage: 3 },
  { id: "p4", name: "Heater Band", stock: 2, dailyUsage: 0.1 },
];

// Mock AI sederhana: prediksi hari stok habis + prioritas order (1-10)
const predictStockOutDays = (stock, dailyUsage) => {
  if (dailyUsage === 0) return Infinity;
  return stock / dailyUsage;
};

const computeOrderQuantity = (stock, dailyUsage) => {
  // Order 7 hari kebutuhan ke depan minus stok yang ada, minimal 1 pcs jika stok < kebutuhan 7 hari
  const needed = Math.ceil(dailyUsage * 7 - stock);
  return needed > 0 ? needed : 0;
};

function PartsAutoOrder() {
  const [parts, setParts] = useState(partsData);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    // Simulasi update otomatis prediksi dan generate order saat parts berubah
    const newOrders = parts
      .map((p) => {
        const daysLeft = predictStockOutDays(p.stock, p.dailyUsage);
        const qty = computeOrderQuantity(p.stock, p.dailyUsage);
        if (qty > 0) {
          return {
            partId: p.id,
            partName: p.name,
            qty,
            priority: daysLeft < 3 ? 10 : daysLeft < 7 ? 7 : 3,
            daysLeft,
          };
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => b.priority - a.priority);
    setOrders(newOrders);
  }, [parts]);

  // Handler simulasi penggunaan part (pakai part)
  const usePart = (partId, amount) => {
    setParts((oldParts) =>
      oldParts.map((p) =>
        p.id === partId
          ? { ...p, stock: Math.max(p.stock - amount, 0) }
          : p
      )
    );
  };

  // Generate PO (mock)
  const generatePO = () => {
    alert(
      `Purchase Order Generated:\n${orders
        .map((o) => `${o.partName}: ${o.qty} pcs (Priority: ${o.priority})`)
        .join("\n")}`
    );
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "20px auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        background: "#f0f4f8",
        borderRadius: 10,
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#0077cc" }}>
        🚀 Predictive Auto Parts Ordering System
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
          fontSize: 16,
        }}
      >
        <thead>
          <tr style={{ background: "#0077cc", color: "white" }}>
            <th style={{ padding: "10px" }}>Part Name</th>
            <th style={{ padding: "10px" }}>Stock (pcs)</th>
            <th style={{ padding: "10px" }}>Daily Usage (pcs)</th>
            <th style={{ padding: "10px" }}>Days Left</th>
            <th style={{ padding: "10px" }}>Use Part</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((p) => {
            const daysLeft = predictStockOutDays(p.stock, p.dailyUsage);
            return (
              <tr
                key={p.id}
                style={{
                  background:
                    daysLeft < 3
                      ? "#ffd6d6"
                      : daysLeft < 7
                      ? "#fff4cc"
                      : "white",
                }}
              >
                <td style={{ padding: "10px" }}>{p.name}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {p.stock}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {p.dailyUsage}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {daysLeft === Infinity
                    ? "∞"
                    : daysLeft.toFixed(1) + " hari"}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <button
                    onClick={() => usePart(p.id, 1)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 5,
                      border: "none",
                      backgroundColor: "#0077cc",
                      color: "white",
                      cursor: "pointer",
                      userSelect: "none",
                      transition: "background-color 0.3s",
                    }}
                    onMouseDown={(e) =>
                      (e.currentTarget.style.backgroundColor = "#005fa3")
                    }
                    onMouseUp={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0077cc")
                    }
                  >
                    Use 1 pcs
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button
          onClick={() => setShowOrders((v) => !v)}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            userSelect: "none",
            fontSize: 18,
            boxShadow: "0 0 8px #28a745aa",
          }}
        >
          {showOrders ? "Hide Suggested Orders" : "Show Suggested Orders"}
        </button>
      </div>

      {showOrders && (
        <div
          style={{
            marginTop: 20,
            backgroundColor: "#e9f7ef",
            padding: 20,
            borderRadius: 10,
            boxShadow: "inset 0 0 10px #28a74544",
            fontSize: 16,
          }}
        >
          <h3>🛒 Suggested Purchase Orders</h3>
          {orders.length === 0 && <p>All parts stock are sufficient.</p>}
          {orders.map((o) => (
            <div
              key={o.partId}
              style={{
                marginBottom: 12,
                padding: 12,
                backgroundColor: "#d4edda",
                borderRadius: 6,
                boxShadow: "0 0 5px #28a74566",
              }}
            >
              <strong>{o.partName}</strong>: Order {o.qty} pcs &nbsp;|&nbsp; Priority:{" "}
              <span
                style={{
                  color: o.priority > 7 ? "#c82333" : "#155724",
                  fontWeight: "bold",
                }}
              >
                {o.priority}
              </span>
              <br />
              Est. stock will run out in {o.daysLeft.toFixed(1)} days
            </div>
          ))}

          {orders.length > 0 && (
            <button
              onClick={generatePO}
              style={{
                marginTop: 15,
                padding: "10px 25px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#28a745",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 18,
                boxShadow: "0 0 12px #28a745cc",
              }}
            >
              Generate Purchase Order
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PartsAutoOrder;

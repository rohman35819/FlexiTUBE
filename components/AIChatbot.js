import React, { useState, useEffect, useRef } from "react";

function mockNLPResponse(message, history) {
  // Simulasi respons NLP cerdas dengan kondisi konteks
  const lastUserMessage = history.length ? history[history.length - 1].text : "";
  if (message.toLowerCase().includes("overheat")) {
    return "Terjadi overheat, coba cek pendingin mesin dan suhu sensor. Apakah ada alarm suhu tinggi?";
  }
  if (message.toLowerCase().includes("pressure drop")) {
    return "Penurunan tekanan bisa disebabkan kebocoran atau pompa bermasalah. Periksa seal dan pompa utama.";
  }
  if (message.toLowerCase().includes("error code 42")) {
    return "Kode error 42 menunjukkan masalah sensor tekanan. Pastikan koneksi sensor dan kabel tidak putus.";
  }
  if (message.toLowerCase().includes("help")) {
    return "Saya bisa membantu troubleshooting mesin injection plastik. Jelaskan masalah Anda secara detail.";
  }
  return "Mohon diperjelas masalahnya agar saya bisa membantu lebih spesifik.";
}

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Saya AI Chatbot untuk mesin injection plastik. Ada yang bisa saya bantu?" },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "id-ID";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botReply = mockNLPResponse(input.trim(), [...messages, userMessage]);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 800);

    setInput("");
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      recognitionRef.current?.start();
      setListening(true);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", padding: 20, backgroundColor: "#f5f7fa", borderRadius: 12, boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#34495e" }}>🤖 AI Chatbot Mesin Injection Plastik</h2>
      <div style={{ height: 350, overflowY: "auto", border: "1px solid #ccc", padding: 15, borderRadius: 8, backgroundColor: "#fff" }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              textAlign: m.sender === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: m.sender === "user" ? "#3498db" : "#ecf0f1",
                color: m.sender === "user" ? "white" : "#2c3e50",
                padding: "8px 14px",
                borderRadius: 20,
                maxWidth: "75%",
                wordWrap: "break-word",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 15, display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ketik pesan atau gunakan suara..."
          style={{
            flexGrow: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
          autoFocus
        />
        <button
          onClick={toggleListening}
          style={{
            backgroundColor: listening ? "#e74c3c" : "#3498db",
            border: "none",
            borderRadius: 8,
            color: "white",
            padding: "0 16px",
            fontSize: 16,
            cursor: "pointer",
          }}
          title={listening ? "Berhenti dengarkan" : "Mulai bicara"}
        >
          🎤
        </button>
        <button
          onClick={handleSend}
          style={{
            backgroundColor: "#2ecc71",
            border: "none",
            borderRadius: 8,
            color: "white",
            padding: "0 16px",
            fontSize: 16,
            cursor: "pointer",
          }}
          title="Kirim"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

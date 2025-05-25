import React, { useState, useEffect, useMemo, useCallback } from "react";

// Mock data knowledge graph node & edges (biasanya dari database atau API)
const knowledgeNodes = [
  { id: "speed", label: "Speed", type: "parameter", description: "Kecepatan injeksi mesin." },
  { id: "pressure", label: "Pressure", type: "parameter", description: "Tekanan injeksi yang optimal." },
  { id: "temp", label: "Temperature", type: "parameter", description: "Suhu cetakan dan bahan." },
  { id: "defect1", label: "Sink Mark", type: "defect", description: "Cacat berupa cekungan pada produk." },
  { id: "defect2", label: "Warping", type: "defect", description: "Distorsi bentuk produk setelah pendinginan." },
  { id: "solution1", label: "Increase Cooling Time", type: "solution", description: "Solusi meningkatkan waktu pendinginan." },
  { id: "solution2", label: "Adjust Injection Speed", type: "solution", description: "Solusi mengatur kecepatan injeksi." },
];

// Edges menghubungkan node (source to target) dengan jenis relasi
const knowledgeEdges = [
  { source: "speed", target: "defect2", relation: "affects" },
  { source: "pressure", target: "defect1", relation: "causes" },
  { source: "temp", target: "defect1", relation: "influences" },
  { source: "defect1", target: "solution1", relation: "fixed_by" },
  { source: "defect2", target: "solution2", relation: "fixed_by" },
];

// Mock AI Q&A function (bisa sambungkan API OpenAI atau sejenisnya)
const mockAIAnswer = async (question) => {
  await new Promise((r) => setTimeout(r, 1200)); // simulate delay
  const lower = question.toLowerCase();
  if (lower.includes("sink mark")) return "Sink Mark terjadi akibat pendinginan yang tidak merata dan tekanan injeksi terlalu tinggi.";
  if (lower.includes("warp")) return "Warping biasanya terjadi karena kecepatan injeksi terlalu cepat dan pendinginan yang tidak optimal.";
  if (lower.includes("pressure")) return "Tekanan injeksi mempengaruhi kualitas produk dan dapat menyebabkan cacat jika tidak tepat.";
  return "Maaf, saya belum punya informasi lengkap untuk pertanyaan itu, coba tanyakan dengan kata lain.";
};

const colorsByType = {
  parameter: "#007bff",
  defect: "#dc3545",
  solution: "#28a745",
};

function MachineKnowledge() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNodes, setFilteredNodes] = useState(knowledgeNodes);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  // Filter nodes berdasarkan searchTerm (autocomplete)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredNodes(knowledgeNodes);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredNodes(
        knowledgeNodes.filter((n) => n.label.toLowerCase().includes(lower))
      );
    }
  }, [searchTerm]);

  // Generate positions sederhana untuk node SVG (circle) - dalam layout grid melingkar
  const nodePositions = useMemo(() => {
    const cx = 300,
      cy = 200,
      radius = 150;
    const angleStep = (2 * Math.PI) / knowledgeNodes.length;
    return knowledgeNodes.map((node, idx) => ({
      ...node,
      x: cx + radius * Math.cos(idx * angleStep - Math.PI / 2),
      y: cy + radius * Math.sin(idx * angleStep - Math.PI / 2),
    }));
  }, []);

  // Dapatkan posisi node by id untuk menggambar edge
  const getNodePos = useCallback(
    (id) => {
      const node = nodePositions.find((n) => n.id === id);
      return node ? { x: node.x, y: node.y } : null;
    },
    [nodePositions]
  );

  // Handler tanya AI
  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoadingAnswer(true);
    const ans = await mockAIAnswer(question.trim());
    setAnswer(ans);
    setLoadingAnswer(false);
  };

  return (
    <div style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>Machine Knowledge Base & AI Assistant</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Cari parameter, cacat, solusi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", width: "100%", borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
          autoComplete="off"
        />
      </div>

      <svg width="600" height="400" style={{ border: "1px solid #ddd", borderRadius: 10, background: "#f8f9fa" }}>
        {/* Edges */}
        {knowledgeEdges.map((edge, i) => {
          const from = getNodePos(edge.source);
          const to = getNodePos(edge.target);
          if (!from || !to) return null;

          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#888"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
              <text
                x={midX}
                y={midY - 5}
                fill="#555"
                fontSize="12"
                textAnchor="middle"
                style={{ userSelect: "none" }}
              >
                {edge.relation}
              </text>
            </g>
          );
        })}

        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
          </marker>
        </defs>

        {/* Nodes */}
        {nodePositions.map((node) => (
          <g
            key={node.id}
            onClick={() => setSelectedNode(node)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={selectedNode?.id === node.id ? 20 : 15}
              fill={colorsByType[node.type] || "#666"}
              stroke="#333"
              strokeWidth={selectedNode?.id === node.id ? 3 : 1}
              style={{ transition: "all 0.3s ease" }}
            />
            <text
              x={node.x}
              y={node.y + 40}
              fontSize="12"
              fill="#333"
              textAnchor="middle"
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {selectedNode && (
        <div style={{ marginTop: 20, padding: 15, background: "#e9ecef", borderRadius: 10 }}>
          <h3 style={{ color: colorsByType[selectedNode.type] || "#333" }}>
            {selectedNode.label}
          </h3>
          <p>{selectedNode.description}</p>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h3>Ask AI Assistant about Machine Knowledge</h3>
        <input
          type="text"
          placeholder="Tanya tentang parameter, cacat, solusi..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ padding: "0.5rem", width: "100%", borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
          onKeyDown={(e) => e.key === "Enter" && askQuestion()}
        />
        <button
          onClick={askQuestion}
          disabled={loading
            Answer}
style={{
marginTop: 10,
padding: "0.5rem 1rem",
backgroundColor: "#007bff",
border: "none",
color: "white",
borderRadius: 6,
cursor: "pointer",
fontWeight: "bold",
fontSize: 16,
userSelect: "none",
}}
>
{loadingAnswer ? "Mencari..." : "Tanya"}
</button>
{answer && (
<div
style={{
marginTop: 15,
padding: 15,
backgroundColor: "#d1ecf1",
borderRadius: 8,
fontStyle: "italic",
whiteSpace: "pre-wrap",
}}
>
{answer}
</div>
)}
</div>
</div>
);
}

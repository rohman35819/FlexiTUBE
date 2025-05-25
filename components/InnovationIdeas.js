import React, { useState, useEffect, useRef } from "react";

// Mock AI brainstormer - dalam implementasi asli, ini bisa panggil API OpenAI atau sejenis
const mockAIGenerateIdea = async (topic) => {
  await new Promise((r) => setTimeout(r, 1500)); // simulate delay
  return [
    `Optimize injection molding with AI-driven adaptive cooling for ${topic}`,
    `Use quantum computing for predictive material wear in ${topic}`,
    `Deploy AR-powered remote collaboration for ${topic} maintenance`,
    `Automate workflow via ML-based bottleneck detection in ${topic}`,
  ];
};

const InnovationIdeas = () => {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [discussion, setDiscussion] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const ideasEndRef = useRef(null);

  useEffect(() => {
    if (ideasEndRef.current) {
      ideasEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ideas, discussion]);

  // Fungsi generate ide pakai AI mock
  const generateIdeas = async () => {
    if (!topic.trim()) return alert("Masukkan topik inovasi terlebih dahulu");
    setLoading(true);
    const generated = await mockAIGenerateIdea(topic.trim());
    setIdeas(generated);
    setSelectedIdea(null);
    setDiscussion([]);
    setLoading(false);
  };

  // Chat diskusi singkat terkait ide
  const addChatMessage = () => {
    if (!chatInput.trim()) return;
    setDiscussion((d) => [...d, { id: Date.now(), text: chatInput.trim() }]);
    setChatInput("");
  };

  // Vote ide (simple thumbs up count)
  const [votes, setVotes] = useState({}); // { idea: voteCount }
  const voteIdea = (idea) => {
    setVotes((v) => ({ ...v, [idea]: (v[idea] || 0) + 1 }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Innovation Ideas Generator & Collaborator</h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Masukkan topik inovasi (mis: injection molding)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && generateIdeas()}
          autoFocus
        />
        <button onClick={generateIdeas} style={styles.button} disabled={loading}>
          {loading ? "Generating..." : "Generate Ideas"}
        </button>
      </div>

      <div style={styles.ideasContainer}>
        {ideas.length === 0 && !loading && <p>Belum ada ide, mulai dengan memasukkan topik.</p>}

        {ideas.map((idea, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIdea(idea)}
            style={{
              ...styles.ideaCard,
              borderColor: selectedIdea === idea ? "#0d6efd" : "#ccc",
              boxShadow: selectedIdea === idea ? "0 0 10px #0d6efd" : "none",
            }}
          >
            <p>{idea}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                voteIdea(idea);
              }}
              style={styles.voteButton}
              title="Vote this idea"
            >
              👍 {votes[idea] || 0}
            </button>
          </div>
        ))}

        {selectedIdea && (
          <div style={styles.discussionPanel}>
            <h3>Discussion on:</h3>
            <p style={styles.selectedIdeaText}>{selectedIdea}</p>

            <div style={styles.chatBox}>
              {discussion.length === 0 && <p>Belum ada diskusi, mulai dengan komentar kamu.</p>}
              {discussion.map((msg) => (
                <div key={msg.id} style={styles.chatMessage}>
                  {msg.text}
                </div>
              ))}
              <div ref={ideasEndRef} />
            </div>

            <div style={styles.chatInputGroup}>
              <input
                type="text"
                placeholder="Tulis komentar..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={styles.chatInput}
                onKeyDown={(e) => e.key === "Enter" && addChatMessage()}
              />
              <button onClick={addChatMessage} style={styles.button}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 720,
    margin: "1rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "1rem",
    background: "#f5f7fa",
    borderRadius: 12,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    color: "#0d6efd",
  },
  inputGroup: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
  },
  input: {
    flexGrow: 1,
    padding: "0.5rem 1rem",
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem 1.5rem",
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#0d6efd",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  ideasContainer: {
    minHeight: 200,
  },
  ideaCard: {
    background: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    border: "2px solid #ccc",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  voteButton: {
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "4px 8px",
    cursor: "pointer",
  },
  discussionPanel: {
    marginTop: 30,
    background: "#e9ecef",
    borderRadius: 10,
    padding: 16,
    boxShadow: "inset 0 0 5px #0d6efd",
  },
  selectedIdeaText: {
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 12,
  },
  chatBox: {
    maxHeight: 160,
    overflowY: "auto",
    padding: "8px",
    background: "#fff",
    borderRadius: 8,
    marginBottom: 12,
  },
  chatMessage: {
    padding: 8,
    borderBottom: "1px solid #ddd",
    fontSize: 14,
  },
  chatInputGroup: {
    display: "flex",
    gap: 8,
  },
  chatInput: {
    flexGrow: 1,
    padding: "0.5rem 1rem",
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
};

export default InnovationIdeas;

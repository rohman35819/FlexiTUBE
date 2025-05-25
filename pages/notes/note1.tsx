// pages/notes/note1.tsx
import React from "react";
import withAuth from "../../lib/withAuth";
import LogoutButton from "../../components/LogoutButton";

function Note1() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Halaman Note1, pakai Basic Auth</h1>
      <LogoutButton />
    </div>
  );
}

export default withAuth(Note1);

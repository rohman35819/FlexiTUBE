import withAuth from "../../lib/withAuth";
import LogoutButton from "../../components/LogoutButton";

function Note1() {
  return (
    <div>
      <h1>Halaman Note1, pakai Basic Auth</h1>
      <LogoutButton authMethod="basic" />
    </div>
  );
}

export default withAuth(Note1, "basic");
